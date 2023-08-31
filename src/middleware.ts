import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, URLPattern } from 'next/server';
import { PartialGuild } from './types/discord';

const dashboardUrlPattern = new URLPattern({ pathname: '/dashboard/guild{/:guildId}?{/:category}?' });

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;

    if (req.nextUrl.pathname.startsWith('/login')) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    if (req.nextUrl.pathname.startsWith('/dashboard/guild')) {
      const result = dashboardUrlPattern.exec(req.nextUrl)?.pathname.groups;
      
      if (!result?.guildId || !/^\d{16,19}$/.test(result.guildId)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (!(await getMutualGuild(req)).some((g) => g.id === result.guildId)) {
        console.log('a');
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      }
    }
  },
)

async function getMutualGuild(req: Request) {
  const res = await fetch(
    new URL('/api/guilds', req.url),
    { headers: req.headers },
  );
  return await res.json<PartialGuild[]>();
}

export const config = { matcher: ['/dashboard/:path*', '/login'] }
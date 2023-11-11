import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { URLPattern } from 'next/server';
import { PartialCurrentUserGuildWithBotJoined } from './types/discord';

const dashboardUrlPattern = new URLPattern({
  pathname: '/dashboard/guild{/:guildId}?{/:category}?',
});

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;

    if (req.nextUrl.pathname.startsWith('/login')) {
      if (isAuth) return Response.redirect(new URL('/dashboard', req.url));
      return null;
    }

    if (!isAuth || !token.accessToken) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) from += req.nextUrl.search;
      return Response.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }

    if (req.nextUrl.pathname.startsWith('/dashboard/guild')) {
      const result = dashboardUrlPattern.exec(req.nextUrl)?.pathname.groups;

      if (!result?.guildId || !/^\d{16,19}$/.test(result.guildId)) {
        return Response.redirect(new URL('/dashboard', req.url));
      }

      const guilds = await getUserGuilds(req).catch(() => undefined);
      const targetGuild = guilds?.find((guild) => guild.id === result.guildId);

      if (!targetGuild?.isBotJoined) {
        return Response.redirect(new URL('/dashboard', req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

async function getUserGuilds(req: Request) {
  const res = await fetch(new URL('/api/dashboard/guilds', req.url), {
    headers: req.headers,
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json<PartialCurrentUserGuildWithBotJoined[]>();
}

export const config = { matcher: ['/dashboard/:path*', '/login'] };

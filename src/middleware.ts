import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, URLPattern } from 'next/server';
import { Discord } from '@/lib/constants';
import { hasPermission } from '@/lib/discord';
import { isSnowflake } from 'discord-snowflake';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';

const dashboardUrlPattern = new URLPattern({
  pathname: '/dashboard/guild{/:guildId}?{/:category}?',
});

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;

    if (req.nextUrl.pathname.startsWith('/login')) {
      if (isAuth) return NextResponse.redirect(new URL('/dashboard', req.url));
      return null;
    }

    if (!isAuth || !token.accessToken) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) from += req.nextUrl.search;
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }

    if (req.nextUrl.pathname.startsWith('/dashboard/guild')) {
      const result = dashboardUrlPattern.exec(req.nextUrl)?.pathname.groups;

      if (!result?.guildId || !isSnowflake(result.guildId)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      const guild = await getUserGuilds(req)
        .then((guilds) => guilds.find((guild) => guild.id === result.guildId))
        .catch(() => undefined);

      if (!guild || !hasPermission(guild.permissions, Discord.Permissions.ManageGuild)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
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
  return res.json<RESTAPIPartialCurrentUserGuild[]>();
}

export const config = { matcher: ['/dashboard/:path*', '/login'] };

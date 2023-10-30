import { hasPermission } from '@/lib/discord';
import { authOption } from '../../auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Discord } from '@/lib/constants';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';

export async function GET() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const res = await fetch(`${Discord.Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    console.error(res.status);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

  return NextResponse.json(
    await res
      .json<RESTAPIPartialCurrentUserGuild[]>()
      .then((guilds) =>
        guilds.filter((guild) => hasPermission(guild.permissions, Discord.Permissions.ManageGuild)),
      ),
  );
}

import { hasPermission } from '@/lib/discord';
import { authOption } from '../../auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Discord } from '@/lib/constants';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import dbConnect from '@/lib/mongoose/connect';
import guildCacheModel from '@/models/guildCacheModel';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOption);
  if (!session?.accessToken)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const res = await fetch(`${Discord.Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    console.error(`/api/dashboard/guilds - ${res.status}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }

  const guilds = await res.json<RESTAPIPartialCurrentUserGuild[]>();
  const filteredGuilds = await Promise.all(
    guilds
      .filter((guild) =>
        hasPermission(guild.permissions, Discord.Permissions.ManageGuild),
      )
      .map(async (guild) => ({
        ...guild,
        isBotJoined: !!(await guildCacheModel.findOne({ serverId: guild.id })),
      })),
  );

  return NextResponse.json(filteredGuilds);
}

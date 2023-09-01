import { NextResponse } from 'next/server'
import { getBotGuilds, getUserGuilds, hasPermission } from '@/lib/discord';
import { Discord } from '@/lib/constants';
import { getServerSession } from 'next-auth';
import { authOption } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const userGuilds = await getUserGuilds(session.accessToken);
  const botGuilds = await getBotGuilds();

  const mutualGuilds = userGuilds
    ?.filter((userGuild) => botGuilds.some((botGuild) => botGuild.id === userGuild.id))
    ?.filter((userGuild) => (
      userGuild.owner ||
      hasPermission(userGuild.permissions, Discord.Permissions.Administrator) ||
      hasPermission(userGuild.permissions, Discord.Permissions.ManageGuild)
    ));

  return NextResponse.json(mutualGuilds);
}
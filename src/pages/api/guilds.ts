import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from './auth/[...nextauth]';
import { Discord } from '@/utils/contants';
import { fetchGuilds } from '@/utils/api/guild';
import { hasPermission } from '@/utils/functions';

export default async function getAdminGuilds(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const userGuilds = await fetchGuilds(session?.accessToken, 'Bearer');
    const botGuilds = await fetchGuilds(process.env.DISCORD_CLIENT_TOKEN, 'Bot');

    const adminGuilds = userGuilds
      ?.filter(v => hasPermission(v.permissions, Discord.Permissions.ManageGuild))
      ?.filter(userGuild => botGuilds?.some(botGuild => botGuild.id === userGuild.id))

    return res.status(200).send({ status: 'ok', guilds: adminGuilds });
  }

  return res.status(401).send({ status: 'Unauthorized', guilds: [] });
}
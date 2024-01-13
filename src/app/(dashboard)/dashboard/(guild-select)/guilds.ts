'use server';

import { authOption } from '@/app/api/auth/[...nextauth]/auth';
import { ServerData } from '@/database/models';
import { Discord } from '@/lib/constants';
import { getUserGuilds, hasPermission } from '@/lib/discord';
import { dbConnect } from '@/lib/mongoose';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { getServerSession } from 'next-auth';

export async function getMutualGuilds(): Promise<
  RESTAPIPartialCurrentUserGuild[]
> {
  await dbConnect();
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return [];

  const userGuilds = await getUserGuilds(session.accessToken);
  const userAdmitGuilds = userGuilds.filter((guild) =>
    hasPermission(guild.permissions, Discord.Permissions.ManageGuild),
  );

  const mutualGuilds = await Promise.all(
    userAdmitGuilds.map(async (guild) => {
      const isExist = await checkServerData(guild.id);
      if (isExist) return guild;
    }),
  );

  return mutualGuilds.filter(Boolean) as RESTAPIPartialCurrentUserGuild[];
}

async function checkServerData(serverId: string): Promise<boolean> {
  const collection = await ServerData.findOne({ serverId });
  return !!collection;
}

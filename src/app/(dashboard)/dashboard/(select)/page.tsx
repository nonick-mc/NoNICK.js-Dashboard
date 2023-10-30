import { hasPermission } from '@/lib/discord';
import { Metadata } from 'next';
import { GuildTable } from './table';
import { Discord } from '@/lib/constants';
import guildCacheModel from '@/models/guildCacheModel';
import dbConnect from '@/lib/mongoose/connect';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'サーバー選択',
};

async function getUserGuilds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/dashboard/guilds`, {
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join(';'),
    },
  });

  if (!res.ok) throw new Error(res.statusText);
  return res.json<RESTAPIPartialCurrentUserGuild[]>();
}

async function getValidGuilds() {
  await dbConnect();
  const guilds = await getUserGuilds();

  const res = await Promise.all(
    guilds
      .filter((guild) => hasPermission(guild.permissions, Discord.Permissions.ManageGuild))
      .map(async (guild) => {
        const res = await guildCacheModel.findOne({ serverId: guild.id });
        return res ? guild : false;
      }),
  );

  return res.filter((guild): guild is RESTAPIPartialCurrentUserGuild => !!guild);
}

export default async function Page() {
  const guilds = await getValidGuilds();
  return <GuildTable guilds={guilds} />;
}

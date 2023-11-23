import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { PartialCurrentUserGuildWithBotJoined } from '@/types/discord';
import { GuildTable } from './guild-table';

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
    next: { revalidate: 5 },
  });

  if (!res.ok) throw new Error(res.statusText);
  return res.json<PartialCurrentUserGuildWithBotJoined[]>();
}

export default async function Page() {
  const guilds = (await getUserGuilds()).filter((guild) => guild.isBotJoined);
  return <GuildTable guilds={guilds} />;
}

import { Metadata } from 'next';
import { GuildList } from './guild-list';
import { getMutualGuilds } from './guilds';

export const metadata: Metadata = {
  title: 'サーバー選択',
};

export default async function Page() {
  const guilds = await getMutualGuilds();
  return <GuildList guilds={guilds} />;
}

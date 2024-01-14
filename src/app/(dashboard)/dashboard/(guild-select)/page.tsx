import { Metadata } from 'next';
import { getMutualGuilds } from '../mutualGuilds';
import { GuildList } from './guild-list';

export const metadata: Metadata = {
  title: 'サーバー選択',
};

export default async function Page() {
  const guilds = await getMutualGuilds();
  return <GuildList guilds={guilds} />;
}

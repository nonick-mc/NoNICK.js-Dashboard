import { Discord } from '@/lib/constants';
import { getUserGuilds, hasPermission } from '@/lib/discord';
import { Metadata } from 'next';
import { GuildTable } from './table';

export const metadata: Metadata = {
  title: 'サーバー選択',
};

export default async function Page() {
  const guilds = (await getUserGuilds()).filter((guild) =>
    hasPermission(guild.permissions, Discord.Permissions.ManageGuild),
  );
  return <GuildTable guilds={guilds} />;
}

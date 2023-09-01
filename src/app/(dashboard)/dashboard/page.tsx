import { Metadata } from 'next';
import { PartialGuild } from '@/types/discord';
import { GuildTable } from './table';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'サーバー選択'
}

async function getMutualGuilds() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/guilds`,
    { headers: { Cookie: cookies().getAll().map(({ name, value }) => `${name}=${value}`).join(";") } }
  );
  return await res.json<PartialGuild[]>();
}

export default async function Page() {
  const guilds = await getMutualGuilds();

  return (
    <main className='container space-y-8 py-3'>
      <GuildTable guilds={guilds}/>
    </main>
  )
}
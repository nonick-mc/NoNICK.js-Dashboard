import { Metadata } from 'next';
import { PartialGuild } from '@/types/discord';
import { GuildTable } from './table';
import { headers } from 'next/headers';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const metadata: Metadata = {
  title: 'サーバー選択'
}

async function getMutualGuilds(header: ReadonlyHeaders) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/guilds`,
    { headers: header }
  );
  return await res.json<PartialGuild[]>();
}

export default async function Page() {
  const headerList = headers();
  const guilds = await getMutualGuilds(headerList);

  return (
    <main className='container space-y-8 py-3'>
      <GuildTable guilds={guilds}/>
    </main>
  )
}
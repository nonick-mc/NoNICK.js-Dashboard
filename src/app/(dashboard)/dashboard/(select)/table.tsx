'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Discord } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { ChevronRight, GridIcon, ListIcon, PlusIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  guilds: RESTAPIPartialCurrentUserGuild[];
};

export function GuildTable({ guilds }: Props) {
  const [filterValue, setFilterValue] = useState('');
  const filteredGuilds = guilds.filter(
    ({ name, id }) =>
      name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 || id.startsWith(filterValue),
  );

  return (
    <Tabs defaultValue='grid' className='space-y-6'>
      <div className='flex gap-3'>
        <Input
          className='w-[300px] flex-1 focus-visible:ring-transparent'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.toLowerCase())}
          placeholder='名前またはIDで検索'
        />
        <TabsList>
          <TabsTrigger value='grid'>
            <GridIcon size={18} />
          </TabsTrigger>
          <TabsTrigger value='list'>
            <ListIcon size={18} />
          </TabsTrigger>
        </TabsList>
        <Link
          className={cn(buttonVariants(), 'flex gap-2')}
          href={`${Discord.Endpoints.API}/oauth2/authorize?${new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_DISCORD_ID,
            scope: 'bot',
            permissions: `${process.env.NEXT_PUBLIC_DISCORD_PERMISSION}`,
            response_type: 'code',
            redirect_uri: `${process.env.NEXT_PUBLIC_VERCEL_URL}/dashboard`,
          }).toString()}`}
        >
          <PlusIcon size={16} />
          サーバーに導入
        </Link>
      </div>
      {!filteredGuilds.length ? (
        <Card className='flex h-[350px] items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <SearchIcon className='text-muted-foreground' size={64} />
            <p className='text-muted-foreground'>条件に一致するサーバーが見つかりませんでした</p>
          </div>
        </Card>
      ) : (
        <>
          <TabsContent value='grid'>
            <div className='grid grid-cols-10 gap-6'>
              {filteredGuilds.map((g) => (
                <GridGuildItem key={g.id} guild={g} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value='list'>
            <div className='grid grid-cols-1 gap-2'>
              {filteredGuilds.map((g) => (
                <ListGuildItem key={g.id} guild={g} />
              ))}
            </div>
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}

export function GridGuildItem({ guild }: { guild: RESTAPIPartialCurrentUserGuild }) {
  return (
    <Link className='col-span-2' key={guild.id} href={`/dashboard/guild/${guild.id}`}>
      <Card className='overflow-hidden transition-all duration-150 hover:opacity-80'>
        <div className='flex items-center justify-center bg-secondary py-6'>
          <Image
            className='pointer-events-none rounded-full'
            src={
              guild.icon
                ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
                : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
            }
            width={70}
            height={70}
            alt={`${guild.name}のサーバーアイコン`}
          />
        </div>
        <div className='p-3 text-center text-base'>{guild.name}</div>
      </Card>
    </Link>
  );
}

export function ListGuildItem({ guild }: { guild: RESTAPIPartialCurrentUserGuild }) {
  return (
    <Link className='col-span-2' key={guild.id} href={`/dashboard/guild/${guild.id}`}>
      <Card className='flex items-center justify-between px-6 py-3 transition-all duration-150 hover:opacity-80'>
        <div className='flex items-center gap-3'>
          <Image
            className='pointer-events-none rounded-full'
            src={
              guild.icon
                ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
                : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
            }
            width={40}
            height={40}
            alt={`${guild.name}のサーバーアイコン`}
          />
          <p>{guild.name}</p>
        </div>
        <ChevronRight size={18} />
      </Card>
    </Link>
  );
}

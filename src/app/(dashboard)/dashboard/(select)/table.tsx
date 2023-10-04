'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Discord } from '@/lib/constants';
import { PartialGuild } from '@/types/discord';
import { ChevronRight, GridIcon, ListIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

type Props = {
  guilds: PartialGuild[];
};

export const GuildTable: FC<Props> = ({ guilds }) => {
  const [searchKey, setSearchKey] = useState('');
  const filteredGuilds = guilds.filter(
    ({ name, id }) => !searchKey || name.toLowerCase().includes(searchKey) || id === searchKey,
  );

  return (
    <Tabs defaultValue='grid' className='space-y-6'>
      <div className='flex gap-3'>
        <Input
          className='w-[300px] flex-1 focus-visible:ring-transparent'
          onChange={(event) => setSearchKey(event.target.value.toLowerCase())}
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
            <div className='grid grid-cols-1 gap-3'>
              {filteredGuilds.map((g) => (
                <ListGuildItem key={g.id} guild={g} />
              ))}
            </div>
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export function GridGuildItem({ guild }: { guild: PartialGuild }) {
  return (
    <Link className='col-span-2' key={guild.id} href={`/dashboard/guild/${guild.id}`}>
      <Card className='overflow-hidden'>
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

export function ListGuildItem({ guild }: { guild: PartialGuild }) {
  return (
    <Link className='col-span-2' key={guild.id} href={`/dashboard/guild/${guild.id}`}>
      <Card className='flex items-center justify-between px-6 py-3'>
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

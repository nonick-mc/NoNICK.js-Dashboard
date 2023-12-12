'use client';

import { Discord } from '@/lib/constants';
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { PlusIcon, SearchIcon } from 'lucide-react';
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
      name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
      id.startsWith(filterValue),
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:justify-stretch gap-3'>
        <Input
          classNames={{
            base: 'flex-1',
            label: 'hidden',
          }}
          size='sm'
          placeholder='名前またはサーバーIDで検索'
          startContent={<SearchIcon className='text-foreground/50' size={20} />}
          onValueChange={(e) => setFilterValue(e.toLowerCase())}
          isClearable
        />
        <Link
          className='w-full sm:w-auto'
          href={`${
            Discord.Endpoints.API
          }/oauth2/authorize?${new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_DISCORD_ID,
            scope: 'bot',
            permissions: `${process.env.NEXT_PUBLIC_DISCORD_PERMISSION}`,
            response_type: 'code',
            redirect_uri: `${process.env.NEXT_PUBLIC_VERCEL_URL}/dashboard`,
          }).toString()}`}
          passHref
        >
          <Button
            color='primary'
            className='sm:h-full w-full sm:w-auto'
            startContent={<PlusIcon size={18} />}
          >
            サーバーに導入
          </Button>
        </Link>
      </div>
      {!filteredGuilds.length ? (
        <Card className='flex h-[400px] items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <SearchIcon className='text-muted-foreground' size={64} />
            <p className='text-muted-foreground'>
              条件に一致するサーバーが見つかりませんでした
            </p>
          </div>
        </Card>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {filteredGuilds.map((g) => (
            <GridGuildItem key={g.id} guild={g} />
          ))}
        </div>
      )}
    </div>
  );
}

export function GridGuildItem({
  guild,
}: { guild: RESTAPIPartialCurrentUserGuild }) {
  return (
    <Link
      key={guild.id}
      href={`/dashboard/guild/${guild.id}`}
      passHref
    >
      <Card className='overflow-hidden' fullWidth isPressable>
        <CardBody className='items-center justify-center bg-default-100 py-6'>
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
        </CardBody>
        <CardFooter className='justify-center p-3'>
          <p>{guild.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

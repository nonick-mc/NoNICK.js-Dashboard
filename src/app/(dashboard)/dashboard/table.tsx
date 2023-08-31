'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { marketingConfig } from '@/config/merketing';
import { Discord } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PartialGuild } from '@/types/discord';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

type Props = {
  guilds: PartialGuild[]
}

export const GuildTable: FC<Props> = ({ guilds }) => {
  const [searchKey, setSearchKey] = useState('');

  return (
    <>
      <div className='flex items-end justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-4xl font-black'>サーバー選択</h1>
          <p className='text-muted-foreground'>BOTの設定を行うサーバーを選択して下さい。</p>
        </div>
        <div className='flex gap-3'>
          <Input
            onChange={(event) => setSearchKey(event.target.value.toLowerCase())}
            placeholder='名前またはIDで検索'
            className='w-[300px]'
          />
          <Link
            href={marketingConfig.invite}
            target='_blank'
            rel='noreferrer'
            className={cn(buttonVariants(), 'gap-2 items-center')}
          >
            <PlusIcon size={16}/>
            <span>BOTを導入</span>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-10 gap-6'>
        {guilds
          ?.filter((guild) => !searchKey || (guild.name.toLowerCase().includes(searchKey) || guild.id === searchKey))
          ?.map((guild) => (
            <Link className='col-span-2' key={guild.id} href={`/dashboard/guild/${guild.id}`}>
              <Card className='overflow-hidden'>
                <div className='bg-secondary flex items-center justify-center py-6'>
                  <Image
                    className='pointer-events-none rounded-full'
                    src={`${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`}
                    width={70}
                    height={70}
                    alt={`${guild.name}のサーバーアイコン`}
                  />
                </div>
                <div className='text-base text-center p-3'>{guild.name}</div>
              </Card>
            </Link>
          ))}
      </div>
    </>
  )
}
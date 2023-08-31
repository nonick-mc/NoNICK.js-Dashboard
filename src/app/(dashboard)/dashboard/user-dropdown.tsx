'use client';

import React from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { LogOut, Server } from 'lucide-react';

export function UserDropDown() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='w-8 h-8'>
          <AvatarImage src={session?.user?.image || '/discord.png'} />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40'>
        <DropdownMenuLabel className='space-y-1'>
          <p>@{session?.user?.name}</p>
          <p className='text-xs text-muted-foreground'>Discordアカウント</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <Link href='/dashboard' passHref>
          <DropdownMenuItem className='items-center cursor-pointer'>
            <Server size={15} className='mr-2'/>
            <span>サーバー選択</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className='text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut size={15} className='mr-2'/>
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
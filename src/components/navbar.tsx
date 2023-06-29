'use client';

import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Logo } from './logo';
import { Avatar } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { FiHelpCircle } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';

export function DashboardNavBar() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b bg-background">
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <div className='flex items-center space-x-2'>
          <Logo width={120} height={40}/>
        </div>
        <div className='flex justify-end gap-1'>
          <Link
            href='https://docs.nonick-js.com'
            target='_blank'
            rel='noreferrer'
          >
            <div className={buttonVariants({ size: 'icon', variant: 'ghost' })}>
              <FiHelpCircle size={20}/>
            </div>
          </Link>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='w-7 h-7 ml-2'>
                <AvatarImage src={session?.user?.image || '/discord.png'} />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>@{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
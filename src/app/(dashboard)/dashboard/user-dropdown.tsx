'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Discord } from '@/lib/constants';
import { LogOutIcon, ServerIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function UserDropDown() {
  const { data: session } = useSession();
  const router = useRouter();

  const userAvatar = session?.user?.image || `${Discord.Endpoints.CDN}/embed/avatars/0.png`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label='マイアカウント'>
        <Avatar className='h-8 w-8 transition-all'>
          <AvatarImage
            src={userAvatar}
            alt={`${session?.user?.name || '不明なユーザー'}のアイコン`}
          />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-60'>
        <div className='flex items-center gap-2 px-2 py-1.5 text-sm font-semibold'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
          <section>
            <p>@{session?.user?.name}</p>
            <p className='text-xs text-muted-foreground'>Discordアカウント</p>
          </section>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2' onClick={() => router.push('/dashboard')}>
          <ServerIcon size={15} />
          <span>サーバー選択</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2 text-red-500 focus:bg-red-500/10 focus:text-red-500'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOutIcon size={15} />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

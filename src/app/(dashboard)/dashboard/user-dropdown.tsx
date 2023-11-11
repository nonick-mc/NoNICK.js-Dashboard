'use client';

import { Discord } from '@/lib/constants';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  cn,
} from '@nextui-org/react';
import { LayoutGrid, LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export function UserDropDown() {
  const { data: session } = useSession();
  const avatar = session?.user?.image || `${Discord.Endpoints.CDN}/embed/avatars/0.png`;
  const iconClasses = 'pointer-events-none flex-shrink-0';

  return (
    <Dropdown>
      <DropdownTrigger className='cursor-pointer'>
        <Avatar src={avatar} size='sm' alt='ユーザーアイコン' />
      </DropdownTrigger>
      <DropdownMenu variant='flat' aria-label='ユーザーメニュー'>
        <DropdownSection showDivider>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold text-foreground'>@{session?.user?.name}</p>
            <p className='font-semibold text-default-500'>Discordアカウント</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key='dashboard'
          href='/dashboard'
          className='text-foreground'
          startContent={<LayoutGrid size={20} className={iconClasses} />}
        >
          サーバー選択
        </DropdownItem>
        <DropdownItem
          key='logout'
          className='text-danger'
          color='danger'
          startContent={<LogOutIcon size={20} className={cn(iconClasses, 'text-danger')} />}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          ログアウト
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

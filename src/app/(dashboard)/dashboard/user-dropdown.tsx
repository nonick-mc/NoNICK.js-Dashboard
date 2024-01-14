'use client';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { TailwindCSS } from '@/lib/constants';
import { nullToUndefined } from '@/lib/utils';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Spinner } from '@nextui-org/spinner';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logout2, Server2 } from 'solar-icon-set';
import { useMediaQuery } from 'usehooks-ts';

export function UserDropdown() {
  const { data: session } = useSession();
  const isDesktop = useMediaQuery(TailwindCSS.Responsive.sm);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Spinner classNames={{ base: 'size-8' }} size='sm' />;

  if (isDesktop)
    return (
      <Dropdown isOpen={open} onOpenChange={setOpen}>
        <DropdownTrigger className='cursor-pointer'>
          <Avatar
            size='sm'
            src={nullToUndefined(session?.user?.image)}
            showFallback
          />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='ユーザーメニュー'>
          <DropdownSection showDivider>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold text-foreground'>
                @{session?.user?.name}
              </p>
              <p className='font-semibold text-default-500'>
                Discordアカウント
              </p>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key='dashboard'
            href='/dashboard'
            className='text-foreground'
            startContent={<Server2 iconStyle='Bold' size={20} />}
          >
            サーバー選択
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
            startContent={<Logout2 iconStyle='Bold' size={20} />}
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            ログアウト
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Avatar
          size='sm'
          src={nullToUndefined(session?.user?.image)}
          showFallback
        />
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-4 px-3 py-6 mx-auto w-full max-w-sm'>
          <div className='px-4 py-3 flex items-center gap-3 bg-content2 rounded-xl shadow-md'>
            <Avatar
              size='md'
              src={nullToUndefined(session?.user?.image)}
              showFallback
            />
            <div>
              <p className='text-sm font-bold'>@{session?.user?.name}</p>
              <p className='text-sm text-default-500'>Discordアカウント</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <Link href='/dashboard' passHref>
              <Button
                className='w-full justify-start'
                startContent={<Server2 iconStyle='Bold' size={20} />}
                variant='light'
              >
                サーバー選択
              </Button>
            </Link>
            <Button
              className='w-full justify-start'
              onClick={() => signOut({ callbackUrl: '/' })}
              startContent={<Logout2 iconStyle='Bold' size={20} />}
              color='danger'
              variant='light'
            >
              ログアウト
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

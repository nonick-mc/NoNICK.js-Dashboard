'use client';

import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { UserDropDown } from '../../user-dropdown';

export function Nav() {
  return (
    <div className='container flex h-20 items-center justify-between gap-4 bg-background sm:gap-0'>
      <div className='flex items-center gap-3'>
        <Link href='/dashboard' aria-label='nonick.js'>
          <Logo width={120} />
        </Link>
      </div>
      <div className='flex items-center gap-3'>
        {/* <ThemeToggle /> */}
        <UserDropDown />
      </div>
    </div>
  );
}

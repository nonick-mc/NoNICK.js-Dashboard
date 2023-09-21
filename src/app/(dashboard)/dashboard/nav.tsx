import React from 'react';
import Link from 'next/link';
import { marketingConfig } from '@/config/merketing';
import { buttonVariants } from '../../../components/ui/button';
import { Logo } from '../../../components/logo';
import { ThemeToggle } from '../../../components/theme-toggle';
import { UserDropDown } from './user-dropdown';
import { Badge } from '@/components/ui/badge';

export default function Nav() {
  return (
    <div className='w-full bg-background'>
      <div className='container flex h-20 items-center gap-4 sm:justify-between sm:gap-0'>
        <div className='flex items-center gap-3'>
          <Link href='/dashboard'>
            <Logo width={120} />
          </Link>
          <Badge>Beta</Badge>
        </div>
        <div className='flex gap-3'>
          <div className='flex'>
            {marketingConfig.links.map((v, index) => (
              <Link
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                key={index}
                href={v.href}
                target='_blank'
                rel='noreferrer'
              >
                {React.createElement(v.icon, { size: 19 })}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <UserDropDown />
        </div>
      </div>
    </div>
  );
}

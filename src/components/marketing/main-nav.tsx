'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { marketingConfig } from '@/config/merketing';
import { Logo } from '../logo';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { buttonVariants } from '../ui/button';
import React from 'react';

export function MainNav() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='w-full bg-background'>
      <div className='container flex h-20 items-center gap-4 sm:justify-between sm:gap-0'>
        <div className='flex items-center gap-6'>
          <Logo width={120}/>
          <div className='flex items-center gap-4'>
            {marketingConfig.mainNav.map((v, index) => (
              <Link
                key={index}
                href={v.disabled ? '#' : v.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  v.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
                  v.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {v.title}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='flex gap-1'>
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
            <ThemeToggle/>
          </div>
          <Link
            href='/dashboard'
            className={buttonVariants({ variant: 'secondary' })}
          >
            ダッシュボード
          </Link>
        </div>
      </div>
    </div>
  )
}
'use client';

import marketingConfig from '@/config/marketing';
import Logo from '@/components/logo';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSelectedLayoutSegment } from 'next/navigation';
import { createElement } from 'react';

export function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='container flex h-20 items-center gap-4 bg-background sm:justify-between sm:gap-0'>
      <div className='flex items-center gap-6'>
        <Logo width={120} />
        <div className='flex items-center gap-4'>
          {marketingConfig.nav.map((v, index) => (
            <Link
              key={index}
              href={v.disabled ? '#' : v.href}
              className={cn(
                'flex items-center text-sm font-medium text-foreground/60 transition-colors',
                {
                  'text-foreground': v.href.startsWith(`/${segment}`),
                  'cursor-not-allowed opacity-80': v.disabled,
                  'hover:text-foreground/80': !v.disabled,
                },
              )}
            >
              {v.title}
            </Link>
          ))}
        </div>
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
              {createElement(v.icon, { size: 19, 'aria-label': v.alt })}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <Link href='/dashboard' className={buttonVariants({ variant: 'secondary' })}>
          ダッシュボード
        </Link>
      </div>
    </div>
  );
}

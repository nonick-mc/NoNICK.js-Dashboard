'use client';

import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import marketingConfig from '@/config/marketing';
import { Button, cn } from '@nextui-org/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { createElement } from 'react';

export function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='container flex h-20 items-center justify-between gap-4 bg-background sm:gap-0'>
      <div className='flex items-center gap-6'>
        <Link href='/' aria-label='nonick.js'>
          <Logo width={120} />
        </Link>
        <div className='flex items-center gap-4'>
          {marketingConfig.nav.map((v, index) => (
            <Link
              key={index}
              href={v.href}
              className={cn(
                'text-sm font-medium text-default-500 transition-colors hover:text-foreground/80',
                { 'text-primary hover:text-primary': v.href.startsWith(`/${segment}`) },
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
            <Link key={index} href={v.href} target='_blank' rel='noreferrer' passHref>
              <Button variant='light' isIconOnly disableRipple>
                {createElement(v.icon, { size: 20 })}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <Link href='/' passHref>
          <Button variant='flat'>ダッシュボード</Button>
        </Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '../../../../../components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  href: string;
  badge?: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export function SidebarItem({ href, children, icon, badge }: Props) {
  const path = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ease-in-out hover:bg-zinc-500/10',
          {
            'bg-zinc-500/20': path === href,
          },
        )}
      >
        <div className='flex items-center gap-2'>
          {icon}
          {children}
        </div>
        {badge && <Badge variant='secondary'>{badge}</Badge>}
      </Link>
    </li>
  );
}

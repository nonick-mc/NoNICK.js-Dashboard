'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '../../../../../components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  href: string,
  badge?: string,
  children: React.ReactNode,
  icon: React.ReactNode
}

export function SidebarItem({ href, children, icon, badge }: Props) {
  const path = usePathname();

  return (
    <li>
      <Link href={href} className={
        cn('flex justify-between items-center w-full px-3 py-2 hover:bg-zinc-500/10 rounded-md transition ease-in-out text-sm', {
          'bg-zinc-500/20': path === href
        })
      }>
        <div className='flex gap-2 items-center'>
          {icon}
          {children}
        </div>
        {badge && <Badge variant='secondary'>{badge}</Badge>}
      </Link>
    </li>
  )
}
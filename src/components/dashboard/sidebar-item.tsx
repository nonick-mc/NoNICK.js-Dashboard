'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string,
  children: React.ReactNode,
  icon: React.ReactNode
}

export function SidebarItem({ href, children, icon }: Props) {
  const path = usePathname();
  const isActive = path == href;

  return (
    <li >
      <Link href={href} className={`
        flex items-center w-full px-3 py-2 gap-2
        hover:bg-zinc-500/10 rounded-md transition ease-in-out text-sm
        ${isActive ? 'bg-zinc-500/20' : ''}
    `}>
        {icon}
        {children}
      </Link>
    </li>
  )
}
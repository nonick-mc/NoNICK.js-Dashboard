'use client';

import dashboardConfig from '@/config/dashboard';
import Link from 'next/link';
import React from 'react';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { Chip, cn } from '@nextui-org/react';

export function SidebarNavigation() {
  const guildId = useParams().guildId;
  const segment = useSelectedLayoutSegments().find((seg) => !/^\(.*\)$/.test(seg));

  return (
    <>
      {dashboardConfig.sidebar.map(({ label, items }, index) => (
        <ul key={index} className='space-y-2'>
          {label && (
            <li>
              <p className='font-extrabold'>{label}</p>
            </li>
          )}
          {items.map(({ href, label, badge, icon }, index) => (
            <li key={index}>
              <Link
                href={`/dashboard/guild/${guildId}${href}`}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ease-in-out hover:bg-zinc-400/20',
                  { 'bg-zinc-400/20': `/${segment || ''}` === href },
                )}
              >
                <div className='flex items-center gap-2'>
                  {React.createElement(icon, { size: 15 })}
                  <span>{label}</span>
                </div>
                {badge && (
                  <Chip size='sm' classNames={{ base: 'h-auto py-0.5' }}>
                    {badge}
                  </Chip>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
}

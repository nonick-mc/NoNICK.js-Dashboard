import { Sidebar, SidebarSkeleton } from '@/app/(dashboard)/dashboard/guild/[guildId]/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { Suspense } from 'react';

export default function Page({ params: { guildId }, children }: { params: { guildId: string }, children: React.ReactNode }) {
  return (
    <div className='h-[calc(100vh_-_80px)] container flex gap-6 py-3'>
      <Suspense fallback={<SidebarSkeleton/>}>
        <Sidebar guildId={guildId}/>
      </Suspense>
      <ScrollArea className='flex-1'>
        {children}
      </ScrollArea>
    </div>
  )
}
import { DashboardNavBar } from '@/components/navbar';
import Sidebar from '@/components/dashboard/sidebar';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Layout({ children, params }: { children: React.ReactNode, params: { guildId: string } }) {
  console.log(params.guildId);

  return (
    <>
      <DashboardNavBar/>
      <div className='h-[calc(100%_-_64px)] container flex gap-6'>
        <Sidebar guildId={params.guildId}/>
        <ScrollArea className='py-6 flex-1'>
          {children}
        </ScrollArea>
      </div>
    </>
  );
}
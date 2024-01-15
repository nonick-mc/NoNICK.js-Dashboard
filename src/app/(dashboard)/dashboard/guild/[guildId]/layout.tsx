import { ScrollArea } from '@/components/ui/scroll-area';
import { ReactNode } from 'react';
import { NavBar } from './navbar';
import { Sidebar } from './sidebar';

type Props = {
  params: {
    guildId: string;
  };
  children: ReactNode;
};

export default function Layout({ params: { guildId }, children }: Props) {
  return (
    <>
      <NavBar />
      <div className='max-sm:px-0 container justify-center flex h-[calc(100dvh_-_80px)]'>
        <Sidebar />
        <ScrollArea className='flex-1 '>
          <div className='flex flex-col gap-4 max-sm:px-8 sm:px-4'>
            {children}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

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
      <div className='container flex h-[calc(100dvh_-_80px)]'>
        <Sidebar />
        <ScrollArea>
          <div className='flex flex-col gap-4 px-4'>{children}</div>
        </ScrollArea>
      </div>
    </>
  );
}

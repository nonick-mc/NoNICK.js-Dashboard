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
      <div className='container flex h-[calc(100dvh_-_80px)] pb-6'>
        <Sidebar />
        <ScrollArea className='flex-1 px-4'>{children}</ScrollArea>
      </div>
    </>
  );
}

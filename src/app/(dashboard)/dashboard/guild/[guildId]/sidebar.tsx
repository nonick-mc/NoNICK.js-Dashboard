import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarGuild } from './sidebar-guild';
import { SidebarNavigation } from './sidebar-navigation';

export function Sidebar({ guildId }: { guildId: string }) {
  return (
    <ScrollArea className='w-[280px]'>
      <div className='flex flex-col gap-6 pr-4'>
        <SidebarGuild guildId={guildId} />
        <SidebarNavigation />
      </div>
    </ScrollArea>
  );
}

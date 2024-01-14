import { ScrollArea } from '@/components/ui/scroll-area';
import { getMutualGuilds } from '../../mutualGuilds';
import { SidebarGuildSelect } from './sidebar-guild-select';
import { SidebarNavigation } from './sidebar-navigation';

export async function Sidebar() {
  const mutualGuilds = await getMutualGuilds();

  return (
    <ScrollArea className='w-[280px]'>
      <div className='flex flex-col gap-6'>
        <SidebarGuildSelect mutualGuilds={mutualGuilds} />
        <SidebarNavigation />
      </div>
    </ScrollArea>
  );
}

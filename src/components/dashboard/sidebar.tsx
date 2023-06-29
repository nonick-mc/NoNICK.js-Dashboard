import { ScrollArea } from '../ui/scroll-area';
import { Discord } from '@/utils/constants';
import { APIGuild } from 'discord-api-types/v10';
import Image from 'next/image';
import Link from 'next/link';
import { SymbolIcon } from '@radix-ui/react-icons';
import { SidebarItem } from './sidebar-item';
import { FiGrid, FiUserPlus, FiFlag, FiLink, FiFileText, FiCheckSquare, FiGlobe, FiSettings, FiEdit, FiMessageSquare, FiShield } from 'react-icons/fi';
import { Badge } from '../ui/badge';

async function fetchGuild(guildId: string) {
  const res = await fetch(`${Discord.API}/guilds/${guildId}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 30 }
  })

  return await res.json<APIGuild>();
}

export default async function Sidebar({ guildId }: { guildId: string }) {
  const guild = await fetchGuild(guildId);
  const basePath = `/dashboard/${guildId}`;

  return (
    <ScrollArea className='w-[250px] py-6'>
      <div className='space-y-6'>
        <div className='flex gap-3 items-center'>
          <Image
            className='rounded-xl bg-zinc-500/20'
            src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : '/discord.png'}
            width={50}
            height={50}
            alt={`${guild.name}'s icon`}
          />
          <div className='flex-col'>
            <h2 className='font-extrabold text-md'>{guild.name}</h2>
            <Link className='flex items-center text-blue-500 gap-2 text-sm' href='/dashboard'>
              <SymbolIcon width={12} height={12}/>
              <p>サーバー変更</p>
            </Link>
          </div>
        </div>

        <div className='space-y-6'>
          <ul className='space-y-2'>
            <SidebarItem icon={<FiGrid/>} href={basePath}>ホーム</SidebarItem>
            <SidebarItem icon={<FiSettings />} href={basePath + '/setting'}>設定</SidebarItem>
          </ul>
          <ul className='space-y-2'>
            <li><h4 className='font-extrabold'>機能</h4></li>
            <SidebarItem icon={<FiUserPlus/>} href={basePath + '/join-and-leave-message'}>入退室メッセージ</SidebarItem>
            <SidebarItem icon={<FiFlag/>} href={basePath + '/report-in-server'}>サーバー内通報</SidebarItem>
            <SidebarItem icon={<FiLink/>} href={basePath + '/message-expansion'}>メッセージURL展開</SidebarItem>
            <SidebarItem icon={<FiFileText/>} href={basePath + '/log'}>イベントログ</SidebarItem>
            <SidebarItem icon={<FiCheckSquare/>} href={basePath + '/auto-change-verification-level'}>自動認証レベル変更</SidebarItem>
            <SidebarItem icon={<FiGlobe/>} href={basePath + '/auto-change-public-announce'}>自動アナウンス公開</SidebarItem>
            {/* <SidebarItem icon={<FiMessageSquare/>} href={basePath + '/auto-create-thread'}>
              <div className='w-full flex justify-between'>
                <p>自動スレッド作成</p>
                <Badge variant='default'>New</Badge>
              </div>
            </SidebarItem> */}
            <SidebarItem icon={<FiShield/>} href={basePath + '/automod-plus'}>AutoMod Plus</SidebarItem>
          </ul>
          <ul className='space-y-2'>
            <li><h4 className='font-extrabold'>ツール</h4></li>
            <SidebarItem icon={<FiEdit />} href={basePath + '/embed'}>
              <div className='w-full flex justify-between'>
                <p>埋め込み作成</p>
                <Badge variant='secondary'>Beta</Badge>
              </div>
            </SidebarItem>
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
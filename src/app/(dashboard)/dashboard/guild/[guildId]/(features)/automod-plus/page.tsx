import { getServerSetting } from '@/lib/mongoose';
import { Header, Shell } from '../../formats';
import { SettingForm } from './form';
import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoMod Plus',
}

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  // const channels = await getChannels(guildId);
  // const setting = await getServerSetting(guildId, 'autoMod');

  return (
    <Shell>
      <Header title='AutoMod Plus' description='特定のフィルターに検知されたメッセージをブロックします。'/>
      {/* <SettingForm
        channels={channels}
        setting={setting}
      /> */}
    </Shell>
  )
}
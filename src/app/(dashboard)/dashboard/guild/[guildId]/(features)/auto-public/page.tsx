import { getServerSetting } from '@/lib/mongoose';
import { Header, Shell } from '../../formats';
import { SettingForm } from './form';
import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '自動アナウンス公開',
}

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  // const channels = await getChannels(guildId);
  // const setting = await getServerSetting(guildId, 'autoPublic');

  return (
    <Shell>
      <Header title='自動アナウンス公開' description='アナウンスチャンネルに投稿されたメッセージを自動で公開します。'/>
      {/* <SettingForm
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      /> */}
    </Shell>
  );
}
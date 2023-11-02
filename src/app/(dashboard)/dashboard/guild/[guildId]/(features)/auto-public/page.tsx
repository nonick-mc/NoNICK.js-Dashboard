import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Metadata } from 'next';
import { Header } from '../../_components/header';
import SettingForm from './form';

export const metadata: Metadata = {
  title: '自動アナウンス公開',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const setting = await getServerSetting(guildId, 'autoPublic');
  const channels = await getChannels(guildId);

  return (
    <>
      <Header
        title='自動アナウンス公開'
        description='アナウンスチャンネルに投稿されたメッセージを自動で公開します'
      />
      <SettingForm
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}

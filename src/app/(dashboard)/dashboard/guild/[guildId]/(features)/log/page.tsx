import { getChannels } from '@/lib/discord';
import { Header } from '../../_components/header';
import { getServerSetting } from '@/lib/mongoose/middleware';
import SettingForm from './form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'イベントログ',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'log');

  return (
    <>
      <Header title='イベントログ' description='サーバー内での特定アクションのログを送信します。' />
      <SettingForm
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}

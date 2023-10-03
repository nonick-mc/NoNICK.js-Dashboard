import { getServerSetting } from '@/lib/middleware';
import { Header, Shell } from '../../formats';
import { getChannels } from '@/lib/discord';
import { SettingForm } from './form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'イベントログ',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'log');

  return (
    <Shell>
      <Header title='イベントログ' description='サーバー内で起こったイベントのログを送信します。' />
      <SettingForm
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </Shell>
  );
}

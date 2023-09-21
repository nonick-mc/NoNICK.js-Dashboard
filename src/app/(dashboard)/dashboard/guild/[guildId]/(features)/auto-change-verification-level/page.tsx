import { getServerSetting } from '@/lib/mongoose';
import { Header, Shell } from '../../formats';
import { SettingForm } from './form';
import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '自動認証レベル変更',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'changeVerificationLevel');

  return (
    <Shell>
      <Header
        title='自動認証レベル変更'
        description='サーバーの認証レベルを特定の時間帯だけ自動で変更します。'
      />
      <SettingForm
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </Shell>
  );
}

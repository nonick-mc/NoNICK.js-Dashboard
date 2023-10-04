import { getChannels, getRoles } from '@/lib/discord';
import { Header, Shell } from '../../formats';
import { SettingForm } from './form';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サーバー内通報',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const setting = await getServerSetting(guildId, 'report');
  const channels = await getChannels(guildId);
  const roles = await getRoles(guildId);

  return (
    <Shell>
      <Header
        title='サーバー内通報'
        description='不適切なメッセージ・ユーザーをメンバーが通報できるようにします。'
      />
      <SettingForm
        channels={channels}
        roles={roles}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </Shell>
  );
}

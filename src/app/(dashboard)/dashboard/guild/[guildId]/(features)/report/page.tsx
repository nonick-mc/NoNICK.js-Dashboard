import { getChannels, getRoles } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Metadata } from 'next';
import { Header } from '../../components/header';
import SettingForm from './form';

export const metadata: Metadata = {
  title: 'サーバー内通報',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const setting = await getServerSetting(guildId, 'report');
  const channels = await getChannels(guildId);
  const roles = await getRoles(guildId);

  return (
    <>
      <Header
        title='サーバー内通報'
        description='不適切なメッセージ・ユーザーをメンバーが通報できるようにします。'
      />
      <SettingForm
        channels={channels}
        roles={roles}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}

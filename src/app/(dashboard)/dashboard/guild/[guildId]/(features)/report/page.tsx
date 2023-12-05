import { Metadata } from 'next';
import { Header } from '../../header';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { getChannels, getRoles } from '@/lib/discord';
import { Form } from './form';

export const metadata: Metadata = {
  title: 'サーバー内通報',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const setting = await getServerSetting(guildId, 'report');
  const channels = await getChannels(guildId);
  const roles = await getRoles(guildId);

  return (
    <>
      <Header
        title='サーバー内通報'
        description='不適切なメッセージ・ユーザーをメンバーが通報できるようにします。'
      />
      <Form
        channels={channels}
        roles={roles}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}

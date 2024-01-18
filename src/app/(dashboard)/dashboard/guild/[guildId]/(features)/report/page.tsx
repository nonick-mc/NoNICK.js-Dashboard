import { ModerateSetting } from '@/database/models';
import { getChannels, getRoles } from '@/lib/discord';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '../../header';
import LoadingPage from '../../loading';

const Form = dynamic(() => import('./form'), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: 'サーバー内通報',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const setting = await ModerateSetting.findOne({ serverId: guildId });
  const channels = await getChannels(guildId);
  const roles = await getRoles(guildId);

  return (
    <>
      <Header
        title='サーバー内通報'
        description='不適切なメッセージやユーザーをメンバーが通報できるようにします。'
      />
      <Form
        channels={channels}
        roles={roles}
        setting={
          setting?.report
            ? JSON.parse(JSON.stringify(setting.report))
            : undefined
        }
      />
    </>
  );
}

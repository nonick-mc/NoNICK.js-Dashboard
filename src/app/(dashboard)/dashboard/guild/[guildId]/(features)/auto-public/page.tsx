import { AutomationSetting } from '@/database/models';
import { getChannels } from '@/lib/discord';
import { convertPlainObject } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Header } from '../../header';
import LoadingPage from '../../loading';

const Form = dynamic(() => import('./form'), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await AutomationSetting.findOne({ serverId: guildId });

  return (
    <>
      <Header
        title='自動アナウンス公開'
        description='アナウンスチャンネルに投稿されたメッセージを自動で公開します。'
      />
      <Form
        channels={channels}
        setting={convertPlainObject(setting?.publishAnnounce)}
      />
    </>
  );
}

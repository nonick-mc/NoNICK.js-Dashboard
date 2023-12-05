import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';
import { Header } from '../../header';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Form } from './form';

export const metadata: Metadata = {
  title: '設定',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);

  return (
    <>
      <Header
        title='設定'
        description='このサーバーでのNoNICK.jsの全般設定を変更します。'
      />
      <Alert variant='primary'>
        <AlertTitle>💡 この設定はv5.0から行えるようになります。</AlertTitle>
      </Alert>
      <Form channels={channels} />
    </>
  );
}

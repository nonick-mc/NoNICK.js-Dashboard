import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';
import { Header } from '../../_components/header';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import SettingForm from './form';

export const metadata: Metadata = {
  title: '設定',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);

  return (
    <>
      <Header title='設定' description='NoNICK.jsの全般設定を変更することができます。' />
      <Alert className='items-center' variant='primary'>
        <InfoIcon size={18} />
        <AlertTitle>この設定はv5.0から行えるようになります。</AlertTitle>
      </Alert>
      <SettingForm channels={channels} />
    </>
  );
}

import Link from 'next/link';
import marketingConfig from '@/config/marketing';
import { Promo } from './promo';
import { Discord } from '@/lib/constants';
import { Button } from '@nextui-org/react';

export default function Page() {
  return (
    <>
      <section className='container flex max-w-[64rem] flex-col justify-center gap-6 py-32 text-center'>
        {marketingConfig.promo && (
          <Promo label={marketingConfig.promo.label} href={marketingConfig.promo.href} />
        )}
        <h1 className='text-6xl font-black'>
          Discordサーバーを<span className='inline-block'>簡単・効率的に管理しよう。</span>
        </h1>
        <h2 className='text-muted-foreground text-lg'>
          NoNICK.jsは、Discordサーバーの管理をサポートする多機能BOTです。
          <span className='inline-block'>現在、300を超えるサーバーでBOTが活用されています。</span>
        </h2>
        <div className='flex justify-center gap-2'>
          <Link
            href={`${Discord.Endpoints.API}/oauth2/authorize?${new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_DISCORD_ID,
              scope: 'bot',
              permissions: `${process.env.NEXT_PUBLIC_DISCORD_PERMISSION}`,
            }).toString()}`}
            target='_blank'
            rel='noreferrer'
            passHref
          >
            <Button size='lg' color='primary'>
              サーバーに導入する
            </Button>
          </Link>
          <Link href='/dashboard' passHref>
            <Button size='lg' variant='flat'>
              ダッシュボード
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

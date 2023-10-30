import Link from 'next/link';
import marketingConfig from '@/config/marketing';
import { Promo } from './promo';
import { buttonVariants } from '@/components/ui/button';
import { Discord } from '@/lib/constants';

export default function Page() {
  return (
    <div className='overflow-visible'>
      <div className='absolute inset-0 z-[-1]'>
        <div className='relative mx-auto w-[800px] opacity-20 animate-in fade-in duration-1000'>
          <div className='absolute left-[200px] top-[80px] h-[550px] w-[550px] rounded-full bg-gradient-radial from-purple-600 to-70%' />
          <div className='absolute left-0 top-[200px] h-[550px] w-[550px] rounded-full bg-gradient-radial from-blue-600 to-70%' />
        </div>
      </div>
      <section className='container flex max-w-[64rem] flex-col justify-center gap-6 py-32 text-center'>
        {marketingConfig.promo && (
          <Promo label={marketingConfig.promo.label} href={marketingConfig.promo.href} />
        )}
        <h1 className='text-6xl font-black'>
          Discordサーバーを<span className='inline-block'>簡単・効率的に管理しよう。</span>
        </h1>
        <h2 className='text-lg text-muted-foreground'>
          NoNICK.jsは、Discordサーバーの管理をサポートする多機能BOTです。
          <span className='inline-block'>現在、300を超えるサーバーでBOTが活用されています。</span>
        </h2>
        <div className='flex justify-center gap-2'>
          <Link
            href={`${Discord.Endpoints.API}/oauth2/authorize?${new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_DISCORD_TOKEN,
              scope: 'bot',
              permissions: `${process.env.NEXT_PUBLIC_DISCORD_PERMISSION}`,
            }).toString()}`}
            target='_blank'
            rel='noreferrer'
            className={buttonVariants({ size: 'lg' })}
          >
            サーバーに導入する
          </Link>
          <Link href='/dashboard' className={buttonVariants({ size: 'lg', variant: 'outline' })}>
            ダッシュボード
          </Link>
        </div>
      </section>
    </div>
  );
}

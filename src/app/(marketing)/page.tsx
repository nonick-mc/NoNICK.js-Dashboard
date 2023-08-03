import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { marketingConfig } from '@/config/merketing'
import { Alert } from '@/components/marketing/alert'
import { AppealPoint } from '@/components/marketing/appeal-point'
import { ReviewCard } from '@/components/marketing/review-card'
import { FeatureCard } from '@/components/marketing/feature-card'
import { File, Flag, Link2, Shield, Terminal, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className='container'>
      <section className='py-32 container max-w-[64rem] flex flex-col gap-6 justify-center text-center'>
        { marketingConfig.alert.visible && (
          <Alert
            label={marketingConfig.alert.label}
            href={marketingConfig.alert.href}
          />
        ) }
        <h1 className='text-6xl font-black'>Discordサーバーを<span className='inline-block'>簡単・効率的に管理しよう。</span></h1>
        <h2 className='text-xl text-muted-foreground'>
          NoNICK.jsは、Discordサーバーの管理をサポートする多機能BOTです。
          <span className='inline-block'>現在、300を超えるサーバーでBOTが活用されています。</span>
        </h2>
        <div className='flex gap-2 justify-center'>
          <Link
            href={marketingConfig.invite}
            className={buttonVariants({ size: 'lg' })}
          >
            サーバーに導入する
          </Link>
          <Link
            href='/dashboard'
            className={buttonVariants({ size: 'lg', variant: 'outline' })}
          >
            ダッシュボード
          </Link>
        </div>
      </section>
      <section className='py-24 container grid grid-cols-2 gap-6'>
        <div className='col-span-2 flex flex-col gap-3'>
          <h1 className='text-4xl font-black'>
            ユーザーに寄り添ったDiscordBOT。
          </h1>
          <h2 className='text-xl text-muted-foreground'>
            NoNICK.jsは「ユーザーに最大限寄り添う」をコンセプトに
            <span className='block'>開発されており、誰でもBOTを活用できることを目指しています。</span>
          </h2>
        </div>
        <div className='grid gap-6'>
          <div className='grid py-6 gap-10'>
            <AppealPoint>
              <span className='font-bold text-foreground'>利用料金ゼロ。</span>
              サーバー管理に料金を支払う必要はもうありません。全ての機能を無料で使用することができ、NoNICK.jsを最大限活用することができます。
            </AppealPoint>
            <AppealPoint>
              <span className='font-bold text-foreground'>利用者の声を重視。</span>
              ユーザーのフィードバックに積極的に耳を傾け、定期的に改善を行っています。サポートサーバーに参加すれば、追加して欲しい機能を開発者にリクエストすることも可能です。
            </AppealPoint>
            <AppealPoint>
              <span className='font-bold text-foreground'>充実したサポート。</span>
              BOTの使い方を網羅した公式ドキュメントはもちろん、サポートサーバーに参加すれば、わからないところを開発者に直接質問することができます。
            </AppealPoint>
          </div>
        </div>
        <div className='grid gap-6 my-auto'>
          <ReviewCard avatar='/avatar/kanahiro.png' name='かなひろ' id='kanahiro'>
            ここぞという機能を取り揃えていて大変ありがたいです。特に認証機能や自動アナウンス機能は大変助かっています。
          </ReviewCard>
          <ReviewCard avatar='/avatar/issyoniasobo.png' name='issyoniasobo336' id='issyoni_0801'>
            使いにくいところやバグを報告すると、すぐに修正パッチが入るのが良いです。開発者がすぐに返答してくれるところも◎。
          </ReviewCard>
          <ReviewCard avatar='/avatar/dokuhuyu.png' name='独冬' id='dokufuyu0918'>
            かなり使いやすく、初心者でも扱いやすいと思いました。サーバー内通報などの機能が便利で、処罰などの対応の効率化が図れそうです。
          </ReviewCard>
        </div>
      </section>
      <section className='py-24 grid gap-3'>
        <h1 className='text-center text-4xl font-black'>さまざまな機能をこれ一つで。</h1>
        <h2 className='text-center text-muted-foreground text-xl'>NoNICK.jsは、サーバー管理をサポートする便利な機能を幅広く搭載しています。</h2>
        <div className='mx-auto max-w-screen-lg py-10 grid grid-cols-3 grid-rows-2 gap-6'>
          <FeatureCard icon={Users} title='入退室メッセージ'>
            サーバーにユーザーが参加したり、脱退した時にメッセージを送信することができます。
          </FeatureCard>
          <FeatureCard icon={Flag} title='サーバー内通報'>
            不適切なメッセージやメンバーを、右クリックメニューからモデレーターに通報できるようにします。
          </FeatureCard>
          <FeatureCard icon={File} title='イベントログ'>
            タイムアウトやKick、メッセージ削除など、サーバー内でのあらゆるイベントをログとして記録します。
          </FeatureCard>
          <FeatureCard icon={Link2} title='メッセージURL展開'>
            DiscordのメッセージURLが送信されたとき、そのメッセージの内容を送信するようにします。
          </FeatureCard>
          <FeatureCard icon={Terminal} title='豊富なコマンド'>
            最大28日まで指定できるタイムアウトコマンドや、1秒単位で指定できる低速コマンドなど、便利なコマンドを搭載。
          </FeatureCard>
          <FeatureCard icon={Shield} title='AutoMod Plus'>
            Discord標準のAutoModでは設定が難しいワードフィルターを、簡単に有効にすることができます。
          </FeatureCard>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'col-span-3 p-5')}
            href='https://docs.nonick-js.com'
            target='_blank'
            rel='noreferrer'
          >すべての機能を見る</Link>
        </div>
      </section>
    </div>
  )
}
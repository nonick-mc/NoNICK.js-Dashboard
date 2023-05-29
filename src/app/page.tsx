'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Button, Collapse, Spacer, useTheme } from '@nextui-org/react'
import { HomeAppBar } from './appbar';
import FeatureCard from './card';
import Image from 'next/image';
import {
  BsDoorClosed,
  BsMegaphone,
  BsFileEarmarkText,
  BsMagic,
  BsLink45Deg,
  BsSlashSquare,
  BsFillPersonCheckFill,
  BsBoxArrowUpRight,
  BsShieldCheck,
  BsBook,
  BsChatLeftDots,
  BsRocketTakeoff
} from 'react-icons/bs';
import Footer from './footer';

interface FeatureCardElements {
  title: string,
  description: string,
  icon: ReactNode,
  isNew?: boolean,
}

const firstFeatureCards: FeatureCardElements[] = [
  {
    title: '入退室メッセージ',
    description: 'サーバーに新しいメンバーが入ってきたり、サーバーから抜けた時にメッセージを送信することができます。',
    icon: <BsDoorClosed size={25} className='fill-blue-500' />,
  },
  {
    title: 'サーバー内通報',
    description: '不適切なメッセージやメンバーをサーバー内で通報できるようにし、モデレーターが迅速な対応を行いやすくできます。',
    icon: <BsMegaphone size={25} className='fill-blue-500' />,
  },
  {
    title: 'イベントログ',
    description: 'タイムアウトやBAN、メッセージ削除やVC入退室など、サーバー内の様々なアクションのログを送信できます。',
    icon: <BsFileEarmarkText size={25} className='fill-blue-500' />,
  },
  {
    title: '埋め込み作成',
    description: '埋め込みを作成・送信することはもちろん、埋め込みにURLボタンやロール付与ボタンなどを追加することができます。',
    icon: <BsMagic size={25} className='fill-blue-500' />,
  }
];

const secondFeatureCards: FeatureCardElements[] = [
  {
    title: 'メッセージURL展開',
    description: 'DiscordのメッセージURLが送信された時、そのメッセージの内容（メッセージや画像）を送信することができます。',
    icon: <BsLink45Deg size={25} className='fill-blue-500' />,
  },
  {
    title: '自動認証レベル変更',
    description: 'Discordサーバーの認証レベルを、指定した時間の間だけ変更し、サーバーのセキュリティを高めることができます。',
    icon: <BsFillPersonCheckFill size={25} className='fill-blue-500' />,
  },
  {
    title: '豊富なコマンド',
    description: '最大28日まで指定できるタイムアウトコマンドや、1秒単位で指定できる低速モードコマンドなど、便利なコマンドを搭載。',
    icon: <BsSlashSquare size={25} className='fill-blue-500' />,
  },
  {
    title: 'AutoMod Plus',
    description: 'Discord標準のAutoModでは設定が困難、もしくは手間のかかるワードフィルターを簡単に有効にすることができます。',
    icon: <BsShieldCheck size={25} className='fill-blue-500' />,
    isNew: true,
  }
];

export default function Page() {
  const { isDark } = useTheme()
  const sectionSpace = 7;
  
  return (
    <>
      <HomeAppBar/>
      <div className='max-w-[1600px] mx-auto px-5 py-5'>

        <Spacer y={2} />

        <h1 className='text-center text-5xl lg:text-7xl font-black'>
          <span className='inline-block text-4xl md:text-6xl lg:text-7xl'>
            あなたのサーバーを
          </span>
          <br/>
          <span className='inline-block bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text' >
            簡単・効率的
          </span>
          <span className='inline-block'>
            に
          </span>
          <span className='inline-block'>
            管理しよう。
          </span>
        </h1>
        <p className='text-center py-4 text-lg lg:text-2xl text-gray-500'>
          <span className='inline-block'>
            Discordサーバーの管理をサポートする
          </span>
          <span className='inline-block'>
            多機能BOT
          </span>
        </p>

        <div className='flex gap-3 justify-center items-center'>
          <Link href={`${process.env.NEXT_PUBLIC_BOT_INVITE_URL}`} passHref>
            <Button auto size='xl'>
              導入する
            </Button>
          </Link>

          <Link href='https://discord.gg/fVcjCNn733' passHref>
            <Button auto size='xl' flat>
              サポートサーバー
            </Button>
          </Link>
        </div>

        <Spacer y={3} />

        <Image
          className='mx-auto rounded-lg shadow-2xl'
          src={isDark ? '/mockup_dark.png' : '/mockup_light.png'}
          width={1024}
          height={576}
          alt='nonick.js mockup'
        />

        <Spacer y={sectionSpace}/>

        <div className='flex justify-center'>
          <Image
            className={`${isDark ? 'invisible sm:visible' : 'invisible'} absolute md:mt-[-220px] opacity-40 pointer-events-none`}
            src='/blur/blue.svg'
            width={1100}
            height={1100}
            alt='background blur'
          />
        </div>

        <div className='text-center'>
          <h1 className='text-6xl lg:text-7xl font-black'>
            <span className='inline-block'>
              様々な機能を
            </span>
            <span className='inline-block bg-gradient-to-r from-sky-500 to-indigo-600 text-transparent bg-clip-text'>
              これ1つで。
            </span>
          </h1>
          <Spacer y={1}/>
          <p className='text-lg lg:text-2xl text-gray-500'>
            <span className='inline-block'>
              NoNICK.jsは、サーバー管理をサポートする
            </span>
            <span className='inline-block'>
              機能を多数搭載しています。
            </span>
            <span className='inline-block'>
              BOTを探すために時間を費やす必要はもうありません。
            </span>
          </p>
        </div>

        <Spacer y={2}/>

        <div className='flex flex-col gap-5'>
          <div className='grid items-stretch gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {firstFeatureCards.map(({ title, description, icon, isNew }, index) => (
              <FeatureCard
                key={index}
                title={title}
                description={description}
                icon={icon}
                isNew={!!isNew}
              />
            ))}
          </div>
          <div className='hidden md:grid items-stretch gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {secondFeatureCards.map(({ title, description, icon, isNew }, index) => (
              <FeatureCard
                key={index}
                title={title}
                description={description}
                icon={icon}
                isNew={!!isNew}
              />
            ))}
          </div>
        </div>

        <div className='flex justify-center my-5'>
          <Link href='https://docs.nonick-js.com/nonick-js/what-is-nonick-js/' target='_blank' rel='noopener noreferrer' passHref>
            <Button iconRight={<BsBoxArrowUpRight />} ghost auto size='xl'>全ての機能を見る</Button>
          </Link>
        </div>

        <Spacer y={sectionSpace}/>

        {/* <div className='flex justify-center'>
          <Image
            className={`${isDark ? 'invisible sm:visible' : 'invisible'} absolute md:mt-[-220px] opacity-30 pointer-events-none`}
            src='/blur/orange.svg'
            width={900}
            height={900}
            alt='background blur'
          />
        </div> */}

        <div className='text-center'>
          <h1 className='text-6xl lg:text-7xl font-black'>
            <span className='inline-block'>
              パワフルだけど
            </span>
            <span className='inline-block bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text'>
              使いやすい。
            </span>
          </h1>

          <Spacer y={1} />

          <p className='text-lg lg:text-2xl text-gray-500'>
            <span className='inline-block'>
              NoNICK.jsは、BOTを使ったことがない人でも
            </span>
            <span className='inline-block'>
              簡単に使えるよう、様々な工夫を行っています。
            </span>
          </p>
        </div>

        <Spacer className='block sm:hidden' y={2} />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px] mx-auto items-center'>
          <Collapse.Group splitted>
            <Collapse
              title='わかりやすいテキスト・UI'
              contentLeft={
                <div className='flex w-12 h-12 rounded-full bg-blue-500/25 justify-center items-center'>
                  <BsRocketTakeoff size={25} className='fill-blue-500' />
                </div>
              }
            >
              <p className='text-lg text-gray-500'>
                難解な表現を避け、ボタンやセレクトメニュー、モーダルなどを積極的に活用するなど、「見やすくわかりやすい」を重視して開発されています。
              </p>
            </Collapse>
            <Collapse
              title='公式ドキュメント'
              contentLeft={
                <div className='flex w-12 h-12 rounded-full bg-blue-500/25 justify-center items-center'>
                  <BsBook size={25} className='fill-blue-500' />
                </div>
              }
            >
              <p className='text-lg text-gray-500'>
                導入方法から設定方法、各機能の使い方まで、NoNICK.jsのほぼ全てをまとめた
                <Link href='https://docs.nonick-js.com/' target='_blank' rel='noopener noreferrer'>公式ドキュメント</Link>
                を用意しています。ひと通り読むだけで、BOTをすぐに使えるようになります。
              </p>
            </Collapse>
            <Collapse
              title='サポートサーバー'
              contentLeft={
                <div className='flex w-12 h-12 rounded-full bg-blue-500/25 justify-center items-center'>
                  <BsChatLeftDots size={25} className='fill-blue-500' />
                </div>
              }
            >
              <p className='text-lg text-gray-500'>
                使い方ガイドを見てもわからないことがあった時には、
                <Link href='https://discord.gg/fVcjCNn733' target='_blank' rel='noopener noreferrer'>サポートサーバー</Link>
                に参加して専用チャンネルで質問をすることができます！送った質問は開発者が丁寧に回答いたします。
              </p>
            </Collapse>
          </Collapse.Group>

          <Image
            className='hidden md:block m-[-50px] mx-auto'
            src='/userInterface_flatline.svg'
            width={500}
            height={500}
            alt='user interface image'
          />
        </div>

        {/* <Spacer y={sectionSpace}/> */}

        {/* <h1 className='text-6xl font-black'>
          <span className='inline-block'>
            ニーズに合わせて
          </span>
          <span className='inline-block'>
            カスタマイズ。
          </span>
        </h1> */}
      </div>
      <Footer />
    </>
  )
}

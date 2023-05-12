'use client';

import GuildCards from './GuildCards';
import Loading from './loading';
import { Suspense } from 'react';

export default function GuildSelect() {
  return (
    <div className='px-10 flex-row gap-3'>
      <div className='text-center font-notoSansJp'>
        <h1 className='font-black'>サーバーを選択</h1>
        <p className='w-fit mx-auto px-5 py-4 bg-gray-900 rounded-lg'>
          自分のサーバーが表示されませんか？
          再読み込みを行うか、サーバーに
            <a
              className='no-underline text-blue-500 hover:text-blue-600'
              target='_blank'
              href={process.env.NEXT_PUBLIC_BOT_INVITE_URL}
              rel="noopener noreferrer"
            >NoNICK.jsを追加</a>
          しましょう。
        </p>
      </div>

      <Loading/>
      <Loading/>
      <Loading/>
      <Loading/>

      <Suspense fallback={<Loading/>}>
        {/* @ts-expect-error Server Component */}
        <GuildCards/>
      </Suspense>
    </div>
  )
}
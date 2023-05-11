'use client';

import { HomeAppBar } from '@/app/Appbar';
import { Alert, Stack } from '@mui/material';
import GuildCards from './GuildCards';

export default function GuildSelect() {
  return (
    <div>
      <HomeAppBar />
      <div className='px-10'>
        <div className='text-center font-notoSansJp'>
          <h1 className='font-black'>サーバーを選択</h1>
          <Alert
            className='mx-auto w-2/3'
            severity='info'
            variant='outlined'
          >
            自分のサーバーが表示されませんか？
            再読み込みを行うか、サーバーに
              <a
                className='no-underline text-blue-500 hover:text-blue-600'
                target='_blank'
                href={process.env.NEXT_PUBLIC_BOT_INVITE_URL}
                rel="noopener noreferrer"
              >NoNICK.jsを追加</a>
            しましょう。
          </Alert>
        </div>
        {/* @ts-expect-error Server Component */}
        <GuildCards />
      </div>
    </div>
  )
}
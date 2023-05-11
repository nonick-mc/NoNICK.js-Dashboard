'use client';

import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { HomeAppBar } from './Appbar';

export default function Page() {
  return (
    <>
      <HomeAppBar/>
      <div className='px-7'>
        <h1 className='font-mplus1p font-black'>Product Page</h1>
        <Stack direction='row' spacing={2}>
          <Link href='/menu' passHref>
            <Button variant='contained'>
              サーバー選択
            </Button>
          </Link>
          <Link href='/dashboard/1017' passHref>
            <Button variant='contained'>
              ダッシュボード
            </Button>
          </Link>
        </Stack>
      </div>
    </>
  )
}
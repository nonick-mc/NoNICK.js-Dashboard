'use client';

import { Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='px-16'>
      <h1 className='font-mplus1p font-black'>Product Page</h1>
      <Stack direction='row' spacing={2}>
        <Link href='/dashboard' passHref>
          <Button variant='contained'>
            サーバー選択
          </Button>
        </Link>
        <Link href='/dashboard/guild/1017' passHref>
          <Button variant='contained'>
            ダッシュボード
          </Button>
        </Link>
      </Stack>
    </div>
  )
}
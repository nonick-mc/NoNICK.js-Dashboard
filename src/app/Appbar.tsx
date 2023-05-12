'use client';

import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export function HomeAppBar() {
  const { data: session } = useSession();

  return (
    <AppBar position="sticky" color='inherit' elevation={0}>
      <Toolbar className='px-16 py-5'>
        <Avatar className='pointer-events-none' sx={{ width: 56, height: 56 }} src='/nonickjs.png'/>
        <Typography
          className='pl-3 font-mplus1p font-extrabold
                     select-none text-inherit no-underline'
          variant="h5"
          noWrap
          component="a"
          href='/'
          sx={{ flexGrow: 1 }}
        >
          NoNICK.js
        </Typography>

        <Button variant='outlined' startIcon={<AccountCircleRoundedIcon />} onClick={() => signIn('discord')}>
          ログイン
        </Button>
      </Toolbar>
    </AppBar>
  )
}
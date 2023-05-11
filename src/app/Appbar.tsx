'use client';

import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BsDiscord } from 'react-icons/bs'

export function HomeAppBar() {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent' elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NoNICK.js
          </Typography>

          {
            !session
              ? <Button variant='contained' startIcon={<BsDiscord/>} onClick={() => signIn('discord')}>ログイン</Button>
              : <Avatar src={session?.user?.image || undefined}/>
          }

        </Toolbar>
      </AppBar>
    </Box>
  )
}
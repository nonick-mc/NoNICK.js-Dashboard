import React from 'react';
import { AppBar, Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export function HomeAppBar() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="sticky" color='inherit' elevation={0}>
      <Toolbar className='px-16 py-5'>
        <Avatar className='pointer-events-none' sx={{ width: 56, height: 56 }} src='/nonickjs.png'/>
        <Typography
          className='pl-3 font-mplus1p font-extrabold'
          variant="h5"
          sx={{ flexGrow: 1 }}
        >
          NoNICK.js
        </Typography>

        {status === 'unauthenticated' && (
          <Button variant='outlined' startIcon={<AccountCircleRoundedIcon />} onClick={() => signIn('discord')}>
            ログイン
          </Button>
        )}

        {status === 'authenticated' && (
          <PopupState variant='popover' popupId='account-popup-menu'>
            {(popupState) => (
              <React.Fragment>
                <Tooltip title={`${session.user.username}#${session.user.discriminator}でログイン中`}>
                  <IconButton {...bindTrigger(popupState)}>
                    <Avatar src={session.user.image_url}/>
                  </IconButton>
                </Tooltip>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon><LogoutRoundedIcon className='fill-red-500'/></ListItemIcon>
                    <span className='text-red-500'>ログアウト</span>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        )}
      </Toolbar>
    </AppBar>
  )
}
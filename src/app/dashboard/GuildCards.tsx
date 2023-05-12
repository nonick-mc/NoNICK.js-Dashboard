import { Grid } from '@mui/material';
import { getServerSession } from 'next-auth/next';
import { authOption } from '../api/auth/[...nextauth]/route';

export default async function GuildCards() {
  // https://github.com/nextauthjs/next-auth/issues/7523
  const session = await getServerSession(authOption).catch(() => {});

  return (
    <Grid className='py-8' container spacing={3} alignItems='center' justifyContent='center'>
      <Grid item>Guild Cards</Grid>
    </Grid>
  )
}
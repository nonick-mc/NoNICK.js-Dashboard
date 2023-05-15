import { PartialGuild } from '@/types';
import { Grid } from '@mui/material';

export default function GuildCards({ guilds }: { guilds: PartialGuild[] }) {
  return (
    <Grid className='py-8' container spacing={3} alignItems='center' justifyContent='center'>
      {guilds.map(({ name }, index) => (
        <Grid key={index}>
          { name }
        </Grid>
      ))}
    </Grid>
  )
}
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Grid className='py-8' container spacing={3} alignItems='center' justifyContent='center'>
      <LoadingSkeltonItem/>
      <LoadingSkeltonItem/>
      <LoadingSkeltonItem/>
    </Grid>
  )
}

function LoadingSkeltonItem() {
  return (
    <Grid item>
      <Card>
        <Skeleton animation='wave' variant='rectangular' width={256} height={144} />
        <CardContent>
          <Typography variant='h4'>
            <Skeleton animation="wave" style={{ marginBottom: 6 }} />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
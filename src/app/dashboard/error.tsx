'use client';

import { Fade } from '@mui/material';
import { useEffect } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error])

  return (
    <div className='flex-row gap-3 items-center justify-center'>
      <CancelRoundedIcon className='bg-gray-600'/>
      <p className='bg-gray-600'>Error</p>
    </div>
  )
}
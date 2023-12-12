import { Spinner } from '@nextui-org/react';
import { ToolbarSkeleton } from './toolbar-skeleton';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <ToolbarSkeleton />
      <div className='flex justify-center'>
        <Spinner label='読み込み中...' color='primary' size='md' />
      </div>
    </div>
  );
}

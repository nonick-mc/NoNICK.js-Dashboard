import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <Skeleton className='rounded-xl w-[400px] h-[50px]'></Skeleton>
        <Skeleton className='rounded-xl w-[300px] h-[30px]'></Skeleton>
      </div>
    </div>
  )
}
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className='container space-y-8'>
      <div className='flex items-end justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-4xl font-black'>サーバー選択</h1>
          <p className='text-muted-foreground'>BOTの設定を行うサーバーを選択して下さい。</p>
        </div>
        <div className='flex gap-3'>
          <Input
            disabled={true}
            placeholder='名前またはIDで検索'
            className='w-[300px]'
          />
          <Button
            disabled={true}
            className='gap-2 items-center'
          >
            <PlusIcon size={16}/>
            <span>BOTを導入</span>
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-10 gap-6'>
        {Array(5).fill(0).map((v, index) => (
          <Card key={index} className='overflow-hidden col-span-2'>
            <Skeleton className='flex items-center justify-center py-6 rounded-b-none'>
              <Skeleton className='w-[70px] h-[70px] rounded-full'/>
            </Skeleton>
            <div className='flex justify-center p-3'>
              <Skeleton className='h-[24px] w-[100px]'/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GridIcon, ListIcon, PlusIcon } from 'lucide-react';

export default function Loading() {
  return (
    <Tabs defaultValue='grid' className='space-y-6'>
      <div className='flex gap-3'>
        <Input disabled={true} placeholder='名前またはIDで検索' className='w-[300px] flex-1' />
        <TabsList>
          <TabsTrigger disabled={true} value='grid'>
            <GridIcon size={18} />
          </TabsTrigger>
          <TabsTrigger disabled={true} value='list'>
            <ListIcon size={18} />
          </TabsTrigger>
        </TabsList>
        <Button className='flex gap-2' disabled>
          <PlusIcon size={16} />
          サーバーに導入
        </Button>
      </div>
      <div className='grid grid-cols-10 gap-6'>
        {Array(5)
          .fill(0)
          .map((v, index) => (
            <Card key={index} className='col-span-2 overflow-hidden'>
              <Skeleton className='flex items-center justify-center rounded-b-none py-6'>
                <Skeleton className='h-[70px] w-[70px] rounded-full' />
              </Skeleton>
              <div className='flex justify-center p-3'>
                <Skeleton className='h-[24px] w-[100px]' />
              </div>
            </Card>
          ))}
      </div>
    </Tabs>
  );
}

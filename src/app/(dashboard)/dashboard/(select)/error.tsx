'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, GridIcon, ListIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      </div>
      <Alert className='items-center' variant='danger'>
        <AlertCircle size={18} />
        <AlertTitle>問題が発生しました</AlertTitle>
        <AlertDescription>
          ページの読み込み中に予期しないエラーが発生しました。時間を置いて再度アクセスしてください。
        </AlertDescription>
      </Alert>
    </Tabs>
  );
}

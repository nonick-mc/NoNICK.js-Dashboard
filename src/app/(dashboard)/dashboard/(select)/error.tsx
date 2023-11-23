'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, Input } from '@nextui-org/react';
import { AlertCircle, PlusIcon, SearchIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='space-y-6'>
      <div className='flex justify-stretch gap-3'>
        <Input
          classNames={{
            base: 'flex-1',
            label: 'hidden',
          }}
          size='sm'
          placeholder='名前またはサーバーIDで検索'
          startContent={<SearchIcon className='text-foreground/50' size={20} />}
          isDisabled
        />
        <div>
          <Button
            color='primary'
            className='h-full'
            startContent={<PlusIcon size={18} />}
            isDisabled
          >
            サーバーに導入
          </Button>
        </div>
      </div>
      <div className='flex justify-center'>
        <Alert className='items-center' variant='danger'>
          <AlertCircle size={18} />
          <AlertTitle>問題が発生しました</AlertTitle>
          <AlertDescription>
            ページの読み込み中に予期しないエラーが発生しました。時間を置いて再度アクセスしてください。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

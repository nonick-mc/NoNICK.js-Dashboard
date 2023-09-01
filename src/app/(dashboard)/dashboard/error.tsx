'use client';
 
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Plus } from 'lucide-react';
import { useEffect } from 'react'
 
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error])
 
  return (
    <div className='container space-y-8 py-3'>
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
            <Plus size={16}/>
            <span>BOTを導入</span>
          </Button>
        </div>
      </div>
      <Alert className='items-center' variant='danger'>
        <AlertCircle size={18}/>
        <AlertTitle>問題が発生しました</AlertTitle>
        <AlertDescription>ページの読み込み中に予期しないエラーが発生しました。時間を置いて再度アクセスしてください。</AlertDescription>
      </Alert>
    </div>
  )
}
'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert className='items-center' variant='danger'>
      <AlertCircle size={18} />
      <AlertTitle>問題が発生しました</AlertTitle>
      <AlertDescription>
        ページの読み込み中に予期しないエラーが発生しました。時間を置いて再度アクセスしてください。
      </AlertDescription>
    </Alert>
  );
}

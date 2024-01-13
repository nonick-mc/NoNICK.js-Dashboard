'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect } from 'react';
import { DangerCircle } from 'solar-icon-set';
import { ToolbarMockup } from './toolbar-mockup';

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='py-6 flex flex-col gap-6'>
      <ToolbarMockup />
      <div className='flex justify-center'>
        <Alert variant='destructive'>
          <DangerCircle size={20} iconStyle='Bold' />
          <div className='flex-1'>
            <AlertTitle>問題が発生しました</AlertTitle>
            <AlertDescription>
              ページの読み込み中に予期しないエラーが発生しました。時間を置いて再度アクセスしてください。
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  );
}

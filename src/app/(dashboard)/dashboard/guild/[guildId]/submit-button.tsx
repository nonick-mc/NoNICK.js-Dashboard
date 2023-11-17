'use client';

import { Button } from '@nextui-org/react';

export function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <div>
      <Button color='primary' type='submit' isLoading={loading}>
        変更を保存
      </Button>
    </div>
  );
}

import { Button, Input, Spinner } from '@nextui-org/react';
import { PlusIcon, SearchIcon } from 'lucide-react';

export default function Loading() {
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
        <Spinner label='読み込み中...' color='primary' size='lg' />
      </div>
    </div>
  );
}

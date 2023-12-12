import { Button, Input } from '@nextui-org/react';
import { PlusIcon, SearchIcon } from 'lucide-react';

export function ToolbarSkeleton() {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-stretch gap-3'>
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
          className='sm:h-full w-full sm:w-auto'
          startContent={<PlusIcon size={18} />}
          isDisabled
        >
          サーバーに導入
        </Button>
      </div>
    </div>
  );
}

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { AddCircle, Magnifer } from 'solar-icon-set';

export function ToolbarMockup() {
  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      <Input
        size='sm'
        startContent={<Magnifer size={20} />}
        placeholder='名前またはサーバーIDで検索'
        isDisabled
      />
      <div>
        <Button
          className='rounded-lg w-full sm:w-auto sm:h-full'
          startContent={<AddCircle iconStyle='Bold' size={20} />}
          color='primary'
          isDisabled
        >
          サーバーに導入
        </Button>
      </div>
    </div>
  );
}

import { SolarIcon } from '@/types/solar-icon';
import { Card } from '@nextui-org/card';
import { createElement } from 'react';

type Props = {
  className?: string;
  label: string;
  value: string;
  icon: SolarIcon;
};

export function StatsCard({ className, label, value, icon }: Props) {
  return (
    <Card
      classNames={{ base: 'flex flex-col gap-2 p-6' }}
      className={className}
    >
      <div className='flex items-center justify-between'>
        <p className='text-sm'>{label}</p>
        {createElement(icon, { size: 20, iconStyle: 'Bold' })}
      </div>
      <p className='text-2xl font-black'>{value}</p>
    </Card>
  );
}

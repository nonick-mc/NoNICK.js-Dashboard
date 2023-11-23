import { Card, cn } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';
import React, { FC } from 'react';

type Props = {
  className?: string;
  label: string;
  value: string;
  icon: LucideIcon;
};

export const StatsCard: FC<Props> = ({ className, label, value, icon }) => {
  return (
    <Card className={cn('flex flex-col gap-2 p-6', className)}>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>{label}</p>
        {React.createElement(icon, { size: 16 })}
      </div>
      <p className='text-2xl font-black'>{value}</p>
    </Card>
  );
};

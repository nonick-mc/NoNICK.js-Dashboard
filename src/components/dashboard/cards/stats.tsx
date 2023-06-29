import { Card } from '@/components/ui/card';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  value: string,
  icon: IconType,
  children: React.ReactNode
}

export function StatsCard({ value, icon, children }: Props) {
  return (
    <Card className='p-6 space-y-2'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-sm'>{children}</p>
        {React.createElement(icon, { size: 20, className: 'text-zinc-500' })}
      </div>
      <p className='font-black text-2xl'>
        {value}
      </p>
    </Card>
  )
}
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import React from 'react';
import { Icon } from 'react-feather';

export interface IconCardProps {
  color: IconCardColors,
  title: string,
  description: string,
  icon: Icon,
}

export enum IconCardColors {
  Primary = 'bg-primary-500/25 text-primary-500 fill-primary-500',
  Secondary = 'bg-secondary-500/25 text-secondary-500 fill-secondary-500'
}

export function IconCard({ color, title, description, icon }: IconCardProps) {
  return (
    <Card className='select-none' isHoverable>
      <CardHeader className='px-5 pt-5 pb-0 flex items-center gap-4'>
        <div className={`flex w-10 h-10 rounded-full ${color} items-center justify-center`}>
          {React.createElement(icon, { size: 20 })}
        </div>
        <h4 className='m-0 font-extrabold text-xl'>
          {title}
        </h4>
      </CardHeader>
      <CardBody className='text-gray-500'>
        {description}
      </CardBody>
    </Card>
  )
}
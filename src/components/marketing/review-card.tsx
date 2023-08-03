import React, { FC } from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';

type Props = {
  avatar: string,
  name: string,
  id: string,
  children: React.ReactNode
};

export const ReviewCard: FC<Props> = ({ avatar, name, id, children }) => {
  return (
    <Card className='px-6 py-5 flex flex-col gap-3'>
      <div className='flex gap-3 items-center text-lg'>
        <Image
          className='rounded-full'
          src={avatar}
          width={35}
          height={35}
          alt={`${name}'s avatar`}
        />
        <span className='font-bold'>{name}</span>
        <span className='text-muted-foreground'>{`@${id}`}</span>
      </div>
      {children}
    </Card>
  );
}
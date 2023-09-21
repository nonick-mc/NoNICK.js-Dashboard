import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';

type ReviewCardProps = {
  avatar: string;
  name: string;
  username: string;
  children: React.ReactNode;
};

export const ReviewCard: FC<ReviewCardProps> = ({ avatar, name, username, children }) => {
  return (
    <Card className='flex flex-col gap-3 px-6 py-5'>
      <div className='flex items-center gap-3 text-lg'>
        <Image
          className='rounded-full'
          src={avatar}
          width={35}
          height={35}
          alt={`${name}のアバター`}
        />
        <span className='font-bold'>{name}</span>
        <span className='text-muted-foreground'>{`@${username}`}</span>
      </div>
      {children}
    </Card>
  );
};

type FeatureCardProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export const FeatureCard: FC<FeatureCardProps> = ({ title, icon, children }) => {
  return (
    <Card className='flex flex-col gap-2 p-5'>
      <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-foreground text-background'>
        {React.createElement(icon, { size: 25 })}
      </div>
      <p className='text-xl font-bold'>{title}</p>
      <p className='text-sm text-muted-foreground'>{children}</p>
    </Card>
  );
};

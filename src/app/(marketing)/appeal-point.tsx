import React, { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
  children: React.ReactNode;
};

export const AppealPoint: FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-1 gap-3'>
      <FaCheckCircle size={25} className='mt-1' />
      <p className='flex-1 text-lg text-muted-foreground'>{children}</p>
    </div>
  );
};

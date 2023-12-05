import { ReactNode } from 'react';

export function Header({
  title,
  description,
}: { title: string; description: string }) {
  return (
    <div className='grid items-start gap-1'>
      <h1 className='text-3xl font-black'>{title}</h1>
      <h2 className='text-default-500'>{description}</h2>
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className='text-lg font-semibold leading-none tracking-tight'>
      {children}
    </h3>
  );
}

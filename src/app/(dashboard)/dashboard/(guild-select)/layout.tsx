import { ReactNode } from 'react';
import { NavBar } from './navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className='px-[2rem]'>{children}</div>
    </>
  );
}

import { ReactNode } from 'react';
import { Nav } from './nav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

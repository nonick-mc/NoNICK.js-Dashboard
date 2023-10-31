import { ReactNode } from 'react';
import { Nav } from './nav';
import { CheckSessionProvider } from './provider';
import NextTopLoader from 'nextjs-toploader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CheckSessionProvider>
      <NextTopLoader color='#3b82f6' showSpinner={false} shadow={false} />
      <Nav />
      {children}
    </CheckSessionProvider>
  );
}

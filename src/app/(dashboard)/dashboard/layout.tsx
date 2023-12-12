import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import { CheckSessionProvider } from './provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CheckSessionProvider>
      <NextTopLoader color='#3b82f6' showSpinner={false} shadow={false} />
      {children}
    </CheckSessionProvider>
  );
}

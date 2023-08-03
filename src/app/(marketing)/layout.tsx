import { MainNav } from '@/components/marketing/main-nav';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNav/>
      {children}
    </>
  )
}
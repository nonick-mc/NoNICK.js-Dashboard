import { ReactNode } from 'react';

interface featureCard {
  title: string,
  description: string,
  icon: ReactNode,
  isNew?: boolean,
}
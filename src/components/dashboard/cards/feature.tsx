import { Card } from '@/components/ui/card';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType
  label: string,
  children: React.ReactNode
}

export function FeatureCard({ icon, label, children }: Props) {
  return (
    <Card className='p-3'>
      
    </Card>
  );
}
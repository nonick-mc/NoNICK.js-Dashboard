import React, { FC } from 'react'
import { Card } from '../ui/card'
import { LucideIcon } from 'lucide-react'

type Props = {
  title: string,
  icon: LucideIcon,
  children: React.ReactNode,
}

export const FeatureCard: FC<Props> = ({ title, icon, children }) => {
  return (
    <Card className='p-5 flex flex-col gap-2'>
      <div className='w-[50px] h-[50px] rounded-full bg-foreground text-background flex items-center justify-center'>
        {React.createElement(icon, { size: 25 })}
      </div>
      <p className='text-xl font-bold'>{title}</p>
      <p className='text-muted-foreground text-sm'>
        {children}
      </p>
    </Card>
  )
}
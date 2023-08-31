import React, { FC } from 'react'

type HeaderProps = {
  title: string,
  description: string,
}

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className='grid items-start gap-1'>
      <h1 className='text-3xl font-black'>{title}</h1>
      <h2 className='text-muted-foreground'>{description}</h2>
    </div>
  )
}

type ShellProps = {
  children: React.ReactNode,
}

export const Shell: FC<ShellProps> = ({ children }) => {
  return (
    <main className='flex flex-col gap-6 pr-4'>
      {children}
    </main>
  )
}
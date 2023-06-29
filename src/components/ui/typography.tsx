import React from 'react';

interface TypographyProps {
  children: React.ReactNode
}

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function TypographyBlockquote({ children }: TypographyProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  )
}

export function TypographyLead({ children }: TypographyProps) {
  return (
    <p className="text-xl text-muted-foreground">
      {children}
    </p>
  )
}

export function TypographyMuted({ children }: TypographyProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  )
}
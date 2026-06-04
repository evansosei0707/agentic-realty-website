import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
  padding = 'md',
}: {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}) {
  const padMap = {
    none: '',
    sm: 'p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  }
  return (
    <div
      className={`bg-surface-2 border border-border-subtle rounded-[var(--radius-lg)] hover:border-border-strong transition-colors ${padMap[padding]} ${className}`}
    >
      {children}
    </div>
  )
}

export function NestedCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-surface-3 border border-border-subtle rounded-3xl ${className}`}
    >
      {children}
    </div>
  )
}

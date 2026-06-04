import type { ReactNode } from 'react'

export type PillVariant = 'green' | 'orange' | 'pink' | 'red' | 'muted'

const variantStyles: Record<PillVariant, { dot: string; text: string; bg: string; border: string }> = {
  green: {
    dot: 'bg-primary',
    text: 'text-primary',
    bg: 'bg-primary-soft',
    border: 'border-primary/30',
  },
  orange: {
    dot: 'bg-accent-orange',
    text: 'text-accent-orange',
    bg: 'bg-accent-orange-soft',
    border: 'border-accent-orange/30',
  },
  pink: {
    dot: 'bg-accent-pink',
    text: 'text-accent-pink',
    bg: 'bg-accent-pink-soft',
    border: 'border-accent-pink/30',
  },
  red: {
    dot: 'bg-accent-red',
    text: 'text-accent-red',
    bg: 'bg-accent-red-soft',
    border: 'border-accent-red/30',
  },
  muted: {
    dot: 'bg-text-muted',
    text: 'text-text-secondary',
    bg: 'bg-surface-3',
    border: 'border-border-subtle',
  },
}

export function Pill({
  variant = 'muted',
  dot = false,
  size = 'sm',
  children,
  className = '',
}: {
  variant?: PillVariant
  dot?: boolean
  size?: 'sm' | 'md'
  children: ReactNode
  className?: string
}) {
  const v = variantStyles[variant]
  const pad = size === 'md' ? 'px-3 py-1.5 text-[12px]' : 'px-2.5 py-1 text-[11px]'
  return (
    <span
      className={`inline-flex items-center gap-2 ${pad} font-mono uppercase tracking-[0.06em] font-medium rounded-full border ${v.bg} ${v.text} ${v.border} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />}
      {children}
    </span>
  )
}

export function LabelPill({
  children,
  className = '',
  ...rest
}: {
  children: ReactNode
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-flex items-center px-3 py-1.5 font-mono uppercase tracking-[0.08em] text-[11px] font-medium rounded-full border border-border-subtle bg-surface-3 text-text-secondary ${className}`}
    >
      {children}
    </span>
  )
}

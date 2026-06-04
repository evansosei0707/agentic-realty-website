import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type Variant = 'primary' | 'ghost' | 'gold'
export type Size = 'sm' | 'md' | 'lg'

const styles: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:opacity-90 focus-visible:outline-primary',
  ghost:
    'bg-transparent text-text-primary border border-border-subtle hover:border-border-strong',
  gold: 'bg-accent-gold text-[#1a1206] hover:opacity-90 focus-visible:outline-accent-gold',
}

export function buttonClass(
  variant: Variant = 'primary',
  size: Size = 'md',
  className = '',
): string {
  const sizing =
    size === 'lg'
      ? 'h-12 px-6 text-[15px]'
      : size === 'sm'
        ? 'h-8 px-4 text-[13px]'
        : 'h-10 px-5 text-[14px]'
  return `inline-flex items-center justify-center font-medium rounded-full ${sizing} ${styles[variant]} transition-colors ${className}`
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  size = 'md',
  ...rest
}: {
  variant?: Variant
  size?: Size
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={buttonClass(variant, size, className)}>
      {children}
    </button>
  )
}

import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'bronze' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const variantStyles = {
    primary: 'bg-primary-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-glow active:translate-y-0',
    secondary: 'bg-neutral-200 text-neutral-900 border border-neutral-300/60 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-sm active:translate-y-0',
    bronze: 'bg-accent-500/15 border border-accent-400/40 text-accent-300 hover:bg-accent-500/25 hover:border-accent-400/70 hover:shadow-glow-pink active:translate-y-0',
    ghost: 'border border-white/10 bg-transparent text-neutral-300 hover:bg-white/5 hover:text-white hover:border-white/20'
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

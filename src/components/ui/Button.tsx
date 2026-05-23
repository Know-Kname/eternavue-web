import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
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
    primary: 'bg-primary-500 text-white shadow-glow hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-glow-strong',
    secondary: 'bg-accent-500 text-white shadow-glow-pink hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]',
    ghost: 'border border-primary-500/50 bg-transparent text-primary-300 hover:bg-primary-500/10 hover:text-white hover:shadow-glow'
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
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

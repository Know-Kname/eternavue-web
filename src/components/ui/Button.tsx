import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  'primary' | 'secondary' | 'ghost'
  size?:     'sm' | 'md' | 'lg'
  children:  React.ReactNode
  fullWidth?: boolean
}

export function Button({
  variant   = 'primary',
  size      = 'md',
  children,
  className = '',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-holographic-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-space disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'

  const variants = {
    primary:
      'bg-holographic-cyan text-space hover:bg-holographic-light shadow-[0_0_20px_rgba(50,184,198,0.25)] hover:shadow-[0_0_30px_rgba(50,184,198,0.45)]',
    secondary:
      'bg-accent-500 text-space hover:bg-accent-400 shadow-[0_0_20px_rgba(212,165,116,0.25)] hover:shadow-[0_0_30px_rgba(212,165,116,0.45)]',
    ghost:
      'bg-transparent text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.04]',
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  )
}

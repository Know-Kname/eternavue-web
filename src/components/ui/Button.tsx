import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'focus-visible:ring-sage-400 inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-sage-400 hover:bg-sage-500 text-white shadow-sm': variant === 'primary',
          'bg-gold-500 text-warm-50 hover:bg-gold-600 shadow-sm': variant === 'secondary',
          'text-sage-400 hover:bg-sage-50 border-sage-400 border bg-transparent':
            variant === 'ghost',
          'hover:bg-warm-100 border border-slate-300 bg-transparent text-slate-600':
            variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-7 py-3.5 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

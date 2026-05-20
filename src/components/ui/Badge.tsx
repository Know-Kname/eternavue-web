import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'sage' | 'gold' | 'clay' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-warm-200 text-slate-700': variant === 'default',
          'bg-sage-100 text-sage-600': variant === 'sage',
          'bg-gold-400/20 text-gold-600': variant === 'gold',
          'bg-clay-100 text-clay-600': variant === 'clay',
          'border border-slate-300 bg-transparent text-slate-600': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}

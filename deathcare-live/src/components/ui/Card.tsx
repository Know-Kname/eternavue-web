import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-warm-200 shadow-sm',
        hover && 'transition-shadow duration-200 hover:shadow-md hover:border-sage-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

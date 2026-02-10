'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NeonIconProps {
  icon: LucideIcon
  className?: string
  strokeWidth?: number
  flickerOnHover?: boolean
}

export function NeonIcon({
  icon: Icon,
  className,
  strokeWidth = 1.8,
  flickerOnHover = true,
}: NeonIconProps) {
  return (
    <Icon
      strokeWidth={strokeWidth}
      className={cn(
        'text-primary-400 transition-all duration-300',
        '[filter:drop-shadow(0_0_6px_currentColor)]',
        flickerOnHover && 'hover:animate-neon-flicker hover:text-primary-300',
        className
      )}
    />
  )
}


'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items:       React.ReactNode[]
  speed?:      string
  className?:  string
  itemClassName?: string
  separator?:  React.ReactNode
}

export function Marquee({
  items,
  speed        = '30s',
  className,
  itemClassName,
  separator    = <span className="mx-6 text-holographic-cyan/50">·</span>,
}: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className={cn('relative flex overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className="flex shrink-0 animate-marquee items-center gap-0 hover:[animation-play-state:paused]"
        style={{ animationDuration: speed }}
        aria-hidden="false"
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span className={cn('whitespace-nowrap', itemClassName)}>{item}</span>
            {i < doubled.length - 1 && separator}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

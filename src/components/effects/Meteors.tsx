'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MeteorStyle {
  top:      string
  left:     string
  delay:    string
  duration: string
}

interface MeteorsProps {
  number?:   number
  className?: string
}

export function Meteors({ number = 18, className }: MeteorsProps) {
  const [styles, setStyles] = useState<MeteorStyle[]>([])

  useEffect(() => {
    setStyles(
      Array.from({ length: number }, () => ({
        top:      '-5px',
        left:     `${Math.floor(Math.random() * 800 - 400)}px`,
        delay:    `${(Math.random() * 0.9 + 0.1).toFixed(2)}s`,
        duration: `${Math.floor(Math.random() * 8 + 4)}s`,
      }))
    )
  }, [number])

  return (
    <>
      {styles.map((s, i) => (
        <span
          key={i}
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 h-px w-px rotate-[215deg] animate-meteor rounded-full bg-white/70',
            className
          )}
          style={{
            top:             s.top,
            left:            s.left,
            animationDelay:  s.delay,
            animationDuration: s.duration,
          }}
        >
          {/* Tail */}
          <span className="absolute top-1/2 h-px w-[80px] -translate-y-1/2 bg-gradient-to-r from-white/60 to-transparent" />
        </span>
      ))}
    </>
  )
}

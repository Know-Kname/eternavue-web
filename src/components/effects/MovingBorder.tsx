'use client'

import React, { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface MovingBorderProps {
  children:           React.ReactNode
  duration?:          number
  containerClassName?: string
  borderClassName?:   string
  innerClassName?:    string
  as?: React.ElementType
  [key: string]: unknown
}

export function MovingBorder({
  children,
  duration = 2800,
  containerClassName,
  borderClassName,
  innerClassName,
  as: Component = 'div',
  ...props
}: MovingBorderProps) {
  const pathRef   = useRef<SVGRectElement>(null)
  const progress  = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.() ?? 0
    if (length) {
      const pxPerMs = length / duration
      progress.set((time * pxPerMs) % length)
    }
  })

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0)
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0)
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <Component
      className={cn('relative overflow-hidden rounded-full p-px', containerClassName)}
      {...props}
    >
      {/* Rotating glow dot that traces the border */}
      <div className="absolute inset-0 rounded-[inherit]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect fill="none" width="100%" height="100%" rx="999" ry="999" ref={pathRef} />
        </svg>
        <motion.div
          style={{
            position:  'absolute',
            top:       0,
            left:      0,
            display:   'inline-block',
            transform,
          }}
          className={cn(
            'h-24 w-24 opacity-90 bg-[radial-gradient(closest-side,rgba(50,184,198,0.9),rgba(139,92,246,0.5),transparent)]',
            borderClassName
          )}
        />
      </div>

      {/* Inner content */}
      <div
        className={cn(
          'relative flex items-center justify-center w-full h-full rounded-[inherit] bg-space/90 backdrop-blur-sm',
          innerClassName
        )}
      >
        {children}
      </div>
    </Component>
  )
}

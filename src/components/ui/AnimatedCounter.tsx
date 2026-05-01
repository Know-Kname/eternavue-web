'use client'

import React, { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target:    number
  suffix?:   string
  prefix?:   string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  target,
  suffix    = '',
  prefix    = '',
  duration  = 2.2,
  className = '',
}: AnimatedCounterProps) {
  const [count,  setCount]  = useState(0)
  const ref                 = useRef<HTMLSpanElement>(null)
  const isInView            = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration,
      ease:     [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

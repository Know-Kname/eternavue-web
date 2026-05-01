'use client'

import React, { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CardSpotlightProps {
  children?:  React.ReactNode
  className?: string
  radius?:    number
  color?:     string
}

export function CardSpotlight({
  children,
  className,
  radius = 400,
  color  = 'rgba(50, 184, 198, 0.12)',
}: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    divRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 80%)`
  }, [radius, color])

  const handleMouseLeave = useCallback(() => {
    if (divRef.current) divRef.current.style.background = 'transparent'
  }, [])

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('absolute inset-0 rounded-[inherit] transition-all duration-300', className)}
    />
  )
}

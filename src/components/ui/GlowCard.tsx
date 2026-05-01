'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CardSpotlight } from '@/components/effects/CardSpotlight'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children:     React.ReactNode
  className?:   string
  hoverEffect?: boolean
  spotlightColor?: string
  delay?:       number
}

export function GlowCard({
  children,
  className,
  hoverEffect  = true,
  spotlightColor,
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hoverEffect ? { scale: 1.015, y: -4 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface noise-overlay',
        'transition-shadow duration-500',
        hoverEffect && 'hover:border-holographic-cyan/20 hover:shadow-[0_0_40px_rgba(50,184,198,0.08)]',
        className
      )}
    >
      {/* Spotlight that follows cursor */}
      <CardSpotlight color={spotlightColor} />

      {/* Subtle top-edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-holographic-cyan/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

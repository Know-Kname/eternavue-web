'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className = '', hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-neutral-900/85 backdrop-blur-[16px]',
        'border border-neutral-800/80',
        'shadow-warm-card',
        'transition-all duration-300',
        hoverEffect && 'hover:border-primary-500/40 hover:-translate-y-1 hover:shadow-glow',
        className
      )}
    >
      {/* Subtle warm ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary-500/5 blur-2xl" />

      {/* Gentle top edge sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {children}
    </motion.div>
  )
}


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
        'bg-black/70 backdrop-blur-[12px]',
        'border-t border-l border-white/10',
        'shadow-[0_8px_32px_0_rgba(9,9,11,0.45)]',
        'transition-all duration-300',
        hoverEffect && 'hover:border-t-primary-500/50 hover:border-l-primary-500/50 hover:shadow-glow',
        className
      )}
    >
      {/* Living gradient glow behind content */}
      <div className="pointer-events-none absolute inset-0 bg-pulse-radial opacity-60 animate-pulse-gradient" />

      {/* Edge sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />

      {children}
    </motion.div>
  )
}


'use client'

import React from 'react'
import { motion } from 'framer-motion'
interface GlassCardProps {
  id?: string
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ id, children, className = '', hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" } : {}}
      className={`
        relative overflow-hidden
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[0_8px_32px_0_rgba(31,50,82,0.1)]
        rounded-2xl
        transition-colors duration-300
        ${className}
      `}
    >
      {/* Holographic sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {children}
    </motion.div>
  )
}


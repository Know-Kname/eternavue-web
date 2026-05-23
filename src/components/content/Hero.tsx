'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'

export interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink?: string
  onCtaClick?: () => void
}

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  onCtaClick
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const orbY = useTransform(scrollY, [0, 600], [0, -120], { clamp: false })
  const orbYReverse = useTransform(scrollY, [0, 600], [0, 90], { clamp: false })
  const pulseY = useTransform(scrollY, [0, 600], [0, -60], { clamp: false })

  const displayTitle = title.toLowerCase()

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-void">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-void/70 to-void" />

        {/* Living gradient pulse */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : pulseY }}
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-pulse-radial absolute inset-0 z-0"
        />

        {/* Animated orbs */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : orbY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary-500/20 blur-[100px]"
        />
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : orbYReverse }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-accent-500/20 blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-sm text-primary-300 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Live Experiences</span>
          </div>

          <h1 className="text-glow mb-8 font-heading text-5xl font-bold lowercase leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            {displayTitle.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word.includes('holographic') ? (
                  <span className="animate-pulse bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : word}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-ghost md:text-2xl">
            {subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {ctaLink ? (
              <a href={ctaLink} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full min-w-[200px] sm:w-auto">
                  {ctaText}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={onCtaClick}
                className="w-full min-w-[200px] sm:w-auto"
              >
                {ctaText}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}

            <Button variant="ghost" size="lg">
              Watch Video
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-500/30 p-1">
          <div className="h-2 w-1 rounded-full bg-primary-400" />
        </div>
      </motion.div>
    </section>
  )
}

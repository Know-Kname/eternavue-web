'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import { BackgroundBeams } from '@/components/effects/BackgroundBeams'
import { Meteors } from '@/components/effects/Meteors'
import { MovingBorder } from '@/components/effects/MovingBorder'
import { TextGenerateEffect } from '@/components/effects/TextGenerateEffect'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

export interface HeroProps {
  title:        string
  subtitle:     string
  ctaText:      string
  ctaLink?:     string
  onCtaClick?:  () => void
}

export function Hero({ title, subtitle, ctaText, onCtaClick, ctaLink }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-space">
      {/* ── Layers ────────────────────────────────────────── */}

      {/* 1. Deep radial glow behind everything */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-holographic-cyan/[0.04] blur-[140px]" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-violet/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent-500/[0.05] blur-[100px]" />
      </div>

      {/* 2. Animated SVG beams */}
      <BackgroundBeams />

      {/* 3. Meteor shower */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Meteors number={14} />
      </div>

      {/* 4. Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(50,184,198,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(50,184,198,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 py-32 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 inline-flex"
        >
          <MovingBorder
            duration={3500}
            containerClassName="rounded-full"
            innerClassName="px-4 py-1.5 rounded-full bg-space/70"
          >
            <span className="text-sm font-medium text-holographic-light tracking-wide">
              ✦ The Future of Remembrance
            </span>
          </MovingBorder>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-8 font-serif text-[clamp(2.8rem,8vw,6.5rem)] font-normal leading-[1.05] tracking-tight text-white">
          <TextGenerateEffect
            words={title}
            className="text-gradient-holographic"
            duration={0.7}
            staggerDuration={0.1}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mb-14 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton strength={0.3}>
            <MovingBorder
              duration={2800}
              containerClassName="rounded-full"
              innerClassName="rounded-full px-8 py-4 font-semibold text-white bg-space/80"
              onClick={ctaLink ? undefined : onCtaClick}
              as={ctaLink ? 'a' : 'button'}
              {...(ctaLink ? { href: ctaLink } : {})}
            >
              <span className="flex items-center gap-2 text-base">
                {ctaText}
              </span>
            </MovingBorder>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <Button
              variant="ghost"
              size="lg"
              className="group flex items-center gap-2 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/15 transition-colors">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch Video
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-20 flex items-center justify-center gap-8 text-center md:gap-16"
        >
          {[
            { value: '500+', label: 'Moments Created' },
            { value: '100+', label: 'Memorials Served' },
            { value: '1925', label: 'Est. Year' },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-1">
              <p className="text-2xl font-serif text-holographic-cyan md:text-3xl">{value}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-white/30"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}

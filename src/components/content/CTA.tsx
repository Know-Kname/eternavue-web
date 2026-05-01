'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { BackgroundBeams } from '@/components/effects/BackgroundBeams'
import { TextGenerateEffect } from '@/components/effects/TextGenerateEffect'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

export interface CTAProps {
  title:                string
  description:          string
  primaryButtonText:    string
  primaryButtonLink?:   string
  onPrimaryClick?:      () => void
  secondaryButtonText?: string
  secondaryButtonLink?: string
  onSecondaryClick?:    () => void
  variant?:             'primary' | 'accent' | 'dark'
}

export function CTA({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  onPrimaryClick,
  secondaryButtonText,
  secondaryButtonLink,
  onSecondaryClick,
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-space py-36 px-6">
      {/* Background beams */}
      <BackgroundBeams />

      {/* Centre glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-holographic-cyan/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent-500/[0.06] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-holographic-cyan/20 bg-holographic-cyan/5 px-4 py-1.5 text-sm font-medium text-holographic-cyan backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Start Your Journey
          </div>

          {/* Heading */}
          <h2 className="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-5xl lg:text-6xl">
            <TextGenerateEffect words={title} duration={0.6} staggerDuration={0.07} />
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-neutral-400">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <MagneticButton strength={0.3}>
              {primaryButtonLink ? (
                <a href={primaryButtonLink}>
                  <Button variant="primary" size="lg" className="min-w-[200px]">
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Button variant="primary" size="lg" onClick={onPrimaryClick} className="min-w-[200px]">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </MagneticButton>

            {secondaryButtonText && (
              <MagneticButton strength={0.25}>
                {secondaryButtonLink ? (
                  <a href={secondaryButtonLink}>
                    <Button variant="ghost" size="lg" className="min-w-[180px]">
                      {secondaryButtonText}
                    </Button>
                  </a>
                ) : (
                  <Button variant="ghost" size="lg" onClick={onSecondaryClick} className="min-w-[180px]">
                    {secondaryButtonText}
                  </Button>
                )}
              </MagneticButton>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

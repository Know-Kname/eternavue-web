'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { GlitchText } from '@/components/ui/GlitchText'

export interface CTAProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink?: string
  onPrimaryClick?: () => void
  secondaryButtonText?: string
  secondaryButtonLink?: string
  onSecondaryClick?: () => void
  variant?: 'primary' | 'accent' | 'dark'
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
  variant = 'primary'
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-void py-32 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Living gradient + dual glow */}
      <div className="bg-pulse-radial pointer-events-none absolute inset-0 animate-pulse-gradient" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent-500/20 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            <GlitchText text={title.toLowerCase()} className="text-glow font-heading lowercase" />
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-ghost md:text-2xl">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {primaryButtonLink ? (
              <a href={primaryButtonLink} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full min-w-[200px] sm:w-auto">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={onPrimaryClick}
                className="w-full min-w-[200px] sm:w-auto"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}

            {secondaryButtonText && (
              secondaryButtonLink ? (
                <a href={secondaryButtonLink} className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto border-primary-500/40 text-white hover:border-primary-500/70">
                    {secondaryButtonText}
                  </Button>
                </a>
              ) : (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onSecondaryClick}
                  className="w-full sm:w-auto border-primary-500/40 text-white hover:border-primary-500/70"
                >
                  {secondaryButtonText}
                </Button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

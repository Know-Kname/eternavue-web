'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

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
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-void py-32 px-6 border-t border-sand-500/10">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full bg-terracotta-500/15 blur-[140px]" />
        <div className="absolute right-10 bottom-10 w-125 h-100 rounded-full bg-bronze-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e8e6dc_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-terracotta-500/30 bg-terracotta-500/10 px-4 py-1.5 text-xs font-semibold text-terracotta-300 uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sovereign Partnership &amp; Heritage Preservation</span>
          </div>

          <h2 className="mb-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-sand-100 leading-tight">
            {title}
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-sand-400">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryButtonLink ? (
              <a href={primaryButtonLink} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-55">
                  <span>{primaryButtonText}</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={onPrimaryClick}
                className="w-full sm:w-auto min-w-55"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}

            {secondaryButtonText && (
              secondaryButtonLink ? (
                <a href={secondaryButtonLink} className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-55">
                    <span>{secondaryButtonText}</span>
                  </Button>
                </a>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onSecondaryClick}
                  className="w-full sm:w-auto min-w-55"
                >
                  <span>{secondaryButtonText}</span>
                </Button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


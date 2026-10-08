'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Building2, Heart, ArrowRight, Sparkles, Award } from 'lucide-react'

export interface HeroProps {
  onCtaClick?: () => void
  onModeChange?: (mode: 'b2b' | 'd2c') => void
}

export function Hero({ onCtaClick, onModeChange }: HeroProps) {
  const [mode, setMode] = useState<'b2b' | 'd2c'>('b2b')
  const shouldReduceMotion = useReducedMotion()

  const handleModeToggle = (newMode: 'b2b' | 'd2c') => {
    setMode(newMode)
    onModeChange?.(newMode)
  }

  const contactHref = 'mailto:christian@thewrightguy.com?subject=Eternavue%20%E2%80%94%20Partner%20inquiry'

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-void pt-28 pb-20 px-6">
      {/* Warm Ambient Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep ambient radial glows */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-terracotta-500/15 rounded-full blur-[140px]" />
        <div className="absolute right-10 top-1/3 w-[550px] h-[450px] bg-bronze-500/10 rounded-full blur-[130px]" />
        <div className="absolute left-10 bottom-20 w-[600px] h-[400px] bg-coral-500/10 rounded-full blur-[120px]" />
        {/* Subtle architectural grain */}
        <div className="absolute inset-0 bg-[radial-gradient(#e8e6dc_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Dual-Lens Mode Selector */}
        <div className="mb-10 inline-flex items-center p-1.5 rounded-full bg-void-light border border-sand-500/15 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => handleModeToggle('b2b')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              mode === 'b2b'
                ? 'bg-gradient-to-r from-terracotta-500 to-coral-500 text-white shadow-lg'
                : 'text-sand-400 hover:text-sand-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>For Cemeteries &amp; Funeral Homes</span>
          </button>
          <button
            onClick={() => handleModeToggle('d2c')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              mode === 'd2c'
                ? 'bg-gradient-to-r from-bronze-500 to-terracotta-500 text-white shadow-lg'
                : 'text-sand-400 hover:text-sand-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-coral-300" />
            <span>For Families &amp; Keepsakes</span>
          </button>
        </div>

        {/* Dynamic Content Transitions */}
        <AnimatePresence mode="wait">
          {mode === 'b2b' ? (
            <motion.div
              key="b2b"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terracotta-500/30 bg-terracotta-500/10 text-xs uppercase tracking-wider text-terracotta-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>B2B Wholesale Infrastructure · White-Label Deathcare</span>
              </div>

              {/* Literary Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-sand-100 tracking-tight leading-[1.12]">
                The modern memorial layer for{' '}
                <span className="italic font-normal bg-gradient-to-r from-sand-200 via-bronze-300 to-terracotta-400 bg-clip-text text-transparent">
                  independent deathcare.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-sand-400 font-light leading-relaxed">
                White-label livestreaming, digital graveside integration, and high-margin physical-to-digital keepsakes. Built by a 4th-generation cemetery operator, not Silicon Valley.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={contactHref} onClick={onCtaClick} className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-55">
                    <span>Partner Inquiry</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#partner-calculator" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[220px]">
                    <span>Calculate Retained Margin</span>
                  </Button>
                </a>
              </div>

              {/* Value Badges */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-terracotta-400 font-semibold mb-0.5">Retained Margin</div>
                  <div className="text-lg font-serif text-sand-100">40% to 60%</div>
                  <div className="text-xs text-sand-400">Kept directly by cemetery/firm</div>
                </div>
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-bronze-400 font-semibold mb-0.5">Brand Ownership</div>
                  <div className="text-lg font-serif text-sand-100">100% White-Label</div>
                  <div className="text-xs text-sand-400">Your custom domain &amp; identity</div>
                </div>
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-sand-400 font-semibold mb-0.5">Heritage Pedigree</div>
                  <div className="text-lg font-serif text-sand-100">Est. 1925 Lineage</div>
                  <div className="text-xs text-sand-400">Detroit Memorial Park flagship</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="d2c"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bronze-500/30 bg-bronze-500/10 text-xs uppercase tracking-wider text-bronze-300 font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Centennial Heritage Vault · Direct Family Preservation</span>
              </div>

              {/* Literary Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-sand-100 tracking-tight leading-[1.12]">
                A timeless digital sanctuary for{' '}
                <span className="italic font-normal bg-gradient-to-r from-sand-200 via-bronze-300 to-terracotta-400 bg-clip-text text-transparent">
                  family stories.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-sand-400 font-light leading-relaxed">
                Weatherproof solid brass medallions, interactive oral histories, and 100-year immutable cloud vaults. Preserve your lineage beyond a headstone.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#packages" className="w-full sm:w-auto">
                  <Button variant="bronze" size="lg" className="w-full sm:w-auto min-w-[220px]">
                    <span>View Heritage Packages</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#vault-preview" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[220px]">
                    <span>Experience Vault Demo</span>
                  </Button>
                </a>
              </div>

              {/* Value Badges */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-bronze-400 font-semibold mb-0.5">Physical Hardware</div>
                  <div className="text-lg font-serif text-sand-100">Solid Brass &amp; Ceramic</div>
                  <div className="text-xs text-sand-400">Precision QR + NFC dual-tap</div>
                </div>
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-terracotta-400 font-semibold mb-0.5">Longevity Guarantee</div>
                  <div className="text-lg font-serif text-sand-100">100-Year Cloud Escrow</div>
                  <div className="text-xs text-sand-400">Decentralized immutable storage</div>
                </div>
                <div className="p-3.5 rounded-xl border border-sand-500/10 bg-void-light/50 backdrop-blur-sm text-left">
                  <div className="text-xs uppercase tracking-wider text-coral-400 font-semibold mb-0.5">Oral History Archive</div>
                  <div className="text-lg font-serif text-sand-100">Living Voice Waveforms</div>
                  <div className="text-xs text-sand-400">Pristine lossless audio playback</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sand-500/60 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-5 h-8 rounded-full border border-sand-500/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-sand-400" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-sand-500">Scroll</span>
        </div>
      </motion.div>
    </section>
  )
}


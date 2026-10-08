'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { 
  Check, Sparkles, Building2, Heart, ShieldCheck, 
  Video, QrCode, Award, ArrowRight 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TieredPackagesProps {
  currentLens?: 'b2b' | 'd2c'
  onSelectPackage?: (packageName: string, category: 'b2b' | 'd2c') => void
}

export function TieredPackages({ currentLens = 'b2b', onSelectPackage }: TieredPackagesProps) {
  const [activeTab, setActiveTab] = useState<'b2b' | 'd2c'>(currentLens)

  // Sync tab with external lens when lens changes
  React.useEffect(() => {
    setActiveTab(currentLens)
  }, [currentLens])

  const b2bPackages = [
    {
      id: 'b2b-basic',
      name: 'White-Label Basic',
      badge: 'Operator Entry',
      price: '$150 – $400',
      period: 'per service',
      retention: 'Operators retain 40–50%',
      description: 'Plug-and-play livestreaming and branded memorial event pages delivered directly under your firm’s name.',
      features: [
        'Private high-definition chapel livestreaming',
        'Fully white-labeled under your funeral home domain',
        'Interactive guestbook with real-time moderation',
        'Automated master MP4 recording delivered within 1 hour',
        'Embeddable player for your existing website',
        'Standard 7-day operator support'
      ],
      isPopular: false,
      ctaText: 'Start Partner Pilot',
      icon: Video
    },
    {
      id: 'b2b-plus',
      name: 'Heritage Plus',
      badge: 'Most Chosen by Partners',
      price: '$500 – $1,200',
      period: 'per service',
      retention: 'Operators retain 50–60%',
      description: 'Comprehensive digital heritage platform transforming one-time services into lasting family relationships.',
      features: [
        'Everything in White-Label Basic, plus:',
        'Permanent interactive tribute vault with lifetime hosting',
        'Oral history voice memories with audio waveforms',
        'Starter pack of 5 weatherproof QR & NFC headstone medallions',
        'Automated AI-assisted service highlight reel',
        'Condolences exportable to heirloom hardcover print format',
        'Priority same-day technician dispatch'
      ],
      isPopular: true,
      ctaText: 'Deploy Heritage Plus',
      icon: Award
    },
    {
      id: 'b2b-flagship',
      name: 'Sovereign Flagship',
      badge: 'Enterprise Cemetery',
      price: 'Custom Quote',
      period: 'enterprise agreement',
      retention: 'Volume Wholesale Margin',
      description: 'Complete digital and physical transformation for multi-location funeral homes and historic cemeteries.',
      features: [
        'Everything in Heritage Plus, plus:',
        'Cemetery GIS interactive map & grave locator integration',
        'Multi-chapel automated broadcast PTZ camera setup',
        'Custom engraved solid jeweler-grade brass medallions',
        'Optional spatial capture & 3D eulogy recording',
        'Direct integrations with CemSites, Passare, and SRS Computing',
        'Dedicated partner success manager & staff onboarding'
      ],
      isPopular: false,
      ctaText: 'Request Enterprise Proposal',
      icon: Building2
    }
  ]

  const d2cPackages = [
    {
      id: 'd2c-essential',
      name: 'Essential Tribute',
      badge: 'Digital Foundation',
      price: '$199',
      period: 'one-time payment',
      retention: 'Lifetime access',
      description: 'A dignified, permanent online gathering space celebrating their life with zero advertisements or subscription fees.',
      features: [
        'Permanent online memorial page with lifetime cloud hosting',
        'Photo & video tribute gallery (up to 250 high-res assets)',
        'Interactive family guestbook & story sharing wall',
        'Private security controls & shareable QR code',
        'Mobile-optimized for visiting family anywhere in the world',
        'Downloadable full memorial archive at any time'
      ],
      isPopular: false,
      ctaText: 'Create Essential Tribute',
      icon: Heart
    },
    {
      id: 'd2c-vault',
      name: 'Heritage Vault',
      badge: 'Recommended for Families',
      price: '$499',
      period: 'one-time payment',
      retention: 'Physical + Digital',
      description: 'Connects the physical resting place directly to an immortal digital vault containing their genuine voice and story.',
      features: [
        'Everything in Essential Tribute, plus:',
        'Solid weatherproof brass QR & NFC medallion shipped to you',
        'Lifetime physical-to-digital link: tap phone on medallion to open',
        'Oral history voice recorder with waveform memory audio player',
        'Biographical milestone timeline (birth, family milestones, achievements)',
        'Genealogy & family tree lineage linkage',
        '100-year immutable digital preservation guarantee'
      ],
      isPopular: true,
      ctaText: 'Claim Heritage Vault',
      icon: QrCode
    },
    {
      id: 'd2c-immortal',
      name: 'Immortality Keepsake',
      badge: 'Heirloom Heritage',
      price: '$1,199',
      period: 'one-time payment',
      retention: 'Generational Heirloom',
      description: 'The highest standard of family heritage preservation with dual jeweler-grade medallions and studio audio remastering.',
      features: [
        'Everything in Heritage Vault, plus:',
        'Dual Medallions: 1 Weatherproof Brass + 1 Handcrafted Ceramic Medallion',
        'Custom walnut heirloom display presentation box',
        'Studio audio remastering for legacy voicemails and family recordings',
        'Unlimited high-resolution media storage with RAW file archiving',
        'Priority reservation for premium spatial capture sessions',
        'White-glove family archival concierge assistance'
      ],
      isPopular: false,
      ctaText: 'Secure Immortality Keepsake',
      icon: Sparkles
    }
  ]

  const currentPackages = activeTab === 'b2b' ? b2bPackages : d2cPackages

  return (
    <section id="packages" className="relative py-24 px-6 bg-void border-t border-white/5 overflow-hidden">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-300 uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Transparent Tiered Packages</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Built for modern operators. <br className="hidden sm:inline" />
            Designed for lasting family legacy.
          </h2>

          <p className="text-ghost text-lg leading-relaxed mb-10">
            Choose wholesale partnership terms for your funeral firm or cemetery, or secure a direct family heritage package. No subscriptions, no hostage data.
          </p>

          {/* Segmented Lens / Package Toggle */}
          <div className="inline-flex p-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-inner max-w-full">
            <button
              onClick={() => setActiveTab('b2b')}
              className={cn(
                'relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                activeTab === 'b2b'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              {activeTab === 'b2b' && (
                <motion.div
                  layoutId="packageTabIndicator"
                  className="absolute inset-0 rounded-full bg-primary-500 shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Building2 className="relative z-10 w-4 h-4" />
              <span className="relative z-10">For Cemeteries & Funeral Homes</span>
            </button>

            <button
              onClick={() => setActiveTab('d2c')}
              className={cn(
                'relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                activeTab === 'd2c'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              {activeTab === 'd2c' && (
                <motion.div
                  layoutId="packageTabIndicator"
                  className="absolute inset-0 rounded-full bg-primary-500 shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Heart className="relative z-10 w-4 h-4" />
              <span className="relative z-10">For Families & Keepsakes</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {currentPackages.map((pkg, idx) => {
              const IconComponent = pkg.icon
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="flex flex-col"
                >
                  <GlassCard
                    className={cn(
                      'flex-1 flex flex-col p-8',
                      pkg.isPopular && 'border-primary-500/60 ring-1 ring-primary-500/40 shadow-glow'
                    )}
                    hoverEffect={true}
                  >
                    {/* Header / Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-primary-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={cn(
                        'text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider',
                        pkg.isPopular
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      )}>
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Name & Pricing */}
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-sm text-ghost mb-6 min-h-[40px] leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl lg:text-4xl font-heading font-bold text-white">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-ghost uppercase tracking-wider">
                          / {pkg.period}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-accent-300">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{pkg.retention}</span>
                      </div>
                    </div>

                    {/* Feature List */}
                    <div className="flex-1 mb-8">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                        Included in this package:
                      </h4>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 text-sm text-neutral-300 leading-snug">
                            <div className="mt-0.5 p-0.5 rounded-full bg-primary-500/20 text-primary-400 shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={pkg.isPopular ? 'primary' : 'secondary'}
                      size="md"
                      fullWidth
                      onClick={() => onSelectPackage?.(pkg.name, activeTab)}
                      className="group"
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </GlassCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Guarantee Footnote */}
        <div className="mt-16 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-full bg-primary-500/10 text-primary-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">The Operator Trust Covenant</h4>
              <p className="text-xs text-ghost">Family data is 100% owned by the partner firm or family. We never sell data, serve ads, or hold archives hostage.</p>
            </div>
          </div>
          <a
            href="mailto:christian@thewrightguy.com?subject=Eternavue%20%E2%80%94%20Partnership%20or%20Family%20Inquiry"
            className="text-xs font-semibold text-primary-300 hover:text-primary-200 underline whitespace-nowrap"
          >
            Questions? Speak directly with founder →
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { DollarSign, TrendingUp, Users, Clock, ShieldCheck, ChevronRight } from 'lucide-react'

export function PartnerCalculator() {
  const [monthlyServices, setMonthlyServices] = useState<number>(25)
  const [selectedTier, setSelectedTier] = useState<'basic' | 'plus' | 'flagship'>('plus')
  const [medallionAttachRate, setMedallionAttachRate] = useState<number>(45)

  const monthlyServicesInputId = useId()
  const medallionAttachRateInputId = useId()

  const tierData = {
    basic: {
      name: 'Basic Stream & Memorial',
      retailPrice: 350,
      wholesaleCost: 175,
      margin: 175,
    },
    plus: {
      name: 'Heritage Plus & Keepsake',
      retailPrice: 850,
      wholesaleCost: 380,
      margin: 470,
    },
    flagship: {
      name: 'Sovereign Flagship & GIS',
      retailPrice: 1650,
      wholesaleCost: 650,
      margin: 1000,
    },
  }

  const currentTier = tierData[selectedTier]
  const annualServices = monthlyServices * 12
  
  // Calculate annual margin from service packages
  const annualServiceMargin = annualServices * currentTier.margin
  
  // Additional revenue from physical QR/NFC Medallion sales (approx $120 retained margin per medallion sold)
  const medallionSalesAnnual = Math.round(annualServices * (medallionAttachRate / 100))
  const annualMedallionMargin = medallionSalesAnnual * 120
  
  // Total Retained Annual Margin
  const totalAnnualRevenue = annualServiceMargin + annualMedallionMargin
  const monthlyRevenue = Math.round(totalAnnualRevenue / 12)
  const hoursSavedAnnual = Math.round(annualServices * 2.5) // ~2.5 hours saved per service in tech/streaming setup

  const contactHref = `mailto:christian@thewrightguy.com?subject=Wholesale%20Partner%20Inquiry%20%E2%80%94%20${monthlyServices}%20services/mo&body=Hello%20Christian,%0A%0AWe%20conduct%20approximately%20${monthlyServices}%20services%20per%20month%20and%20are%20interested%20in%20becoming%20a%20partner%20funeral%20home%20/%20cemetery%20for%20Eternavue's%20${currentTier.name}%20tier.%0A%0APlease%20let%20us%20know%20how%20to%20schedule%20an%20operator-to-operator%20demonstration.%0A%0AThank%20you.`

  return (
    <section id="partner-calculator" className="relative py-24 px-6 bg-neutral-950 border-t border-white/5 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-300 uppercase tracking-widest mb-4">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Interactive Wholesale Economics</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Calculate your firm’s retained annual revenue.
          </h2>

          <p className="text-ghost text-lg leading-relaxed">
            See the exact new high-margin revenue your cemetery or funeral home retains each year by offering modern white-label digital memorials and physical QR medallions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Card */}
          <div className="lg:col-span-7 flex flex-col">
            <GlassCard className="p-8 sm:p-10 flex-1 flex flex-col justify-between" hoverEffect={false}>
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  Partner Operating Assumptions
                </h3>
                <p className="text-sm text-ghost mb-8">
                  Adjust your service volume and package mix to see real retained earnings.
                </p>

                {/* Slider 1: Monthly Services */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor={monthlyServicesInputId} className="text-sm font-medium text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-400" />
                      <span>Monthly Services Conducted</span>
                    </label>
                    <span className="text-xl font-heading font-bold text-primary-300 px-3 py-1 rounded-lg bg-neutral-800 border border-neutral-700">
                      {monthlyServices} <span className="text-xs text-ghost font-normal">/ mo</span>
                    </span>
                  </div>
                  <input
                    id={monthlyServicesInputId}
                    type="range"
                    min={5}
                    max={120}
                    step={5}
                    value={monthlyServices}
                    onChange={(e) => setMonthlyServices(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    aria-label="Monthly Services Conducted"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-2">
                    <span>5 (Boutique)</span>
                    <span>25 (Average)</span>
                    <span>60 (High Volume)</span>
                    <span>120+ (Metro)</span>
                  </div>
                </div>

                {/* Package Tier Selection */}
                <div className="mb-8">
                  <span className="text-sm font-medium text-white mb-3 block">
                    Target Package Offered to Families
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'basic', label: 'Basic Stream', price: '$175 margin' },
                      { key: 'plus', label: 'Heritage Plus', price: '$470 margin' },
                      { key: 'flagship', label: 'Flagship GIS', price: '$1,000 margin' },
                    ].map((tier) => (
                      <button
                        key={tier.key}
                        onClick={() => setSelectedTier(tier.key as 'basic' | 'plus' | 'flagship')}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          selectedTier === tier.key
                            ? 'bg-primary-500/15 border-primary-500/60 ring-1 ring-primary-500/30'
                            : 'bg-neutral-800/60 border-neutral-700/60 hover:border-neutral-600'
                        }`}
                      >
                        <div className="text-sm font-semibold text-white mb-1">{tier.label}</div>
                        <div className="text-xs text-accent-300 font-mono font-medium">{tier.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 2: Medallion Attach Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor={medallionAttachRateInputId} className="text-sm font-medium text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent-400" />
                      <span>Physical QR/NFC Medallion Attach Rate</span>
                    </label>
                    <span className="text-xl font-heading font-bold text-accent-300 px-3 py-1 rounded-lg bg-neutral-800 border border-neutral-700">
                      {medallionAttachRate}%
                    </span>
                  </div>
                  <input
                    id={medallionAttachRateInputId}
                    type="range"
                    min={10}
                    max={90}
                    step={5}
                    value={medallionAttachRate}
                    onChange={(e) => setMedallionAttachRate(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    aria-label="Physical QR/NFC Medallion Attach Rate"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-2">
                    <span>10% (Conservative)</span>
                    <span>45% (Expected)</span>
                    <span>90% (Full Inclusion)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-ghost">
                <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Figures reflect net retained margin after all wholesale cloud, streaming, and hardware costs.</span>
              </div>
            </GlassCard>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 flex flex-col">
            <GlassCard className="p-8 sm:p-10 flex-1 flex flex-col justify-between bg-gradient-to-br from-neutral-900/90 to-neutral-950 border-primary-500/30" hoverEffect={false}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/15 border border-accent-500/30 text-accent-300 text-xs font-semibold uppercase tracking-wider mb-6">
                  <span>Projected Annual Return</span>
                </div>

                <div className="mb-8">
                  <div className="text-xs text-ghost uppercase tracking-wider font-semibold mb-1">
                    New Annual Net Margin Retained
                  </div>
                  <motion.div
                    key={totalAnnualRevenue}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl sm:text-6xl font-heading font-extrabold text-white tracking-tight"
                  >
                    ${totalAnnualRevenue.toLocaleString()}
                  </motion.div>
                  <div className="text-sm text-primary-300 mt-2 font-medium">
                    +${monthlyRevenue.toLocaleString()} in fresh monthly recurring cash flow
                  </div>
                </div>

                {/* Key Metrics Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                    <span className="text-sm text-neutral-300">Annual Services Supported</span>
                    <span className="text-sm font-semibold font-mono text-white">{annualServices} services</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                    <span className="text-sm text-neutral-300">Physical Medallions Distributed</span>
                    <span className="text-sm font-semibold font-mono text-white">{medallionSalesAnnual} units</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                    <span className="text-sm text-neutral-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <span>Operator Labor Saved</span>
                    </span>
                    <span className="text-sm font-semibold font-mono text-primary-300">~{hoursSavedAnnual} hrs/yr</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <a href={contactHref} className="block w-full">
                  <Button variant="primary" size="lg" fullWidth className="group py-4 text-base">
                    <span>Lock In Your Partner Territory</span>
                    <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <p className="text-[11px] text-center text-neutral-500 mt-3">
                  Operator-to-operator pilot · Zero long-term lock-in · 30-day proof of concept
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

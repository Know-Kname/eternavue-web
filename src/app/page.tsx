'use client'

import React, { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/content/Hero'
import { TieredPackages } from '@/components/content/TieredPackages'
import { PartnerCalculator } from '@/components/content/PartnerCalculator'
import { HeritageVaultPreview } from '@/components/content/HeritageVaultPreview'
import { CTA } from '@/components/content/CTA'
import { GlassCard } from '@/components/ui/GlassCard'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ChevronDown,
  Calendar, ShieldCheck, Layers, Building2, CheckCircle2
} from 'lucide-react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const contactHref = 'mailto:christian@thewrightguy.com?subject=Eternavue%20%E2%80%94%20Partner%20inquiry'

  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: 'easeOut' }
  }

  const faqs = [
    {
      q: 'Is Eternavue a hologram company?',
      a: "No. Eternavue is a sovereign digital memorial infrastructure platform built for both independent deathcare operators and direct family legacy preservation. While volumetric/holographic capture exists in our bespoke Sovereign tier, our core everyday products are white-label livestreaming, digital graveside records, oral history archives, and physical solid brass QR/NFC medallions."
    },
    {
      q: 'How does the wholesale partner model work for cemeteries and funeral homes?',
      a: 'Every family touchpoint carries your brand — your name, your domain, and your visual identity. Eternavue operates as the invisible infrastructure underneath. Operators typically retain 40% to 60% of the family-facing price under standard wholesale terms, generating a high-margin recurring software and service revenue stream with zero upfront CAPEX.'
    },
    {
      q: 'Can families purchase Heritage Vault packages directly?',
      a: 'Yes. Families can order direct consumer Heritage Packages (starting at $199) which include physical solid brass or ceramic memorial medallions with precision QR and NFC dual-links, lifetime oral history voice archival, and 100-year immutable cloud storage. If your cemetery is an Eternavue partner, the vault integrates directly into your institution’s digital burial map.'
    },
    {
      q: 'What makes Eternavue different from existing funeral livestreaming vendors?',
      a: 'Incumbents sell single-purpose point tools designed solely for funeral chapels. Eternavue is cemetery-native, built to solve the long quiet century after the service. We bridge physical cemetery monuments with digital memory records, oral histories, and family genealogy, creating long-term memorial-data gravity.'
    },
    {
      q: 'Who built Eternavue?',
      a: 'Christian Wright Hughes — fourth-generation operator of Detroit Memorial Park (est. 1925), Michigan’s first Black-owned cemetery. Eternavue was engineered by an operator who understands perpetual care, chain-of-custody, and the sacred trust families place in memorial institutions.'
    },
    {
      q: 'When does the platform go live?',
      a: 'The pilot launches at Detroit Memorial Park the week of July 28, 2026 — delivering branded streams, live family portals, and physical medallion deployments. We are actively conducting partner deliberations with forward-thinking cemetery operators and funeral directors for our secondary expansion tranche.'
    },
  ]

  return (
    <PageWrapper onHeaderCtaClick={() => window.location.assign(contactHref)}>
      {/* 1. Dual-Lens Hero Section */}
      <Hero
        onCtaClick={() => window.location.assign(contactHref)}
      />

      {/* 2. Flagship Pedigree Trust Signal Banner */}
      <section className="bg-void border-y border-sand-500/10 py-7 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-terracotta-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-xs uppercase tracking-widest font-semibold">Operator-Built Infrastructure</span>
          </div>
          <span className="hidden sm:inline text-sand-500/40">•</span>
          <p className="text-sm text-sand-300 font-light">
            Anchored by <span className="font-semibold text-sand-100">Detroit Memorial Park (est. 1925)</span> — Michigan&apos;s historic centenary cemetery.
          </p>
        </div>
      </section>

      {/* 3. Market Landscape & Industry Opportunity */}
      <section className="border-b border-sand-500/10 bg-void-light/50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: '~19,000', label: 'US Cemeteries' },
              { icon: Building2, value: '~29,000', label: 'US Funeral Homes' },
              { icon: Layers, value: '~8%', label: 'Cemetery Tech Penetration' },
              { icon: Calendar, value: '1925', label: 'Detroit Flagship Lineage' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-500/10 text-terracotta-400">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="mb-1 font-serif text-3xl font-light text-sand-100 md:text-4xl">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-sand-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs sm:text-sm text-sand-400 max-w-2xl mx-auto font-light leading-relaxed">
            Existing deathcare vendors target funeral homes with commoditized streaming. The 19,000+ cemeteries nationwide remain structurally underserved—leaving perpetual digital heritage on the table.
          </p>
        </div>
      </section>

      {/* 4. Tiered Packages: Dual B2B Wholesale vs D2C Matrix */}
      <TieredPackages />

      {/* 5. Partner Margin Economics Calculator */}
      <PartnerCalculator />

      {/* 6. Live Interactive Heritage Vault Experience */}
      <HeritageVaultPreview />

      {/* 7. Founder Pedigree & The Operator Moat */}
      <section id="about" className="relative overflow-hidden bg-void py-28 px-6 border-t border-sand-500/10">
        <div className="pointer-events-none absolute right-0 top-1/4 h-125 w-125 rounded-full bg-bronze-500/10 blur-[140px]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-terracotta-500/30 bg-terracotta-500/10 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold text-terracotta-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Centennial Operator Provenance</span>
              </div>
              
              <h2 className="mb-6 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-100 leading-tight">
                Built by someone who actually runs a cemetery.
              </h2>
              
              <p className="mb-6 text-base sm:text-lg leading-relaxed text-sand-300 font-light">
                Christian Wright Hughes is the fourth-generation operator of Detroit Memorial Park — Michigan’s first Black-owned cemetery, established 1925. Notable interments include inventor Elijah McCoy, Motown icon Florence Ballard, and Congressman John Conyers Jr.
              </p>
              
              <p className="mb-6 text-base sm:text-lg leading-relaxed text-sand-300 font-light">
                Eternavue was created because software vendors did not understand the solemn gravity of perpetual care. Incumbents build disposable streaming tools; Eternavue builds an enduring digital lineage layer that stays relevant 50 years after the flowers fade.
              </p>
              
              <div className="p-4 rounded-xl border border-sand-500/15 bg-void-light/70 text-xs sm:text-sm text-sand-400 space-y-1">
                <div className="font-semibold text-sand-200">Sovereign Venture Governance:</div>
                <p>Eternavue is an independent technology platform. Detroit Memorial Park serves as the initial flagship partner and testing ground—not parent or majority owner.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-8 space-y-6 border-sand-500/15" hoverEffect={false}>
                <h3 className="font-serif text-2xl font-light text-sand-100">
                  The Four Structural Moats
                </h3>
                
                {[
                  { title: 'Operational Workflow Lock-In', desc: 'Eternavue binds into service intake, graveside coordination, and record books. Replacement becomes operationally disruptive.' },
                  { title: 'Memorial-Data Gravity', desc: 'Every service adds oral histories, family tributes, and digital keepsakes that compound indefinitely under your institution.' },
                  { title: 'Operator-to-Operator Network', desc: 'Deathcare runs on inter-generational trust. Independent operators adopt what peer institutions have proven in production.' },
                  { title: 'Hardware + Cloud Hybrid Moat', desc: 'Weatherproof solid brass QR/NFC medallions create permanent physical touchpoints that pure software vendors cannot dislodge.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-terracotta-500/15 text-terracotta-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-semibold text-sand-100">{item.title}</div>
                      <div className="text-xs text-sand-400 leading-relaxed font-light">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Pilot Stage & De-risking Timeline */}
      <section className="bg-void-light/40 border-y border-sand-500/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bronze-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Commercial Deployment Horizon</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
            Real transactions. Paying families. Live pilot.
          </h2>
          <p className="text-base text-sand-300 font-light max-w-2xl mx-auto leading-relaxed">
            The Detroit Memorial Park production pilot commences the week of <span className="font-semibold text-sand-100">July 28, 2026</span>. We are now selecting partner cemeteries and funeral homes for Wave Two onboarding.
          </p>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="bg-void py-28 px-6 border-b border-sand-500/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terracotta-400 font-semibold mb-3">
              <span>Clarity &amp; Transparency</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-100">
              The questions operators &amp; families ask.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="group w-full rounded-2xl border border-sand-500/15 bg-void-light/60 p-6 text-left transition-colors hover:border-terracotta-500/40 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sand-100 font-medium text-base sm:text-lg">{faq.q}</h3>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-sand-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-terracotta-400' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-sand-500/10 pt-4 text-sm leading-relaxed text-sand-300 font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <CTA
        title="Ready to build your digital memorial layer?"
        description="Whether you are an independent deathcare operator looking to retain 40–60% margin under your own brand, or a family seeking an immutable centenary vault, we invite you to connect."
        primaryButtonText="Partner Inquiry"
        primaryButtonLink={contactHref}
        secondaryButtonText="Explore Packages"
        secondaryButtonLink="#packages"
      />
    </PageWrapper>
  )
}

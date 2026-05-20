'use client'

import React, { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/content/Hero'
import { GlassCard } from '@/components/ui/GlassCard'
import { CTA } from '@/components/content/CTA'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  Radio, FileText, Sparkles, ChevronDown,
  Calendar, ShieldCheck, Layers, Building2
} from 'lucide-react'
import { NeonIcon } from '@/components/ui/NeonIcon'
import { GlitchText } from '@/components/ui/GlitchText'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const servicesBgY = useTransform(scrollY, [0, 1600], [0, -120], { clamp: false })
  const aboutBgY = useTransform(scrollY, [0, 2600], [0, 80], { clamp: false })

  const contactHref = 'mailto:christian@thewrightguy.com?subject=Eternavue%20%E2%80%94%20Partner%20inquiry'

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: 'easeOut' }
  }

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  }

  const faqs = [
    {
      q: 'Is Eternavue a hologram company?',
      a: "No. Eternavue is a white-label digital memorial platform built for cemeteries and funeral homes. Holographic capture lives in our Premium tier — never the headline, never the introduction. The everyday product is livestreamed services, lasting tribute pages, and family keepsakes."
    },
    {
      q: 'How does the white-label model work?',
      a: 'Every family touchpoint carries your brand — your name, your domain, your visual identity. Eternavue is the infrastructure underneath, invisible by design. Families see their cemetery or funeral home, not Eternavue. The data — tribute pages, recordings, guestbooks, keepsakes — belongs to you. We can put that in writing.'
    },
    {
      q: 'What does it cost?',
      a: 'Per-service, with revenue share. Basic (livestream + branded memorial page) runs $150–$400. Plus (everything in Basic plus a lasting tribute page, guestbook, highlight reel, keepsakes) runs $500–$1,200. Premium with holographic capture is by quote. Operators retain 40–60% of the family-facing price under typical white-label terms.'
    },
    {
      q: 'Who built it?',
      a: 'Christian Wright Hughes — fourth-generation steward of Detroit Memorial Park (est. 1925), Michigan’s first Black-owned cemetery. Eternavue is built by an operator, for operators, in a market that moves on operator-to-operator trust.'
    },
    {
      q: 'When does the platform go live?',
      a: 'The pilot launches at Detroit Memorial Park the week of July 28, 2026 — paying families, branded streams, recordings delivered. We are taking conversations with a small number of cemetery and funeral-home partners interested in being the second wave.'
    },
  ]

  return (
    <PageWrapper onHeaderCtaClick={() => window.location.assign(contactHref)}>
      {/* Hero Section */}
      <Hero
        title="the digital memorial layer for cemeteries and funeral homes"
        subtitle="Livestreamed services, lasting online tributes, and family keepsakes — all under your brand. Built by people who have operated a cemetery since 1925. Not a tech company that discovered grief."
        ctaText="Talk to us"
        onCtaClick={() => window.location.assign(contactHref)}
      />

      {/* Trust Signal Bar */}
      <section className="bg-void border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-ghost font-medium"
          >
            Operator-built · <span className="font-bold text-primary-300">Detroit Memorial Park, est. 1925</span> · Flagship partner
          </motion.p>
        </div>
      </section>

      {/* Stats Section — cemetery white-space */}
      <section className="border-b border-white/5 bg-neutral-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: '~19,000', label: 'US cemeteries' },
              { icon: Building2, value: '~29,000', label: 'US funeral homes' },
              { icon: Layers, value: '~8%', label: 'White-label cemetery penetration' },
              { icon: Calendar, value: '1925', label: 'DMP flagship lineage' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <NeonIcon icon={stat.icon} className="mx-auto mb-3 h-6 w-6 text-primary-400" />
                <div className="mb-1 font-heading text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="text-sm text-ghost">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ghost">
            Nearly every named competitor sells almost exclusively to funeral homes. The cemetery channel is structurally underserved.
          </p>
        </div>
      </section>

      {/* Tier Ladder — Basic / Plus / Premium */}
      <section id="tiers" className="relative overflow-hidden bg-void py-24 px-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : servicesBgY }}
            className="absolute -right-20 top-1/4 h-[600px] w-[600px] rounded-full bg-primary-500/20 blur-[110px]"
          />
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : servicesBgY }}
            className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent-500/20 blur-[110px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp} className="mb-6 text-4xl font-bold text-white md:text-5xl">
              <GlitchText text="the product ladder" className="text-glow text-4xl md:text-5xl font-heading lowercase" />
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="mx-auto max-w-2xl text-xl text-ghost">
              One platform. Three tiers. The everyday product is Basic and Plus. Premium is the high-margin halo, never the headline.
            </motion.p>
          </div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Basic */}
            <GlassCard className="p-8 flex flex-col" hoverEffect={true}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                <NeonIcon icon={Radio} className="h-6 w-6 text-current" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold lowercase text-white">basic</h3>
              <p className="mb-4 text-sm font-medium text-primary-300">$150–$400 / service</p>
              <p className="mb-6 text-sm text-ghost flex-grow">
                Livestreamed service + a branded memorial event page. Watchable from anywhere. The entry tier and the doorway to the relationship.
              </p>
              <ul className="space-y-2 text-sm text-ghost">
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>HD stream from chapel or graveside</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Branded event page (your domain)</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>12-month VOD replay</li>
              </ul>
            </GlassCard>

            {/* Plus — emphasized */}
            <GlassCard className="p-8 flex flex-col border-2 border-primary-500/40" hoverEffect={true}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
                <NeonIcon icon={FileText} className="h-6 w-6 text-current" />
              </div>
              <div className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-accent-500/30 bg-accent-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-300">
                Most partners start here
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold lowercase text-white">plus</h3>
              <p className="mb-4 text-sm font-medium text-primary-300">$500–$1,200 / service</p>
              <p className="mb-6 text-sm text-ghost flex-grow">
                Everything in Basic, plus a lasting online tribute page, guestbook, highlight reel, and digital keepsakes families actually keep.
              </p>
              <ul className="space-y-2 text-sm text-ghost">
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Tribute page + guestbook</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Highlight reel (5-day SLA)</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Digital keepsakes for the family</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Anniversary touch automation</li>
              </ul>
            </GlassCard>

            {/* Premium */}
            <GlassCard className="p-8 flex flex-col" hoverEffect={true}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                <NeonIcon icon={Sparkles} className="h-6 w-6 text-current" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold lowercase text-white">premium</h3>
              <p className="mb-4 text-sm font-medium text-primary-300">By quote</p>
              <p className="mb-6 text-sm text-ghost flex-grow">
                Everything in Plus, plus holographic capture or projection — a preserved presence families can return to. R&amp;D-stage; per-event production economics confirmed before pricing.
              </p>
              <ul className="space-y-2 text-sm text-ghost">
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Volumetric capture (partner-delivered)</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Display options (sub-$10K to enterprise)</li>
                <li className="flex items-start"><span className="mr-2 text-accent-400">•</span>Preserved presence, not synthetic simulation</li>
              </ul>
            </GlassCard>
          </motion.div>

          <p className="mt-12 text-center text-sm text-ghost">
            Operator retains 40–60% of the family-facing price under typical white-label revenue share. The everyday Basic and Plus tiers are the revenue engine.
          </p>
        </div>
      </section>

      {/* About / Founder Section */}
      <section id="about" className="relative overflow-hidden bg-neutral-950 py-24 px-6">
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : aboutBgY }}
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-[120px]"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-sm text-accent-300">
                <NeonIcon icon={ShieldCheck} className="h-4 w-4 text-accent-300" />
                <span>Operator-built</span>
              </div>
              <h2 className="mb-6 font-heading text-4xl font-bold lowercase text-white md:text-5xl">
                built by someone who runs a cemetery.
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-ghost">
                Christian Wright Hughes is the fourth-generation steward of Detroit Memorial Park — Michigan’s first Black-owned cemetery, established 1925. Notable burials include Elijah McCoy, Florence Ballard, and Congressman John Conyers Jr.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-ghost">
                Eternavue exists because the platform he needed for his own institution did not exist on the market. The cemetery channel is structurally underserved — incumbents target funeral homes and the few cemetery vendors are weak on the work that actually matters: perpetual care, record systems, the long quiet decade after the service.
              </p>
              <p className="text-lg leading-relaxed text-ghost">
                Eternavue is a founder-owned independent venture. DMP is flagship partner and first customer — not the owner, not the parent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8 space-y-6">
                <h3 className="font-heading text-2xl font-bold lowercase text-white">the moat we build</h3>
                {[
                  { title: 'Switching costs', desc: 'Eternavue integrates into your service workflow. Replacement becomes operationally painful.' },
                  { title: 'Memorial-data gravity', desc: 'Families’ tributes, recordings, and keepsakes accumulate. Your cemetery becomes the long-term service of record.' },
                  { title: 'Cemetery-network distribution', desc: 'Operator-to-operator referral compounds once two or more unaffiliated cemeteries are live.' },
                  { title: 'Tier-ladder bundling', desc: 'Incumbents sell point streaming products. Eternavue bundles streaming + tribute + keepsakes (+ optional Premium) into one workflow.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400">
                      <NeonIcon icon={Sparkles} className="h-4 w-4 text-primary-400" />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-ghost">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stage / Honest Status */}
      <section className="bg-void border-y border-white/5 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeInUp} className="mb-4 font-heading text-3xl font-bold lowercase text-white md:text-4xl">
            where we are today
          </motion.h2>
          <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="mb-2 text-lg text-ghost">
            Pre-revenue. MVP web platform in development. The Detroit Memorial Park pilot launches the week of <span className="font-semibold text-white">July 28, 2026</span> — real commercial transactions, paying families, branded streams.
          </motion.p>
          <motion.p {...fadeInUp} transition={{ delay: 0.2, duration: 0.8 }} className="text-sm text-ghost">
            The second unaffiliated cemetery is the real de-risking event. If you operate a cemetery or funeral home and you want to be in the next wave of partners, we want to hear from you.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-neutral-950 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp} className="mb-4 font-heading text-4xl font-bold lowercase text-white md:text-5xl">
              the questions we get
            </motion.h2>
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
                  className="group w-full rounded-xl border border-white/10 bg-black/60 p-6 text-left transition-colors hover:border-primary-500/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-white font-medium text-base">{faq.q}</h3>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-ghost transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary-300' : ''}`} />
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
                        <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-relaxed text-ghost">
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

      {/* Final CTA */}
      <CTA
        title="ready for a conversation?"
        description="If you operate a cemetery or funeral home and you want the digital relationship with your families to belong to you, get in touch. We are taking a small number of partner conversations between now and the DMP pilot launch."
        primaryButtonText="Email Christian"
        primaryButtonLink={contactHref}
        secondaryButtonText="Read the FAQ"
        secondaryButtonLink="#faq"
        variant="primary"
      />
    </PageWrapper>
  )
}

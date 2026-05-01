'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, PartyPopper, Building2, ArrowRight, Sparkles, X, Star, MessageCircle, Wand2, Eye } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/content/Hero'
import { CTA } from '@/components/content/CTA'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import { Marquee } from '@/components/ui/Marquee'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { BackgroundBeams } from '@/components/effects/BackgroundBeams'
import { Meteors } from '@/components/effects/Meteors'
import { TextGenerateEffect } from '@/components/effects/TextGenerateEffect'
import { MemorialBookingForm } from '@/components/forms/MemorialBookingForm'
import { EventInquiryForm } from '@/components/forms/EventInquiryForm'
import { CorporateContactForm } from '@/components/forms/CorporateContactForm'
import { AnimatePresence } from 'framer-motion'

/* ─── Reusable fade-up variant ──────────────────────────── */
const fadeUp = {
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-80px' },
  transition:  { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
}

/* ─── Marquee items ─────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Founded 1925',
  'Detroit Memorial Park',
  'Holographic Pioneers',
  '100+ Memorials Served',
  'Award-Winning Technology',
  'Warren, Michigan',
  'Trusted Since 1925',
  'Immersive Experiences',
]

/* ─── Stats ─────────────────────────────────────────────── */
const STATS = [
  { target: 500, suffix: '+', label: 'Moments Created' },
  { target: 100, suffix: '+', label: 'Memorials Served' },
  { target: 25,  suffix: '+', label: 'Corporate Partners' },
  { target: 1925, suffix: '',  label: 'Est. Year'         },
]

/* ─── Process steps ─────────────────────────────────────── */
const STEPS = [
  { icon: MessageCircle, step: 1, title: 'Consultation',
    desc: 'Share your vision with our team. We discuss your needs, timeline, and the story you want to tell.' },
  { icon: Wand2,         step: 2, title: 'Creation',
    desc: 'We craft custom holographic content integrating your photos, videos, and personal stories.' },
  { icon: Eye,           step: 3, title: 'Experience',
    desc: 'Watch as your vision comes to life through stunning, immersive holographic projection.' },
]

/* ─── Testimonials ──────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'The holographic memorial for my father was beyond anything I could have imagined. It brought his personality to life in such a beautiful, respectful way.',
    name:  'Sarah Mitchell',
    role:  'Family Memorial Client',
  },
  {
    quote: "Eternavue's holographic display at our product launch stopped traffic. Attendees couldn't stop talking about it. Best investment we've made.",
    name:  'David Chen',
    role:  'Marketing Director, Tech Innovations',
  },
  {
    quote: 'The holographic first dance moment at my clients\' wedding was absolutely magical. Guests were in tears of joy. Eternavue exceeded every expectation.',
    name:  'Jennifer Patel',
    role:  'Wedding Planner, Luxe Events',
  },
]

/* ════════════════════════════════════════════════════════ */

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedService, setSelectedService] = useState<'memorial' | 'event' | 'corporate' | null>(null)

  /* "How It Works" scroll-linked reveal */
  const howRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: howRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  function handleServiceInquiry(service: 'memorial' | 'event' | 'corporate') {
    setSelectedService(service)
    setShowContactForm(true)
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  function closeForm() {
    setShowContactForm(false)
    setSelectedService(null)
  }

  return (
    <PageWrapper onHeaderCtaClick={() => handleServiceInquiry('memorial')}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero
        title="Holographic Experiences That Honor Legacy"
        subtitle="Transform memories into immersive holographic tributes. From intimate memorials to grand celebrations, we bring stories to life through cutting-edge technology."
        ctaText="Request a Demo"
        onCtaClick={() => handleServiceInquiry('memorial')}
      />

      {/* ── Marquee Trust Strip ───────────────────────────── */}
      <section className="border-y border-white/[0.05] bg-space py-5">
        <Marquee
          items={MARQUEE_ITEMS}
          speed="35s"
          className="py-1"
          itemClassName="text-sm font-medium tracking-widest uppercase text-neutral-400"
          separator={<span className="mx-8 text-holographic-cyan/40">✦</span>}
        />
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-surface py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map(({ target, suffix, label }, i) => (
              <GlowCard key={label} delay={i * 0.08} className="p-8 text-center">
                <p className="mb-2 font-serif text-4xl text-holographic-cyan md:text-5xl">
                  <AnimatedCounter target={target} suffix={suffix} />
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">{label}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section id="services" className="relative overflow-hidden bg-space py-28 px-6">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <Meteors number={8} />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-violet/[0.04] blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-holographic-cyan/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.p {...fadeUp} className="mb-3 text-sm font-medium uppercase tracking-widest text-holographic-cyan">
              What We Do
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl font-normal text-white md:text-5xl lg:text-6xl"
            >
              <TextGenerateEffect words="Our Services" duration={0.5} staggerDuration={0.12} />
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto mt-4 max-w-xl text-lg text-neutral-400"
            >
              Cutting-edge holographic technology for the moments that matter most
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[minmax(280px,auto)]">

            {/* Memorial – large card */}
            <GlowCard
              delay={0}
              className="cursor-pointer p-10 md:col-span-2 md:row-span-2 flex flex-col justify-between group"
              spotlightColor="rgba(50, 184, 198, 0.1)"
            >
              <div onClick={() => handleServiceInquiry('memorial')}>
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-holographic-cyan/10 text-holographic-cyan transition-colors duration-300 group-hover:bg-holographic-cyan group-hover:text-space">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-serif text-3xl text-white">Memorial Services</h3>
                <p className="mb-8 max-w-md text-lg leading-relaxed text-neutral-300">
                  Honor loved ones with dignified holographic memorials that celebrate their life story, personality, and legacy in a way never before possible.
                </p>
                <ul className="mb-8 space-y-3">
                  {['Holographic tributes', 'Interactive life stories', 'Respectful presentation'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-neutral-400">
                      <Sparkles className="h-4 w-4 text-accent-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-accent-500 font-medium transition-transform duration-200 group-hover:translate-x-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </GlowCard>

            {/* Special Events */}
            <GlowCard
              delay={0.1}
              className="cursor-pointer p-8 flex flex-col justify-between group"
              spotlightColor="rgba(212, 165, 116, 0.1)"
            >
              <div onClick={() => handleServiceInquiry('event')}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-space">
                  <PartyPopper className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-serif text-2xl text-white">Special Events</h3>
                <p className="text-sm leading-relaxed text-neutral-300">
                  Add wow-factor to weddings and milestones with stunning holographic displays.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 transition-colors group-hover:text-white">
                Explore Events <ArrowRight className="h-4 w-4" />
              </div>
            </GlowCard>

            {/* Corporate */}
            <GlowCard
              delay={0.18}
              className="cursor-pointer p-8 flex flex-col justify-between group"
              spotlightColor="rgba(99, 102, 241, 0.1)"
            >
              <div onClick={() => handleServiceInquiry('corporate')}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-iris/10 text-iris transition-colors duration-300 group-hover:bg-iris group-hover:text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-serif text-2xl text-white">Corporate Solutions</h3>
                <p className="text-sm leading-relaxed text-neutral-300">
                  Stand out at trade shows and launches with unforgettable holographic experiences.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 transition-colors group-hover:text-white">
                Corporate Solutions <ArrowRight className="h-4 w-4" />
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface py-28 px-6" ref={howRef}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-holographic-cyan/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-20 text-center">
            <motion.p {...fadeUp} className="mb-3 text-sm font-medium uppercase tracking-widest text-holographic-cyan">
              The Process
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl font-normal text-white md:text-5xl lg:text-6xl"
            >
              How It Works
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto mt-4 max-w-xl text-lg text-neutral-400"
            >
              Simple process, extraordinary results
            </motion.p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Animated connecting line */}
            <div className="hidden md:block absolute top-10 left-[calc(16%+2rem)] right-[calc(16%+2rem)] h-px overflow-hidden rounded-full bg-white/5">
              <motion.div
                style={{ width: lineWidth }}
                className="h-full bg-gradient-to-r from-holographic-cyan/60 via-violet/60 to-accent-500/60"
              />
            </div>

            {STEPS.map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Icon ring */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-holographic-cyan/10 blur-xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-holographic-cyan/20 bg-surface shadow-[0_0_20px_rgba(50,184,198,0.15)]">
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-holographic-cyan text-xs font-bold text-space">
                      {step}
                    </span>
                    <Icon className="h-8 w-8 text-holographic-cyan" />
                  </div>
                </div>
                <h3 className="mb-3 font-serif text-xl text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section id="about" className="relative overflow-hidden bg-space py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-0 h-[400px] w-[400px] rounded-full bg-accent-500/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.p {...fadeUp} className="mb-3 text-sm font-medium uppercase tracking-widest text-holographic-cyan">
              Stories
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl font-normal text-white md:text-5xl lg:text-6xl"
            >
              Client Stories
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role }, i) => (
              <GlowCard key={name} delay={i * 0.1} className="flex flex-col justify-between p-8">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                {/* Quote mark */}
                <p className="mb-1 font-serif text-5xl leading-none text-accent-500/40">"</p>
                <p className="mb-6 flex-grow text-base leading-relaxed text-neutral-300 italic">
                  {quote}
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                  {/* Avatar placeholder */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-holographic-cyan/30 to-violet/30 text-sm font-bold text-white">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-neutral-500">{role}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ──────────────────────────────────── */}
      <AnimatePresence>
        {showContactForm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            id="contact-form"
            className="relative overflow-hidden border-t border-white/5 bg-surface py-24 px-6"
          >
            <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-holographic-cyan/5 blur-[100px]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <button
                onClick={closeForm}
                className="absolute -top-10 right-0 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" /> Close
              </button>
              {selectedService === 'memorial'  && <MemorialBookingForm />}
              {selectedService === 'event'     && <EventInquiryForm />}
              {selectedService === 'corporate' && <CorporateContactForm />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTA
        title="Ready to Create Something Extraordinary?"
        description="Let's discuss how holographic technology can transform your next memorial, event, or brand experience."
        primaryButtonText="Get Started Today"
        onPrimaryClick={() => handleServiceInquiry('memorial')}
        secondaryButtonText="View Our Portfolio"
        variant="primary"
      />
    </PageWrapper>
  )
}

'use client'

import React, { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/content/Hero'
import { GlassCard } from '@/components/ui/GlassCard'
import { CTA } from '@/components/content/CTA'
import { MemorialBookingForm } from '@/components/forms/MemorialBookingForm'
import { EventInquiryForm } from '@/components/forms/EventInquiryForm'
import { CorporateContactForm } from '@/components/forms/CorporateContactForm'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  Heart, PartyPopper, Building2, ArrowRight, Sparkles, X,
  Users, Award, MapPin, Clock,
  ChevronDown, Shield, Zap, Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NeonIcon } from '@/components/ui/NeonIcon'
import { GlitchText } from '@/components/ui/GlitchText'

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedService, setSelectedService] = useState<'memorial' | 'event' | 'corporate' | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const servicesBgY = useTransform(scrollY, [0, 1600], [0, -120], { clamp: false })
  const aboutBgY = useTransform(scrollY, [0, 2600], [0, 80], { clamp: false })

  const handleServiceInquiry = (service: 'memorial' | 'event' | 'corporate') => {
    setSelectedService(service)
    setShowContactForm(true)
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const closeForm = () => {
    setShowContactForm(false)
    setSelectedService(null)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  }

  const faqs = [
    {
      q: 'What is a holographic experience?',
      a: 'Eternavue uses advanced projection technology to create stunning, lifelike three-dimensional visuals. We combine custom content, lighting design, and spatial audio to produce immersive displays that captivate live audiences.'
    },
    {
      q: 'What types of events do you work with?',
      a: 'We serve a wide range of occasions — concerts, corporate launches, trade shows, brand activations, weddings, private celebrations, and memorial tributes. If it has an audience, we can make it extraordinary.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'For most events, 4-6 weeks gives us time for creative development and production. Larger corporate installations benefit from 6-8 weeks. We offer expedited timelines when needed — just ask.'
    },
    {
      q: 'What venues can accommodate holographic displays?',
      a: 'Our portable equipment works in most indoor venues — event halls, conference centers, hotels, concert spaces, and more. We handle all technical setup and teardown. A minimum space of 15x15 feet with controlled lighting is ideal.'
    },
    {
      q: 'How does pricing work?',
      a: 'Every project is custom-scoped based on the type of experience, venue requirements, and content complexity. We start with a free consultation to understand your goals, then provide a transparent estimate. No surprises.'
    },
  ]

  return (
    <PageWrapper onHeaderCtaClick={() => handleServiceInquiry('memorial')}>
      {/* Hero Section */}
      <Hero
        title="transforming ordinary events with holographic visuals"
        subtitle="Eternavue delivers stunning, high-quality holographic experiences that bring a touch of magic to every occasion — from intimate celebrations to large-scale productions."
        ctaText="Explore Our Work"
        onCtaClick={() => handleServiceInquiry('event')}
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
            Powered by <span className="font-bold text-primary-300">Eternavue Holographic Technology</span> &middot; Detroit-born innovation
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/5 bg-neutral-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '500+', label: 'Events Transformed' },
              { icon: Award, value: '98%', label: 'Client Satisfaction' },
              { icon: MapPin, value: '3', label: 'Michigan Locations' },
              { icon: Clock, value: '24/7', label: 'Production Support' },
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
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="services" className="relative overflow-hidden bg-void py-24 px-6">
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
              <GlitchText text="our services" className="text-glow text-4xl md:text-5xl font-heading lowercase" />
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="mx-auto max-w-2xl text-xl text-ghost">
              High-quality holographic visuals for every occasion
            </motion.p>
          </div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
          >
            {/* Memorial Services - Large Card */}
            <GlassCard className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
              <div id="memorial" onClick={() => handleServiceInquiry('memorial')}>
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-400 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                  <NeonIcon icon={Heart} className="h-8 w-8 text-current" />
                </div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white lowercase">holographic experiences</h3>
                <p className="mb-8 max-w-md text-lg text-ghost">
                  Immersive, lifelike holographic visuals that captivate audiences and create emotional impact — whether it&apos;s a tribute, a celebration, or a moment that demands to be unforgettable.
                </p>
                <ul className="space-y-3 mb-8">
                  {['High-quality 3D visuals', 'Customizable to your vision', 'Full-service production'].map((item, i) => (
                    <li key={i} className="flex items-center text-ghost">
                      <NeonIcon icon={Sparkles} className="mr-2 h-4 w-4 shrink-0 text-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center font-medium text-primary-300 transition-transform group-hover:translate-x-2">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>

            {/* Special Events */}
            <GlassCard className="p-8 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
              <div id="events" onClick={() => handleServiceInquiry('event')}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                  <NeonIcon icon={PartyPopper} className="h-6 w-6 text-current" />
                </div>
                <h3 className="mb-3 font-heading text-2xl font-bold lowercase text-white">events & celebrations</h3>
                <p className="mb-4 text-sm text-ghost">
                  Weddings, milestones, and private gatherings — elevated with holographic visuals that leave guests in awe.
                </p>
              </div>
              <div className="flex items-center text-sm text-ghost transition-colors group-hover:text-primary-300">
                Explore Events <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>

            {/* Corporate Solutions */}
            <GlassCard className="p-8 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
              <div id="corporate" onClick={() => handleServiceInquiry('corporate')}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                  <NeonIcon icon={Building2} className="h-6 w-6 text-current" />
                </div>
                <h3 className="mb-3 font-heading text-2xl font-bold lowercase text-white">corporate & brand</h3>
                <p className="mb-4 text-sm text-ghost">
                  Product launches, trade shows, and brand activations powered by holographic technology that commands attention.
                </p>
              </div>
              <div className="flex items-center text-sm text-ghost transition-colors group-hover:text-primary-300">
                Corporate Solutions <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="technology" className="bg-neutral-950 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 {...fadeInUp} className="mb-4 text-4xl font-bold text-white md:text-5xl">
              <GlitchText text="how it works" className="text-glow text-4xl md:text-5xl font-heading lowercase" />
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="text-xl text-ghost">
              From concept to showtime in three steps
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent md:block" />

            {[
              { step: 1, title: 'Consultation', desc: 'Tell us your vision. We map out the creative direction, technical requirements, and timeline for your event.' },
              { step: 2, title: 'Production', desc: 'Our team designs and produces custom holographic content — tailored to your brand, your story, your audience.' },
              { step: 3, title: 'Showtime', desc: 'We handle the full setup and technical execution. You and your guests experience the magic firsthand.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center relative z-10"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary-500/30 bg-neutral-900 text-2xl font-bold text-primary-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  {item.step}
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold lowercase text-white">{item.title.toLowerCase()}</h3>
                <p className="text-sm leading-relaxed text-ghost">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative overflow-hidden bg-void py-24 px-6">
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : aboutBgY }}
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-[120px]"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-sm text-accent-300">
                <NeonIcon icon={Shield} className="h-4 w-4 text-accent-300" />
                <span>Our Story</span>
              </div>
              <h2 className="mb-6 font-heading text-4xl font-bold lowercase text-white md:text-5xl">
                detroit-born. future-forward.
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-ghost">
                Eternavue was founded on a simple belief: technology should make people feel something. We specialize in high-quality holographic visuals that bring a sense of wonder to every occasion.
              </p>
              <p className="mb-8 leading-relaxed text-ghost">
                Our team of artists, engineers, and producers work together to create customizable experiences for the events industry, entertainment, advertising, corporate activations, and private celebrations. Every project is crafted to captivate your audience and leave a lasting impression.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, label: 'Reliable Production' },
                  { icon: Zap, label: 'Advanced Technology' },
                  { icon: Star, label: 'Custom Creative' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-ghost">
                    <NeonIcon icon={item.icon} className="h-5 w-5 text-primary-400" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8 space-y-6">
                <h3 className="font-heading text-2xl font-bold lowercase text-white">why eternavue?</h3>
                {[
                  { title: 'High-Quality Visuals', desc: 'Stunning holographic displays that captivate audiences and create emotional impact.' },
                  { title: 'Customizable Experiences', desc: 'Every project is tailored to your specific needs, brand, and creative vision.' },
                  { title: 'Versatile Applications', desc: 'From concerts to conferences, memorials to marketing — our technology adapts to any event.' },
                  { title: 'Full-Service Production', desc: 'We handle creative, technical setup, and on-site execution so you can focus on your guests.' },
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

      {/* Testimonials */}
      <section className="bg-neutral-950 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp} className="mb-4 text-4xl font-bold text-white md:text-5xl">
              <GlitchText text="client stories" className="text-glow-pink text-4xl md:text-5xl font-heading lowercase" />
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="text-lg text-ghost">
              Real experiences from the people we&apos;ve worked with
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Our holographic visuals brought a sense of awe and wonder to our concert. It was truly a one-of-a-kind experience.',
                name: 'Marcus Thompson',
                role: 'Event Producer'
              },
              {
                quote: "Eternavue's holographic display at our product launch stopped traffic on the expo floor. Attendees couldn't stop talking about it for weeks.",
                name: 'David Chen',
                role: 'Marketing Director, Tech Innovations'
              },
              {
                quote: 'We wanted something our wedding guests would never forget. The holographic visuals were absolutely breathtaking — pure magic.',
                name: 'Maria Rodriguez',
                role: 'Private Event Client'
              }
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-neutral-200 text-base italic mb-6 flex-grow leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-ghost">{t.role}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-void py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp} className="mb-4 font-heading text-4xl font-bold lowercase text-white md:text-5xl">
              frequently asked questions
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="text-lg text-ghost">
              Everything you need to know before your first project
            </motion.p>
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

      {/* Contact Form Section */}
      <AnimatePresence>
        {showContactForm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            id="contact-form"
            className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 px-6"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[110px]" />

            <div className="max-w-3xl mx-auto relative z-10">
              <button
                onClick={closeForm}
                className="absolute -top-12 right-0 mb-4 flex items-center gap-2 text-ghost transition-colors hover:text-white"
              >
                <X className="w-5 h-5" /> Close
              </button>

              {selectedService === 'memorial' && <MemorialBookingForm />}
              {selectedService === 'event' && <EventInquiryForm />}
              {selectedService === 'corporate' && <CorporateContactForm />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Final CTA */}
      <CTA
        title="ready to transform your next event?"
        description="Tell us what you're envisioning. We'll show you how holographic technology can make it unforgettable."
        primaryButtonText="Start a Conversation"
        onPrimaryClick={() => handleServiceInquiry('event')}
        secondaryButtonText="View FAQ"
        secondaryButtonLink="#faq"
        variant="primary"
      />
    </PageWrapper>
  )
}

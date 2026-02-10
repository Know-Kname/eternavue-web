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
      q: 'What exactly is a holographic memorial?',
      a: 'A holographic memorial uses advanced projection technology to create a lifelike, three-dimensional display of your loved one. We combine photos, videos, and audio to craft an immersive tribute that feels as though they are present in the room.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 2-4 weeks in advance for memorial services to allow time for content creation. For corporate events and large productions, 6-8 weeks is ideal. Rush services are available for urgent needs.'
    },
    {
      q: 'What materials do you need from me?',
      a: 'We work with whatever you have: photos, video clips, audio recordings, letters, or stories from family members. Our creative team transforms these into a cohesive holographic experience. A consultation call helps us understand your vision.'
    },
    {
      q: 'What venues can accommodate holographic displays?',
      a: 'Our portable equipment works in most indoor venues including funeral homes, churches, event halls, and conference centers. We handle all technical setup and teardown. A minimum room size of 15x15 feet with controlled lighting is ideal.'
    },
    {
      q: 'What is the pricing structure?',
      a: 'Pricing varies based on the type of service, duration, and complexity of the holographic content. Memorial services start at a consultation to understand your needs. Corporate solutions are custom-quoted. Contact us for a personalized estimate.'
    },
  ]

  return (
    <PageWrapper onHeaderCtaClick={() => handleServiceInquiry('memorial')}>
      {/* Hero Section */}
      <Hero
        title="Holographic Experiences That Honor Legacy"
        subtitle="Transform memories into immersive holographic tributes. From intimate memorials to grand celebrations, we bring stories to life through cutting-edge technology."
        ctaText="Request a Demo"
        onCtaClick={() => handleServiceInquiry('memorial')}
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
            Founded at <span className="font-bold text-primary-300">Detroit Memorial Park</span> &middot; Serving families since 1925
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/5 bg-neutral-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '500+', label: 'Families Served' },
              { icon: Award, value: '98%', label: 'Client Satisfaction' },
              { icon: MapPin, value: '3', label: 'Locations in Michigan' },
              { icon: Clock, value: '100', label: 'Years of Heritage' },
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
              Cutting-edge holographic technology for meaningful moments
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
                <h3 className="mb-4 font-heading text-3xl font-bold text-white lowercase">memorial services</h3>
                <p className="mb-8 max-w-md text-lg text-ghost">
                  Honor loved ones with dignified holographic memorials that celebrate their life story, personality, and legacy in a way never before possible.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Holographic tributes', 'Interactive life stories', 'Respectful presentation'].map((item, i) => (
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
                <h3 className="mb-3 font-heading text-2xl font-bold lowercase text-white">special events</h3>
                <p className="mb-4 text-sm text-ghost">
                  Add wow-factor to weddings and milestones with stunning holographic displays.
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
                <h3 className="mb-3 font-heading text-2xl font-bold lowercase text-white">corporate</h3>
                <p className="mb-4 text-sm text-ghost">
                  Stand out at trade shows and launches with unforgettable experiences.
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
              Simple process, extraordinary results
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent md:block" />

            {[
              { step: 1, title: 'Consultation', desc: 'Share your vision with our team. We discuss your needs, timeline, and creative direction.' },
              { step: 2, title: 'Creation', desc: 'Our artists craft custom holographic content from your photos, videos, and cherished stories.' },
              { step: 3, title: 'Experience', desc: 'Watch as your vision comes to life through stunning, lifelike holographic projection.' }
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
                a century of honoring legacy
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-ghost">
                Born from Detroit Memorial Park's century-long tradition of serving families, Eternavue represents the next chapter in how we celebrate and remember the people who matter most.
              </p>
              <p className="mb-8 leading-relaxed text-ghost">
                We combine the reverence and compassion of memorial tradition with cutting-edge holographic technology. Our team of artists, technologists, and compassionate professionals work together to create experiences that are as unique as the lives they honor.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, label: 'Trusted Heritage' },
                  { icon: Zap, label: 'Cutting-Edge Tech' },
                  { icon: Star, label: 'Personalized Care' },
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
                  { title: 'Deeply Personal', desc: 'Every holographic experience is custom-crafted to tell a unique story.' },
                  { title: 'Technology Meets Compassion', desc: 'State-of-the-art projection guided by a century of caregiving tradition.' },
                  { title: 'Full-Service', desc: 'From consultation to installation, we handle every detail so you can focus on what matters.' },
                  { title: 'Michigan-Based', desc: 'Local team serving the Detroit metro, Southeast Michigan, and beyond.' },
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
              Hear from families and organizations we&apos;ve served
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'The holographic memorial for my father was beyond anything I could have imagined. It brought his personality to life in such a beautiful, respectful way.',
                name: 'Sarah Mitchell',
                role: 'Family Memorial Client'
              },
              {
                quote: "Eternavue's holographic display at our product launch stopped traffic. Attendees couldn't stop talking about it. Best investment we've made.",
                name: 'David Chen',
                role: 'Marketing Director, Tech Innovations'
              },
              {
                quote: 'Our wedding guests were in tears seeing my grandmother appear holographically to give her blessing. Eternavue made the impossible possible.',
                name: 'Maria Rodriguez',
                role: 'Wedding Client'
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
              Everything you need to know about our holographic services
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
        title="Ready to Create Something Extraordinary?"
        description="Let's discuss how holographic technology can transform your next memorial, event, or brand experience."
        primaryButtonText="Get Started Today"
        onPrimaryClick={() => handleServiceInquiry('memorial')}
        secondaryButtonText="View FAQ"
        secondaryButtonLink="#faq"
        variant="primary"
      />
    </PageWrapper>
  )
}

'use client'

import React, { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/content/Hero'
import { GlassCard } from '@/components/ui/GlassCard'
import { CTA } from '@/components/content/CTA'
import { MemorialBookingForm } from '@/components/forms/MemorialBookingForm'
import { EventInquiryForm } from '@/components/forms/EventInquiryForm'
import { CorporateContactForm } from '@/components/forms/CorporateContactForm'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, PartyPopper, Building2, ArrowRight, Sparkles, X } from 'lucide-react'

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedService, setSelectedService] = useState<'memorial' | 'event' | 'corporate' | null>(null)

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

  return (
    <PageWrapper onHeaderCtaClick={() => handleServiceInquiry('memorial')}>
      {/* Hero Section */}
      <Hero
        title="Holographic Experiences That Honor Legacy"
        subtitle="Transform memories into immersive holographic tributes. From intimate memorials to grand celebrations, we bring stories to life through cutting-edge technology."
        ctaText="Request a Demo"
        onCtaClick={() => handleServiceInquiry('memorial')}
      />

      {/* Trust Signal - Dark Themed */}
      <section id="about" className="bg-primary-950 border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-neutral-400 font-medium"
          >
            Founded at <span className="text-white font-bold">Detroit Memorial Park</span> • Serving families since 1925
          </motion.p>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="services" className="py-24 px-6 bg-primary-900 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary-800/30 rounded-full blur-[100px]" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-holographic-cyan/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
            >
              Our Services
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-xl text-neutral-300 max-w-2xl mx-auto"
            >
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
            <GlassCard id="memorial" className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
              <div onClick={() => handleServiceInquiry('memorial')}>
                <div className="w-16 h-16 bg-holographic-cyan/10 rounded-2xl flex items-center justify-center text-holographic-cyan mb-8 group-hover:bg-holographic-cyan group-hover:text-white transition-colors duration-300">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4">Memorial Services</h3>
                <p className="text-neutral-300 text-lg mb-8 max-w-md">
                  Honor loved ones with dignified holographic memorials that celebrate their life story, personality, and legacy in a way never before possible.
                </p>
                <ul className="space-y-3 mb-8">
                   {['Holographic tributes', 'Interactive life stories', 'Respectful presentation'].map((item, i) => (
                     <li key={i} className="flex items-center text-neutral-400">
                       <Sparkles className="w-4 h-4 text-accent-500 mr-2" />
                       {item}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="flex items-center text-accent-500 font-medium group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>

            {/* Special Events */}
            <GlassCard id="events" className="p-8 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
              <div onClick={() => handleServiceInquiry('event')}>
                <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-500 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Special Events</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Add wow-factor to weddings and milestones with stunning holographic displays.
                </p>
              </div>
              <div className="flex items-center text-white/50 text-sm group-hover:text-white transition-colors">
                Explore Events <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>

            {/* Corporate Solutions */}
            <GlassCard id="corporate" className="p-8 flex flex-col justify-between group cursor-pointer" hoverEffect={true}>
               <div onClick={() => handleServiceInquiry('corporate')}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-primary-900 transition-colors duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Corporate</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Stand out at trade shows and launches with unforgettable experiences.
                </p>
              </div>
              <div className="flex items-center text-white/50 text-sm group-hover:text-white transition-colors">
                Corporate Solutions <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Dark Mode Version */}
      <section id="how-it-works" className="py-24 px-6 bg-primary-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-xl text-neutral-400"
            >
              Simple process, extraordinary results
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-holographic-cyan/30 to-transparent" />

            {[
              { step: 1, title: 'Consultation', desc: 'Share your vision with our team. We discuss your needs and timeline.' },
              { step: 2, title: 'Creation', desc: 'We create custom holographic content integrating your photos and stories.' },
              { step: 3, title: 'Experience', desc: 'Watch as your vision comes to life through stunning projection.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center relative z-10"
              >
                <div className="w-16 h-16 bg-primary-900 border border-holographic-cyan/30 rounded-full flex items-center justify-center text-holographic-cyan text-2xl font-bold mx-auto mb-6 shadow-[0_0_15px_rgba(50,184,198,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Using Glass Cards */}
      <section id="testimonials" className="py-24 px-6 bg-primary-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
            >
              Client Stories
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-8">
              <div className="text-accent-500 text-4xl font-serif mb-4">&ldquo;</div>
              <p className="text-neutral-200 text-lg italic mb-6">
                The holographic memorial for my father was beyond anything I could have imagined. It brought his personality to life in such a beautiful, respectful way.
              </p>
              <div>
                <div className="font-bold text-white">Sarah Mitchell</div>
                <div className="text-sm text-neutral-400">Family Memorial Client</div>
              </div>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="text-accent-500 text-4xl font-serif mb-4">&ldquo;</div>
              <p className="text-neutral-200 text-lg italic mb-6">
                Eternavue&apos;s holographic display at our product launch stopped traffic. Attendees couldn&apos;t stop talking about it. Best investment we&apos;ve made.
              </p>
              <div>
                <div className="font-bold text-white">David Chen</div>
                <div className="text-sm text-neutral-400">Marketing Director, Tech Innovations</div>
              </div>
            </GlassCard>
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
            className="py-24 px-6 bg-primary-950 relative overflow-hidden border-t border-white/5"
          >
             {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-holographic-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-3xl mx-auto relative z-10">
              <button 
                onClick={closeForm}
                className="absolute -top-12 right-0 text-neutral-400 hover:text-white transition-colors flex items-center gap-2 mb-4"
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
        id="contact"
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

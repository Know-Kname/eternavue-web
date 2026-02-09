'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'

export interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink?: string
  onCtaClick?: () => void
  backgroundImage?: string
}

export function Hero({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink,
  onCtaClick,
  backgroundImage 
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {/* Dark overlay with slight gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-primary-950/80 to-primary-950 z-10" />
        
        {/* Animated Orbs - Simulating Holographic Light */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-holographic-cyan/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[120px]" 
        />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 z-10" />
      
      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-holographic-cyan text-sm mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Remembrance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
            {title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word === 'Holographic' ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-holographic-cyan to-white animate-pulse">
                    {word}
                  </span>
                ) : word}
              </span>
            ))}
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {ctaLink ? (
              <a href={ctaLink} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(50,184,198,0.3)] hover:shadow-[0_0_30px_rgba(50,184,198,0.5)] transition-shadow">
                  {ctaText}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            ) : (
              <Button 
                variant="primary" 
                size="lg" 
                onClick={onCtaClick}
                className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(50,184,198,0.3)] hover:shadow-[0_0_30px_rgba(50,184,198,0.5)] transition-shadow"
              >
                {ctaText}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="lg" className="text-white hover:text-holographic-cyan hover:bg-white/5">
              Watch Video
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

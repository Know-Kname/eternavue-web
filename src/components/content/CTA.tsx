'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export interface CTAProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink?: string
  onPrimaryClick?: () => void
  secondaryButtonText?: string
  secondaryButtonLink?: string
  onSecondaryClick?: () => void
  variant?: 'primary' | 'accent' | 'dark'
}

export function CTA({ 
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  onPrimaryClick,
  secondaryButtonText,
  secondaryButtonLink,
  onSecondaryClick,
  variant = 'primary'
}: CTAProps) {
  
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-primary-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Holographic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-holographic-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-holographic-cyan/10 border border-holographic-cyan/20 text-holographic-cyan text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {primaryButtonLink ? (
              <a href={primaryButtonLink} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:shadow-[0_0_30px_rgba(212,165,116,0.5)]">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            ) : (
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={onPrimaryClick}
                className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:shadow-[0_0_30px_rgba(212,165,116,0.5)]"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
            
            {secondaryButtonText && (
              secondaryButtonLink ? (
                <a href={secondaryButtonLink} className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                    {secondaryButtonText}
                  </Button>
                </a>
              ) : (
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={onSecondaryClick}
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                >
                  {secondaryButtonText}
                </Button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

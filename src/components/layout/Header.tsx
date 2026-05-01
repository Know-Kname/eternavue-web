'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/branding/Logo'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { MovingBorder } from '@/components/effects/MovingBorder'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  onCtaClick?: () => void
}

const NAV_LINKS = [
  { name: 'Memorial Services',  href: '#memorial' },
  { name: 'Special Events',     href: '#events'   },
  { name: 'Corporate',          href: '#corporate' },
  { name: 'About',              href: '#about'     },
]

export function Header({ onCtaClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-space/80 backdrop-blur-xl border-b border-white/[0.05] py-3 shadow-[0_1px_40px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Logo size="sm" variant="light" />

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'group relative text-sm font-medium transition-colors duration-200',
                  scrolled ? 'text-neutral-300 hover:text-white' : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
                {/* Animated underline */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-holographic-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <MagneticButton strength={0.3}>
              <MovingBorder
                duration={3000}
                containerClassName="rounded-full"
                innerClassName="rounded-full px-5 py-2 text-sm font-semibold text-white cursor-pointer"
                as="button"
                onClick={onCtaClick}
              >
                Request a Demo
              </MovingBorder>
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-space/95 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="py-4 text-2xl font-serif font-normal text-white/80 border-b border-white/5 hover:text-white hover:border-holographic-cyan/30 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="pt-8"
              >
                <MovingBorder
                  duration={2800}
                  containerClassName="w-full rounded-full"
                  innerClassName="w-full rounded-full py-4 text-center text-base font-semibold text-white cursor-pointer"
                  as="button"
                  onClick={() => { onCtaClick?.(); setMobileOpen(false) }}
                >
                  Request a Demo
                </MovingBorder>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

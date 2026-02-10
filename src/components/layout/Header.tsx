'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  onCtaClick?: () => void
}

export function Header({ onCtaClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#technology' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#09090b]/80 backdrop-blur-md border-white/10 py-3 shadow-lg"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo size="sm" variant="light" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-400",
                    isScrolled ? "text-ghost" : "text-white/90"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <span className="rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-700/20 to-amber-500/20 px-3 py-1 text-xs font-heading text-amber-300">
                est. 1926
              </span>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="sm"
                onClick={onCtaClick}
                className={cn(
                  !isScrolled && "bg-primary-500/80 hover:bg-primary-500"
                )}
              >
                Request a Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-void pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-medium text-white transition-colors hover:text-primary-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10">
                <Button variant="primary" size="lg" onClick={() => {
                  onCtaClick?.()
                  setIsMobileMenuOpen(false)
                }} fullWidth>
                  Request a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

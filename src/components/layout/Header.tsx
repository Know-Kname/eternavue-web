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
    { name: 'Memorial Services', href: '#memorial' },
    { name: 'Special Events', href: '#events' },
    { name: 'Corporate Solutions', href: '#corporate' },
    { name: 'About Us', href: '#about' },
  ]

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-primary-950/80 backdrop-blur-md border-white/10 py-3 shadow-lg" 
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
                    "text-sm font-medium transition-colors hover:text-holographic-cyan",
                    isScrolled ? "text-neutral-300" : "text-white/90"
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                variant={isScrolled ? "primary" : "secondary"} // Use secondary (white/glass) when transparent
                size="sm" 
                onClick={onCtaClick}
                className={cn(
                  !isScrolled && "bg-white/10 border-white/20 text-white hover:bg-white/20"
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
            className="fixed inset-0 z-40 bg-primary-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-xl font-medium text-white hover:text-holographic-cyan transition-colors"
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

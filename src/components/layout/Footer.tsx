'use client'

import React from 'react'
import { Logo } from '@/components/branding/Logo'
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-void pb-10 pt-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <Logo size="md" variant="light" />
            <p className="text-sm leading-relaxed text-ghost">
              Holographic experiences that honor legacy and create unforgettable moments.
            </p>
            <div className="text-xs text-ghost">
              <p>Founded at Detroit Memorial Park</p>
              <p>Serving families since 1925</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-700/25 to-amber-500/20 px-4 py-2 text-xs font-heading text-amber-300">
              Est. 1926 - Detroit Legacy
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="mb-6 text-lg font-heading font-bold lowercase text-white">services</h4>
            <ul className="space-y-4 text-sm text-ghost">
              <li><a href="#services" className="transition-colors hover:text-primary-400">Memorial Services</a></li>
              <li><a href="#services" className="transition-colors hover:text-primary-400">Special Events</a></li>
              <li><a href="#services" className="transition-colors hover:text-primary-400">Corporate Solutions</a></li>
              <li><a href="#technology" className="transition-colors hover:text-primary-400">How It Works</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-6 text-lg font-heading font-bold lowercase text-white">company</h4>
            <ul className="space-y-4 text-sm text-ghost">
              <li><a href="#about" className="transition-colors hover:text-primary-400">About Us</a></li>
              <li><a href="#faq" className="transition-colors hover:text-primary-400">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-6 text-lg font-heading font-bold lowercase text-white">contact</h4>
            <ul className="space-y-4 text-sm text-ghost">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent-400" />
                <span>Detroit Memorial Park<br />Warren, MI</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent-400" />
                <a href="mailto:info@eternavue.com" className="transition-colors hover:text-white">info@eternavue.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent-400" />
                <a href="tel:+15867511313" className="transition-colors hover:text-white">(586) 751-1313</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-ghost">
            © {currentYear} Eternavue. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" aria-label="LinkedIn" title="LinkedIn" className="rounded-full p-2 text-ghost transition-colors hover:bg-primary-500/10 hover:text-primary-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" title="Instagram" className="rounded-full p-2 text-ghost transition-colors hover:bg-primary-500/10 hover:text-primary-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" title="Facebook" className="rounded-full p-2 text-ghost transition-colors hover:bg-primary-500/10 hover:text-primary-300">
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="flex gap-6 text-sm text-ghost">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

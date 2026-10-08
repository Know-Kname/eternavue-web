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
            <p className="text-sm leading-relaxed text-sand-400 font-light">
              Sovereign digital memorial infrastructure for deathcare operators and lasting heritage vaults for families. Operator-built, cemetery-native.
            </p>
            <div className="text-xs text-sand-500 font-light space-y-1">
              <p>Founder-owned independent venture</p>
              <p>Flagship partner: Detroit Memorial Park (est. 1925)</p>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-sand-200">Platform</h4>
            <ul className="space-y-3 text-sm text-sand-400 font-light">
              <li><a href="#packages" className="transition-colors hover:text-terracotta-400">Tiered Packages (B2B &amp; D2C)</a></li>
              <li><a href="#partner-calculator" className="transition-colors hover:text-terracotta-400">Partner Margin Calculator</a></li>
              <li><a href="#vault-preview" className="transition-colors hover:text-terracotta-400">Interactive Heritage Vault</a></li>
              <li><a href="#about" className="transition-colors hover:text-terracotta-400">Operator Moat &amp; Lineage</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-sand-200">Company</h4>
            <ul className="space-y-3 text-sm text-sand-400 font-light">
              <li><a href="#about" className="transition-colors hover:text-terracotta-400">About Founder</a></li>
              <li><a href="#faq" className="transition-colors hover:text-terracotta-400">FAQ &amp; Governance</a></li>
              <li><a href="mailto:christian@thewrightguy.com" className="transition-colors hover:text-terracotta-400">Partner Inquiry</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-sand-200">Contact</h4>
            <ul className="space-y-3 text-sm text-sand-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-terracotta-400 mt-0.5" />
                <span>Detroit Memorial Park<br />Warren, MI</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-terracotta-400" />
                <a href="mailto:christian@thewrightguy.com" className="transition-colors hover:text-sand-100">christian@thewrightguy.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-terracotta-400" />
                <a href="tel:+15867511313" className="transition-colors hover:text-sand-100">(586) 751-1313</a>
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

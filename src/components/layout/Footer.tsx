'use client'

import React from 'react'
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/branding/Logo'

const SERVICES = [
  { label: 'Memorial Services',  href: '#memorial'   },
  { label: 'Special Events',     href: '#events'     },
  { label: 'Corporate Solutions',href: '#corporate'  },
  { label: 'Our Technology',     href: '#technology' },
]

const COMPANY = [
  { label: 'About Us',  href: '#about'   },
  { label: 'Contact',   href: '#contact' },
  { label: 'Careers',   href: '#careers' },
  { label: 'Press',     href: '#press'   },
]

const SOCIALS = [
  { icon: Linkedin,  label: 'LinkedIn'  },
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook,  label: 'Facebook'  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-surface pt-20 pb-10">
      {/* Subtle noise + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[300px] w-[700px] rounded-full bg-holographic-cyan/[0.03] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Large decorative wordmark */}
        <div className="mb-12 overflow-hidden">
          <p className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-normal leading-none tracking-tight text-gradient-holographic select-none opacity-[0.12] pointer-events-none">
            ETERNAVUE
          </p>
        </div>

        {/* Gradient divider */}
        <div className="mb-14 h-px bg-gradient-to-r from-transparent via-holographic-cyan/30 to-transparent" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-16">

          {/* Brand */}
          <div className="space-y-5 md:col-span-1">
            <Logo size="md" variant="light" />
            <p className="text-sm leading-relaxed text-neutral-400">
              Holographic experiences that honor legacy and create unforgettable moments.
            </p>
            <p className="text-xs text-neutral-600">
              Founded at Detroit Memorial Park<br />Serving families since 1925
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-white">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-500 hover:text-holographic-cyan transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-white">Company</h4>
            <ul className="space-y-3">
              {COMPANY.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-500 hover:text-holographic-cyan transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                <span>Detroit Memorial Park<br />Warren, MI</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-500" />
                <a
                  href="mailto:info@eternavue.com"
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  info@eternavue.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                <a
                  href="tel:+15551234567"
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.05] pt-8 md:flex-row">
          <p className="text-xs text-neutral-600">
            © {year} Eternavue. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-500 transition-all duration-200 hover:border-holographic-cyan/40 hover:bg-holographic-cyan/5 hover:text-holographic-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex gap-6 text-xs text-neutral-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import React from 'react'
import { Logo } from '@/components/branding/Logo'
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <Logo size="md" variant="light" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              Holographic experiences that honor legacy and create unforgettable moments.
            </p>
            <div className="text-neutral-500 text-xs">
              <p>Founded at Detroit Memorial Park</p>
              <p>Serving families since 1925</p>
            </div>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#memorial" className="hover:text-holographic-cyan transition-colors">Memorial Services</a></li>
              <li><a href="#events" className="hover:text-holographic-cyan transition-colors">Special Events</a></li>
              <li><a href="#corporate" className="hover:text-holographic-cyan transition-colors">Corporate Solutions</a></li>
              <li><a href="#how-it-works" className="hover:text-holographic-cyan transition-colors">How It Works</a></li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#about" className="hover:text-holographic-cyan transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-holographic-cyan transition-colors">Client Stories</a></li>
              <li><a href="#contact" className="hover:text-holographic-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0" />
                <span>Detroit Memorial Park<br />Warren, MI</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="mailto:info@eternavue.com" className="hover:text-white transition-colors">info@eternavue.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-neutral-500">
            © {currentYear} Eternavue. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

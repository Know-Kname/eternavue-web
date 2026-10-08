'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { 
  Play, Pause, QrCode, Volume2, ShieldCheck, 
  Sparkles, Calendar, MapPin, BookOpen, Layers, CheckCircle2 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeritageVaultPreview() {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [isScanned, setIsScanned] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<'audio' | 'timeline' | 'gallery'>('audio')

  const timelineMilestones = [
    { year: '1934', title: 'Born in Black Bottom, Detroit', desc: 'Raised during the Great Depression; educated in Detroit Public Schools.' },
    { year: '1956', title: 'Graduation & Military Service', desc: 'Served honorably in the US Army Corps of Engineers before returning to Michigan.' },
    { year: '1974', title: 'Community Leadership Milestone', desc: 'Elected Vice Chairman of Michigan Historic Preservation Commission.' },
    { year: '2024', title: 'Immortal Legacy Preserved', desc: 'Resting in Detroit Memorial Park; Heritage Vault created for 4 generations of descendants.' },
  ]

  return (
    <section id="vault-preview" className="relative py-24 px-6 bg-void border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-300 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Heritage Experience</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            How a Heritage Vault lives on.
          </h2>

          <p className="text-ghost text-lg leading-relaxed">
            Experience what happens when a family member taps the solid brass medallion on a headstone, or visits the private link from across the world.
          </p>
        </div>

        {/* The Interactive Vault Showcase */}
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-6 sm:p-10 border-primary-500/30 ring-1 ring-white/10" hoverEffect={false}>
            {/* Top Vault Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center font-heading text-2xl font-bold text-primary-300 shadow-inner">
                  HW
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-heading font-bold text-white">Harold W. Wright</h3>
                    <CheckCircle2 className="w-4 h-4 text-accent-400" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-ghost mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-400" />
                      1934 – 2024
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent-400" />
                      Detroit Memorial Park, Section B-14
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical-to-Digital Badge Simulation */}
              <div 
                onClick={() => setIsScanned(!isScanned)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-800/80 border border-neutral-700 hover:border-primary-500/50 cursor-pointer transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-primary-500/20 text-primary-300 group-hover:scale-105 transition-transform">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Solid Brass NFC Medallion</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-ghost">
                    {isScanned ? 'Medallion Verified · Tap to toggle' : 'Tap to simulate QR scan'}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs Inside Vault */}
            <div className="flex items-center gap-3 my-8 border-b border-neutral-800 pb-4 overflow-x-auto">
              {[
                { id: 'audio' as const, label: 'Oral Voice History', icon: Volume2 },
                { id: 'timeline' as const, label: 'Biographical Milestones', icon: BookOpen },
                { id: 'gallery' as const, label: 'Archival Keepsakes', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap',
                      activeTab === tab.id
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40'
                        : 'text-ghost hover:text-white hover:bg-neutral-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              {activeTab === 'audio' && (
                <motion.div
                  key="audio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
                        aria-label={isPlayingAudio ? 'Pause oral history snippet' : 'Play oral history snippet'}
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-6 h-6 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        )}
                      </button>
                      <div>
                        <div className="text-base font-semibold text-white">
                          &ldquo;Advice to My Great-Grandchildren&rdquo;
                        </div>
                        <div className="text-xs text-ghost mt-0.5">
                          Recorded Thanksgiving 2018 · Length: 3m 42s · Remastered audio
                        </div>
                      </div>
                    </div>

                    {/* Animated Simulated Waveform */}
                    <div className="flex items-center gap-1.5 h-10 w-full md:w-64 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 justify-center">
                      {[18, 35, 60, 40, 85, 50, 70, 45, 90, 65, 30, 80, 55, 40, 75, 50, 60, 30, 20].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={isPlayingAudio ? {
                            height: [`${Math.max(15, (h * 0.4))}%`, `${Math.min(95, (h * 1.1))}%`, `${Math.max(15, (h * 0.3))}%`]
                          } : { height: `${h * 0.4}%` }}
                          transition={{
                            duration: 0.6 + (i % 5) * 0.1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (i * 0.05)
                          }}
                          className={cn(
                            'w-1 rounded-full transition-colors duration-200',
                            isPlayingAudio ? 'bg-primary-400' : 'bg-neutral-600'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-ghost italic px-2">
                    &ldquo;Never forget where this family stood when the ground shook. You carry the blood of people who built institutions from nothing...&rdquo;
                  </p>
                </motion.div>
              )}

              {activeTab === 'timeline' && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
                    {timelineMilestones.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-primary-500" />
                        <div className="text-xs font-mono font-semibold text-accent-300 uppercase tracking-wider">
                          {item.year}
                        </div>
                        <div className="text-base font-semibold text-white mt-0.5">
                          {item.title}
                        </div>
                        <div className="text-xs text-ghost mt-1">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {[
                    { label: 'Wayne State University Commencement, 1956', type: 'Archival Photograph' },
                    { label: 'Historic Civil Rights Citation of Honor', type: 'Preserved Official Document' },
                    { label: 'Family Reunion at Belle Isle, 1984', type: 'High-Res Kodachrome Scan' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-colors">
                      <div className="aspect-video w-full rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-xs font-mono text-ghost mb-3">
                        [Archival Plate {idx + 1}]
                      </div>
                      <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                      <div className="text-xs text-accent-300 font-medium">{item.type}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Proof Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                Immutable Heritage Guarantee · SHA-256 Verified Assets
              </span>
              <span className="font-mono text-neutral-500">
                VAULT ID: EV-1934-88219-DMP
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { submitForm } from '@/lib/form-submit'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EventInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guestCount: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const result = await submitForm({ ...formData, formType: 'Special Event' })

    if (result.success) {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', eventType: '', date: '', guestCount: '', message: '' })
    } else {
      setStatus('error')
      setErrorMessage(result.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status === 'error') setStatus('idle')
  }

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h3 className="mb-3 font-heading text-2xl font-bold lowercase text-white">thank you</h3>
        <p className="mb-8 text-ghost">Your event inquiry has been received. Our team will contact you within 24 hours to discuss your vision.</p>
        <Button variant="ghost" onClick={() => setStatus('idle')} className="text-white border-primary-500/35 hover:border-primary-500/60">Submit Another Inquiry</Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="mb-2 font-heading text-2xl font-bold lowercase text-white">special event inquiry</h3>
        <p className="text-ghost">Let&apos;s create an unforgettable experience for your special occasion.</p>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />{errorMessage}
        </div>
      )}

      <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" variant="glass" disabled={status === 'submitting'} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" variant="glass" disabled={status === 'submitting'} />
        <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(586) 555-1234" variant="glass" disabled={status === 'submitting'} />
      </div>

      <Select
        label="Event Type" name="eventType" value={formData.eventType} onChange={handleChange} required variant="glass" disabled={status === 'submitting'}
        options={[
          { value: '', label: 'Select an event type' },
          { value: 'wedding', label: 'Wedding' },
          { value: 'anniversary', label: 'Anniversary Celebration' },
          { value: 'birthday', label: 'Birthday / Milestone' },
          { value: 'reunion', label: 'Family Reunion' },
          { value: 'other', label: 'Other Special Event' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Event Date" name="date" type="date" value={formData.date} onChange={handleChange} variant="glass" disabled={status === 'submitting'} />
        <Input label="Expected Guest Count" name="guestCount" type="number" value={formData.guestCount} onChange={handleChange} placeholder="50" variant="glass" disabled={status === 'submitting'} />
      </div>

      <Textarea label="Event Details" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your event and how you'd like to incorporate holographic experiences..." rows={5} variant="glass" disabled={status === 'submitting'} />

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'submitting'}>
        {status === 'submitting' ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : 'Submit Inquiry'}
      </Button>
    </form>
  )
}

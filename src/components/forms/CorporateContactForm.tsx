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

export function CorporateContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const result = await submitForm({ ...formData, formType: 'Corporate Solution' })

    if (result.success) {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', role: '', projectType: '', budget: '', message: '' })
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
        <p className="mb-8 text-ghost">Your corporate inquiry has been received. Our solutions team will reach out within one business day.</p>
        <Button variant="ghost" onClick={() => setStatus('idle')} className="text-white border-primary-500/35 hover:border-primary-500/60">Submit Another Inquiry</Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="mb-2 font-heading text-2xl font-bold lowercase text-white">corporate solutions inquiry</h3>
        <p className="text-ghost">Elevate your brand with cutting-edge holographic technology.</p>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />{errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" variant="glass" disabled={status === 'submitting'} />
        <Input label="Job Title" name="role" value={formData.role} onChange={handleChange} required placeholder="Marketing Director" variant="glass" disabled={status === 'submitting'} />
      </div>

      <Input label="Company Name" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corporation" variant="glass" disabled={status === 'submitting'} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@acme.com" variant="glass" disabled={status === 'submitting'} />
        <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(586) 555-1234" variant="glass" disabled={status === 'submitting'} />
      </div>

      <Select
        label="Project Type" name="projectType" value={formData.projectType} onChange={handleChange} required variant="glass" disabled={status === 'submitting'}
        options={[
          { value: '', label: 'Select a project type' },
          { value: 'product-launch', label: 'Product Launch' },
          { value: 'brand-activation', label: 'Brand Activation' },
          { value: 'trade-show', label: 'Trade Show Experience' },
          { value: 'retail-display', label: 'Retail Display' },
          { value: 'corporate-event', label: 'Corporate Event' },
          { value: 'consultation', label: 'Consultation' }
        ]}
      />

      <Select
        label="Budget Range" name="budget" value={formData.budget} onChange={handleChange} variant="glass" disabled={status === 'submitting'}
        options={[
          { value: '', label: 'Select a budget range' },
          { value: 'under-25k', label: 'Under $25,000' },
          { value: '25k-50k', label: '$25,000 - $50,000' },
          { value: '50k-100k', label: '$50,000 - $100,000' },
          { value: '100k-250k', label: '$100,000 - $250,000' },
          { value: 'over-250k', label: 'Over $250,000' }
        ]}
      />

      <Textarea label="Project Details" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project goals, timeline, and how holographic technology can help achieve your objectives..." rows={5} variant="glass" disabled={status === 'submitting'} />

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'submitting'}>
        {status === 'submitting' ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : 'Submit Inquiry'}
      </Button>
    </form>
  )
}

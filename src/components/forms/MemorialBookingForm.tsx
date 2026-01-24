'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useTallyForm } from '@/hooks/useTallyForm'

export function MemorialBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    message: ''
  })

  const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID_MEMORIAL || 'demo'
  const { submit, loading, error, success } = useTallyForm(formId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submit(formData)
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        date: '',
        message: ''
      })
    } catch (error) {
      // Error is handled in the hook
      console.error('Form submission failed:', error)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Memorial Service Inquiry</h3>
        <p className="text-neutral-400">Fill out the form below and we'll help you honor your loved one's legacy.</p>
      </div>

      {success && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
          ✓ Thank you for your inquiry. We will contact you within 24 hours.
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          ✗ {error}
        </div>
      )}
      
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="John Smith"
        variant="glass"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
          variant="glass"
        />
        
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(555) 123-4567"
          variant="glass"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Service Type"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          variant="glass"
          options={[
            { value: '', label: 'Select a service type' },
            { value: 'holographic-memorial', label: 'Holographic Memorial' },
            { value: 'tribute-video', label: 'Tribute Video with Holographic Elements' },
            { value: 'interactive-display', label: 'Interactive Display' },
            { value: 'consultation', label: 'Consultation' }
          ]}
        />
        
        <Input
          label="Preferred Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          variant="glass"
        />
      </div>
      
      <Textarea
        label="Tell us about your needs"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Please share details about the person you'd like to honor and your vision for the memorial service..."
        rows={5}
        variant="glass"
      />
      
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  )
}

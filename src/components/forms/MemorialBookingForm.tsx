'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function MemorialBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    message: ''
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Tally Forms or backend
    console.log('Memorial booking submitted:', formData)
    alert('Thank you for your inquiry. We will contact you within 24 hours.')
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
        <p className="text-neutral-400">Fill out the form below and we&apos;ll help you honor your loved one&apos;s legacy.</p>
      </div>
      
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
      
      <Button type="submit" variant="secondary" size="lg" fullWidth>
        Submit Inquiry
      </Button>
    </form>
  )
}

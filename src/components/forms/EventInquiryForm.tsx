'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Event inquiry submitted:', formData)
    alert('Thank you for your inquiry. Our event team will contact you within 24 hours.')
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
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Special Event Inquiry</h3>
        <p className="text-neutral-400">Let&apos;s create an unforgettable experience for your special occasion.</p>
      </div>
      
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Jane Smith"
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
          placeholder="jane@example.com"
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
      
      <Select
        label="Event Type"
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        required
        variant="glass"
        options={[
          { value: '', label: 'Select an event type' },
          { value: 'wedding', label: 'Wedding' },
          { value: 'anniversary', label: 'Anniversary Celebration' },
          { value: 'birthday', label: 'Birthday Party' },
          { value: 'reunion', label: 'Family Reunion' },
          { value: 'other', label: 'Other Special Event' }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Event Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          variant="glass"
        />
        
        <Input
          label="Expected Guest Count"
          name="guestCount"
          type="number"
          value={formData.guestCount}
          onChange={handleChange}
          placeholder="50"
          variant="glass"
        />
      </div>
      
      <Textarea
        label="Event Details"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Tell us about your event and how you'd like to incorporate holographic experiences..."
        rows={5}
        variant="glass"
      />
      
      <Button type="submit" variant="secondary" size="lg" fullWidth>
        Submit Inquiry
      </Button>
    </form>
  )
}

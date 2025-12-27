'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Corporate inquiry submitted:', formData)
    alert('Thank you for your inquiry. Our corporate solutions team will contact you within 24 hours.')
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
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Corporate Solutions Inquiry</h3>
        <p className="text-neutral-400">Elevate your brand with cutting-edge holographic technology.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          variant="glass"
        />
        
        <Input
          label="Job Title"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          placeholder="Marketing Director"
          variant="glass"
        />
      </div>
      
      <Input
        label="Company Name"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
        placeholder="Acme Corporation"
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
          placeholder="john@acme.com"
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
        label="Project Type"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
        variant="glass"
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
        label="Budget Range"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        variant="glass"
        options={[
          { value: '', label: 'Select a budget range' },
          { value: 'under-25k', label: 'Under $25,000' },
          { value: '25k-50k', label: '$25,000 - $50,000' },
          { value: '50k-100k', label: '$50,000 - $100,000' },
          { value: '100k-250k', label: '$100,000 - $250,000' },
          { value: 'over-250k', label: 'Over $250,000' }
        ]}
      />
      
      <Textarea
        label="Project Details"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Tell us about your project goals, timeline, and how holographic technology can help achieve your objectives..."
        rows={5}
        variant="glass"
      />
      
      <Button type="submit" variant="secondary" size="lg" fullWidth>
        Submit Inquiry
      </Button>
    </form>
  )
}

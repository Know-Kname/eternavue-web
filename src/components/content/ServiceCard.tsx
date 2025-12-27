import React from 'react'
import { Button } from '@/components/ui/Button'

export interface ServiceCardProps {
  id?: string
  icon?: React.ReactNode
  title: string
  description: string
  features?: string[]
  ctaText?: string
  onCtaClick?: () => void
  className?: string
}

export function ServiceCard({ 
  id,
  icon,
  title, 
  description, 
  features,
  ctaText = 'Learn More',
  onCtaClick,
  className = ''
}: ServiceCardProps) {
  return (
    <div id={id} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-neutral-100 ${className}`}>
      {/* Icon */}
      {icon && (
        <div className="w-16 h-16 mb-6 flex items-center justify-center bg-primary-50 rounded-xl text-primary-500">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-2xl font-serif font-bold text-primary-700 mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-neutral-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Features list */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
              <span className="text-holographic-cyan mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* CTA Button */}
      {onCtaClick && (
        <Button variant="ghost" size="sm" onClick={onCtaClick} fullWidth>
          {ctaText}
        </Button>
      )}
    </div>
  )
}


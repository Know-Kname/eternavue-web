import React from 'react'
import Image from 'next/image'

export interface HolographicImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function HolographicImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false 
}: HolographicImageProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Holographic glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-holographic-cyan via-accent-500 to-primary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
      
      {/* Image container */}
      <div className="relative rounded-2xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
        />
      </div>
    </div>
  )
}


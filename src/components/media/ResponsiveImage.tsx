import React from 'react'
import Image from 'next/image'

export interface ResponsiveImageProps {
  src: string
  alt: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2'
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
}

export function ResponsiveImage({ 
  src, 
  alt, 
  aspectRatio = '16/9',
  className = '',
  priority = false,
  objectFit = 'cover'
}: ResponsiveImageProps) {
  const aspectRatioStyles = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]'
  }
  
  const objectFitStyles = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  }
  
  return (
    <div className={`relative ${aspectRatioStyles[aspectRatio]} w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={objectFitStyles[objectFit]}
        priority={priority}
      />
    </div>
  )
}


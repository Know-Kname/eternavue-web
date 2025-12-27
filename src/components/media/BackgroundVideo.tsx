'use client'

import React, { useRef, useEffect } from 'react'

export interface BackgroundVideoProps {
  src: string
  poster?: string
  className?: string
  overlay?: boolean
  overlayOpacity?: number
}

export function BackgroundVideo({ 
  src, 
  poster,
  className = '',
  overlay = true,
  overlayOpacity = 0.5
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }
  }, [])
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  )
}


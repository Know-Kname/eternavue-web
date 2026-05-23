import React from 'react'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ size = 'md', variant = 'dark', className = '' }: LogoProps) {
  const sizeStyles = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const colorStyles = {
    light: 'text-white',
    dark: 'text-primary-400'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeStyles[size]} font-heading font-bold tracking-tight ${colorStyles[variant]}`}>
        ETERNAVUE
      </div>
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 animate-pulse" />
      </div>
    </div>
  )
}


import React from 'react'

export interface LogoProps {
  size?:      'sm' | 'md' | 'lg'
  variant?:   'light' | 'dark'
  className?: string
}

export function Logo({ size = 'md', variant = 'dark', className = '' }: LogoProps) {
  const sizeStyles = {
    sm: 'text-xl tracking-[0.12em]',
    md: 'text-2xl tracking-[0.14em]',
    lg: 'text-4xl tracking-[0.16em]',
  }

  const colorStyles = {
    light: 'text-white',
    dark:  'text-primary-500',
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`font-serif font-normal ${sizeStyles[size]} ${colorStyles[variant]}`}
      >
        ETERNAVUE
      </span>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-holographic-cyan opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-holographic-cyan" />
      </span>
    </div>
  )
}

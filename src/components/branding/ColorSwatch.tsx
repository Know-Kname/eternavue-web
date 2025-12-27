import React from 'react'

export interface ColorSwatchProps {
  color: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ColorSwatch({ 
  color, 
  label, 
  size = 'md', 
  className = '' 
}: ColorSwatchProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div 
        className={`${sizeStyles[size]} rounded-lg shadow-md border border-neutral-200`}
        style={{ backgroundColor: color }}
      />
      {label && (
        <span className="text-xs text-neutral-600 font-mono">{label}</span>
      )}
    </div>
  )
}


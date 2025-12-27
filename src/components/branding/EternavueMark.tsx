import React from 'react'

export interface EternavueMarkProps {
  size?: number
  className?: string
}

export function EternavueMark({ size = 40, className = '' }: EternavueMarkProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Holographic projection symbol - stylized letter E with holographic effect */}
      <circle 
        cx="20" 
        cy="20" 
        r="18" 
        stroke="#1F3252" 
        strokeWidth="2"
        fill="none"
      />
      <circle 
        cx="20" 
        cy="20" 
        r="15" 
        fill="#32B8C6" 
        opacity="0.1"
      />
      <path 
        d="M12 12 L28 12 M12 12 L12 28 M12 20 L24 20 M12 28 L28 28" 
        stroke="#1F3252" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle 
        cx="20" 
        cy="20" 
        r="3" 
        fill="#D4A574"
      />
    </svg>
  )
}


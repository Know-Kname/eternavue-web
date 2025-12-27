import React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
  variant?: 'default' | 'glass'
}

export function Select({ 
  label, 
  error, 
  helperText,
  options,
  className = '',
  id,
  variant = 'default',
  ...props 
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`
  
  const variantStyles = {
    default: "bg-white border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
    glass: "bg-white/5 border-white/10 text-white focus:border-holographic-cyan/50 focus:ring-holographic-cyan/50 backdrop-blur-md"
  }

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId} 
          className={cn(
            "block text-sm font-medium mb-2",
            variant === 'glass' ? "text-neutral-300" : "text-neutral-700"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full px-4 py-3 rounded-lg border transition-colors appearance-none",
            "focus:outline-none focus:ring-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            variantStyles[variant],
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              className={variant === 'glass' ? "bg-primary-900 text-white" : "bg-white text-neutral-900"}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
          variant === 'glass' ? "text-white/50" : "text-neutral-500"
        )}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className={cn(
          "mt-1 text-sm",
          variant === 'glass' ? "text-neutral-400" : "text-neutral-500"
        )}>{helperText}</p>
      )}
    </div>
  )
}

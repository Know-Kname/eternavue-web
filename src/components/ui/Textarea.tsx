import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'glass'
}

export function Textarea({ 
  label, 
  error, 
  helperText,
  className = '',
  id,
  variant = 'default',
  ...props 
}: TextareaProps) {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`
  
  const variantStyles = {
    default: "bg-white border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500 placeholder:text-neutral-400",
    glass: "bg-white/5 border-white/10 text-white focus:border-holographic-cyan/50 focus:ring-holographic-cyan/50 placeholder:text-white/30 backdrop-blur-md"
  }

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId} 
          className={cn(
            "block text-sm font-medium mb-2",
            variant === 'glass' ? "text-neutral-300" : "text-neutral-700"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-3 rounded-lg border transition-colors resize-y min-h-[120px]",
          "focus:outline-none focus:ring-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
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

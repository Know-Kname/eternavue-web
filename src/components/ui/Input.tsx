import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'glass'
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  variant = 'default',
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  const variantStyles = {
    default: "bg-white border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500 placeholder:text-neutral-400",
    glass: "bg-black/55 border-primary-500/25 text-white focus:border-primary-400/60 focus:ring-primary-500/30 placeholder:text-ghost/60 backdrop-blur-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "block text-sm font-medium mb-2",
            variant === 'glass' ? "text-ghost" : "text-neutral-700"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 rounded-lg border transition-all duration-300",
          "focus:outline-none focus:ring-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-300">{error}</p>
      )}
      {helperText && !error && (
        <p className={cn(
          "mt-1 text-sm",
          variant === 'glass' ? "text-ghost" : "text-neutral-500"
        )}>{helperText}</p>
      )}
    </div>
  )
}

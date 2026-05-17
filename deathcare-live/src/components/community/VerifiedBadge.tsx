import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const ROLE_CONFIG: Record<UserRole, { label: string; className: string }> = {
  director:    { label: 'Funeral Director',    className: 'bg-teal-100 text-teal-700' },
  operator:    { label: 'Operator',            className: 'bg-teal-100 text-teal-700' },
  supplier:    { label: 'Supplier',            className: 'bg-gold-100 text-amber-700' },
  association: { label: 'Association',         className: 'bg-purple-100 text-purple-700' },
  educator:    { label: 'Educator',            className: 'bg-green-100 text-green-700' },
  observer:    { label: 'Observer',            className: 'bg-slate-100 text-slate-600' },
}

interface VerifiedBadgeProps {
  role: UserRole
  verified?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function VerifiedBadge({ role, verified, size = 'sm', className }: VerifiedBadgeProps) {
  const { label, className: roleClass } = ROLE_CONFIG[role]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        roleClass,
        className
      )}
    >
      {verified && (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 0l1.5 1.5L9 1l.5 1.5L11 3l-1 1.5.5 1.5L9 7l.5 1.5L9 10l-1.5-.5L6 11l-1.5-.5L3 10l-.5-1.5L1 7l1-1.5L1.5 4 3 3l.5-1.5L5 1z" opacity=".3"/>
          <path d="M5 6.5L3.5 5 2.5 6l2.5 2.5 5-5-1-1z"/>
        </svg>
      )}
      {label}
    </span>
  )
}

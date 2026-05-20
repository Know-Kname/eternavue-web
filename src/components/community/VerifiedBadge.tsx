import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const ROLE_CONFIG: Record<UserRole, { label: string; className: string }> = {
  director: {
    label: 'Funeral Director',
    className: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200',
  },
  operator: { label: 'Operator', className: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200' },
  supplier: { label: 'Supplier', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  association: {
    label: 'Association',
    className: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  },
  educator: { label: 'Educator', className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  observer: { label: 'Observer', className: 'bg-slate-50 text-slate-500 ring-1 ring-slate-200' },
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
        'inline-flex items-center gap-1 rounded-full font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        roleClass,
        className
      )}
    >
      {verified && (
        <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 10 10" fill="currentColor">
          <path d="M5 0a5 5 0 100 10A5 5 0 005 0zm-.5 7.5L2 5l1-1 1.5 1.5 3-3 1 1z" />
        </svg>
      )}
      {label}
    </span>
  )
}

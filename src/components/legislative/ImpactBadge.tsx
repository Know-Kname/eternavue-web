import { cn } from '@/lib/utils'
import type { ImpactScore } from '@/lib/types'

const IMPACT_CONFIG: Record<ImpactScore, { label: string; className: string }> = {
  low: { label: 'Low Impact', className: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Medium Impact', className: 'bg-gold-50 text-gold-700' },
  high: { label: 'High Impact', className: 'bg-amber-100 text-amber-800' },
  critical: { label: 'Critical Impact', className: 'bg-red-100 text-red-700' },
}

interface ImpactBadgeProps {
  score: ImpactScore
  className?: string
}

export function ImpactBadge({ score, className }: ImpactBadgeProps) {
  const config = IMPACT_CONFIG[score]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold',
        config.className,
        className
      )}
    >
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M6 0L7.5 4.5H12L8.25 7.25 9.75 12 6 9 2.25 12 3.75 7.25 0 4.5H4.5z" />
      </svg>
      {config.label}
    </span>
  )
}

import { cn, slugToLabel } from '@/lib/utils'
import { TERMINAL_STATUSES } from '@/lib/bill-utils'
import type { BillStatus } from '@/lib/types'

const STEPS: { key: BillStatus; label: string }[] = [
  { key: 'introduced', label: 'Introduced' },
  { key: 'committee', label: 'Committee' },
  { key: 'floor', label: 'Floor Vote' },
  { key: 'passed', label: 'Passed' },
  { key: 'signed', label: 'Signed' },
]

const STEP_ORDER: Record<BillStatus, number> = {
  introduced: 0,
  committee: 1,
  floor: 2,
  passed: 3,
  signed: 4,
  vetoed: 3,
  failed: 3,
  'carried-over': 1,
}

const TERMINAL_NEGATIVE: BillStatus[] = TERMINAL_STATUSES.filter((s) => s !== 'signed')

interface BillStatusBarProps {
  status: BillStatus
}

export function BillStatusBar({ status }: BillStatusBarProps) {
  const isNegative = TERMINAL_NEGATIVE.includes(status)
  const currentStep = STEP_ORDER[status] ?? 0

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const isComplete = i < currentStep
        const isCurrent = i === currentStep
        const isFuture = i > currentStep

        const dotClass = cn(
          'w-3 h-3 rounded-full shrink-0',
          isCurrent && isNegative
            ? 'bg-red-400'
            : isComplete || isCurrent
              ? 'bg-teal-500'
              : 'bg-slate-200'
        )
        const lineClass = cn('flex-1 h-0.5', isComplete ? 'bg-teal-500' : 'bg-slate-200')

        return (
          <div key={step.key} className="flex min-w-0 flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={dotClass} />
              <span
                className={cn(
                  'mt-1 hidden text-xs whitespace-nowrap sm:block',
                  isFuture
                    ? 'text-slate-400'
                    : isCurrent
                      ? 'font-semibold text-teal-700'
                      : 'text-slate-600'
                )}
              >
                {isCurrent && isNegative ? slugToLabel(status) : step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className={lineClass} />}
          </div>
        )
      })}
    </div>
  )
}

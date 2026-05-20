import Link from 'next/link'
import type { Coalition } from '@/lib/types'

const POSITION_CONFIG = {
  support: {
    label: 'Support',
    pill: 'bg-green-100 text-green-700',
    border: 'border-green-200 bg-green-50',
    bar: 'bg-green-400',
    icon: '✓',
  },
  oppose: {
    label: 'Oppose',
    pill: 'bg-red-100 text-red-700',
    border: 'border-red-200 bg-red-50',
    bar: 'bg-red-400',
    icon: '✕',
  },
  amend: {
    label: 'Amend',
    pill: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200 bg-amber-50',
    bar: 'bg-amber-400',
    icon: '⟳',
  },
}

interface CoalitionPanelProps {
  coalitions: Coalition[]
}

export function CoalitionPanel({ coalitions }: CoalitionPanelProps) {
  if (!coalitions.length) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-700 uppercase">
        Industry Coalitions
      </h3>
      <div className="space-y-3">
        {coalitions.map((coalition) => {
          const pos = POSITION_CONFIG[coalition.position]
          return (
            <div key={coalition.id} className={`rounded-xl border ${pos.border} p-4`}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${pos.pill}`}
                >
                  <span>{pos.icon}</span>
                  {pos.label}
                </span>
                <span className="truncate text-xs font-medium text-slate-500">
                  {coalition.name}
                </span>
              </div>

              {coalition.statement && (
                <p className="mb-3 text-xs leading-relaxed text-slate-600">{coalition.statement}</p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-600">
                  {coalition.memberCount} members
                </span>
                {coalition.leadProfile && (
                  <Link
                    href={`/profile/${coalition.leadProfile.username}`}
                    className="max-w-[120px] truncate transition-colors hover:text-teal-600"
                  >
                    {coalition.leadProfile.displayName}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <Link
        href="/join"
        className="mt-3 inline-flex w-full justify-center rounded-lg border border-teal-200 py-2 text-xs font-semibold text-teal-600 transition-colors hover:bg-teal-50"
      >
        Join a coalition →
      </Link>
    </div>
  )
}

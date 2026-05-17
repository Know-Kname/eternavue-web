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
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
        Industry Coalitions
      </h3>
      <div className="space-y-3">
        {coalitions.map(coalition => {
          const pos = POSITION_CONFIG[coalition.position]
          return (
            <div
              key={coalition.id}
              className={`rounded-xl border ${pos.border} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${pos.pill}`}>
                  <span>{pos.icon}</span>
                  {pos.label}
                </span>
                <span className="text-xs text-slate-500 font-medium truncate">{coalition.name}</span>
              </div>

              {coalition.statement && (
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{coalition.statement}</p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{coalition.memberCount} members</span>
                {coalition.leadProfile && (
                  <Link
                    href={`/profile/${coalition.leadProfile.username}`}
                    className="hover:text-teal-600 transition-colors truncate max-w-[120px]"
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
        className="mt-3 w-full inline-flex justify-center py-2 rounded-lg border border-teal-200 text-teal-600 text-xs font-semibold hover:bg-teal-50 transition-colors"
      >
        Join a coalition →
      </Link>
    </div>
  )
}

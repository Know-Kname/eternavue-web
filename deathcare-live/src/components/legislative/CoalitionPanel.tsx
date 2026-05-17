import Link from 'next/link'
import type { Coalition } from '@/lib/types'

const POSITION_CONFIG = {
  support: { label: 'Support',  className: 'bg-green-50 text-green-700 border-green-200' },
  oppose:  { label: 'Oppose',   className: 'bg-red-50 text-red-700 border-red-200' },
  amend:   { label: 'Amend',   className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

interface CoalitionPanelProps {
  coalitions: Coalition[]
}

export function CoalitionPanel({ coalitions }: CoalitionPanelProps) {
  if (!coalitions.length) return null
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
        Industry Coalitions
      </h3>
      {coalitions.map(coalition => {
        const pos = POSITION_CONFIG[coalition.position]
        return (
          <div
            key={coalition.id}
            className={`rounded-xl border p-4 ${pos.className}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="text-sm font-semibold leading-snug">{coalition.name}</h4>
              <span className="shrink-0 text-xs font-bold uppercase tracking-wide opacity-70">
                {pos.label}
              </span>
            </div>
            {coalition.statement && (
              <p className="text-xs leading-relaxed opacity-80 mb-2">{coalition.statement}</p>
            )}
            <div className="flex items-center gap-2 text-xs opacity-60">
              <span>{coalition.memberCount} members</span>
              {coalition.leadProfile && (
                <>
                  <span>·</span>
                  <Link href={`/profile/${coalition.leadProfile.username}`} className="hover:opacity-100 transition-opacity">
                    Led by {coalition.leadProfile.displayName}
                  </Link>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

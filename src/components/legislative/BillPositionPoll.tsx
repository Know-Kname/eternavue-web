import Link from 'next/link'
import type { BillPositionTally } from '@/lib/types'

const POSITIONS = [
  { key: 'support', label: 'Support', bar: 'bg-green-500' },
  { key: 'oppose', label: 'Oppose', bar: 'bg-red-500' },
  { key: 'amend', label: 'Support with Amendments', bar: 'bg-amber-500' },
  { key: 'monitor', label: 'Monitor Only', bar: 'bg-slate-400' },
] as const

interface BillPositionPollProps {
  positions: BillPositionTally
}

export function BillPositionPoll({ positions }: BillPositionPollProps) {
  const total = positions.support + positions.oppose + positions.amend + positions.monitor

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-1 font-serif text-xl font-bold text-slate-900">Community position</h2>
      <p className="mb-4 text-sm text-slate-400">
        {total.toLocaleString()} verified professionals have weighed in
      </p>

      <div className="space-y-3">
        {POSITIONS.map((position) => {
          const count = positions[position.key]
          const pct = total ? Math.round((count / total) * 100) : 0
          return (
            <div key={position.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{position.label}</span>
                <span className="text-slate-500">
                  {pct}% · {count.toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${position.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-center">
        <p className="mb-2 text-sm text-slate-600">
          Casting a position requires a verified professional account.
        </p>
        <Link
          href="/join"
          className="inline-flex font-semibold text-teal-600 transition-colors hover:text-teal-700"
        >
          Verify your license to cast a position →
        </Link>
      </div>
    </div>
  )
}

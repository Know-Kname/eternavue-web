import Link from 'next/link'
import { MOCK_BILLS, STATE_NAMES, getMockStateHub } from '@/lib/mock-community'
import { TERMINAL_STATUSES } from '@/lib/bill-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Hubs — Deathcare Legislation by State',
  description:
    'Track active deathcare legislation, verified operators, and industry discussions in every US state.',
}

export const revalidate = 3600

function getStateStats() {
  const stats: Record<string, { bills: number; activeBills: number }> = {}
  for (const bill of MOCK_BILLS) {
    if (!stats[bill.state]) stats[bill.state] = { bills: 0, activeBills: 0 }
    stats[bill.state].bills++
    if (!TERMINAL_STATUSES.includes(bill.status)) stats[bill.state].activeBills++
  }
  return stats
}

export default function StatesPage() {
  const stats = getStateStats()
  const miHub = getMockStateHub('MI')
  const statesWithActivity = Object.entries(STATE_NAMES)
    .map(([code, name]) => ({
      code,
      name,
      bills: stats[code]?.bills ?? 0,
      activeBills: stats[code]?.activeBills ?? 0,
    }))
    .sort((a, b) => b.activeBills - a.activeBills || a.name.localeCompare(b.name))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">State Hubs</h1>
        <p className="max-w-2xl text-slate-500">
          Track active deathcare legislation, verified operators, and industry discussions organized
          by state. Michigan launches first — other states activate as community density grows.
        </p>
      </div>

      {miHub && (
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-medium tracking-wide text-teal-100 uppercase">
                Launch State
              </p>
              <h2 className="mb-2 font-serif text-2xl font-bold">Michigan</h2>
              <p className="max-w-lg text-sm leading-relaxed text-teal-100">
                {miHub.activeBillCount} active bill{miHub.activeBillCount !== 1 ? 's' : ''} in
                session, {miHub.verifiedOperatorCount} verified operators and directors, and the
                most active community discussion of any state. The Michigan wedge is live.
              </p>
            </div>
            <Link
              href="/states/MI"
              className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              Open Hub →
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statesWithActivity.map((s) => (
          <Link key={s.code} href={`/states/${s.code}`} className="group block">
            <div className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-slate-700">{s.code}</span>
                  <span className="text-sm text-slate-500">{s.name}</span>
                </div>
                {s.activeBills > 0 && (
                  <span className="text-gold-600 bg-gold-50 rounded-full px-2 py-0.5 text-xs font-medium">
                    {s.activeBills} active bill{s.activeBills !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {s.bills > 0
                  ? `${s.bills} total bill${s.bills !== 1 ? 's' : ''} tracked`
                  : 'No bills tracked yet'}
              </p>
              <p className="mt-1 text-xs font-medium text-teal-600 transition-colors group-hover:text-teal-700">
                View hub →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

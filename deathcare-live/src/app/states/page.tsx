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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">State Hubs</h1>
        <p className="text-slate-500 max-w-2xl">
          Track active deathcare legislation, verified operators, and industry discussions organized by state. Michigan launches first — other states activate as community density grows.
        </p>
      </div>

      {miHub && (
        <div className="mb-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-teal-100 text-sm font-medium uppercase tracking-wide mb-1">Launch State</p>
              <h2 className="text-2xl font-serif font-bold mb-2">Michigan</h2>
              <p className="text-teal-100 text-sm leading-relaxed max-w-lg">
                {miHub.activeBillCount} active bill{miHub.activeBillCount !== 1 ? 's' : ''} in session,{' '}
                {miHub.verifiedOperatorCount} verified operators and directors, and the most active
                community discussion of any state. The Michigan wedge is live.
              </p>
            </div>
            <Link
              href="/states/MI"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
            >
              Open Hub →
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statesWithActivity.map(s => (
          <Link key={s.code} href={`/states/${s.code}`} className="block group">
            <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-700 font-serif">{s.code}</span>
                  <span className="text-sm text-slate-500">{s.name}</span>
                </div>
                {s.activeBills > 0 && (
                  <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">
                    {s.activeBills} active bill{s.activeBills !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {s.bills > 0
                  ? `${s.bills} total bill${s.bills !== 1 ? 's' : ''} tracked`
                  : 'No bills tracked yet'}
              </p>
              <p className="text-xs text-teal-600 group-hover:text-teal-700 mt-1 font-medium transition-colors">
                View hub →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_BILLS, STATE_NAMES } from '@/lib/mock-community'
import { BillCard } from '@/components/legislative/BillCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateName = STATE_NAMES[state.toUpperCase()]
  if (!stateName) return {}
  return {
    title: `${stateName} Deathcare Bills`,
    description: `All active and recent deathcare legislation in ${stateName}.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(STATE_NAMES).map(state => ({ state }))
}

export const revalidate = 3600

export default async function StateBillsPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = state.toUpperCase()
  const stateName = STATE_NAMES[stateCode]
  if (!stateName) notFound()

  const bills = MOCK_BILLS.filter(b => b.state === stateCode)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/states" className="hover:text-teal-600 transition-colors">States</Link>
        <span>/</span>
        <Link href={`/states/${stateCode}`} className="hover:text-teal-600 transition-colors">{stateName}</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">Bills</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">
          {stateName} — Deathcare Legislation
        </h1>
        <p className="text-slate-500 text-sm">
          {bills.length > 0
            ? `${bills.length} bill${bills.length !== 1 ? 's' : ''} tracked in the current session`
            : 'No bills tracked yet for this state.'}
        </p>
      </div>

      {bills.length > 0 ? (
        <div className="space-y-4">
          {bills.map(bill => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <p className="font-medium">No bills tracked yet</p>
          <p className="text-sm mt-1">
            Know of a relevant bill?{' '}
            <Link href="/join" className="text-teal-600 hover:underline">
              Join to suggest one.
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

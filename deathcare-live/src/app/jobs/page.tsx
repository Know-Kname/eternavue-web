import Link from 'next/link'
import { MOCK_JOBS } from '@/lib/mock-community'
import { LISTING_TYPE_MAP } from '@/lib/listing-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs — Deathcare Industry Job Board',
  description:
    'Find funeral director, cemetery manager, crematory technician, and deathcare industry jobs across the US.',
}

export const revalidate = 3600

const TYPE_BADGE: Record<string, string> = {
  'funeral-homes':  'bg-teal-50 text-teal-700',
  cremation:        'bg-slate-100 text-slate-600',
  cemeteries:       'bg-green-50 text-green-700',
  suppliers:        'bg-amber-50 text-amber-700',
  technology:       'bg-purple-50 text-purple-700',
  'grief-support':  'bg-rose-50 text-rose-700',
}

const JOB_TYPE_LABEL: Record<string, string> = {
  'full-time':     'Full-time',
  'part-time':     'Part-time',
  contract:        'Contract',
  apprenticeship:  'Apprenticeship',
}

export default function JobsPage() {
  const featured = MOCK_JOBS.filter(j => j.featured)
  const regular = MOCK_JOBS.filter(j => !j.featured)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Industry Jobs</h1>
          <p className="text-slate-500">
            {MOCK_JOBS.length} open positions at funeral homes, cemeteries, crematories, and vendors.
          </p>
        </div>
        <Link
          href="/join"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors"
        >
          Post a job
        </Link>
      </div>

      {/* Featured jobs */}
      {featured.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Featured openings
          </h2>
          <div className="space-y-3">
            {featured.map(job => (
              <JobRow key={job.id} job={job} featured />
            ))}
          </div>
        </section>
      )}

      {/* All jobs */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          All openings
        </h2>
        <div className="space-y-3">
          {regular.map(job => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Post CTA */}
      <div className="mt-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-serif font-bold mb-1">Hiring in the industry?</h2>
        <p className="text-teal-100 text-sm mb-4">
          Post a job and reach verified funeral directors, operators, and deathcare professionals.
          Featured listings start at $99.
        </p>
        <Link
          href="/join"
          className="inline-flex px-5 py-2.5 rounded-lg bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
        >
          Post a job →
        </Link>
      </div>
    </div>
  )
}

function JobRow({ job, featured }: { job: (typeof MOCK_JOBS)[number]; featured?: boolean }) {
  const typeLabel = LISTING_TYPE_MAP[job.listingType]?.label ?? job.listingType
  const typeBadge = TYPE_BADGE[job.listingType] ?? 'bg-slate-100 text-slate-600'

  return (
    <div className={`bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow ${featured ? 'border-gold-200 ring-1 ring-gold-200' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {featured && (
              <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge}`}>
              {typeLabel}
            </span>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
              {JOB_TYPE_LABEL[job.type]}
            </span>
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-0.5">{job.title}</h3>
          <p className="text-sm text-slate-500">
            {job.company} · {job.location}
          </p>
        </div>
        <div className="text-right shrink-0">
          {job.salary && (
            <p className="text-sm font-semibold text-teal-700 mb-1">{job.salary}</p>
          )}
          {job.applyUrl ? (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-4 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-semibold hover:bg-teal-600 transition-colors"
            >
              Apply
            </a>
          ) : (
            <Link
              href="/join"
              className="inline-flex px-4 py-1.5 rounded-lg border border-teal-400 text-teal-600 text-xs font-semibold hover:bg-teal-50 transition-colors"
            >
              Contact
            </Link>
          )}
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{job.description}</p>
    </div>
  )
}

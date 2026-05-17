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
  'funeral-homes': 'bg-teal-50 text-teal-700',
  cremation: 'bg-slate-100 text-slate-600',
  cemeteries: 'bg-green-50 text-green-700',
  suppliers: 'bg-amber-50 text-amber-700',
  technology: 'bg-purple-50 text-purple-700',
  'grief-support': 'bg-rose-50 text-rose-700',
}

const JOB_TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  apprenticeship: 'Apprenticeship',
}

export default function JobsPage() {
  const featured = MOCK_JOBS.filter((j) => j.featured)
  const regular = MOCK_JOBS.filter((j) => !j.featured)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">Industry Jobs</h1>
          <p className="text-slate-500">
            {MOCK_JOBS.length} open positions at funeral homes, cemeteries, crematories, and
            vendors.
          </p>
        </div>
        <Link
          href="/join"
          className="shrink-0 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
        >
          Post a job
        </Link>
      </div>

      {/* Featured jobs */}
      {featured.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Featured openings
          </h2>
          <div className="space-y-3">
            {featured.map((job) => (
              <JobRow key={job.id} job={job} featured />
            ))}
          </div>
        </section>
      )}

      {/* All jobs */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
          All openings
        </h2>
        <div className="space-y-3">
          {regular.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Post CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
        <h2 className="mb-1 font-serif text-lg font-bold">Hiring in the industry?</h2>
        <p className="mb-4 text-sm text-teal-100">
          Post a job and reach verified funeral directors, operators, and deathcare professionals.
          Featured listings start at $99.
        </p>
        <Link
          href="/join"
          className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
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
    <div
      className={`rounded-xl border bg-white p-5 transition-shadow hover:shadow-sm ${featured ? 'border-gold-200 ring-gold-200 ring-1' : 'border-slate-200'}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {featured && (
              <span className="text-gold-700 bg-gold-50 rounded-full px-2 py-0.5 text-xs font-bold">
                Featured
              </span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge}`}>
              {typeLabel}
            </span>
            <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400">
              {JOB_TYPE_LABEL[job.type]}
            </span>
          </div>
          <h3 className="mb-0.5 text-base font-semibold text-slate-900">{job.title}</h3>
          <p className="text-sm text-slate-500">
            {job.company} · {job.location}
          </p>
        </div>
        <div className="shrink-0 text-right">
          {job.salary && <p className="mb-1 text-sm font-semibold text-teal-700">{job.salary}</p>}
          {job.applyUrl ? (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Apply
            </a>
          ) : (
            <Link
              href="/join"
              className="inline-flex rounded-lg border border-teal-400 px-4 py-1.5 text-xs font-semibold text-teal-600 transition-colors hover:bg-teal-50"
            >
              Contact
            </Link>
          )}
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{job.description}</p>
    </div>
  )
}

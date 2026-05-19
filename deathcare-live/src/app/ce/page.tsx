import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CE Credit Tracker — Continuing Education for Deathcare Professionals',
  description:
    'Track your continuing education credits and find state-approved CE courses for funeral directors, embalmers, and deathcare professionals.',
}

export const revalidate = 86400

const STATE_CE_REQUIREMENTS: Record<
  string,
  { hours: number; renewalYears: number; notes: string }
> = {
  MI: {
    hours: 12,
    renewalYears: 2,
    notes: 'At least 1 hour must cover funeral home law. Ethics credit required every renewal.',
  },
  OH: {
    hours: 12,
    renewalYears: 2,
    notes: '3 hours Ohio law required. Online CE permitted for 6 of 12 hours.',
  },
  IL: {
    hours: 12,
    renewalYears: 2,
    notes: 'Must complete 1 hour of sexual harassment prevention training per renewal cycle.',
  },
  WA: {
    hours: 10,
    renewalYears: 2,
    notes: '2 hours must be Washington state law. 1 hour opioid education required.',
  },
  TX: {
    hours: 12,
    renewalYears: 2,
    notes: '2 hours jurisprudence. TDLR-approved providers only.',
  },
  IN: {
    hours: 12,
    renewalYears: 3,
    notes: 'Indiana Board of Funeral and Cemetery Service. 2 hours ethics required.',
  },
  WI: {
    hours: 12,
    renewalYears: 2,
    notes: 'Wisconsin DSPS. Online CE courses accepted if provider is approved.',
  },
  MN: {
    hours: 12,
    renewalYears: 2,
    notes: 'Minnesota MORTICIAN CE. 1 hour MN funeral law required.',
  },
}

const FEATURED_CE_PROVIDERS = [
  {
    name: 'NFDA',
    fullName: 'National Funeral Directors Association',
    url: 'https://nfda.org/education',
    formats: ['Online', 'In-person', 'Convention'],
    states: 'All states',
    description: 'Most comprehensive catalog of deathcare CE. Online courses available 24/7.',
    badge: 'bg-teal-50 text-teal-700',
  },
  {
    name: 'ICCFA',
    fullName: 'International Cemetery, Cremation and Funeral Association',
    url: 'https://iccfa.com/education',
    formats: ['Online', 'Convention'],
    states: 'All states',
    description: 'Specializes in cemetery, cremation, and funeral service management.',
    badge: 'bg-purple-50 text-purple-700',
  },
  {
    name: 'CANA',
    fullName: 'Cremation Association of North America',
    url: 'https://www.cremationassociation.org/education',
    formats: ['Online', 'Workshop'],
    states: 'All states',
    description: 'Cremation-specific CE including alkaline hydrolysis and green burial.',
    badge: 'bg-amber-50 text-amber-700',
  },
  {
    name: 'ABFSE',
    fullName: 'American Board of Funeral Service Education',
    url: 'https://www.abfse.org',
    formats: ['In-person'],
    states: 'Accredited programs only',
    description: 'Accreditation body for mortuary science programs — primary source for new licensees.',
    badge: 'bg-green-50 text-green-700',
  },
]

export default function CEPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">CE Credit Tracker</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-500">
          Track your continuing education credits, find approved providers, and stay on top of
          renewal deadlines — by state.
        </p>
      </div>

      {/* Auth CTA */}
      <div className="mb-8 rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-slate-800">Track your credits with a member account</p>
            <p className="mt-0.5 text-sm text-slate-600">
              Log completed CE, get renewal reminders, and see your hours at a glance. Free for
              verified professionals.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/login"
              className="rounded-lg border border-teal-400 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
            >
              Sign in
            </Link>
            <Link
              href="/join"
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Join free
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Requirements by state */}
          <section>
            <h2 className="mb-4 font-serif text-xl font-bold text-slate-900">
              Requirements by state
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">State</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Hours</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                      Cycle
                    </th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(STATE_CE_REQUIREMENTS).map(([code, req]) => (
                    <tr key={code} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/states/${code}`}
                          className="font-semibold text-teal-600 transition-colors hover:text-teal-700"
                        >
                          {code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{req.hours}h</td>
                      <td className="px-4 py-3 text-slate-500">
                        Every {req.renewalYears} yrs
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                        <span className="line-clamp-1">{req.notes}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Requirements change frequently. Always verify with your state licensing board.
            </p>
          </section>

          {/* Approved providers */}
          <section>
            <h2 className="mb-4 font-serif text-xl font-bold text-slate-900">
              Approved CE providers
            </h2>
            <div className="space-y-3">
              {FEATURED_CE_PROVIDERS.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${provider.badge}`}
                  >
                    {provider.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">{provider.name}</span>
                      <span className="text-xs text-slate-400">— {provider.fullName}</span>
                    </div>
                    <p className="mb-2 text-sm leading-relaxed text-slate-500">
                      {provider.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.formats.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
                        >
                          {f}
                        </span>
                      ))}
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
                        {provider.states}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-slate-300"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 12L12 4M12 4H6M12 4v6" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Quick CE calc */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Quick renewal check</h3>
            <div className="space-y-3 text-sm text-slate-600">
              {[
                { label: 'Michigan (FD)', hours: 12, cycle: '2 yr' },
                { label: 'Ohio (FD)', hours: 12, cycle: '2 yr' },
                { label: 'Illinois (FD)', hours: 12, cycle: '2 yr' },
                { label: 'Texas (FD)', hours: 12, cycle: '2 yr' },
                { label: 'Washington (FD)', hours: 10, cycle: '2 yr' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="font-medium">{s.label}</span>
                  <div className="text-right">
                    <span className="font-bold text-teal-600">{s.hours}h</span>
                    <span className="ml-1 text-xs text-slate-400">/{s.cycle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 p-5 text-white">
            <p className="mb-1 font-semibold">Log your CE credits</p>
            <p className="mb-4 text-sm text-teal-100">
              Track completed hours, set renewal reminders, and never scramble for credits at
              license renewal time again.
            </p>
            <Link
              href="/join"
              className="block rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              Create free account →
            </Link>
          </div>

          {/* State boards */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">State licensing boards</h3>
            <div className="space-y-2 text-sm">
              {[
                { state: 'MI', name: 'Michigan LARA', url: 'https://www.michigan.gov/lara' },
                {
                  state: 'OH',
                  name: 'Ohio Funeral Directors',
                  url: 'https://funeral.ohio.gov',
                },
                {
                  state: 'IL',
                  name: 'IDFPR Illinois',
                  url: 'https://idfpr.illinois.gov',
                },
                {
                  state: 'TX',
                  name: 'Texas DFPS / TDLR',
                  url: 'https://www.tdlr.texas.gov',
                },
                {
                  state: 'WA',
                  name: 'Washington DOH',
                  url: 'https://www.doh.wa.gov',
                },
              ].map((b) => (
                <a
                  key={b.state}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
                >
                  <span>
                    <span className="mr-2 font-bold text-slate-400">{b.state}</span>
                    {b.name}
                  </span>
                  <svg
                    className="h-3 w-3 text-slate-300"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 9L9 3M9 3H5M9 3v4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

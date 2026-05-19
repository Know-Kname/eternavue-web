import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — deathcare.live',
  description:
    "deathcare.live is the professional community platform for the death care industry — built by and for funeral directors, cemetery operators, and deathcare professionals across the US.",
}

const TEAM_VALUES = [
  {
    title: 'Operators first',
    body: "Every feature is built for the people running operations — not for observers, aggregators, or passive audiences. Funeral directors, cemetery managers, and crematory operators are the platform's north star.",
  },
  {
    title: 'Verified identity',
    body: 'Anonymous policy advocacy is structurally weak. Verified professional credentials give the community its credibility and give legislators a reason to pay attention.',
  },
  {
    title: 'Platform, not content farm',
    body: "We don't generate content about the industry — we give the industry the infrastructure to speak for itself. The intelligence comes from verified operators, not from editorial teams.",
  },
  {
    title: 'State before federal',
    body: "Funeral service is state-regulated. The most important legislative battles happen in Lansing, Columbus, and Springfield — not Washington. The platform is built around state-level action, not national noise.",
  },
]

const MILESTONE_STATS = [
  { value: '7', label: 'Active bills tracked' },
  { value: '5', label: 'Launch states' },
  { value: '142', label: 'Verified members' },
  { value: '100', label: 'Years of DMP legacy' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
          Michigan launch · June 2026
        </div>
        <h1 className="mb-4 font-serif text-4xl font-bold text-slate-900">
          Built for the people who show up when no one else does.
        </h1>
        <p className="text-xl leading-relaxed text-slate-500">
          deathcare.live is the professional community and legislative intelligence platform for
          the death care industry — a space where verified operators can track state legislation,
          share field knowledge, build coalitions, and collectively shape industry policy.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MILESTONE_STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5 text-center"
          >
            <p className="font-serif text-3xl font-bold text-teal-600">{s.value}</p>
            <p className="mt-1 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Origin story */}
      <section className="mb-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900">
            100 years of precedent — and one gap we couldn't ignore
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              In June 2026, Detroit Memorial Park celebrates its 100th anniversary. A century of
              serving Metro Detroit families through war, economic collapse, pandemic, and change.
              The kind of institution that doesn't just survive — it endures by staying connected
              to the community it serves.
            </p>
            <p>
              That centennial raised a pointed question: why doesn't the death care industry have
              the infrastructure other professional industries take for granted? Doctors have
              peer-reviewed journals, clinical forums, and specialty networks. Attorneys have bar
              associations with real teeth and legislative committees with institutional weight.
              Financial professionals have compliance platforms that track every rule change in
              real time.
            </p>
            <p>
              Funeral directors have email chains, trade association newsletters, and phone calls
              with colleagues they happen to know. When a state legislature moves to change
              preneed fund requirements or restrict alkaline hydrolysis, the industry typically
              hears about it late — and responds even later.
            </p>
            <p className="font-medium text-slate-800">
              deathcare.live is the infrastructure gap closed.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900">What we stand for</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEAM_VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <p className="mb-2 text-sm font-bold text-slate-800">{v.title}</p>
              <p className="text-sm leading-relaxed text-slate-500">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we're building */}
      <section className="mb-12">
        <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900">
          The five pillars
        </h2>
        <div className="space-y-4">
          {[
            {
              number: '01',
              title: 'Legislative intelligence',
              desc: "Every bill that touches funeral service, cremation, or cemetery operations — tracked from introduction to governor's desk, with plain-English summaries and operator impact analysis.",
              color: 'text-gold-700 bg-gold-50',
            },
            {
              number: '02',
              title: 'Verified community',
              desc: 'Professional credential verification gives every post, position, and coalition signature real weight. When 142 verified funeral directors oppose a bill, legislators notice.',
              color: 'text-teal-700 bg-teal-50',
            },
            {
              number: '03',
              title: 'Industry directory',
              desc: 'Free, searchable listings for funeral homes, cremation providers, cemeteries, suppliers, and technology vendors — public for families, operator-claimed for professionals.',
              color: 'text-sky-700 bg-sky-50',
            },
            {
              number: '04',
              title: 'Reports & briefings',
              desc: 'The weekly "State of Deathcare" digest. Monthly policy watch reports. Field data from anonymous operator surveys. Intelligence you can act on, not just read.',
              color: 'text-purple-700 bg-purple-50',
            },
            {
              number: '05',
              title: 'Cross-entity search',
              desc: 'One search finds bills, operators, suppliers, resources, and discussions together. The unified intelligence layer that makes the whole platform more than the sum of its parts.',
              color: 'text-green-700 bg-green-50',
            },
          ].map((p) => (
            <div
              key={p.number}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${p.color}`}
              >
                {p.number}
              </span>
              <div>
                <p className="mb-1 font-semibold text-slate-800">{p.title}</p>
                <p className="text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Launch states */}
      <section className="mb-12">
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-7">
          <h2 className="mb-2 font-serif text-xl font-bold text-slate-900">Michigan first.</h2>
          <p className="mb-4 text-base leading-relaxed text-slate-600">
            The platform launches in Michigan — the home of Detroit Memorial Park, the first
            cohort of verified operators, and the most active state legislative session in our
            coverage area. Density before breadth: 50 deeply engaged Michigan operators is more
            valuable than 5,000 passive national followers.
          </p>
          <p className="text-sm text-slate-500">
            Ohio, Illinois, Washington, and Texas are the next wave. Founding members from any
            state are welcome and will receive platform access as coverage expands.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['MI (Active)', 'OH', 'IL', 'WA', 'TX'].map((s) => (
              <span
                key={s}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  s.includes('Active')
                    ? 'bg-teal-500 text-white'
                    : 'border border-teal-200 text-teal-700'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900">
          Join the founding cohort
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-base text-slate-500">
          Founding members get lifetime verified status at no cost and a voice in shaping what
          the platform becomes. The founding period closes when we reach operational capacity.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/join"
            className="rounded-xl bg-teal-500 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            Apply for access — free
          </Link>
          <Link
            href="/states/MI"
            className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Explore Michigan hub
          </Link>
        </div>
      </div>
    </div>
  )
}

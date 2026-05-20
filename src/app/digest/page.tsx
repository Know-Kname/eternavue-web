import Link from 'next/link'
import { MOCK_DIGEST_ISSUES } from '@/lib/mock-digest'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State of Deathcare — Weekly Industry Digest',
  description:
    'The weekly intelligence briefing for deathcare professionals. Legislative updates, industry trends, and community highlights — AI-assisted, editorially reviewed.',
}

export const revalidate = 3600

const MOMENTUM_CONFIG = {
  rising: { label: 'Rising', color: 'text-green-700 bg-green-50', icon: '↑' },
  falling: { label: 'Falling', color: 'text-red-600 bg-red-50', icon: '↓' },
  stable: { label: 'Stable', color: 'text-slate-500 bg-slate-50', icon: '→' },
}

export default function DigestPage() {
  const [latest, ...archive] = MOCK_DIGEST_ISSUES

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
            AI-assisted · editorially reviewed
          </span>
        </div>
        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">State of Deathcare</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-500">
          Weekly intelligence for deathcare professionals. Legislative updates, industry trends, and
          community highlights — every Monday morning.
        </p>
        <div className="mt-4">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4h12v8H2zM2 4l6 4 6-4" />
            </svg>
            Subscribe — free for members
          </Link>
        </div>
      </div>

      {/* Latest issue — full card */}
      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Latest issue · #{latest.issueNumber}
          </p>
          <span className="text-xs text-slate-400">{formatDate(latest.publishedAt)}</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-teal-800 to-teal-900 px-6 py-8 text-white">
            <p className="mb-2 text-xs font-semibold tracking-wider text-teal-300 uppercase">
              Issue #{latest.issueNumber} · {formatDate(latest.publishedAt)}
            </p>
            <h2 className="font-serif text-xl leading-snug font-bold">{latest.headline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-teal-200">{latest.subheadline}</p>
          </div>

          <div className="p-6">
            {/* Editor's note */}
            <div className="border-gold-100 bg-gold-50/60 mb-6 rounded-xl border px-4 py-3.5">
              <p className="mb-1 text-xs font-semibold text-slate-500 uppercase">Editor's note</p>
              <p className="text-sm leading-relaxed text-slate-700 italic">"{latest.editorNote}"</p>
            </div>

            {/* Featured bills */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Bills to watch this week
              </p>
              <div className="space-y-3">
                {latest.featuredBills.map((fb) => {
                  const momentum = MOMENTUM_CONFIG[fb.momentum]
                  return (
                    <div
                      key={fb.billId}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <Link
                            href={`/bills/${fb.state}/${fb.billId}`}
                            className="text-gold-700 bg-gold-50 rounded px-1.5 py-0.5 text-xs font-bold transition-colors hover:text-teal-700"
                          >
                            {fb.billNumber}
                          </Link>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${momentum.color}`}
                          >
                            {momentum.icon} {momentum.label}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{fb.summary}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: latest.stats.newMembers, label: 'New members' },
                { value: latest.stats.newBillsTracked, label: 'Bills tracked' },
                { value: latest.stats.discussionsStarted, label: 'Discussions' },
                { value: latest.stats.statesActive, label: 'States active' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xl font-bold text-teal-600">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {latest.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      {archive.length > 0 && (
        <section>
          <h2 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Previous issues
          </h2>
          <div className="space-y-4">
            {archive.map((issue) => (
              <div
                key={issue.id}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{issue.issueNumber}</span>
                    <span className="text-xs text-slate-400">{formatDate(issue.publishedAt)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {issue.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 text-xs text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mb-1 font-serif text-base leading-snug font-bold text-slate-800">
                  {issue.headline}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
                  {issue.subheadline}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                  <span>{issue.stats.newBillsTracked} bills</span>
                  <span>{issue.stats.discussionsStarted} discussions</span>
                  <span>{issue.stats.newMembers} new members</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subscribe CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-900 p-7 text-center text-white">
        <p className="mb-1 font-serif text-xl font-bold">Never miss an issue</p>
        <p className="mb-5 text-sm text-teal-200">
          The State of Deathcare lands every Monday. It takes 5 minutes to read and saves you hours
          of tracking bills, discussions, and industry moves yourself.
        </p>
        <Link
          href="/join"
          className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-teal-800 transition-colors hover:bg-teal-50"
        >
          Join free to subscribe →
        </Link>
      </div>
    </div>
  )
}

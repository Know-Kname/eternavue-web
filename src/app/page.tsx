import Link from 'next/link'
import { Search, ArrowRight, Users, FileText, TrendingUp } from 'lucide-react'
import { getArticles } from '@/lib/wpgraphql'
import { ArticleCard } from '@/components/resources/ArticleCard'
import { BillCard } from '@/components/legislative/BillCard'
import { PostCard } from '@/components/community/PostCard'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { MOCK_BILLS, MOCK_POSTS, MOCK_PROFILES, getMockStateHub } from '@/lib/mock-community'
import { MOCK_DIGEST_ISSUES } from '@/lib/mock-digest'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'deathcare.live — Community & Legislative Intelligence for Deathcare Professionals',
  description:
    'Track state legislation, connect with verified peers, and build coalitions. The professional community for funeral directors, cemetery operators, and deathcare industry leaders.',
}

export const revalidate = 3600

const latestDigest = MOCK_DIGEST_ISSUES[0]

// Live-ish stats (will come from Supabase once connected)
const LIVE_STATS = {
  activeBills: 7,
  verifiedMembers: 142,
  activeStates: 5,
  discussionsThisWeek: 34,
}

export default async function HomePage() {
  const { articles } = await getArticles()
  const featuredArticles = articles.slice(0, 3)

  const featuredBill = MOCK_BILLS[0]
  const topPosts = MOCK_POSTS.slice(0, 3)
  const featuredProfile = MOCK_PROFILES[0]
  const miHub = getMockStateHub('MI')
  if (!miHub) return null

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-600/40 bg-teal-700/60 px-3 py-1.5 text-sm font-medium text-teal-200">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-teal-400" />
              Michigan launch — founding member period open
            </div>
            <h1 className="font-display mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
              Where deathcare
              <br />
              professionals make
              <br />
              <span className="text-teal-300">policy move.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-teal-100">
              Track legislation, share field knowledge, build coalitions, and connect with verified
              peers — all in one platform built for the people who show up when no one else does.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Link
                href="/join"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 shadow-lg transition-colors hover:bg-teal-50"
              >
                Join free →
              </Link>
              <Link
                href="/states/MI"
                className="rounded-xl border border-teal-500/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700/50"
              >
                Michigan hub
              </Link>
            </div>

            {/* Live stats row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: FileText, value: LIVE_STATS.activeBills, label: 'Active bills tracked' },
                { icon: Users, value: LIVE_STATS.verifiedMembers, label: 'Verified members' },
                {
                  icon: TrendingUp,
                  value: LIVE_STATS.discussionsThisWeek,
                  label: 'Discussions this week',
                },
                { icon: Users, value: LIVE_STATS.activeStates, label: 'States covered' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-teal-700/40 bg-teal-800/40 p-4"
                >
                  <p className="mb-0.5 text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-teal-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 1: Featured Bill + Top Discussion + Most Active State ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">Legislative spotlight</h2>
          <Link
            href="/bills/MI"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            All bills <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured bill */}
          <div className="lg:col-span-1">
            <p className="text-gold-600 mb-3 text-xs font-semibold tracking-wider uppercase">
              Most followed bill
            </p>
            <BillCard bill={featuredBill} />
          </div>

          {/* Top discussion */}
          <div className="lg:col-span-1">
            <p className="mb-3 text-xs font-semibold tracking-wider text-purple-600 uppercase">
              Top discussion
            </p>
            <PostCard post={MOCK_POSTS[0]} compact />
          </div>

          {/* Michigan hub highlight */}
          <div className="lg:col-span-1">
            <p className="mb-3 text-xs font-semibold tracking-wider text-teal-600 uppercase">
              Most active state
            </p>
            <Link
              href="/states/MI"
              className="block rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">Michigan</span>
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                      Launch state
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Most active legislative session in the Midwest
                  </p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  { value: miHub.activeBillCount, label: 'Active bills' },
                  { value: miHub.topPosts.length, label: 'Discussions' },
                  { value: miHub.verifiedOperatorCount, label: 'Members' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-slate-50 p-2.5 text-center">
                    <p className="text-lg font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {miHub.bills.slice(0, 2).map((bill) => (
                  <div key={bill.id} className="flex items-center gap-2 text-sm">
                    <span className="text-gold-600 bg-gold-50 shrink-0 rounded px-1.5 py-0.5 text-xs font-bold">
                      {bill.billNumber}
                    </span>
                    <span className="line-clamp-1 text-slate-600">{bill.title}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-teal-600">View Michigan hub →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Row 2: Feed preview + Featured profile ── */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Feed preview (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Latest from the field
                </h2>
                <Link
                  href="/feed"
                  className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Full feed <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="space-y-4">
                {topPosts.map((post) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
              <Link
                href="/feed"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-teal-200 hover:bg-white hover:text-teal-600"
              >
                See all discussions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured profile + join CTA */}
            <div>
              <h2 className="font-display mb-5 text-xl font-bold text-slate-900">
                Featured member
              </h2>
              <ProfileCard profile={featuredProfile} />

              {/* Join CTA card */}
              <div className="mt-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 p-5 text-white">
                <p className="mb-1 text-sm font-semibold">Join the network</p>
                <p className="mb-4 text-xs leading-relaxed text-teal-100">
                  Free during founding member period. Verified profiles get full access to
                  legislation tracking, coalitions, and peer directory.
                </p>
                <Link
                  href="/join"
                  className="block rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  Apply for access →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Digest teaser ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-gradient-to-br from-teal-800 to-teal-900 px-7 py-8 text-white lg:col-span-2">
              <p className="mb-2 text-xs font-semibold tracking-wider text-teal-300 uppercase">
                Issue #{latestDigest.issueNumber} · {formatDate(latestDigest.publishedAt)}
              </p>
              <p className="mb-1 text-sm font-semibold text-teal-200">State of Deathcare</p>
              <h2 className="font-serif text-lg leading-snug font-bold">{latestDigest.headline}</h2>
              <Link
                href="/digest"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 transition-colors hover:text-white"
              >
                Read full issue <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex flex-col justify-between px-7 py-6 lg:col-span-3">
              <div className="space-y-3">
                {latestDigest.featuredBills.slice(0, 2).map((fb) => (
                  <div key={fb.billId} className="flex items-start gap-3">
                    <Link
                      href={`/bills/${fb.state}/${fb.billId}`}
                      className="text-gold-700 bg-gold-50 mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-bold transition-colors hover:text-teal-700"
                    >
                      {fb.billNumber}
                    </Link>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {fb.summary}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  {latestDigest.stats.newBillsTracked} bills ·{' '}
                  {latestDigest.stats.discussionsStarted} discussions
                </p>
                <Link
                  href="/join"
                  className="rounded-lg bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  Subscribe free →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 3: Directory quick-search ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Industry directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              Find funeral homes, cemeteries, suppliers, and technology providers.
            </p>
          </div>
          <Link
            href="/directory"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Browse all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Link
          href="/search"
          className="mb-8 flex w-full max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-400 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
        >
          <Search className="h-5 w-5 shrink-0" />
          <span className="text-sm">Search funeral homes, suppliers, technology providers...</span>
        </Link>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            {
              href: '/directory/funeral-homes',
              label: 'Funeral Homes',
              emoji: '⚰️',
              color: 'bg-teal-50 border-teal-100 hover:border-teal-300',
            },
            {
              href: '/directory/cremation',
              label: 'Cremation',
              emoji: '🔥',
              color: 'bg-slate-50 border-slate-200 hover:border-teal-200',
            },
            {
              href: '/directory/cemeteries',
              label: 'Cemeteries',
              emoji: '🌿',
              color: 'bg-green-50 border-green-100 hover:border-green-300',
            },
            {
              href: '/directory/suppliers',
              label: 'Suppliers',
              emoji: '📦',
              color: 'bg-amber-50 border-amber-100 hover:border-amber-300',
            },
            {
              href: '/directory/technology',
              label: 'Technology',
              emoji: '💻',
              color: 'bg-purple-50 border-purple-100 hover:border-purple-300',
            },
            {
              href: '/jobs',
              label: 'Jobs',
              emoji: '💼',
              color: 'bg-slate-50 border-slate-200 hover:border-teal-200',
            },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`flex flex-col items-center gap-2.5 rounded-xl border p-5 ${cat.color} group text-center transition-all duration-200`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs leading-tight font-semibold text-slate-700 transition-colors group-hover:text-teal-700">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Row 4: Latest resources ── */}
      {featuredArticles.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Industry news & resources
              </h2>
              <Link
                href="/resources"
                className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                All resources <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 to-teal-900 px-8 py-12 text-center text-white">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 0, transparent 50%), radial-gradient(circle at 80% 20%, white 0, transparent 40%)',
            }}
          />
          <div className="relative">
            <p className="mb-3 text-sm font-semibold tracking-wider text-teal-300 uppercase">
              Founding member period
            </p>
            <h2 className="font-display mx-auto mb-4 max-w-xl text-3xl font-bold">
              Be first. Be verified. Shape what this becomes.
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-teal-200">
              Access is free for founding members. Your license number and state verify your
              identity — no one else gets your level of credibility on the platform.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/join"
                className="rounded-xl bg-white px-8 py-3.5 font-bold text-teal-800 shadow-lg transition-colors hover:bg-teal-50"
              >
                Apply for access — it&apos;s free
              </Link>
              <Link
                href="/states/MI"
                className="rounded-xl border border-teal-500 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-teal-700/50"
              >
                Explore Michigan hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

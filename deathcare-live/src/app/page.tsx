import Link from 'next/link'
import { Search, ArrowRight, Users, FileText, TrendingUp } from 'lucide-react'
import { getArticles } from '@/lib/wpgraphql'
import { ArticleCard } from '@/components/resources/ArticleCard'
import { BillCard } from '@/components/legislative/BillCard'
import { PostCard } from '@/components/community/PostCard'
import { ProfileCard } from '@/components/profile/ProfileCard'
import {
  MOCK_BILLS,
  MOCK_POSTS,
  MOCK_PROFILES,
  getMockStateHub,
} from '@/lib/mock-community'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'deathcare.live — Community & Legislative Intelligence for Deathcare Professionals',
  description:
    'Track state legislation, connect with verified peers, and build coalitions. The professional community for funeral directors, cemetery operators, and deathcare industry leaders.',
}

export const revalidate = 3600

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

  const featuredBill = MOCK_BILLS[0] // MI HB4521 — most active
  const topPosts = MOCK_POSTS.slice(0, 3)
  const featuredProfile = MOCK_PROFILES[0] // James Kowalski
  // getMockStateHub always returns a value for valid states; MI is guaranteed
  const miHub = getMockStateHub('MI')!

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-700/60 border border-teal-600/40 text-teal-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block" />
              Michigan launch — founding member period open
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6">
              Where deathcare<br />
              professionals make<br />
              <span className="text-teal-300">policy move.</span>
            </h1>
            <p className="text-teal-100 text-lg leading-relaxed mb-8 max-w-xl">
              Track legislation, share field knowledge, build coalitions, and connect with verified
              peers — all in one platform built for the people who show up when no one else does.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/join"
                className="px-6 py-3 rounded-xl bg-white text-teal-800 font-semibold hover:bg-teal-50 transition-colors shadow-lg"
              >
                Join free →
              </Link>
              <Link
                href="/states/MI"
                className="px-6 py-3 rounded-xl border border-teal-500/50 text-white font-semibold hover:bg-teal-700/50 transition-colors"
              >
                Michigan hub
              </Link>
            </div>

            {/* Live stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: FileText, value: LIVE_STATS.activeBills, label: 'Active bills tracked' },
                { icon: Users, value: LIVE_STATS.verifiedMembers, label: 'Verified members' },
                { icon: TrendingUp, value: LIVE_STATS.discussionsThisWeek, label: 'Discussions this week' },
                { icon: Users, value: LIVE_STATS.activeStates, label: 'States covered' },
              ].map(stat => (
                <div key={stat.label} className="bg-teal-800/40 border border-teal-700/40 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                  <p className="text-xs text-teal-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 1: Featured Bill + Top Discussion + Most Active State ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-slate-900">Legislative spotlight</h2>
          <Link href="/bills/MI" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            All bills <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured bill */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-3">Most followed bill</p>
            <BillCard bill={featuredBill} />
          </div>

          {/* Top discussion */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-3">Top discussion</p>
            <PostCard post={MOCK_POSTS[0]} compact />
          </div>

          {/* Michigan hub highlight */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">Most active state</p>
            <Link href="/states/MI" className="block bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-slate-900">Michigan</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium">Launch state</span>
                  </div>
                  <p className="text-sm text-slate-500">Most active legislative session in the Midwest</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { value: miHub.activeBillCount, label: 'Active bills' },
                  { value: miHub.topPosts.length, label: 'Discussions' },
                  { value: miHub.verifiedOperatorCount, label: 'Members' },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {miHub.bills.slice(0, 2).map(bill => (
                  <div key={bill.id} className="flex items-center gap-2 text-sm">
                    <span className="text-xs font-bold text-gold-600 bg-gold-50 px-1.5 py-0.5 rounded shrink-0">{bill.billNumber}</span>
                    <span className="text-slate-600 line-clamp-1">{bill.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-teal-600 font-medium mt-3">View Michigan hub →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Row 2: Feed preview + Featured profile ── */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed preview (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-display font-bold text-slate-900">Latest from the field</h2>
                <Link href="/feed" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                  Full feed <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-4">
                {topPosts.map(post => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
              <Link
                href="/feed"
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-white hover:border-teal-200 hover:text-teal-600 transition-colors"
              >
                See all discussions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured profile + join CTA */}
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-5">Featured member</h2>
              <ProfileCard profile={featuredProfile} />

              {/* Join CTA card */}
              <div className="mt-4 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-5 text-white">
                <p className="text-sm font-semibold mb-1">Join the network</p>
                <p className="text-xs text-teal-100 mb-4 leading-relaxed">
                  Free during founding member period. Verified profiles get full access to legislation tracking, coalitions, and peer directory.
                </p>
                <Link
                  href="/join"
                  className="block text-center py-2.5 rounded-lg bg-white text-teal-700 text-sm font-semibold hover:bg-teal-50 transition-colors"
                >
                  Apply for access →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 3: Directory quick-search ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">Industry directory</h2>
            <p className="text-sm text-slate-500 mt-1">Find funeral homes, cemeteries, suppliers, and technology providers.</p>
          </div>
          <Link href="/directory" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            Browse all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <Link
          href="/search"
          className="flex items-center gap-3 w-full max-w-2xl px-5 py-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-slate-400 mb-8"
        >
          <Search className="w-5 h-5 shrink-0" />
          <span className="text-sm">Search funeral homes, suppliers, technology providers...</span>
        </Link>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href: '/directory/funeral-homes', label: 'Funeral Homes', emoji: '⚰️', color: 'bg-teal-50 border-teal-100 hover:border-teal-300' },
            { href: '/directory/cremation',     label: 'Cremation',     emoji: '🔥', color: 'bg-slate-50 border-slate-200 hover:border-teal-200' },
            { href: '/directory/cemeteries',    label: 'Cemeteries',    emoji: '🌿', color: 'bg-green-50 border-green-100 hover:border-green-300' },
            { href: '/directory/suppliers',     label: 'Suppliers',     emoji: '📦', color: 'bg-amber-50 border-amber-100 hover:border-amber-300' },
            { href: '/directory/technology',    label: 'Technology',    emoji: '💻', color: 'bg-purple-50 border-purple-100 hover:border-purple-300' },
            { href: '/jobs',                    label: 'Jobs',          emoji: '💼', color: 'bg-slate-50 border-slate-200 hover:border-teal-200' },
          ].map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-xl border ${cat.color} transition-all duration-200 text-center group`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-teal-700 transition-colors leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Row 4: Latest resources ── */}
      {featuredArticles.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-slate-900">Industry news & resources</h2>
              <Link href="/resources" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                All resources <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-800 to-teal-900 rounded-2xl px-8 py-12 text-white text-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 0, transparent 50%), radial-gradient(circle at 80% 20%, white 0, transparent 40%)',
            }}
          />
          <div className="relative">
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">Founding member period</p>
            <h2 className="text-3xl font-display font-bold mb-4 max-w-xl mx-auto">
              Be first. Be verified. Shape what this becomes.
            </h2>
            <p className="text-teal-200 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Access is free for founding members. Your license number and state verify your identity — no one else gets your level of credibility on the platform.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/join"
                className="px-8 py-3.5 rounded-xl bg-white text-teal-800 font-bold hover:bg-teal-50 transition-colors shadow-lg"
              >
                Apply for access — it&apos;s free
              </Link>
              <Link
                href="/states/MI"
                className="px-8 py-3.5 rounded-xl border border-teal-500 text-white font-semibold hover:bg-teal-700/50 transition-colors"
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

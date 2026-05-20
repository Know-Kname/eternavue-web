import Link from 'next/link'
import { searchListings } from '@/lib/typesense'
import { LISTING_TYPE_MAP, isValidListingType } from '@/lib/listing-types'
import { MOCK_BILLS, MOCK_POSTS, MOCK_PROFILES } from '@/lib/mock-community'
import { STATUS_BADGE } from '@/lib/bill-utils'
import { Badge } from '@/components/ui/Badge'
import { MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import type { Bill, Post, Profile } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Search — deathcare.live',
  description: 'Search across bills, operators, posts, and suppliers on deathcare.live.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; kind?: string; page?: string }>
}

function matchScore(text: string, query: string): number {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t.includes(q)) return 2
  const words = q.split(/\s+/)
  return words.filter((w) => t.includes(w)).length
}

function searchBills(query: string): Bill[] {
  if (!query) return []
  return MOCK_BILLS.filter((b) => {
    const score =
      matchScore(b.billNumber, query) +
      matchScore(b.title, query) +
      matchScore(b.description, query) +
      matchScore(b.plainSummary ?? '', query) +
      (b.industryTags ?? []).reduce((s, t) => s + matchScore(t, query), 0)
    return score > 0
  }).slice(0, 10)
}

function searchPosts(query: string): Post[] {
  if (!query) return []
  return MOCK_POSTS.filter((p) => {
    if (p.isAnonymous) return false
    const score = matchScore(p.body, query) + matchScore(p.billTitle ?? '', query)
    return score > 0
  }).slice(0, 8)
}

function searchProfiles(query: string): Profile[] {
  if (!query) return []
  return MOCK_PROFILES.filter((p) => {
    const score =
      matchScore(p.displayName, query) +
      matchScore(p.bio ?? '', query) +
      p.expertise.reduce((s, e) => s + matchScore(e, query), 0)
    return score > 0
  }).slice(0, 6)
}

const KIND_TABS = [
  { value: 'all', label: 'All results' },
  { value: 'listings', label: 'Directory' },
  { value: 'bills', label: 'Bills' },
  { value: 'community', label: 'Community' },
  { value: 'people', label: 'People' },
]

const KIND_COLORS: Record<string, string> = {
  note: 'bg-teal-50 text-teal-700',
  analysis: 'bg-purple-50 text-purple-700',
  position: 'bg-amber-50 text-amber-700',
  question: 'bg-sky-50 text-sky-700',
  report: 'bg-green-50 text-green-700',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', kind = 'all', page = '1' } = await searchParams
  const { results: listingResults, total: listingTotal } = await searchListings(
    q,
    parseInt(page, 10)
  )
  const billResults = searchBills(q)
  const postResults = searchPosts(q)
  const profileResults = searchProfiles(q)

  const totalResults =
    listingTotal + billResults.length + postResults.length + profileResults.length
  const showAll = kind === 'all'

  const tabCounts: Record<string, number> = {
    all: totalResults,
    listings: listingTotal,
    bills: billResults.length,
    community: postResults.length,
    people: profileResults.length,
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-1 font-serif text-3xl font-bold text-slate-800">
          {q ? `"${q}"` : 'Search deathcare.live'}
        </h1>
        {q && (
          <p className="text-slate-500">
            {totalResults === 0
              ? 'No results found.'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''} across bills, operators, posts, and people`}
          </p>
        )}
        {!q && (
          <p className="text-slate-500">
            Search across bills, operators, posts, and verified professionals.
          </p>
        )}
      </div>

      {/* Kind tabs */}
      {q && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {KIND_TABS.map((tab) => {
            const count = tabCounts[tab.value]
            const isActive = kind === tab.value
            return (
              <Link
                key={tab.value}
                href={`/search?q=${encodeURIComponent(q)}&kind=${tab.value}`}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-teal-500 bg-teal-500 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50'
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? 'bg-teal-400 text-white' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}

      {/* Results */}
      <div className="space-y-8">
        {/* Listings */}
        {(showAll || kind === 'listings') && listingResults.length > 0 && (
          <section>
            {showAll && (
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Directory ({listingTotal})
                </h2>
                {listingTotal > 3 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&kind=listings`}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700"
                  >
                    See all →
                  </Link>
                )}
              </div>
            )}
            <div className="space-y-3">
              {(showAll ? listingResults.slice(0, 3) : listingResults).map((result) => (
                <Link
                  key={result.id}
                  href={`/directory/${result.listingType}/${result.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-teal-700">
                        {result.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{result.excerpt}</p>
                      {(result.city || result.state) && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="h-3 w-3" />
                          {[result.city, result.state].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </div>
                    {isValidListingType(result.listingType) && (
                      <Badge variant="sage" className="shrink-0">
                        {LISTING_TYPE_MAP[result.listingType].label}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bills */}
        {(showAll || kind === 'bills') && billResults.length > 0 && (
          <section>
            {showAll && (
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Bills ({billResults.length})
                </h2>
                {billResults.length > 3 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&kind=bills`}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700"
                  >
                    See all →
                  </Link>
                )}
              </div>
            )}
            <div className="space-y-3">
              {(showAll ? billResults.slice(0, 3) : billResults).map((bill) => {
                const badge = STATUS_BADGE[bill.status]
                return (
                  <Link
                    key={bill.id}
                    href={`/bills/${bill.state}/${bill.id}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-sm"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-gold-700 bg-gold-50 rounded px-1.5 py-0.5 text-xs font-bold">
                        {bill.billNumber}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                        {bill.state}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="line-clamp-1 font-semibold text-slate-800 transition-colors group-hover:text-teal-700">
                      {bill.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {bill.plainSummary ?? bill.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Community posts */}
        {(showAll || kind === 'community') && postResults.length > 0 && (
          <section>
            {showAll && (
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Community ({postResults.length})
                </h2>
                {postResults.length > 3 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&kind=community`}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700"
                  >
                    See all →
                  </Link>
                )}
              </div>
            )}
            <div className="space-y-3">
              {(showAll ? postResults.slice(0, 3) : postResults).map((post) => (
                <Link
                  key={post.id}
                  href={`/feed`}
                  className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-sm"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${KIND_COLORS[post.kind] ?? 'bg-slate-50 text-slate-500'}`}
                    >
                      {post.kind}
                    </span>
                    {post.state && <span className="text-xs text-slate-400">{post.state}</span>}
                    <Link
                      href={`/profile/${post.author.username}`}
                      className="text-xs font-medium text-teal-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {post.author.displayName}
                    </Link>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">{post.body}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* People */}
        {(showAll || kind === 'people') && profileResults.length > 0 && (
          <section>
            {showAll && (
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  People ({profileResults.length})
                </h2>
                {profileResults.length > 3 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&kind=people`}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700"
                  >
                    See all →
                  </Link>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(showAll ? profileResults.slice(0, 4) : profileResults).map((profile) => (
                <Link
                  key={profile.id}
                  href={`/profile/${profile.username}`}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                    {profile.displayName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 transition-colors group-hover:text-teal-700">
                      {profile.displayName}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">
                      {profile.role}
                      {profile.state ? ` · ${profile.state}` : ''}
                      {profile.verifiedAt ? ' · ✓ Verified' : ''}
                    </p>
                    {profile.bio && (
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">{profile.bio}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {q && totalResults === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="mb-2 text-lg font-medium">No results for &ldquo;{q}&rdquo;</p>
            <p className="text-sm">Try different keywords, or browse by state or bill.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/bills/MI"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Michigan bills
              </Link>
              <Link
                href="/feed"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Community feed
              </Link>
              <Link
                href="/directory"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Directory
              </Link>
            </div>
          </div>
        )}

        {/* Prompt when no query */}
        {!q && (
          <div className="py-8 text-center">
            <p className="mb-4 text-slate-500">
              Try searching for a bill number, state, specialty, or operator name.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['preneed', 'Michigan funeral', 'alkaline hydrolysis', 'cremation', 'cemetery'].map(
                (suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/search?q=${encodeURIComponent(suggestion)}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {suggestion}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

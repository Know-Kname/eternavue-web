import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_PROFILES, MOCK_POSTS } from '@/lib/mock-community'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import { PostCard } from '@/components/community/PostCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const profile = MOCK_PROFILES.find((p) => p.username === username)
  if (!profile) return {}
  return {
    title: `${profile.displayName} — deathcare.live`,
    description:
      profile.bio ?? `${profile.displayName} is a verified ${profile.role} on deathcare.live`,
  }
}

export async function generateStaticParams() {
  return MOCK_PROFILES.map((p) => ({ username: p.username }))
}

export const revalidate = 86400

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params
  const profile = MOCK_PROFILES.find((p) => p.username === username)
  if (!profile) notFound()

  const posts = MOCK_POSTS.filter((p) => p.authorId === profile.id && !p.isAnonymous)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">
            {profile.displayName[0]}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="mb-1 font-serif text-xl font-bold text-slate-900">
                  {profile.displayName}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <VerifiedBadge role={profile.role} verified={!!profile.verifiedAt} size="md" />
                  {profile.state && (
                    <Link
                      href={`/states/${profile.state}`}
                      className="text-sm text-slate-500 transition-colors hover:text-teal-600"
                    >
                      {profile.state}
                    </Link>
                  )}
                  {profile.verifiedAt && (
                    <span className="text-xs text-green-600">
                      ✓ Verified{' '}
                      {new Date(profile.verifiedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href="/join"
                className="shrink-0 rounded-lg border border-teal-400 px-4 py-2 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-50"
              >
                Endorse
              </Link>
            </div>

            {profile.bio && <p className="mt-3 leading-relaxed text-slate-600">{profile.bio}</p>}

            {profile.expertise.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-teal-100 bg-teal-50 px-2 py-0.5 text-xs text-teal-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 flex gap-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
          {profile.postCount !== undefined && (
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">{profile.postCount}</p>
              <p className="text-xs">Posts</p>
            </div>
          )}
          {profile.endorsementCount !== undefined && (
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">{profile.endorsementCount}</p>
              <p className="text-xs">Endorsements</p>
            </div>
          )}
          {profile.yearsActive !== undefined && (
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">{profile.yearsActive}</p>
              <p className="text-xs">Years active</p>
            </div>
          )}
          {profile.website && (
            <div className="ml-auto">
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 transition-colors hover:text-teal-700"
              >
                {profile.website.replace(/^https?:\/\//, '')} ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <section>
          <h2 className="mb-4 font-serif text-lg font-bold text-slate-900">Recent posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <div className="py-12 text-center text-slate-400">
          <p>No public posts yet.</p>
        </div>
      )}
    </div>
  )
}

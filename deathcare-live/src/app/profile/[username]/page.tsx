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
  const profile = MOCK_PROFILES.find(p => p.username === username)
  if (!profile) return {}
  return {
    title: `${profile.displayName} — deathcare.live`,
    description: profile.bio ?? `${profile.displayName} is a verified ${profile.role} on deathcare.live`,
  }
}

export async function generateStaticParams() {
  return MOCK_PROFILES.map(p => ({ username: p.username }))
}

export const revalidate = 86400

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params
  const profile = MOCK_PROFILES.find(p => p.username === username)
  if (!profile) notFound()

  const posts = MOCK_POSTS.filter(p => p.authorId === profile.id && !p.isAnonymous)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center shrink-0 text-teal-700 font-bold text-2xl">
            {profile.displayName[0]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-serif font-bold text-slate-900 mb-1">
                  {profile.displayName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <VerifiedBadge role={profile.role} verified={!!profile.verifiedAt} size="md" />
                  {profile.state && (
                    <Link
                      href={`/states/${profile.state}`}
                      className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      {profile.state}
                    </Link>
                  )}
                  {profile.verifiedAt && (
                    <span className="text-xs text-green-600">
                      ✓ Verified {new Date(profile.verifiedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href="/join"
                className="shrink-0 px-4 py-2 rounded-lg border border-teal-400 text-teal-600 text-sm font-medium hover:bg-teal-50 transition-colors"
              >
                Endorse
              </Link>
            </div>

            {profile.bio && (
              <p className="text-slate-600 mt-3 leading-relaxed">{profile.bio}</p>
            )}

            {profile.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {profile.expertise.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-teal-50 text-teal-700 border border-teal-100">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-5 pt-5 border-t border-slate-100 text-sm text-slate-500">
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
                className="text-teal-600 hover:text-teal-700 transition-colors text-sm"
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
          <h2 className="text-lg font-serif font-bold text-slate-900 mb-4">
            Recent posts
          </h2>
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <p>No public posts yet.</p>
        </div>
      )}
    </div>
  )
}

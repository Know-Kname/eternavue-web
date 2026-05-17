import Link from 'next/link'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import type { Profile } from '@/lib/types'

interface ProfileCardProps {
  profile: Profile
  compact?: boolean
}

export function ProfileCard({ profile, compact }: ProfileCardProps) {
  return (
    <Link href={`/profile/${profile.username}`} className="block group">
      <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-teal-200 hover:shadow-sm transition-all">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0 text-teal-700 font-bold text-base group-hover:bg-teal-200 transition-colors">
            {profile.displayName[0]}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                {profile.displayName}
              </span>
              <VerifiedBadge role={profile.role} verified={!!profile.verifiedAt} />
            </div>
            {profile.state && (
              <p className="text-xs text-slate-400 mb-1">{profile.state}</p>
            )}
            {!compact && profile.bio && (
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{profile.bio}</p>
            )}
            {!compact && profile.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.expertise.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-flex px-1.5 py-0.5 rounded text-xs bg-slate-100 text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {!compact && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
            {profile.postCount !== undefined && (
              <span>{profile.postCount} posts</span>
            )}
            {profile.endorsementCount !== undefined && (
              <span>{profile.endorsementCount} endorsements</span>
            )}
            {profile.yearsActive !== undefined && (
              <span>{profile.yearsActive} yrs active</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

import Link from 'next/link'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import type { Profile, UserRole } from '@/lib/types'

const ROLE_AVATAR: Record<UserRole, { bg: string; text: string; ring: string }> = {
  director:    { bg: 'bg-teal-500',   text: 'text-white', ring: 'ring-teal-200' },
  operator:    { bg: 'bg-sky-500',    text: 'text-white', ring: 'ring-sky-200' },
  supplier:    { bg: 'bg-amber-500',  text: 'text-white', ring: 'ring-amber-200' },
  association: { bg: 'bg-purple-500', text: 'text-white', ring: 'ring-purple-200' },
  educator:    { bg: 'bg-green-500',  text: 'text-white', ring: 'ring-green-200' },
  observer:    { bg: 'bg-slate-400',  text: 'text-white', ring: 'ring-slate-200' },
}

const EXPERTISE_COLORS = [
  'bg-teal-50 text-teal-700',
  'bg-sky-50 text-sky-700',
  'bg-purple-50 text-purple-700',
  'bg-amber-50 text-amber-700',
]

interface ProfileCardProps {
  profile: Profile
  compact?: boolean
}

export function ProfileCard({ profile, compact }: ProfileCardProps) {
  const avatar = ROLE_AVATAR[profile.role]

  return (
    <Link href={`/profile/${profile.username}`} className="block group">
      <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-teal-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-3.5">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg ${avatar.bg} ${avatar.text} ring-4 ${avatar.ring} group-hover:scale-105 transition-transform duration-200`}>
            {profile.displayName[0]}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <span className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug">
                {profile.displayName}
              </span>
              {profile.yearsActive && (
                <span className="shrink-0 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                  {profile.yearsActive} yrs
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <VerifiedBadge role={profile.role} verified={!!profile.verifiedAt} />
              {profile.state && (
                <span className="text-xs text-slate-400">{profile.state}</span>
              )}
            </div>
            {!compact && profile.bio && (
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">{profile.bio}</p>
            )}
          </div>
        </div>

        {!compact && profile.expertise.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.expertise.slice(0, 4).map((tag, i) => (
              <span
                key={tag}
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${EXPERTISE_COLORS[i % EXPERTISE_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {!compact && (
          <div className="flex items-center gap-5 mt-4 pt-3 border-t border-slate-100 text-xs">
            {profile.postCount !== undefined && (
              <div className="text-center">
                <p className="font-bold text-slate-800">{profile.postCount}</p>
                <p className="text-slate-400">posts</p>
              </div>
            )}
            {profile.endorsementCount !== undefined && (
              <div className="text-center">
                <p className="font-bold text-slate-800">{profile.endorsementCount}</p>
                <p className="text-slate-400">endorsements</p>
              </div>
            )}
            <span className="ml-auto text-teal-500 font-semibold group-hover:text-teal-600 transition-colors">
              View profile →
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

import Link from 'next/link'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import type { Profile, UserRole } from '@/lib/types'

const ROLE_AVATAR: Record<UserRole, { bg: string; text: string; ring: string }> = {
  director: { bg: 'bg-teal-500', text: 'text-white', ring: 'ring-teal-200' },
  operator: { bg: 'bg-sky-500', text: 'text-white', ring: 'ring-sky-200' },
  supplier: { bg: 'bg-amber-500', text: 'text-white', ring: 'ring-amber-200' },
  association: { bg: 'bg-purple-500', text: 'text-white', ring: 'ring-purple-200' },
  educator: { bg: 'bg-green-500', text: 'text-white', ring: 'ring-green-200' },
  observer: { bg: 'bg-slate-400', text: 'text-white', ring: 'ring-slate-200' },
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
    <Link href={`/profile/${profile.username}`} className="group block">
      <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-teal-200 hover:shadow-md">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${avatar.bg} ${avatar.text} ring-4 ${avatar.ring} transition-transform duration-200 group-hover:scale-105`}
          >
            {profile.displayName[0]}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-start justify-between gap-2">
              <span className="text-sm leading-snug font-bold text-slate-900 transition-colors group-hover:text-teal-600">
                {profile.displayName}
              </span>
              {profile.yearsActive && (
                <span className="shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-400">
                  {profile.yearsActive} yrs
                </span>
              )}
            </div>
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              <VerifiedBadge role={profile.role} verified={!!profile.verifiedAt} />
              {profile.state && <span className="text-xs text-slate-400">{profile.state}</span>}
            </div>
            {!compact && profile.bio && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {!compact && profile.expertise.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.expertise.slice(0, 4).map((tag, i) => (
              <span
                key={tag}
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${EXPERTISE_COLORS[i % EXPERTISE_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {!compact && (
          <div className="mt-4 flex items-center gap-5 border-t border-slate-100 pt-3 text-xs">
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
            <span className="ml-auto font-semibold text-teal-500 transition-colors group-hover:text-teal-600">
              View profile →
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

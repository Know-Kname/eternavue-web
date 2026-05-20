import { notFound } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { MOCK_PROFILES } from '@/lib/mock-community'
import type { Metadata } from 'next'

const isClerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  return { title: `Edit profile — ${username} | deathcare.live` }
}

export default async function EditProfilePage({ params }: PageProps) {
  const { username } = await params

  if (!isClerkEnabled) notFound()

  const { userId } = await auth()
  if (!userId) notFound()

  const user = await currentUser()
  const profile = MOCK_PROFILES.find((p) => p.username === username)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-slate-900">Edit profile</h1>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">
            {(user?.firstName ?? user?.username ?? '?')[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-slate-500">@{user?.username ?? username}</p>
          </div>
        </div>

        {!profile ? (
          <div className="border-gold-100 bg-gold-50/60 rounded-xl border p-4">
            <p className="text-sm font-semibold text-slate-800">
              Complete your professional profile
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Your account is set up. Complete your professional profile below to get verified
              access.
            </p>
          </div>
        ) : null}

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Display name</label>
              <input
                type="text"
                defaultValue={
                  profile?.displayName ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
              <select
                defaultValue={profile?.state ?? ''}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              >
                <option value="">Select state...</option>
                {['MI', 'OH', 'IL', 'IN', 'WI', 'MN', 'WA', 'TX'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">License number</label>
            <input
              type="text"
              defaultValue={profile?.licenseNumber ?? ''}
              placeholder="MI-FD-12345"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Bio</label>
            <textarea
              rows={3}
              defaultValue={profile?.bio ?? ''}
              placeholder="Brief professional bio..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Website</label>
            <input
              type="url"
              defaultValue={profile?.website ?? ''}
              placeholder="https://yourfuneralhome.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Save changes
          </button>
          <a
            href={`/profile/${username}`}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  )
}

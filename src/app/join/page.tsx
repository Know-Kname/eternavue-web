import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join deathcare.live — Apply for Verified Access',
  description:
    'Apply for verified membership as a funeral director, cemetery operator, crematory operator, supplier, or association. Free during founding member period.',
}

const ROLES = [
  {
    value: 'director',
    label: 'Funeral Director / Embalmer',
    description:
      'Licensed funeral director or embalmer. Discuss industry regulations, connect with peers, and track state legislation.',
    badge: 'bg-teal-100 text-teal-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zM2 17a6 6 0 0116 0H2z" />
      </svg>
    ),
  },
  {
    value: 'operator',
    label: 'Cemetery / Crematory Operator',
    description:
      'Cemetery manager, crematory operator, or funeral home owner. Access operator-specific regulatory discussions.',
    badge: 'bg-sky-100 text-sky-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm4 8a1 1 0 112 0v2a1 1 0 11-2 0v-2z" />
      </svg>
    ),
  },
  {
    value: 'supplier',
    label: 'Supplier / Vendor',
    description:
      'Equipment, merchandise, or service supplier to the funeral industry. Connect with operators and showcase your business.',
    badge: 'bg-amber-100 text-amber-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
      </svg>
    ),
  },
  {
    value: 'association',
    label: 'Association / Trade Group',
    description:
      'NFDA, ICCFA, state funeral directors association, or other industry organization. Publish official positions and represent your membership.',
    badge: 'bg-purple-100 text-purple-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM2 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
      </svg>
    ),
  },
  {
    value: 'educator',
    label: 'Mortuary Science Educator',
    description:
      'Mortuary science professor, program director, or continuing education provider. Share expertise and shape the next generation.',
    badge: 'bg-green-100 text-green-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    value: 'observer',
    label: 'Industry Observer',
    description:
      'Journalist, researcher, policymaker, or interested professional. Read and follow discussions without posting restrictions.',
    badge: 'bg-slate-100 text-slate-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
          Founding member period — free access
        </div>
        <h1 className="mb-3 font-serif text-3xl font-bold text-slate-900">Join deathcare.live</h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-500">
          The professional network for deathcare operators. Track legislation, share field
          knowledge, build coalitions, and connect with verified peers.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: '📜',
            title: 'Track legislation',
            desc: 'Follow state bills and get alerts when status changes.',
          },
          {
            icon: '🤝',
            title: 'Build coalitions',
            desc: 'Organize industry positions and reach legislators together.',
          },
          {
            icon: '🔍',
            title: 'Find vetted peers',
            desc: 'Connect with verified operators in your state and specialty.',
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-200 bg-white p-4 text-center"
          >
            <p className="mb-2 text-2xl">{f.icon}</p>
            <p className="mb-1 text-sm font-semibold text-slate-800">{f.title}</p>
            <p className="text-xs leading-relaxed text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Role selector */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-1 font-serif text-lg font-bold text-slate-900">Choose your role</h2>
        <p className="mb-5 text-sm text-slate-500">
          Your role determines your verification path and how you appear to other members.
        </p>

        <div className="space-y-2.5">
          {ROLES.map((role) => (
            <div
              key={role.value}
              className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/30"
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${role.badge}`}
              >
                {role.icon}
              </div>
              <div>
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{role.label}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs ${role.badge}`}>
                    {role.value}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification note */}
      <div className="border-gold-100 bg-gold-50/60 mb-8 rounded-xl border p-4">
        <div className="flex gap-3">
          <svg
            className="text-gold-600 mt-0.5 h-5 w-5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Verification protects the community
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Licensed professionals (directors, operators, educators) submit a state license number
              and document upload. Verified members gain full posting, voting, and coalition access.
              Observer accounts are open to anyone.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 text-center">
        <h2 className="mb-2 font-serif text-xl font-bold text-slate-900">Ready to join?</h2>
        <p className="mb-5 text-sm text-slate-600">
          Create your free account, then complete your professional profile. Founding members get
          lifetime verified status at no cost.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M8 1v14M1 8h14" />
            </svg>
            Create account — it&apos;s free
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Already a member? Sign in
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Applications reviewed within 24–48 hours · No credit card required
        </p>
      </div>
    </div>
  )
}

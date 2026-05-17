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
  },
  {
    value: 'operator',
    label: 'Cemetery / Crematory Operator',
    description:
      'Cemetery manager, crematory operator, or funeral home owner. Access operator-specific regulatory discussions.',
    badge: 'bg-teal-100 text-teal-700',
  },
  {
    value: 'supplier',
    label: 'Supplier / Vendor',
    description:
      'Equipment, merchandise, or service supplier to the funeral industry. Connect with operators and showcase your business.',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    value: 'association',
    label: 'Association / Trade Group',
    description:
      'NFDA, ICCFA, state funeral directors association, or other industry organization. Publish official positions and represent your membership.',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    value: 'educator',
    label: 'Mortuary Science Educator',
    description:
      'Mortuary science professor, program director, or continuing education provider. Share expertise and shape the next generation.',
    badge: 'bg-green-100 text-green-700',
  },
  {
    value: 'observer',
    label: 'Industry Observer',
    description:
      'Journalist, researcher, policymaker, or interested professional. Read and follow discussions without posting restrictions.',
    badge: 'bg-slate-100 text-slate-600',
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

      {/* What you get */}
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
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-1 font-serif text-lg font-bold text-slate-900">Select your role</h2>
        <p className="mb-5 text-sm text-slate-500">
          Your role determines what you can post and how you appear to other members.
        </p>

        <div className="mb-6 space-y-3">
          {ROLES.map((role) => (
            <label
              key={role.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/30"
            >
              <input type="radio" name="role" value={role.value} className="mt-1 accent-teal-500" />
              <div>
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{role.label}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs ${role.badge}`}>
                    {role.value}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{role.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Form fields */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
              <input
                type="text"
                placeholder="James Kowalski"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Work email</label>
              <input
                type="email"
                placeholder="james@funeralhome.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
              <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-teal-400 focus:outline-none">
                <option value="">Select state...</option>
                <option value="MI">Michigan</option>
                <option value="OH">Ohio</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="WI">Wisconsin</option>
                <option value="MN">Minnesota</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                License # (optional)
              </label>
              <input
                type="text"
                placeholder="MI-FD-12345"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tell us about your work (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Brief bio — years in the industry, specialty, state context..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-500 py-3 font-semibold text-white transition-colors hover:bg-teal-600"
        >
          Request access
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Applications are reviewed within 24–48 hours. Free during founding period.
        </p>
      </div>
    </div>
  )
}

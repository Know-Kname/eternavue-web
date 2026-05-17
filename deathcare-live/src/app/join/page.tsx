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
    description: 'Licensed funeral director or embalmer. Discuss industry regulations, connect with peers, and track state legislation.',
    badge: 'bg-teal-100 text-teal-700',
  },
  {
    value: 'operator',
    label: 'Cemetery / Crematory Operator',
    description: 'Cemetery manager, crematory operator, or funeral home owner. Access operator-specific regulatory discussions.',
    badge: 'bg-teal-100 text-teal-700',
  },
  {
    value: 'supplier',
    label: 'Supplier / Vendor',
    description: 'Equipment, merchandise, or service supplier to the funeral industry. Connect with operators and showcase your business.',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    value: 'association',
    label: 'Association / Trade Group',
    description: 'NFDA, ICCFA, state funeral directors association, or other industry organization. Publish official positions and represent your membership.',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    value: 'educator',
    label: 'Mortuary Science Educator',
    description: 'Mortuary science professor, program director, or continuing education provider. Share expertise and shape the next generation.',
    badge: 'bg-green-100 text-green-700',
  },
  {
    value: 'observer',
    label: 'Industry Observer',
    description: 'Journalist, researcher, policymaker, or interested professional. Read and follow discussions without posting restrictions.',
    badge: 'bg-slate-100 text-slate-600',
  },
]

export default function JoinPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
          Founding member period — free access
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">
          Join deathcare.live
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
          The professional network for deathcare operators. Track legislation, share field knowledge, build coalitions, and connect with verified peers.
        </p>
      </div>

      {/* What you get */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '📜', title: 'Track legislation', desc: 'Follow state bills and get alerts when status changes.' },
          { icon: '🤝', title: 'Build coalitions', desc: 'Organize industry positions and reach legislators together.' },
          { icon: '🔍', title: 'Find vetted peers', desc: 'Connect with verified operators in your state and specialty.' },
        ].map(f => (
          <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-2xl mb-2">{f.icon}</p>
            <p className="text-sm font-semibold text-slate-800 mb-1">{f.title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Role selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-serif font-bold text-slate-900 mb-1">Select your role</h2>
        <p className="text-sm text-slate-500 mb-5">
          Your role determines what you can post and how you appear to other members.
        </p>

        <div className="space-y-3 mb-6">
          {ROLES.map(role => (
            <label
              key={role.value}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
            >
              <input
                type="radio"
                name="role"
                value={role.value}
                className="mt-1 accent-teal-500"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-slate-900">{role.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${role.badge}`}>
                    {role.value}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
              <input
                type="text"
                placeholder="James Kowalski"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Work email</label>
              <input
                type="email"
                placeholder="james@funeralhome.com"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <select className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white">
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
              <label className="block text-sm font-medium text-slate-700 mb-1">License # (optional)</label>
              <input
                type="text"
                placeholder="MI-FD-12345"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tell us about your work (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Brief bio — years in the industry, specialty, state context..."
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors"
        >
          Request access
        </button>

        <p className="text-xs text-slate-400 text-center mt-3">
          Applications are reviewed within 24–48 hours. Free during founding period.
        </p>
      </div>
    </div>
  )
}

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M12 2v20"/>
                  <path d="M5 7c1.8-1.7 3.7-2.5 7-2.5S17.2 5.3 19 7"/>
                  <path d="M5 17c1.8 1.7 3.7 2.5 7 2.5s5.2-.8 7-2.5"/>
                </svg>
              </div>
              <span className="text-lg font-display font-bold text-white">
                deathcare<span className="text-teal-400">.live</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The professional community for deathcare operators. Track legislation, share knowledge, and build coalitions.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="text-xs px-2 py-1 rounded bg-teal-900/40 text-teal-400">Michigan launch</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500">Founding period open</span>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-2">
              {[
                { href: '/feed',      label: 'Feed' },
                { href: '/states',    label: 'State Hubs' },
                { href: '/states/MI', label: 'Michigan Hub' },
                { href: '/join',      label: 'Join / Apply' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Directory</h3>
            <ul className="space-y-2">
              {[
                { href: '/directory/funeral-homes', label: 'Funeral Homes' },
                { href: '/directory/cremation',     label: 'Cremation' },
                { href: '/directory/cemeteries',    label: 'Cemeteries' },
                { href: '/directory/suppliers',     label: 'Suppliers' },
                { href: '/directory/technology',    label: 'Technology' },
                { href: '/jobs',                    label: 'Jobs' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: '/resources', label: 'Industry News' },
                { href: '/resources', label: 'Policy Watch' },
                { href: '/about',     label: 'About' },
                { href: '/about',     label: 'Privacy' },
                { href: '/about',     label: 'Terms' },
              ].map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} deathcare.live. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for the people who show up when no one else does.
          </p>
        </div>
      </div>
    </footer>
  )
}

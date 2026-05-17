import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                >
                  <path d="M12 2v20" />
                  <path d="M5 7c1.8-1.7 3.7-2.5 7-2.5S17.2 5.3 19 7" />
                  <path d="M5 17c1.8 1.7 3.7 2.5 7 2.5s5.2-.8 7-2.5" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">
                deathcare<span className="text-teal-400">.live</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              The professional community for deathcare operators. Track legislation, share
              knowledge, and build coalitions.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded bg-teal-900/40 px-2 py-1 text-xs text-teal-400">
                Michigan launch
              </span>
              <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-500">
                Founding period open
              </span>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">
              Community
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/feed', label: 'Feed' },
                { href: '/states', label: 'State Hubs' },
                { href: '/states/MI', label: 'Michigan Hub' },
                { href: '/join', label: 'Join / Apply' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">
              Directory
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/directory/funeral-homes', label: 'Funeral Homes' },
                { href: '/directory/cremation', label: 'Cremation' },
                { href: '/directory/cemeteries', label: 'Cemeteries' },
                { href: '/directory/suppliers', label: 'Suppliers' },
                { href: '/directory/technology', label: 'Technology' },
                { href: '/jobs', label: 'Jobs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/resources', label: 'Industry News' },
                { href: '/resources', label: 'Policy Watch' },
                { href: '/about', label: 'About' },
                { href: '/about', label: 'Privacy' },
                { href: '/about', label: 'Terms' },
              ].map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 sm:flex-row">
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

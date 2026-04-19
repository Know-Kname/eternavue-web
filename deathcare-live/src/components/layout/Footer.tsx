import Link from 'next/link'
import { ALL_LISTING_TYPES, LISTING_TYPE_MAP } from '@/lib/listing-types'

export function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-warm-200 bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-serif font-bold text-white">
              deathcare<span className="text-clay-400">.live</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              The comprehensive industry hub for deathcare professionals and families.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Directory
            </h3>
            <ul className="space-y-2">
              {ALL_LISTING_TYPES.map(type => (
                <li key={type}>
                  <Link
                    href={`/directory/${type}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {LISTING_TYPE_MAP[type].plural}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/resources', label: 'Industry News' },
                { href: '/resources', label: 'Consumer Guides' },
                { href: '/resources', label: 'Technology' },
                { href: '/about', label: 'About Us' },
              ].map(link => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Businesses
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/directory', label: 'List Your Business' },
                { href: '/directory', label: 'Claim Your Listing' },
                { href: '/directory', label: 'Featured Listings' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} deathcare.live. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

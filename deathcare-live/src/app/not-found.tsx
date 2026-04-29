import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-6xl font-serif font-bold text-warm-200 mb-4 select-none">404</div>
      <h1 className="text-2xl font-serif font-bold text-slate-800 mb-3">Page not found</h1>
      <p className="text-slate-500 mb-8">
        The listing or page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/directory"
          className="px-5 py-2.5 rounded-lg bg-sage-400 text-white font-medium hover:bg-sage-500 transition-colors text-sm"
        >
          Browse the Directory
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-warm-100 transition-colors text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

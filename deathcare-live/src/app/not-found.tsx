import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="text-warm-200 mb-4 font-serif text-6xl font-bold select-none">404</div>
      <h1 className="mb-3 font-serif text-2xl font-bold text-slate-800">Page not found</h1>
      <p className="mb-8 text-slate-500">
        The listing or page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/directory"
          className="bg-sage-400 hover:bg-sage-500 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Browse the Directory
        </Link>
        <Link
          href="/"
          className="hover:bg-warm-100 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

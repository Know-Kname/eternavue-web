import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Globe, Mail, Clock, CalendarDays, ExternalLink, ChevronLeft } from 'lucide-react'
import { getListing, getListings } from '@/lib/wpgraphql'
import { Badge } from '@/components/ui/Badge'
import { LISTING_TYPE_MAP, isValidListingType } from '@/lib/listing-types'
import { slugToLabel } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ type: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return {}
  return {
    title: listing.title,
    description: listing.excerpt ?? `View details for ${listing.title}`,
  }
}

export async function generateStaticParams() {
  const allParams: { type: string; slug: string }[] = []
  const { listings } = await getListings({ page: '1' })
  for (const listing of listings.slice(0, 50)) {
    allParams.push({ type: listing.listingType, slug: listing.slug })
  }
  return allParams
}

export const revalidate = 86400

export default async function ListingProfilePage({ params }: PageProps) {
  const { type, slug } = await params

  if (!isValidListingType(type)) notFound()

  const listing = await getListing(slug)
  if (!listing) notFound()

  // notFound() throws, so listing is narrowed to Listing here
  const { title, acf, serviceTypes, certifications } = listing!
  const services: string[] = serviceTypes ?? []
  const certs: string[] = certifications ?? []
  const typeInfo = LISTING_TYPE_MAP[type as keyof typeof LISTING_TYPE_MAP]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/directory" className="hover:text-sage-600 transition-colors">
          Directory
        </Link>
        <span>/</span>
        <Link href={`/directory/${type}`} className="hover:text-sage-600 transition-colors">
          {typeInfo.plural}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{title}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-warm-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-warm-200">
          <div className="flex items-start gap-5">
            {acf.logo ? (
              <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-warm-200 shrink-0">
                <Image
                  src={acf.logo.sourceUrl}
                  alt={acf.logo.altText || title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-sage-50 border border-sage-100 flex items-center justify-center text-3xl font-serif font-bold text-sage-300 shrink-0">
                {title.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl font-serif font-bold text-slate-800">{title}</h1>
                {acf.featured && <Badge variant="gold">Featured</Badge>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="sage">{typeInfo.label}</Badge>
                {acf.claimed && <Badge variant="outline">Verified</Badge>}
              </div>
              {listing.excerpt && (
                <p className="text-slate-600 mt-3 leading-relaxed">{listing.excerpt}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Contact info */}
          <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-warm-200 space-y-4">
            <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
              Contact
            </h2>

            {(acf.address || acf.city) && (
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>
                  {[acf.address, acf.city, acf.state, acf.zip].filter(Boolean).join(', ')}
                </span>
              </div>
            )}

            {acf.phone && (
              <a
                href={`tel:${acf.phone}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-sage-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                {acf.phone}
              </a>
            )}

            {acf.email && (
              <a
                href={`mailto:${acf.email}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-sage-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                {acf.email}
              </a>
            )}

            {acf.website && (
              <a
                href={acf.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-sage-600 hover:text-sage-700 transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="truncate">Visit website</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            )}

            {acf.businessHours && (
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>{acf.businessHours}</span>
              </div>
            )}

            {acf.yearFounded && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Est. {acf.yearFounded}</span>
              </div>
            )}
          </div>

          {/* Services + Certifications */}
          <div className="md:col-span-2 p-6 space-y-6">
            {services.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wider mb-3">
                  Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {services.map((s: string) => (
                    <Badge key={s} variant="default">
                      {slugToLabel(s)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {certs.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wider mb-3">
                  Certifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {certs.map((c: string) => (
                    <Badge key={c} variant="sage">
                      {slugToLabel(c)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/directory/${type}`}
          className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {typeInfo.plural}
        </Link>
      </div>
    </div>
  )
}

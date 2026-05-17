import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Globe,
  Mail,
  Clock,
  CalendarDays,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react'
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/directory" className="hover:text-sage-600 transition-colors">
          Directory
        </Link>
        <span>/</span>
        <Link href={`/directory/${type}`} className="hover:text-sage-600 transition-colors">
          {typeInfo.plural}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-800">{title}</span>
      </nav>

      <div className="border-warm-200 overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Header */}
        <div className="border-warm-200 border-b p-8">
          <div className="flex items-start gap-5">
            {acf.logo ? (
              <div className="border-warm-200 relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border">
                <Image
                  src={acf.logo.sourceUrl}
                  alt={acf.logo.altText || title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="bg-sage-50 border-sage-100 text-sage-300 flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border font-serif text-3xl font-bold">
                {title.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h1 className="font-serif text-2xl font-bold text-slate-800">{title}</h1>
                {acf.featured && <Badge variant="gold">Featured</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="sage">{typeInfo.label}</Badge>
                {acf.claimed && <Badge variant="outline">Verified</Badge>}
              </div>
              {listing.excerpt && (
                <p className="mt-3 leading-relaxed text-slate-600">{listing.excerpt}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {/* Contact info */}
          <div className="border-warm-200 space-y-4 border-b p-6 md:col-span-1 md:border-r md:border-b-0">
            <h2 className="text-sm font-semibold tracking-wider text-slate-700 uppercase">
              Contact
            </h2>

            {(acf.address || acf.city) && (
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {[acf.address, acf.city, acf.state, acf.zip].filter(Boolean).join(', ')}
                </span>
              </div>
            )}

            {acf.phone && (
              <a
                href={`tel:${acf.phone}`}
                className="hover:text-sage-600 flex items-center gap-3 text-sm text-slate-600 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                {acf.phone}
              </a>
            )}

            {acf.email && (
              <a
                href={`mailto:${acf.email}`}
                className="hover:text-sage-600 flex items-center gap-3 text-sm text-slate-600 transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                {acf.email}
              </a>
            )}

            {acf.website && (
              <a
                href={acf.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-600 hover:text-sage-700 flex items-center gap-3 text-sm transition-colors"
              >
                <Globe className="h-4 w-4 shrink-0" />
                <span className="truncate">Visit website</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            )}

            {acf.businessHours && (
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{acf.businessHours}</span>
              </div>
            )}

            {acf.yearFounded && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Est. {acf.yearFounded}</span>
              </div>
            )}
          </div>

          {/* Services + Certifications */}
          <div className="space-y-6 p-6 md:col-span-2">
            {services.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold tracking-wider text-slate-700 uppercase">
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
                <h2 className="mb-3 text-sm font-semibold tracking-wider text-slate-700 uppercase">
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
          className="text-sage-600 hover:text-sage-700 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {typeInfo.plural}
        </Link>
      </div>
    </div>
  )
}

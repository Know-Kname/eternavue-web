import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Globe, Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { LISTING_TYPE_MAP } from '@/lib/listing-types'
import type { Listing } from '@/lib/types'

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const { title, slug, listingType, acf, excerpt } = listing
  const typeInfo = LISTING_TYPE_MAP[listingType]
  const href = `/directory/${listingType}/${slug}`

  return (
    <Link href={href} className="group block">
      <article className="border-warm-200 group-hover:border-sage-200 flex h-full flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm transition-shadow duration-200 group-hover:shadow-md">
        <div className="flex items-start gap-3">
          {acf.logo ? (
            <div className="border-warm-200 relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border">
              <Image
                src={acf.logo.sourceUrl}
                alt={acf.logo.altText || title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="bg-sage-50 text-sage-400 border-sage-100 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border font-serif text-lg font-bold">
              {title.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="group-hover:text-sage-600 line-clamp-2 text-sm leading-snug font-semibold text-slate-800 transition-colors">
                {title}
              </h3>
              {acf.featured && (
                <Star className="text-gold-500 fill-gold-400 mt-0.5 h-4 w-4 shrink-0" />
              )}
            </div>
            {(acf.city || acf.state) && (
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                <span>{[acf.city, acf.state].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {excerpt && (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{excerpt}</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <Badge variant="sage">{typeInfo.label}</Badge>
          <div className="flex items-center gap-3">
            {acf.phone && (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = `tel:${acf.phone}`
                }}
                className="hover:text-sage-500 text-slate-400 transition-colors"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </span>
            )}
            {acf.website && (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  window.open(acf.website, '_blank', 'noopener,noreferrer')
                }}
                className="hover:text-sage-500 text-slate-400 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

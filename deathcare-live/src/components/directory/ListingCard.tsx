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
    <Link href={href} className="block group">
      <article className="bg-white rounded-xl border border-warm-200 shadow-sm p-5 h-full flex flex-col gap-4 transition-shadow duration-200 group-hover:shadow-md group-hover:border-sage-200">
        <div className="flex items-start gap-3">
          {acf.logo ? (
            <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 border border-warm-200">
              <Image
                src={acf.logo.sourceUrl}
                alt={acf.logo.altText || title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-sage-50 flex items-center justify-center shrink-0 text-sage-400 text-lg font-serif font-bold border border-sage-100">
              {title.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-sage-600 transition-colors">
                {title}
              </h3>
              {acf.featured && (
                <Star className="w-4 h-4 text-gold-500 fill-gold-400 shrink-0 mt-0.5" />
              )}
            </div>
            {(acf.city || acf.state) && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{[acf.city, acf.state].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {excerpt && (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">{excerpt}</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <Badge variant="sage">{typeInfo.label}</Badge>
          <div className="flex items-center gap-3">
            {acf.phone && (
              <span
                onClick={e => {
                  e.preventDefault()
                  window.location.href = `tel:${acf.phone}`
                }}
                className="text-slate-400 hover:text-sage-500 transition-colors"
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </span>
            )}
            {acf.website && (
              <span
                onClick={e => {
                  e.preventDefault()
                  window.open(acf.website, '_blank', 'noopener,noreferrer')
                }}
                className="text-slate-400 hover:text-sage-500 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

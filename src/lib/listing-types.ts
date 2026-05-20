export type ListingType =
  | 'funeral-homes'
  | 'cremation'
  | 'cemeteries'
  | 'suppliers'
  | 'technology'
  | 'grief-support'

export type CptType =
  | 'funeral_home'
  | 'crematorium'
  | 'cemetery'
  | 'supplier'
  | 'tech_vendor'
  | 'grief_resource'

export const LISTING_TYPE_MAP: Record<
  ListingType,
  { label: string; plural: string; cpt: CptType; description: string }
> = {
  'funeral-homes': {
    label: 'Funeral Home',
    plural: 'Funeral Homes',
    cpt: 'funeral_home',
    description: 'Licensed funeral homes and funeral directors',
  },
  cremation: {
    label: 'Crematorium',
    plural: 'Cremation Services',
    cpt: 'crematorium',
    description: 'Cremation providers and services',
  },
  cemeteries: {
    label: 'Cemetery',
    plural: 'Cemeteries',
    cpt: 'cemetery',
    description: 'Cemeteries and burial grounds',
  },
  suppliers: {
    label: 'Supplier',
    plural: 'Suppliers',
    cpt: 'supplier',
    description: 'Equipment, merchandise, and wholesale suppliers',
  },
  technology: {
    label: 'Tech Vendor',
    plural: 'Technology Vendors',
    cpt: 'tech_vendor',
    description: 'Deathcare software and technology providers',
  },
  'grief-support': {
    label: 'Grief Resource',
    plural: 'Grief & Support',
    cpt: 'grief_resource',
    description: 'Grief counselors, therapists, and support groups',
  },
}

export const ALL_LISTING_TYPES = Object.keys(LISTING_TYPE_MAP) as ListingType[]

export function cptToListingType(cpt: CptType): ListingType {
  return (Object.entries(LISTING_TYPE_MAP).find(([, v]) => v.cpt === cpt)?.[0] ??
    'funeral-homes') as ListingType
}

export function isValidListingType(slug: string): slug is ListingType {
  return slug in LISTING_TYPE_MAP
}

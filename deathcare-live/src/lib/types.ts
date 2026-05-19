import type { ListingType } from './listing-types'

// ── Directory types ────────────────────────────────────────────

export interface ListingACF {
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string
  website?: string
  geoLat?: number
  geoLng?: number
  logo?: { sourceUrl: string; altText: string } | null
  photos?: Array<{ sourceUrl: string; altText: string }>
  businessHours?: string
  featured?: boolean
  claimed?: boolean
  yearFounded?: number
}

export interface Listing {
  id: string
  slug: string
  title: string
  excerpt?: string
  listingType: ListingType
  acf: ListingACF
  serviceTypes?: string[]
  certifications?: string[]
  locationState?: string
  locationCity?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage?: { sourceUrl: string; altText: string } | null
  categories?: string[]
  author?: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
  total?: number
  currentPage?: number
  totalPages?: number
}

export interface FacetValue {
  value: string
  label: string
  count: number
}

export interface Facets {
  locationState: FacetValue[]
  serviceType: FacetValue[]
  certification: FacetValue[]
}

export interface ListingsResult {
  listings: Listing[]
  facets: Facets
  pageInfo: PageInfo
}

export interface ArticlesResult {
  articles: Article[]
  pageInfo: PageInfo
}

export interface ListingFilters {
  type?: string
  state?: string
  city?: string
  services?: string | string[]
  certs?: string | string[]
  featured?: string
  page?: string
  search?: string
}

// ── Community types ────────────────────────────────────────────

export type UserRole =
  | 'director'
  | 'operator'
  | 'supplier'
  | 'association'
  | 'educator'
  | 'observer'

export type PostKind = 'note' | 'analysis' | 'position' | 'question' | 'report'

export interface Profile {
  id: string
  clerkId?: string
  username: string
  displayName: string
  role: UserRole
  state?: string
  licenseNumber?: string
  verifiedAt?: string | null
  bio?: string
  avatarUrl?: string
  website?: string
  yearsActive?: number
  expertise: string[]
  createdAt: string
  // Derived counts
  postCount?: number
  endorsementCount?: number
}

export interface Post {
  id: string
  authorId: string
  author: Profile
  kind: PostKind
  body: string
  state?: string
  billId?: string
  billTitle?: string
  isAnonymous: boolean
  upvotes: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  postId: string
  parentId?: string | null
  authorId: string
  author: Profile
  body: string
  createdAt: string
  replies?: Comment[]
}

// ── Legislative types ──────────────────────────────────────────

export type BillStatus =
  | 'introduced'
  | 'committee'
  | 'floor'
  | 'passed'
  | 'signed'
  | 'vetoed'
  | 'failed'
  | 'carried-over'

export interface BillSponsor {
  name: string
  party?: string
  district?: string
  url?: string
}

export interface BillHistoryEvent {
  date: string
  action: string
  chamber?: string
}

export type ImpactScore = 'low' | 'medium' | 'high' | 'critical'

export interface BillPositionTally {
  support: number
  oppose: number
  amend: number
  monitor: number
}

export interface Bill {
  id: string // LegiScan bill_id as string
  billNumber: string // e.g. "HB 4521"
  title: string
  description: string
  state: string // 2-letter state code
  status: BillStatus
  statusDate: string
  lastAction: string
  lastActionDate: string
  url: string
  sponsors: BillSponsor[]
  history: BillHistoryEvent[]
  // Derived
  followCount?: number
  discussionCount?: number
  industryTags?: string[]
  // Bill intelligence (PRD M3)
  chamber?: 'House' | 'Senate'
  committee?: string
  introducedDate?: string
  impactScore?: ImpactScore
  // Plain-English summary — AI-drafted, human-reviewed before publish
  plainSummary?: string
  keyProvisions?: string[]
  operatorImpact?: string
  // Aggregate community position tally
  positions?: BillPositionTally
}

export interface Coalition {
  id: string
  billId: string
  state: string
  position: 'support' | 'oppose' | 'amend'
  name: string
  statement?: string
  leadProfileId?: string
  leadProfile?: Profile
  memberCount: number
  createdAt: string
}

export interface StateHub {
  state: string
  stateName: string
  activeBillCount: number
  verifiedOperatorCount: number
  bills: Bill[]
  topPosts: Post[]
  coalitions: Coalition[]
}

// ── Digest types ──────────────────────────────────────────────

export interface DigestFeaturedBill {
  billId: string
  billNumber: string
  state: string
  summary: string
  momentum: 'rising' | 'falling' | 'stable'
}

export interface DigestIssue {
  id: string
  issueNumber: number
  publishedAt: string
  headline: string
  subheadline: string
  editorNote: string
  featuredBills: DigestFeaturedBill[]
  featuredPostId?: string
  stats: {
    newMembers: number
    newBillsTracked: number
    discussionsStarted: number
    statesActive: number
  }
  tags: string[]
}

// ── Job board types ────────────────────────────────────────────

export type JobType = 'full-time' | 'part-time' | 'contract' | 'apprenticeship'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  state: string
  type: JobType
  listingType: ListingType
  description: string
  salary?: string
  postedAt: string
  expiresAt?: string
  applyUrl?: string
  contactEmail?: string
  featured: boolean
}

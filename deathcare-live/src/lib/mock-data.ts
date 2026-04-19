import type { Listing, Article, ListingsResult, ArticlesResult } from './types'

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    slug: 'doe-family-funeral-home',
    title: 'Doe Family Funeral Home',
    excerpt: 'Serving the greater Detroit community with compassion for over 60 years.',
    listingType: 'funeral-homes',
    acf: {
      address: '123 Main Street',
      city: 'Detroit',
      state: 'MI',
      zip: '48201',
      phone: '(313) 555-0101',
      email: 'info@doefuneralhome.example',
      website: 'https://doefuneralhome.example',
      featured: true,
      claimed: true,
      yearFounded: 1963,
      businessHours: 'Mon–Sun: 24/7',
    },
    serviceTypes: ['traditional-burial', 'cremation', 'pre-planning'],
    certifications: ['nfda-member', 'veteran-services'],
    locationState: 'MI',
    locationCity: 'Detroit',
  },
  {
    id: '2',
    slug: 'lakeview-memorial-gardens',
    title: 'Lakeview Memorial Gardens',
    excerpt: 'A serene 80-acre cemetery offering traditional and green burial options.',
    listingType: 'cemeteries',
    acf: {
      address: '456 Cemetery Drive',
      city: 'Cleveland',
      state: 'OH',
      zip: '44101',
      phone: '(216) 555-0202',
      featured: false,
      claimed: true,
      yearFounded: 1901,
    },
    serviceTypes: ['traditional-burial', 'green-burial', 'mausoleum'],
    certifications: ['iccfa-member', 'green-burial-certified'],
    locationState: 'OH',
    locationCity: 'Cleveland',
  },
  {
    id: '3',
    slug: 'pacific-cremation-services',
    title: 'Pacific Cremation Services',
    excerpt: 'Affordable, dignified cremation services across the Pacific Northwest.',
    listingType: 'cremation',
    acf: {
      address: '789 Ocean Ave',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      phone: '(206) 555-0303',
      website: 'https://pacificcremation.example',
      featured: true,
      claimed: true,
      yearFounded: 1998,
    },
    serviceTypes: ['direct-cremation', 'cremation-with-service', 'aquamation'],
    certifications: ['cana-member'],
    locationState: 'WA',
    locationCity: 'Seattle',
  },
  {
    id: '4',
    slug: 'evergreen-casket-company',
    title: 'Evergreen Casket Company',
    excerpt: 'Wholesale casket and memorial merchandise supplier serving 2,000+ funeral homes.',
    listingType: 'suppliers',
    acf: {
      address: '1000 Industrial Blvd',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46201',
      phone: '(317) 555-0404',
      website: 'https://evergreencasket.example',
      featured: false,
      claimed: true,
      yearFounded: 1985,
    },
    serviceTypes: ['caskets', 'urns', 'memorial-merchandise'],
    certifications: [],
    locationState: 'IN',
    locationCity: 'Indianapolis',
  },
  {
    id: '5',
    slug: 'memorial-software-solutions',
    title: 'Memorial Software Solutions',
    excerpt: 'All-in-one funeral home management software: scheduling, accounting, and family portal.',
    listingType: 'technology',
    acf: {
      address: '200 Tech Park Way',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      phone: '(512) 555-0505',
      website: 'https://memorialsoftware.example',
      featured: true,
      claimed: true,
      yearFounded: 2011,
    },
    serviceTypes: ['funeral-home-software', 'crm', 'preneed'],
    certifications: [],
    locationState: 'TX',
    locationCity: 'Austin',
  },
  {
    id: '6',
    slug: 'compassionate-grief-center',
    title: 'Compassionate Grief Center',
    excerpt: 'Licensed grief therapists offering individual, family, and group bereavement support.',
    listingType: 'grief-support',
    acf: {
      address: '350 Healing Way',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      phone: '(312) 555-0606',
      website: 'https://compassionategriefcenter.example',
      featured: false,
      claimed: true,
      yearFounded: 2005,
    },
    serviceTypes: ['grief-counseling', 'support-groups', 'online-therapy'],
    certifications: ['licensed-therapist'],
    locationState: 'IL',
    locationCity: 'Chicago',
  },
  {
    id: '7',
    slug: 'heritage-funeral-chapel',
    title: 'Heritage Funeral Chapel',
    excerpt: 'Family-owned funeral home providing personalized services since 1947.',
    listingType: 'funeral-homes',
    acf: {
      address: '88 Heritage Lane',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      phone: '(615) 555-0707',
      featured: false,
      claimed: false,
      yearFounded: 1947,
    },
    serviceTypes: ['traditional-burial', 'cremation', 'graveside-services'],
    certifications: ['nfda-member'],
    locationState: 'TN',
    locationCity: 'Nashville',
  },
  {
    id: '8',
    slug: 'rest-in-peace-online',
    title: 'Rest in Peace Online',
    excerpt: 'Digital memorial platform for creating lasting online tributes and obituaries.',
    listingType: 'technology',
    acf: {
      address: '500 Digital Blvd',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      phone: '(415) 555-0808',
      website: 'https://restinpeaceonline.example',
      featured: false,
      claimed: true,
      yearFounded: 2016,
    },
    serviceTypes: ['online-memorials', 'obituary-platform', 'grief-resources'],
    certifications: [],
    locationState: 'CA',
    locationCity: 'San Francisco',
  },
  {
    id: '9',
    slug: 'green-burial-council-certified',
    title: 'Willow Grove Natural Cemetery',
    excerpt: 'Certified green burial ground set within 200 acres of preserved natural woodland.',
    listingType: 'cemeteries',
    acf: {
      address: '12 Willow Creek Rd',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      phone: '(503) 555-0909',
      featured: true,
      claimed: true,
      yearFounded: 2008,
    },
    serviceTypes: ['green-burial', 'conservation-burial', 'shroud-burial'],
    certifications: ['green-burial-certified', 'conservation-land-trust'],
    locationState: 'OR',
    locationCity: 'Portland',
  },
  {
    id: '10',
    slug: 'national-urn-distributors',
    title: 'National Urn Distributors',
    excerpt: 'The largest wholesale urn and memorial keepsake distributor in North America.',
    listingType: 'suppliers',
    acf: {
      address: '3300 Commerce Pkwy',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      phone: '(404) 555-1010',
      website: 'https://nationalurns.example',
      featured: false,
      claimed: true,
      yearFounded: 1993,
    },
    serviceTypes: ['urns', 'keepsakes', 'biodegradable-urns'],
    certifications: ['iccfa-member'],
    locationState: 'GA',
    locationCity: 'Atlanta',
  },
  {
    id: '11',
    slug: 'riverside-crematory',
    title: 'Riverside Crematory & Memorial',
    excerpt: 'A family-operated crematory offering affordable, dignified care.',
    listingType: 'cremation',
    acf: {
      address: '71 River Rd',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      phone: '(602) 555-1111',
      featured: false,
      claimed: false,
      yearFounded: 2002,
    },
    serviceTypes: ['direct-cremation', 'cremation-with-service'],
    certifications: ['cana-member'],
    locationState: 'AZ',
    locationCity: 'Phoenix',
  },
  {
    id: '12',
    slug: 'grief-recovery-network',
    title: 'Grief Recovery Network',
    excerpt: 'Nationwide network connecting bereaved individuals with vetted grief professionals.',
    listingType: 'grief-support',
    acf: {
      address: '900 Wellness Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      phone: '(720) 555-1212',
      website: 'https://griefrecoverynetwork.example',
      featured: false,
      claimed: true,
      yearFounded: 2014,
    },
    serviceTypes: ['grief-counseling', 'support-groups', 'online-resources'],
    certifications: ['licensed-therapist'],
    locationState: 'CO',
    locationCity: 'Denver',
  },
]

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    slug: 'understanding-green-burial-options',
    title: 'Understanding Green Burial Options in 2026',
    excerpt:
      'Natural burial is the fastest-growing trend in the deathcare industry. Here is what families and professionals need to know.',
    date: '2026-03-15',
    categories: ['trends', 'green-burial'],
    author: 'Staff Writer',
  },
  {
    id: 'a2',
    slug: 'ai-transforming-funeral-homes',
    title: 'How AI Is Transforming Funeral Home Operations',
    excerpt:
      'From scheduling to grief support chatbots, artificial intelligence is reshaping day-to-day deathcare business.',
    date: '2026-02-28',
    categories: ['technology'],
    author: 'Staff Writer',
  },
  {
    id: 'a3',
    slug: 'preneed-planning-guide',
    title: 'The Complete Guide to Preneed Planning for Families',
    excerpt:
      'Preplanning a funeral reduces family stress and locks in today\'s prices. This guide walks through every step.',
    date: '2026-01-20',
    categories: ['consumer-guide', 'preneed'],
    author: 'Staff Writer',
  },
  {
    id: 'a4',
    slug: 'grief-support-resources-after-loss',
    title: 'Navigating Grief: Resources and Support After a Loss',
    excerpt:
      'Finding the right grief support is personal. We outline counseling, support groups, and self-care strategies that help.',
    date: '2026-01-05',
    categories: ['grief', 'consumer-guide'],
    author: 'Staff Writer',
  },
]

export function getMockListings(filters: {
  type?: string
  state?: string
  featured?: boolean
  page?: number
  perPage?: number
}): { listings: Listing[]; total: number } {
  let results = [...MOCK_LISTINGS]

  if (filters.type) results = results.filter(l => l.listingType === filters.type)
  if (filters.state) results = results.filter(l => l.locationState === filters.state)
  if (filters.featured) results = results.filter(l => l.acf.featured)

  const perPage = filters.perPage ?? 12
  const page = filters.page ?? 1
  const start = (page - 1) * perPage
  return { listings: results.slice(start, start + perPage), total: results.length }
}

export function getMockListing(slug: string): Listing | null {
  return MOCK_LISTINGS.find(l => l.slug === slug) ?? null
}

export function getMockArticles(): Article[] {
  return MOCK_ARTICLES
}

export function getMockArticle(slug: string): Article | null {
  return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
}

export function getMockFacets() {
  return {
    locationState: [
      { value: 'MI', label: 'Michigan', count: 1 },
      { value: 'OH', label: 'Ohio', count: 1 },
      { value: 'WA', label: 'Washington', count: 1 },
      { value: 'IN', label: 'Indiana', count: 1 },
      { value: 'TX', label: 'Texas', count: 1 },
      { value: 'IL', label: 'Illinois', count: 1 },
    ],
    serviceType: [
      { value: 'traditional-burial', label: 'Traditional Burial', count: 3 },
      { value: 'cremation', label: 'Cremation', count: 4 },
      { value: 'green-burial', label: 'Green Burial', count: 2 },
      { value: 'grief-counseling', label: 'Grief Counseling', count: 2 },
    ],
    certification: [
      { value: 'nfda-member', label: 'NFDA Member', count: 2 },
      { value: 'iccfa-member', label: 'ICCFA Member', count: 2 },
      { value: 'cana-member', label: 'CANA Member', count: 2 },
      { value: 'green-burial-certified', label: 'Green Burial Certified', count: 2 },
    ],
  }
}

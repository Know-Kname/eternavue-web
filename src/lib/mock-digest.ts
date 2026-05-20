import type { DigestIssue } from './types'

export const MOCK_DIGEST_ISSUES: DigestIssue[] = [
  {
    id: 'digest-2026-20',
    issueNumber: 20,
    publishedAt: '2026-05-12',
    headline:
      'Michigan Preneed Bill Gains Floor Momentum; Ohio Alkaline Hydrolysis Clears Committee',
    subheadline:
      "Two critical operator-impact bills advanced this week. Plus: 18 new verified Michigan funeral directors, and the industry's first coalition position on direct cremation regulation.",
    editorNote:
      "This was a big week for the legislative layer. MI HB 4521 cleared committee with bipartisan support — a win for operators who have been waiting 14 months for the preneed reform. Ohio's AH bill is now the first alkaline hydrolysis measure in the Midwest to reach a Senate floor vote. More to watch.",
    featuredBills: [
      {
        billId: 'mi-hb4521',
        billNumber: 'MI HB 4521',
        state: 'MI',
        summary:
          'Preneed funeral trust reform — requires 100% trust funding, independent audits, and state-mandated consumer disclosures. Cleared committee 7-2 with bipartisan support.',
        momentum: 'rising',
      },
      {
        billId: 'oh-hb312',
        billNumber: 'OH HB 312',
        state: 'OH',
        summary:
          'Alkaline hydrolysis authorization — would make Ohio the 27th state to permit AH. Senate floor vote expected by Memorial Day. Industry position: 88% support among verified operators.',
        momentum: 'rising',
      },
      {
        billId: 'mi-sb892',
        billNumber: 'MI SB 892',
        state: 'MI',
        summary:
          'Direct cremation pricing disclosure requirements — proposed mandated itemization and advertising rules. Opposition from operators hardened this week; coalition of 134 operators filed formal opposition.',
        momentum: 'falling',
      },
    ],
    featuredPostId: 'post-2',
    stats: {
      newMembers: 18,
      newBillsTracked: 3,
      discussionsStarted: 47,
      statesActive: 4,
    },
    tags: ['preneed', 'alkaline-hydrolysis', 'michigan', 'ohio', 'legislation'],
  },
  {
    id: 'digest-2026-19',
    issueNumber: 19,
    publishedAt: '2026-05-05',
    headline:
      "Illinois Green Burial Bill Stalls; Michigan's Preneed Reform Enters Committee Markup",
    subheadline:
      "IL HB 5092 faces unexpected opposition from cemetery operators. Michigan preneed hearings produced the most detailed committee markup in the bill's history. What both mean for your operation.",
    editorNote:
      "Illinois operators — the green burial bill didn't die, it got complicated. The markup added a cemetery liability provision that most operators oppose. Michigan's preneed markup is actually good news — the 100% trust requirement survived intact. Read on.",
    featuredBills: [
      {
        billId: 'il-hb5092',
        billNumber: 'IL HB 5092',
        state: 'IL',
        summary:
          'Green burial land-use reform stalled after cemetery operators filed opposition to liability provisions added in markup. Expected to be re-referred to committee.',
        momentum: 'falling',
      },
      {
        billId: 'mi-hb4521',
        billNumber: 'MI HB 4521',
        state: 'MI',
        summary:
          'Preneed reform entered committee markup with 100% trust requirement intact. Consumer disclosure provisions strengthened. Industry watchers bullish on floor passage.',
        momentum: 'rising',
      },
      {
        billId: 'mi-hb4789',
        billNumber: 'MI HB 4789',
        state: 'MI',
        summary:
          "Veterans' burial assistance expansion — co-sponsored by 12 representatives, picked up three more this week. Low controversy, high passage probability.",
        momentum: 'stable',
      },
    ],
    featuredPostId: 'post-5',
    stats: {
      newMembers: 11,
      newBillsTracked: 2,
      discussionsStarted: 33,
      statesActive: 3,
    },
    tags: ['green-burial', 'preneed', 'illinois', 'michigan', 'veterans'],
  },
  {
    id: 'digest-2026-18',
    issueNumber: 18,
    publishedAt: '2026-04-28',
    headline: 'Washington State Passes Direct Disposition Reform — What It Means for You',
    subheadline:
      'WA HB 2201 signed into law last week. Direct disposition providers now face the same consumer protection requirements as licensed funeral homes. Plus the first survey results from the Michigan operator panel.',
    editorNote:
      "Washington's law is a signal, not an isolated event. Three other states have similar bills in committee. The funeral home industry's ability to shape direct disposition regulation — before it becomes federal — is a 24-month window. This week's analysis covers what operators got, what they didn't, and what's coming next.",
    featuredBills: [
      {
        billId: 'mi-sb1017',
        billNumber: 'MI SB 1017',
        state: 'MI',
        summary:
          'Cremation timing and authorization reform — standardizes 48-hour release and authorization documentation. Passed Senate 34-2. Now in House Commerce Committee.',
        momentum: 'rising',
      },
      {
        billId: 'mi-hb4133',
        billNumber: 'MI HB 4133',
        state: 'MI',
        summary:
          'Cemetery perpetual care fund investment rule update — would allow up to 40% equity exposure (up from 20%). Actuarial study submitted this week.',
        momentum: 'stable',
      },
    ],
    featuredPostId: 'post-1',
    stats: {
      newMembers: 24,
      newBillsTracked: 5,
      discussionsStarted: 61,
      statesActive: 5,
    },
    tags: ['direct-disposition', 'washington', 'consumer-protection', 'cremation'],
  },
]

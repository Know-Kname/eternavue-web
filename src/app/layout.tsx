import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eternavue.com'),
  title: {
    default: "Eternavue | The digital memorial layer for cemeteries and funeral homes",
    template: "%s | Eternavue",
  },
  description: "Eternavue is a white-label digital memorial platform for cemeteries and funeral homes — livestreamed services, lasting online tributes, and family keepsakes. Built by the 4th-generation steward of Detroit Memorial Park (est. 1925). Not a tech company that discovered grief.",
  keywords: [
    "digital memorial platform", "white-label memorial platform", "cemetery technology",
    "funeral home livestreaming", "online tribute platform", "memorial event page",
    "cemetery software", "Detroit Memorial Park", "operator-built memorial tech",
    "funeral livestreaming", "memorial keepsakes", "preserved presence",
    "Black-owned cemetery technology", "Warren Michigan cemetery",
  ],
  authors: [{ name: "Christian Wright Hughes", url: "https://eternavue.com" }],
  creator: "Eternavue",
  publisher: "Eternavue",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Eternavue | The digital memorial layer for cemeteries and funeral homes",
    description: "White-label digital memorial platform. Livestreamed services, lasting tribute pages, family keepsakes — all under your brand. Built by people who have operated a cemetery since 1925.",
    url: "https://eternavue.com",
    siteName: "Eternavue",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eternavue — the digital memorial layer for cemeteries and funeral homes",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternavue | The digital memorial layer for cemeteries and funeral homes",
    description: "White-label digital memorial platform for cemeteries and funeral homes. Operator-built.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://eternavue.com",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Eternavue",
  description: "White-label digital memorial platform for cemeteries and funeral homes — livestreamed services, lasting online tributes, family keepsakes. Built by the 4th-generation steward of Detroit Memorial Park.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://eternavue.com",
  email: "christian@thewrightguy.com",
  founder: {
    "@type": "Person",
    name: "Christian Wright Hughes",
    jobTitle: "Founder; 4th-generation steward, Detroit Memorial Park",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Basic",
      description: "Livestreamed service + branded memorial event page",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 150,
        maxPrice: 400,
      },
    },
    {
      "@type": "Offer",
      name: "Plus",
      description: "Everything in Basic + lasting online tribute page, guestbook, highlight reel, digital keepsakes",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 500,
        maxPrice: 1200,
      },
    },
    {
      "@type": "Offer",
      name: "Premium",
      description: "Everything in Plus + holographic capture / projection (priced by quote)",
      priceCurrency: "USD",
    },
  ],
  sameAs: [
    "https://thewrightguy.com",
  ],
  image: "https://eternavue.com/og-image.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="bg-void text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}

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
    default: "Eternavue | Where Memory Becomes Light",
    template: "%s | Eternavue",
  },
  description: "Eternavue transforms ordinary events into extraordinary experiences with stunning holographic visuals. Concerts, product launches, brand activations, weddings, and private celebrations — powered by cutting-edge holographic technology. Detroit-born innovation.",
  keywords: [
    "holographic memorial", "holographic tribute", "memorial services",
    "holographic experience", "celebration of life hologram", "corporate holographic display",
    "Detroit Memorial Park", "Michigan holographic services", "immersive memorial",
    "holographic projection", "memorial technology", "event hologram", "Warren Michigan"
  ],
  authors: [{ name: "Eternavue", url: "https://eternavue.com" }],
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
    title: "Eternavue | Where Memory Becomes Light",
    description: "Stunning holographic visuals for events, brand activations, and celebrations. Detroit-born innovation.",
    url: "https://eternavue.com",
    siteName: "Eternavue",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eternavue - Where Memory Becomes Light",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternavue | Where Memory Becomes Light",
    description: "Transforming ordinary events into extraordinary experiences with holographic visuals.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://eternavue.com",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Eternavue",
  description: "Transforming ordinary events into extraordinary experiences with high-quality holographic visuals. Concerts, corporate activations, celebrations, and more.",
  url: "https://eternavue.com",
  telephone: "+15867511313",
  email: "info@eternavue.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4280 E. Thirteen Mile Rd",
    addressLocality: "Warren",
    addressRegion: "MI",
    postalCode: "48092",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.5074,
    longitude: -83.0130,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  founder: {
    "@type": "Organization",
    name: "Eternavue",
  },
  sameAs: [
    "https://www.linkedin.com/company/eternavue",
    "https://www.instagram.com/eternavue",
    "https://www.facebook.com/eternavue",
  ],
  serviceType: [
    "Holographic Event Experiences",
    "Holographic Brand Activations",
    "Corporate Holographic Displays",
    "Private Event Holographic Visuals",
  ],
  areaServed: {
    "@type": "State",
    name: "Michigan",
  },
  priceRange: "$$$$",
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

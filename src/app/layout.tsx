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
    default: "Eternavue | Holographic Experiences That Honor Legacy",
    template: "%s | Eternavue",
  },
  description: "Transform memories into immersive holographic tributes. Memorial services, special events, and corporate solutions using cutting-edge holographic technology. Founded at Detroit Memorial Park, serving families since 1925.",
  keywords: [
    "holographic memorial", "holographic display", "memorial services",
    "holographic tribute", "special events hologram", "corporate holographic display",
    "Detroit Memorial Park", "Michigan holographic services", "celebration of life",
    "funeral technology", "memorial tribute", "event hologram", "Warren Michigan"
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
    title: "Eternavue | Holographic Experiences That Honor Legacy",
    description: "Transform memories into immersive holographic tributes using cutting-edge technology. Memorial services, special events, and corporate solutions.",
    url: "https://eternavue.com",
    siteName: "Eternavue",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eternavue - Holographic Experiences That Honor Legacy",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternavue | Holographic Experiences",
    description: "Transform memories into immersive holographic tributes.",
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
  description: "Holographic memorial services, event displays, and corporate solutions. Transform memories into immersive holographic tributes.",
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
  foundingDate: "1925",
  founder: {
    "@type": "Organization",
    name: "Detroit Memorial Park",
  },
  sameAs: [
    "https://www.linkedin.com/company/eternavue",
    "https://www.instagram.com/eternavue",
    "https://www.facebook.com/eternavue",
  ],
  serviceType: [
    "Holographic Memorial Services",
    "Holographic Event Displays",
    "Corporate Holographic Solutions",
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

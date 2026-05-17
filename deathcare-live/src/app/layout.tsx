import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'deathcare.live — Industry Community & Intelligence',
    template: '%s | deathcare.live',
  },
  description:
    'The professional community for deathcare operators. Track state legislation, exchange knowledge, build coalitions, and find vetted peers and vendors.',
  metadataBase: new URL('https://deathcare.live'),
  openGraph: {
    siteName: 'deathcare.live',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

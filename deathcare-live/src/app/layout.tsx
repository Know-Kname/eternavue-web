import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'deathcare.live — Deathcare Industry Hub',
    template: '%s | deathcare.live',
  },
  description:
    'The comprehensive directory and resource hub for the deathcare industry. Find funeral homes, cremation services, cemeteries, suppliers, technology vendors, and grief support.',
  metadataBase: new URL('https://deathcare.live'),
  openGraph: {
    siteName: 'deathcare.live',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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

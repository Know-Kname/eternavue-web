import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export interface PageWrapperProps {
  children: React.ReactNode
  onHeaderCtaClick?: () => void
}

export function PageWrapper({ children, onHeaderCtaClick }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onCtaClick={onHeaderCtaClick} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}


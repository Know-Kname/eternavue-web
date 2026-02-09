import React from 'react'
import Image from 'next/image'

export interface TestimonialProps {
  quote: string
  author: string
  role?: string
  organization?: string
  image?: string
}

export function Testimonial({ 
  quote, 
  author, 
  role,
  organization,
  image 
}: TestimonialProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 border border-neutral-100">
      {/* Quote */}
      <div className="mb-6">
        <svg className="w-10 h-10 text-accent-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-lg text-neutral-700 leading-relaxed italic">
          &quot;{quote}&quot;
        </p>
      </div>
      
      {/* Author info */}
      <div className="flex items-center gap-4">
        {image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
            <Image src={image} alt={author} fill sizes="48px" className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold text-primary-700">{author}</p>
          {(role || organization) && (
            <p className="text-sm text-neutral-500">
              {role}{role && organization && ', '}{organization}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


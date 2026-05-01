'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const PATHS = [
  'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
  'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
  'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
  'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
  'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843',
  'M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835',
  'M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827',
  'M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819',
  'M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811',
  'M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803',
]

interface BackgroundBeamsProps {
  className?: string
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-400 -300 1400 1400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {PATHS.map((_, i) => (
            <linearGradient
              key={i}
              id={`beam-gradient-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="#32B8C6" stopOpacity="0" />
              <stop offset="35%"  stopColor="#32B8C6" stopOpacity="0.8" />
              <stop offset="65%"  stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {PATHS.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={`url(#beam-gradient-${i})`}
            strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0.1, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity:    [0, 0.6, 0],
            }}
            transition={{
              duration:   12 + (i * 1.5),
              repeat:     Infinity,
              ease:       'linear',
              delay:      i * 0.8,
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

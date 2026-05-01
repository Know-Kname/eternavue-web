'use client'

import React, { useEffect } from 'react'
import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextGenerateEffectProps {
  words:      string
  className?: string
  duration?:  number
  staggerDuration?: number
  once?:      boolean
}

export function TextGenerateEffect({
  words,
  className,
  duration        = 0.6,
  staggerDuration = 0.08,
  once            = true,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once })

  const wordsArray = words.split(' ')

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        { opacity: 1, filter: 'blur(0px)', y: 0 },
        {
          duration,
          delay: stagger(staggerDuration),
          ease:  [0.25, 0.1, 0.25, 1],
        }
      )
    }
  }, [isInView, animate, duration, staggerDuration])

  return (
    <motion.div ref={scope} className={cn('inline', className)}>
      {wordsArray.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{
            opacity: 0,
            filter:  'blur(12px)',
            display: 'inline-block',
            marginRight: '0.28em',
            transform: 'translateY(8px)',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

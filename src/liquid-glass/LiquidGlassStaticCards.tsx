'use client'

import type { ReactNode } from 'react'
import { cx } from './cx'
import { LiquidGlassCard } from './LiquidGlassCard'

export type LiquidGlassStaticCard = {
  id: string
  title: ReactNode
  body?: ReactNode
}

export type LiquidGlassStaticCardsProps = {
  items: LiquidGlassStaticCard[]
  className?: string
  direction?: 'left-to-right' | 'right-to-left'
  listContainerClassName?: string
  listClassName?: string
}

export function LiquidGlassStaticCards({
  items,
  className,
  direction = 'left-to-right',
  listContainerClassName,
  listClassName,
}: LiquidGlassStaticCardsProps) {
  const isReversed = direction === 'right-to-left'
  const orderedItems = isReversed ? [...items].reverse() : items

  return (
    <section
      className={cx(
        'lgCards',
        'lgCards--row',
        direction === 'left-to-right' && 'lgCards--right',
        direction === 'right-to-left' && 'lgCards--left',
        className,
      )}
      aria-label="Cards"
      data-lg-direction={direction}
    >
      <div className={cx('lgCards__listContainer', listContainerClassName)}>
        <div className={cx('lgCards__list', listClassName)}>
          {orderedItems.map((card) => (
            <LiquidGlassCard
              key={card.id}
              dataCardId={card.id}
              title={card.title}
              className="lgCards__card"
            >
              {card.body}
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}


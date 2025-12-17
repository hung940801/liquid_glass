import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cx } from './cx'
import { LiquidGlassButton } from './LiquidGlassButton'
import { LiquidGlassCard } from './LiquidGlassCard'

export type LiquidGlassDynamicCard = {
  id: string
  title: ReactNode
  body?: ReactNode
}

export type LiquidGlassDynamicCardsProps = {
  defaultCards?: LiquidGlassDynamicCard[]
  className?: string
  direction?: 'top-to-bottom' | 'bottom-to-top' | 'left-to-right' | 'right-to-left'
  addLabel?: ReactNode
  createCard?: (nextIndex: number) => LiquidGlassDynamicCard
  showControls?: boolean
  listContainerClassName?: string
  listClassName?: string
  autoScrollOnAdd?: boolean
}

type CSSVarProperties = CSSProperties & { [key: `--${string}`]: string }

type CardSplitState = {
  newId: string
  phase: 'prep' | 'active'
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function LiquidGlassDynamicCards({
  defaultCards,
  className,
  direction = 'top-to-bottom',
  addLabel = 'Add card',
  createCard,
  showControls = true,
  listContainerClassName,
  listClassName,
  autoScrollOnAdd = false,
}: LiquidGlassDynamicCardsProps) {
  const instanceId = useId()
  const initialCards = useMemo<LiquidGlassDynamicCard[]>(
    () =>
      defaultCards ?? [
        {
          id: `lg_card_${instanceId}_1`,
          title: 'Card 1',
          body: 'Click “Add card” to add more.',
        },
      ],
    [defaultCards, instanceId],
  )

  const [cards, setCards] = useState<LiquidGlassDynamicCard[]>(initialCards)
  const [splitState, setSplitState] = useState<CardSplitState | null>(null)
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const pendingAutoScrollRef = useRef<null | 'start' | 'end'>(null)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      for (const id of timeouts) window.clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (!splitState || splitState.phase !== 'active') return
    const timeoutId = window.setTimeout(() => setSplitState(null), 580)
    timeoutsRef.current.push(timeoutId)
    return () => window.clearTimeout(timeoutId)
  }, [splitState])

  useEffect(() => {
    if (!autoScrollOnAdd) return
    const mode = pendingAutoScrollRef.current
    if (!mode) return
    const container = listContainerRef.current
    if (!container) return

    const isHorizontal =
      direction === 'left-to-right' || direction === 'right-to-left'

    if (mode === 'end') {
      container.scrollTo({
        top: isHorizontal ? 0 : container.scrollHeight,
        left: isHorizontal ? container.scrollWidth : 0,
        behavior: 'smooth',
      })
    } else {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }

    pendingAutoScrollRef.current = null
  }, [autoScrollOnAdd, cards.length, direction, splitState?.phase])

  const addCard = () => {
    if (splitState) return
    const nextIndex = cards.length + 1
    const nextCard =
      createCard?.(nextIndex) ??
      ({
        id: createId(),
        title: `Card ${nextIndex}`,
        body: 'Liquid Glass card',
      } satisfies LiquidGlassDynamicCard)
    const insertAtStart =
      direction === 'bottom-to-top' || direction === 'right-to-left'

    setCards((prev) => (insertAtStart ? [nextCard, ...prev] : [...prev, nextCard]))

    const newId = nextCard.id
    setSplitState({
      newId,
      phase: 'prep',
    })

    if (autoScrollOnAdd) {
      pendingAutoScrollRef.current = insertAtStart ? 'start' : 'end'
    }

    requestAnimationFrame(() => {
      setSplitState((prev) => {
        if (!prev) return null
        if (prev.newId !== newId) return prev
        if (prev.phase === 'active') return prev
        return { ...prev, phase: 'active' }
      })
    })
  }

  return (
    <section
      className={cx(
        'lgCards',
        direction.startsWith('left') || direction.startsWith('right')
          ? 'lgCards--row'
          : 'lgCards--col',
        direction === 'bottom-to-top' && 'lgCards--up',
        direction === 'top-to-bottom' && 'lgCards--down',
        direction === 'left-to-right' && 'lgCards--right',
        direction === 'right-to-left' && 'lgCards--left',
        className,
      )}
      aria-label="Cards"
      data-lg-direction={direction}
    >
      {showControls && (
        <div className="lgCards__toolbar">
          <LiquidGlassButton
            size="sm"
            disabled={splitState !== null}
            onClick={addCard}
            style={{ '--lg-fg': 'white' } as CSSVarProperties}
          >
            {addLabel}
          </LiquidGlassButton>
        </div>
      )}

      <div
        ref={listContainerRef}
        className={cx('lgCards__listContainer', listContainerClassName)}
      >
        <div ref={listRef} className={cx('lgCards__list', listClassName)}>
          {cards.map((card) => {
            const isSplitNew =
              !!splitState &&
              splitState.phase === 'active' &&
              card.id === splitState.newId
            const isSplitNewPrep =
              !!splitState &&
              splitState.phase === 'prep' &&
              card.id === splitState.newId

            return (
              <LiquidGlassCard
                key={card.id}
                dataCardId={card.id}
                title={card.title}
                className={cx(
                  'lgCards__card',
                  isSplitNew && 'lgCard--splitNew',
                  isSplitNewPrep && 'lgCard--splitNewPrep',
                )}
              >
                {card.body}
              </LiquidGlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

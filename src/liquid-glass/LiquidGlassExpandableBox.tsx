'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassExpandableBoxProps = {
  title?: ReactNode
  children: ReactNode
  lines?: number
  defaultExpanded?: boolean
  moreLabel?: ReactNode
  lessLabel?: ReactNode
  className?: string
  contentClassName?: string
  style?: CSSProperties
  tint?: string
  blur?: string
}

function getLineHeightPx(element: HTMLElement): number {
  const styles = window.getComputedStyle(element)
  const lineHeight = Number.parseFloat(styles.lineHeight)
  if (Number.isFinite(lineHeight)) return lineHeight
  const fontSize = Number.parseFloat(styles.fontSize)
  return Number.isFinite(fontSize) ? fontSize * 1.45 : 22
}

export function LiquidGlassExpandableBox({
  title,
  children,
  lines = 5,
  defaultExpanded = false,
  moreLabel = 'Read more',
  lessLabel = 'Show less',
  className,
  contentClassName,
  style,
  tint,
  blur,
}: LiquidGlassExpandableBoxProps) {
  const controlsId = useId()
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null)
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  const measure = () => {
    const el = textRef.current
    if (!el) return
    const lineHeight = getLineHeightPx(el)
    const nextCollapsed = Math.max(0, Math.round(lineHeight * Math.max(1, lines)))
    const nextExpanded = Math.max(nextCollapsed, el.scrollHeight)
    setCollapsedHeight(nextCollapsed)
    setExpandedHeight(nextExpanded)
  }

  useLayoutEffect(() => {
    measure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines])

  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isExpandable = useMemo(() => {
    if (!collapsedHeight || !expandedHeight) return false
    return expandedHeight > collapsedHeight + 4
  }, [collapsedHeight, expandedHeight])

  const height = expanded
    ? expandedHeight ?? undefined
    : collapsedHeight ?? undefined

  const mergedStyle: CSSProperties & { [key: `--${string}`]: string | number | undefined } =
    {
      ...(style ?? {}),
    }
  if (tint) mergedStyle['--lg-tint'] = tint
  if (blur) mergedStyle['--lg-blur'] = blur

  return (
    <LiquidGlassSurface
      as="section"
      variant="card"
      interactive={false}
      className={cx('lgExpand', className)}
      contentClassName={cx('lgExpand__content', contentClassName)}
      style={mergedStyle}
    >
      {title && <div className="lgExpand__title">{title}</div>}

      <div
        id={controlsId}
        ref={textRef}
        className={cx(
          'lgExpand__text',
          isExpandable && !expanded && 'lgExpand__text--collapsed',
        )}
        style={height ? { height } : undefined}
      >
        {children}
      </div>

      {isExpandable && (
        <button
          type="button"
          className="lgExpand__toggle"
          aria-controls={controlsId}
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((prev) => !prev)
            queueMicrotask(() => measure())
          }}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </LiquidGlassSurface>
  )
}


'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassPopupBoxProps = {
  title?: ReactNode
  children: ReactNode
  previewLines?: number
  openLabel?: ReactNode
  className?: string
  contentClassName?: string
  style?: CSSProperties
  tint?: string
  blur?: string
}

type PopupState = 'closed' | 'opening' | 'open' | 'closing'

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number | undefined
}

function clampToPx(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

export function LiquidGlassPopupBox({
  title,
  children,
  previewLines = 5,
  openLabel = 'More',
  className,
  contentClassName,
  style,
  tint,
  blur,
}: LiquidGlassPopupBoxProps) {
  const previewRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<PopupState>('closed')
  const [fromRect, setFromRect] = useState<DOMRect | null>(null)

  const isOpen = state === 'opening' || state === 'open' || state === 'closing'

  const mergedStyle: CSSVarProperties = useMemo(() => {
    const next: CSSVarProperties = { ...(style ?? {}) }
    next['--lg-popup-lines'] = previewLines
    if (tint) next['--lg-tint'] = tint
    if (blur) next['--lg-blur'] = blur
    return next
  }, [blur, previewLines, style, tint])

  const open = useCallback(() => {
    const rect = previewRef.current?.getBoundingClientRect()
    if (!rect) return
    setFromRect(rect)
    setState('opening')
  }, [])

  const close = useCallback(() => {
    setState((prev) => (prev === 'closed' ? prev : 'closing'))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (state !== 'opening' || !fromRect) return
    const modal = modalRef.current
    if (!modal) return

    const toRect = modal.getBoundingClientRect()
    const dx = clampToPx(fromRect.left - toRect.left)
    const dy = clampToPx(fromRect.top - toRect.top)
    const sx = toRect.width > 0 ? fromRect.width / toRect.width : 1
    const sy = toRect.height > 0 ? fromRect.height / toRect.height : 1

    modal.style.setProperty('--lg-popup-from-x', `${dx}px`)
    modal.style.setProperty('--lg-popup-from-y', `${dy}px`)
    modal.style.setProperty('--lg-popup-from-sx', `${sx}`)
    modal.style.setProperty('--lg-popup-from-sy', `${sy}`)

    requestAnimationFrame(() => setState('open'))
  }, [fromRect, state])

  useEffect(() => {
    if (state !== 'closing') return
    const id = window.setTimeout(() => {
      setState('closed')
      setFromRect(null)
    }, 420)
    return () => window.clearTimeout(id)
  }, [state])

  return (
    <>
      <LiquidGlassSurface
        ref={previewRef}
        as="section"
        variant="card"
        interactive={false}
        className={cx('lgPopup', className)}
        contentClassName={cx('lgPopup__content', contentClassName)}
        style={mergedStyle}
      >
        {title && <div className="lgPopup__title">{title}</div>}
        <div className="lgPopup__text">{children}</div>
        <button type="button" className="lgPopup__open" onClick={open}>
          {openLabel}
        </button>
      </LiquidGlassSurface>

      {isOpen &&
        createPortal(
          <div
            className="lgPopupOverlay"
            data-lg-state={state}
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <LiquidGlassSurface
              ref={modalRef}
              as="section"
              variant="card"
              interactive={false}
              className="lgPopupModal"
              contentClassName="lgPopupModal__content"
              aria-modal="true"
              role="dialog"
            >
              <button
                type="button"
                className="lgPopupModal__close"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
              {title && <div className="lgPopupModal__title">{title}</div>}
              <div className="lgPopupModal__body">{children}</div>
            </LiquidGlassSurface>
          </div>,
          document.body,
        )}
    </>
  )
}

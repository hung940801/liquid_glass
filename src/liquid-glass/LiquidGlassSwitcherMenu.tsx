'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassSwitcherMenuOption = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type LiquidGlassSwitcherMenuProps = {
  options: ReadonlyArray<LiquidGlassSwitcherMenuOption>
  value?: string
  defaultValue?: string
  onValueChange?: (nextId: string) => void
  className?: string
  optionClassName?: string
  style?: CSSProperties
  tint?: string
  blur?: string
  width?: number | string
  height?: number | string
  'aria-label'?: string
}

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number | undefined
}

function clampToPx(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

export function LiquidGlassSwitcherMenu({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  optionClassName,
  style,
  tint,
  blur,
  width = 1100,
  height = 'auto',
  'aria-label': ariaLabel = 'Switcher',
}: LiquidGlassSwitcherMenuProps) {
  const isControlled = value !== undefined
  const initialValue = useMemo(() => {
    if (defaultValue) return defaultValue
    return options[0]?.id
  }, [defaultValue, options])

  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue)
  const selectedId = (isControlled ? value : uncontrolledValue) ?? options[0]?.id

  const previousIndexRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const pendingBumpRef = useRef(false)

  const selectedIndex = useMemo(() => {
    const index = options.findIndex((o) => o.id === selectedId)
    return index >= 0 ? index : 0
  }, [options, selectedId])

  const bump = useCallback(() => {
    const toggle = toggleRef.current
    if (!toggle) return
    toggle.classList.remove('lgSwitcher__toggle--bump')
    // Force reflow so the animation restarts.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    toggle.offsetWidth
    toggle.classList.add('lgSwitcher__toggle--bump')
  }, [])

  const updateToggle = useCallback(() => {
    const root = containerRef.current
    if (!root) return

    const selected = options[selectedIndex]
    const selectedButton = selected ? optionRefs.current.get(selected.id) : null
    if (!selectedButton) return

    const rootRect = root.getBoundingClientRect()
    const btnRect = selectedButton.getBoundingClientRect()

    const paddingLeft = Number.parseFloat(window.getComputedStyle(root).paddingLeft)
    const x = clampToPx(btnRect.left - rootRect.left - (Number.isFinite(paddingLeft) ? paddingLeft : 0))
    const w = clampToPx(btnRect.width)

    root.style.setProperty('--lg-switcher-x', `${x}px`)
    root.style.setProperty('--lg-switcher-w', `${w}px`)

    const prev = previousIndexRef.current
    const dir = prev === null ? 'none' : selectedIndex > prev ? 'right' : 'left'
    root.dataset.lgDir = dir
  }, [options, selectedIndex])

  useLayoutEffect(() => {
    updateToggle()
    if (pendingBumpRef.current) {
      bump()
      pendingBumpRef.current = false
    }
  }, [bump, height, updateToggle, width])

  useEffect(() => {
    const onResize = () => updateToggle()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [updateToggle])

  const onSelect = (nextId: string) => {
    if (!nextId) return
    const nextIndex = options.findIndex((o) => o.id === nextId)
    previousIndexRef.current = selectedIndex

    if (!isControlled) setUncontrolledValue(nextId)
    onValueChange?.(nextId)

    // Direction depends on the previous -> next index.
    if (containerRef.current) {
      containerRef.current.dataset.lgDir =
        nextIndex > selectedIndex ? 'right' : nextIndex < selectedIndex ? 'left' : 'none'
    }

    pendingBumpRef.current = true
  }

  const mergedStyle: CSSVarProperties = {
    ...(style ?? {}),
    width,
    height,
  }
  if (tint) mergedStyle['--lg-tint'] = tint
  if (blur) mergedStyle['--lg-blur'] = blur

  return (
    <LiquidGlassSurface
      as="nav"
      variant="menu"
      interactive={false}
      aria-label={ariaLabel}
      className={cx('lgSwitcherSurface', className)}
      style={mergedStyle}
    >
      <div ref={containerRef} className="lgSwitcher" data-lg-dir="none">
        <div aria-hidden="true" ref={toggleRef} className="lgSwitcher__toggle" />
        {options.map((option) => {
          const isSelected = option.id === selectedId
          return (
            <button
              key={option.id}
              ref={(el) => {
                if (!el) {
                  optionRefs.current.delete(option.id)
                  return
                }
                optionRefs.current.set(option.id, el)
              }}
              type="button"
              className={cx(
                'lgSwitcher__option',
                isSelected && 'lgSwitcher__option--selected',
                optionClassName,
              )}
              aria-pressed={isSelected}
              disabled={option.disabled}
              onClick={() => onSelect(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </LiquidGlassSurface>
  )
}

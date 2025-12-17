import { type CSSProperties, type ReactNode } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassMenuItem = {
  id: string
  label: ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export type LiquidGlassMenuProps = {
  items: LiquidGlassMenuItem[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
  contentClassName?: string
  itemClassName?: string
  style?: CSSProperties
  tint?: string
  blur?: string
  distortionScale?: number
  'aria-label'?: string
}

export function LiquidGlassMenu({
  items,
  orientation = 'vertical',
  className,
  contentClassName,
  itemClassName,
  style,
  tint,
  blur,
  distortionScale,
  'aria-label': ariaLabel = 'Menu',
}: LiquidGlassMenuProps) {
  return (
    <LiquidGlassSurface
      as="nav"
      variant="menu"
      className={className}
      contentClassName={cx(
        'lgMenu',
        orientation === 'horizontal' && 'lgMenu--row',
        contentClassName,
      )}
      aria-label={ariaLabel}
      interactive={false}
      style={style}
      tint={tint}
      blur={blur}
      distortionScale={distortionScale}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cx('lgMenu__item', itemClassName)}
          onClick={item.onSelect}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
    </LiquidGlassSurface>
  )
}

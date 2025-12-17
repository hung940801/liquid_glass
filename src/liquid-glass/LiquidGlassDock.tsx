import { type CSSProperties, type ReactNode } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassDockItem = {
  id: string
  label: string
  icon: ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export type LiquidGlassDockProps = {
  items: LiquidGlassDockItem[]
  className?: string
  contentClassName?: string
  itemClassName?: string
  iconSize?: number
  style?: CSSProperties
  tint?: string
  blur?: string
  distortionScale?: number
  'aria-label'?: string
}

export function LiquidGlassDock({
  items,
  className,
  contentClassName,
  itemClassName,
  iconSize = 75,
  style,
  tint,
  blur,
  distortionScale,
  'aria-label': ariaLabel = 'Dock',
}: LiquidGlassDockProps) {
  const mergedStyle: CSSProperties & { '--lg-dock-icon-size': string } = {
    ...(style ?? {}),
    '--lg-dock-icon-size': `${iconSize}px`,
  }

  return (
    <LiquidGlassSurface
      as="nav"
      variant="dock"
      className={className}
      contentClassName={cx('lgDock', contentClassName)}
      aria-label={ariaLabel}
      style={mergedStyle}
      interactive={false}
      tint={tint}
      blur={blur}
      distortionScale={distortionScale}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cx('lgDock__item', itemClassName)}
          aria-label={item.label}
          title={item.label}
          onClick={item.onSelect}
          disabled={item.disabled}
        >
          {item.icon}
        </button>
      ))}
    </LiquidGlassSurface>
  )
}

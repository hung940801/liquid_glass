import { type CSSProperties, type ReactNode } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassCardProps = {
  title?: ReactNode
  subtitle?: ReactNode
  footer?: ReactNode
  dataCardId?: string
  style?: CSSProperties
  className?: string
  contentClassName?: string
  children?: ReactNode
}

export function LiquidGlassCard({
  title,
  subtitle,
  footer,
  dataCardId,
  style,
  className,
  contentClassName,
  children,
}: LiquidGlassCardProps) {
  return (
    <LiquidGlassSurface
      as="article"
      variant="card"
      interactive={false}
      data-lg-card-id={dataCardId}
      style={style}
      className={className}
      contentClassName={cx('lgCard', contentClassName)}
    >
      {(title || subtitle) && (
        <header className="lgCard__header">
          {title && <div className="lgCard__title">{title}</div>}
          {subtitle && <div className="lgCard__subtitle">{subtitle}</div>}
        </header>
      )}
      {children && <div className="lgCard__body">{children}</div>}
      {footer && <footer className="lgCard__footer">{footer}</footer>}
    </LiquidGlassSurface>
  )
}

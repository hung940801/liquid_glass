import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cx } from './cx'
import { LiquidGlassSurface } from './LiquidGlassSurface'

export type LiquidGlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  contentClassName?: string
  tint?: string
  blur?: string
  distortionScale?: number
  interactive?: boolean
  size?: 'lg' | 'sm'
}

export const LiquidGlassButton = forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(function LiquidGlassButton(
  {
    className,
    contentClassName,
    tint,
    blur,
    distortionScale,
    interactive,
    size = 'lg',
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <LiquidGlassSurface
      as="button"
      ref={ref}
      variant="button"
      tint={tint}
      blur={blur}
      distortionScale={distortionScale}
      interactive={interactive}
      className={cx(size === 'sm' && 'lgButton--sm', className)}
      contentClassName={contentClassName}
      type={type}
      {...props}
    />
  )
})

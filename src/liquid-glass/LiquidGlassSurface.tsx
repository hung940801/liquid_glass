import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  forwardRef,
  useId,
} from 'react'
import { cx, toDomId } from './cx'

type LiquidGlassVariant = 'surface' | 'menu' | 'dock' | 'button' | 'card'
type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number | undefined
}

type LiquidGlassSurfaceProps<E extends ElementType> = {
  as?: E
  variant?: LiquidGlassVariant
  interactive?: boolean
  tint?: string
  blur?: string
  distortionScale?: number
  className?: string
  contentClassName?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'children' | 'color'>

function LiquidGlassFilter({
  id,
  distortionScale = 150,
}: {
  id: string
  distortionScale?: number
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute' }}
    >
      <filter
        id={id}
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves={1}
          seed={5}
          result="turbulence"
        />

        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
          <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
          <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />

        <feSpecularLighting
          in="softMap"
          surfaceScale={5}
          specularConstant={1}
          specularExponent={100}
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x={-200} y={-200} z={300} />
        </feSpecularLighting>

        <feComposite
          in="specLight"
          operator="arithmetic"
          k1={0}
          k2={1}
          k3={1}
          k4={0}
          result="litImage"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale={distortionScale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export const LiquidGlassSurface = forwardRef(function LiquidGlassSurface<
  E extends ElementType = 'div',
>(
  {
    as,
    variant = 'surface',
    interactive = true,
    tint,
    blur,
    distortionScale,
    style,
    className,
    contentClassName,
    children,
    ...props
  }: LiquidGlassSurfaceProps<E>,
  ref: React.ForwardedRef<Element>,
) {
  const Component = (as ?? 'div') as ElementType
  const filterId = `lg_glass_${toDomId(useId())}`

  const mergedStyle: CSSVarProperties = {
    ...((style as CSSVarProperties | undefined) ?? undefined),
  }
  if (tint) mergedStyle['--lg-tint'] = tint
  if (blur) mergedStyle['--lg-blur'] = blur

  return (
    <Component
      ref={ref}
      className={cx(
        'lg',
        variant !== 'surface' && `lg--${variant}`,
        interactive && 'lg--interactive',
        className,
      )}
      style={mergedStyle}
      {...props}
    >
      <LiquidGlassFilter id={filterId} distortionScale={distortionScale} />
      <div
        aria-hidden="true"
        className="lg__effect"
        style={{ filter: `url(#${filterId})` }}
      />
      <div aria-hidden="true" className="lg__tint" />
      <div aria-hidden="true" className="lg__shine" />
      <div className={cx('lg__content', contentClassName)}>{children}</div>
    </Component>
  )
})

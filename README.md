# Liquid Glass Components (React)

Reusable “liquid glass” UI primitives/components.

- Source: `src/liquid-glass/*`
- Stylesheet: `src/liquid-glass/liquid-glass.css`

## Demo (this repo)

The demo app lives in Next.js App Router:

- Page: `src/app/page.tsx`
- Page styles: `src/app/page.module.css`
- Global styles: `src/app/globals.css`
- Background videos: `public/jungle.mp4`, `public/blurred_color_bg.mp4`

## Usage (in this repo)

- Global CSS is imported once in `src/app/layout.tsx`.
- Use components:

```tsx
import { LiquidGlassButton } from './liquid-glass'

<LiquidGlassButton style={{ '--lg-fg': 'white' } as React.CSSProperties & { '--lg-fg': string }}>
  Liquid Glass
</LiquidGlassButton>
```

## Reuse in other projects

Copy `src/liquid-glass` into another React project and import `liquid-glass.css` once (or extract it into your app’s global stylesheet). Components are self-contained: each `LiquidGlassSurface` instance embeds its own SVG filter definition so it can be dropped into any app without extra setup.

## References / Credits

UI inspiration (CodePen):

- https://codepen.io/lucasromerodb/pen/vEOWpYM
- https://codepen.io/DenDionigi/pen/JodwNzX

Background videos (Vecteezy):

- Waterfall: https://www.vecteezy.com/video/46747921-revealed-small-waterfall-in-lush-foliage-tropical-rainforest-under-sunlight-in-rainy-season-exploration-and-hiking-trip-in-the-wild-water-flowing-over-the-rocks-from-cascade-in-the-jungle
- Blurred gradient: https://www.vecteezy.com/video/11678465-colorful-abstract-blurred-gradient-background-moving-abstract-blurred-background-rainbow-gradient-loopable-background-animation

## Dev

- `npm run dev` (Next.js)
- `npm run build`
- `npm run start`
- `npm run lint`

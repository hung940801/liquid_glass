# Liquid Glass Components (React)

Reusable “liquid glass” UI primitives/components.

- Source: `src/liquid-glass/*`
- Stylesheet: `src/liquid-glass/liquid-glass.css`

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

## Dev

- `npm run dev` (Next.js)
- `npm run build`
- `npm run start`
- `npm run lint`

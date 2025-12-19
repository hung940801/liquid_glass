# Liquid Glass Components (React)

Reusable “liquid glass” UI primitives/components inspired by Apple’s “Liquid Glass” look (blur + tint + specular highlights + subtle SVG distortion).

- Source: `src/liquid-glass/*`
- Stylesheet: `src/liquid-glass/liquid-glass.css`

## Description

This repo contains a small component set + demo showcasing:

- `LiquidGlassSurface` (the base glass layer)
- Menu + switcher menu (animated selection pill)
- Cards (static + dynamic “split-in” entrance)
- Expandable “read more” box + popup box

## Demo (this repo)

The demo app lives in Next.js App Router:

- Page: `src/app/page.tsx`
- Page styles: `src/app/page.module.css`
- Global styles: `src/app/globals.css`
- Background image: `public/jungle.jpg`
- CodePen demo: https://codepen.io/cyrus-chau/pen/MYyNEea

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

Background image (Unsplash):

- Photo by <a href="https://unsplash.com/@chrisabney?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chris Abney</a> on <a href="https://unsplash.com/photos/area-covered-with-green-leafed-plants-qLW70Aoo8BE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Dev

- `npm run dev` (Next.js)
- `npm run build`
- `npm run start`
- `npm run lint`

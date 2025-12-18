import type { ReactNode } from 'react'

import './globals.css'
import '../liquid-glass/liquid-glass.css'

export const metadata = {
  title: 'Liquid Glass',
  description: 'Liquid Glass component demos',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="appBg" aria-hidden="true">
          <video
            className="appBg__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/jungle.mp4" type="video/mp4" />
          </video>
          <div className="appBg__overlay" />
        </div>
        {children}
      </body>
    </html>
  )
}

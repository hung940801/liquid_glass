'use client'

import { useState } from 'react'

import styles from './page.module.css'

import {
  LiquidGlassDock,
  LiquidGlassDynamicCards,
  LiquidGlassExpandableBox,
  LiquidGlassMenu,
  LiquidGlassPopupBox,
  LiquidGlassStaticCards,
  LiquidGlassSwitcherMenu,
} from '../liquid-glass'

export default function Page() {
  const menuItems = [
    { id: 'home', label: 'Home', onSelect: () => console.log('Home') },
    { id: 'products', label: 'Products', onSelect: () => console.log('Products') },
    { id: 'about', label: 'About', onSelect: () => console.log('About') },
    { id: 'contact', label: 'Contact', onSelect: () => console.log('Contact') },
  ]

  const [selectedMenuId, setSelectedMenuId] = useState(menuItems[0]?.id ?? 'home')

  const staticCards = Array.from({ length: 12 }, (_, index) => {
    const cardNumber = index + 1
    return {
      id: `static_${cardNumber}`,
      title: `Static card ${cardNumber}`,
      body: 'Liquid Glass card',
    }
  })

  return (
    <div className={styles.demo}>
      <div className={styles.demo__top}>
        <div className={styles.demo__stack}>
          <LiquidGlassMenu items={menuItems} orientation="horizontal" />
          <LiquidGlassSwitcherMenu
            width={1100}
            options={menuItems.map(({ id, label }) => ({ id, label }))}
            value={selectedMenuId}
            onValueChange={(nextId) => {
              setSelectedMenuId(nextId)
              menuItems.find((item) => item.id === nextId)?.onSelect?.()
            }}
            aria-label="Menu switcher"
          />
          <LiquidGlassExpandableBox title="Read more" lines={5}>
            <p>
              Liquid Glass is a layered effect: a blurred backdrop, a subtle tint,
              and specular highlights. This demo keeps the surface reusable while
              letting you mix components like menus, switchers, and dynamic cards.
            </p>
            <p>
              Click “Add card” in the lists below to see the split-style entrance
              animation. The switcher menu above uses a moving selection pill inspired
              by the CodePen switcher animation.
            </p>
            <p>
              This expandable box starts collapsed, showing only a few lines, and
              expands inline to reveal the full content without leaving the page.
            </p>
          </LiquidGlassExpandableBox>

          <LiquidGlassPopupBox title="Long content" previewLines={5} openLabel="More">
            <p>
              This box previews like a “read more” card, but opens into a full-screen
              overlay for longer content. The open button sits at the bottom-right,
              and a close button fades in once the overlay finishes opening.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dolore
              reiciendis sunt neque, eaque impedit sed placeat, omnis incidunt
              provident officia. Dicta odit soluta, vero optio molestiae porro
              commodi minus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
              beatae, incidunt, laudantium quae sequi ab itaque impedit fugiat,
              deserunt iusto illo? Repudiandae, beatae. Sequi, similique.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              voluptates at facilis quaerat illum, recusandae nesciunt iste
              provident dolores, facere itaque amet. Suscipit rem totam, alias
              quidem nihil incidunt.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero deserunt
              corporis a ipsa natus quisquam minus dolor enim, sint, repellendus
              beatae. Laboriosam illo dolorum optio.
            </p>
          </LiquidGlassPopupBox>

          <LiquidGlassStaticCards
            direction="left-to-right"
            items={staticCards}
            listContainerClassName={styles.demoListXContainer}
          />
        </div>
      </div>

      <div className={styles.demoLists}>
        <div className={styles.demoLists__cols}>
          <div className={styles.demoLists__panel}>
            <div className={styles.demoLists__heading}>Top to bottom</div>
            <LiquidGlassDynamicCards
              listContainerClassName={styles.demoListYContainer}
              autoScrollOnAdd
            />
          </div>
          <div className={styles.demoLists__panel}>
            <div className={styles.demoLists__heading}>Bottom to top</div>
            <LiquidGlassDynamicCards
              direction="bottom-to-top"
              listContainerClassName={styles.demoListYContainer}
              autoScrollOnAdd
            />
          </div>
        </div>

        <div className={styles.demoLists__rows}>
          <div className={`${styles.demoLists__panel} ${styles['demoLists__panel--wide']}`}>
            <div className={styles.demoLists__heading}>Left to right</div>
            <LiquidGlassDynamicCards
              direction="left-to-right"
              listContainerClassName={styles.demoListXContainer}
              autoScrollOnAdd
            />
          </div>
          <div className={`${styles.demoLists__panel} ${styles['demoLists__panel--wide']}`}>
            <div className={styles.demoLists__heading}>Right to left</div>
            <LiquidGlassDynamicCards
              direction="right-to-left"
              listContainerClassName={styles.demoListXContainer}
              autoScrollOnAdd
            />
          </div>
        </div>
      </div>
    </div>
  )
}

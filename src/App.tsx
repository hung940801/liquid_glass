'use client'

import { useState } from 'react'

import {
  LiquidGlassDock,
  LiquidGlassDynamicCards,
  LiquidGlassExpandableBox,
  LiquidGlassMenu,
  LiquidGlassPopupBox,
  LiquidGlassSwitcherMenu,
} from './liquid-glass'

function App() {
  const menuItems = [
    { id: 'home', label: 'Home', onSelect: () => console.log('Home') },
    { id: 'products', label: 'Products', onSelect: () => console.log('Products') },
    { id: 'about', label: 'About', onSelect: () => console.log('About') },
    { id: 'contact', label: 'Contact', onSelect: () => console.log('Contact') },
  ]

  const [selectedMenuId, setSelectedMenuId] = useState(menuItems[0]?.id ?? 'home')

  const dockItems = [
    { id: 'finder', label: 'Finder', icon: <span className="demoIcon">F</span> },
    { id: 'maps', label: 'Maps', icon: <span className="demoIcon">M</span> },
    { id: 'messages', label: 'Messages', icon: <span className="demoIcon">S</span> },
    { id: 'notes', label: 'Notes', icon: <span className="demoIcon">N</span> },
    { id: 'safari', label: 'Safari', icon: <span className="demoIcon">W</span> },
    { id: 'books', label: 'Books', icon: <span className="demoIcon">B</span> },
  ]

  return (
    <div className="demo">
      <div className="demo__top">
        <div className="demo__stack">
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
          <LiquidGlassDock items={dockItems} />
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
        </div>
      </div>

      <div className="demoLists">
        <div className="demoLists__cols">
          <div className="demoLists__panel">
            <div className="demoLists__heading">Top to bottom</div>
            <LiquidGlassDynamicCards
              listContainerClassName="demoListYContainer"
              autoScrollOnAdd
            />
          </div>
          <div className="demoLists__panel">
            <div className="demoLists__heading">Bottom to top</div>
            <LiquidGlassDynamicCards
              direction="bottom-to-top"
              listContainerClassName="demoListYContainer"
              autoScrollOnAdd
            />
          </div>
        </div>

        <div className="demoLists__rows">
          <div className="demoLists__panel demoLists__panel--wide">
            <div className="demoLists__heading">Left to right</div>
            <LiquidGlassDynamicCards
              direction="left-to-right"
              listContainerClassName="demoListXContainer"
              autoScrollOnAdd
            />
          </div>
          <div className="demoLists__panel demoLists__panel--wide">
            <div className="demoLists__heading">Right to left</div>
            <LiquidGlassDynamicCards
              direction="right-to-left"
              listContainerClassName="demoListXContainer"
              autoScrollOnAdd
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

'use client'

import {
  LiquidGlassDock,
  LiquidGlassDynamicCards,
  LiquidGlassMenu,
} from './liquid-glass'

function App() {
  const menuItems = [
    { id: 'home', label: 'Home', onSelect: () => console.log('Home') },
    { id: 'products', label: 'Products', onSelect: () => console.log('Products') },
    { id: 'about', label: 'About', onSelect: () => console.log('About') },
    { id: 'contact', label: 'Contact', onSelect: () => console.log('Contact')},
  ]

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
          <LiquidGlassMenu items={menuItems} orientation="horizontal" />
          <LiquidGlassDock items={dockItems} />
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

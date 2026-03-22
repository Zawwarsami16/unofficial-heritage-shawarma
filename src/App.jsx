import { useRef, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { StoreProvider, useStore } from './context/Store.jsx'
import { LayoutProvider } from './hooks/layout.jsx'
import { Nav, AnnouncementBar, StickyBar, MobileNav, Footer } from './components/Nav.jsx'
import { CartSidebar, HAI } from './components/Widgets.jsx'
import Cursor from './components/Cursor.jsx'
import SmoothScroll, { ScrollProgress } from './components/SmoothScroll.jsx'
import { ScrollRing } from './components/Effects.jsx'
import Home     from './pages/Home.jsx'
import Menu     from './pages/Menu.jsx'
import About    from './pages/About.jsx'
import Catering, { Contact, Loyalty, Receipt, Admin } from './pages/AllPages.jsx'
import Deploy   from './pages/Deploy.jsx'
import Games    from './pages/Games.jsx'
import QRMenu   from './pages/QRMenu.jsx'

// curtain wipe transition between pages
// each panel staggers slightly for that layered effect
function PageTransition({ children }) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [pageKey, setPageKey] = useState(location.pathname)
  const [phase,   setPhase]   = useState('idle') // idle | in | out

  useEffect(() => {
    if (location.pathname === prevPath.current) return

    prevPath.current = location.pathname
    const newPath = location.pathname

    setPhase('in')

    const swapTimer = setTimeout(() => {
      setPageKey(newPath)
      setPhase('out')

      const doneTimer = setTimeout(() => setPhase('idle'), 550)
      return () => clearTimeout(doneTimer)
    }, 440)

    return () => clearTimeout(swapTimer)
  }, [location.pathname])

  const panelCount = 8

  return (
    <>
      {phase !== 'idle' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 8999, pointerEvents: 'none', display: 'flex' }}>
          {Array.from({ length: panelCount }, (_, i) => {
            const delay    = i * 0.038
            const easing   = 'cubic-bezier(.76,0,.24,1)'
            const transition = `transform .46s ${easing} ${delay}s`
            // in  = panels sweep in from left (covering the page)
            // out = panels sweep out to right (revealing new page)
            const origin = phase === 'out' ? 'right' : 'left'
            const scale  = phase === 'out' ? 'scaleX(0)' : 'scaleX(1)'
            const bg       = i % 2 === 0 ? '#07051A' : '#0D0B22'

            return (
              <div
                key={i}
                style={{
                  flex: 1, height: '100%',
                  background: bg,
                  transform: scale,
                  transition,
                  transformOrigin: origin,
                }}
              />
            )
          })}
        </div>
      )}

      <div key={pageKey} className="pg-in">
        {children}
      </div>
    </>
  )
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, background: 'var(--void)' }}>
      <div style={{ fontFamily: 'var(--ff-display)', fontSize: 120, fontWeight: 900, color: 'rgba(255,92,26,0.05)', lineHeight: 1 }}>404</div>
      <div style={{ fontFamily: 'var(--ff-display)', fontSize: 28, color: 'var(--cream)', marginTop: -40 }}>Page not found</div>
      <p style={{ color: 'var(--dim)', fontSize: 14 }}>But the shawarma is right here.</p>
      <a href="/heritage-shawarma/" className="btn btn-primary">Back to Home</a>
    </div>
  )
}

function AppInner() {
  const { state } = useStore()
  const location  = useLocation()

  const showAnnouncement = state.announceOn && !!state.announce
  const isAdminPage = location.pathname === '/admin'
  const isQRPage    = location.pathname === '/qr'
  const hideChrome  = isAdminPage || isQRPage

  return (
    <LayoutProvider announceOn={showAnnouncement}>
      <Cursor />
      <ScrollRing />

      {/* film grain overlay */}
      <div className="noise" aria-hidden />

      <ScrollProgress />

      {!hideChrome && <AnnouncementBar />}
      {!hideChrome && <Nav />}

      <CartSidebar />
      {!hideChrome && <HAI />}

      <SmoothScroll>
        <main>
          <PageTransition>
            <Routes>
              <Route path="/"         element={<Home />}     />
              <Route path="/menu"     element={<Menu />}     />
              <Route path="/about"    element={<About />}    />
              <Route path="/catering" element={<Catering />} />
              <Route path="/contact"  element={<Contact />}  />
              <Route path="/loyalty"  element={<Loyalty />}  />
              <Route path="/receipt"  element={<Receipt />}  />
              <Route path="/games"    element={<Games />}    />
              <Route path="/qr"       element={<QRMenu />}   />
              <Route path="/deploy"   element={<Deploy />}   />
              <Route path="/admin"    element={<Admin />}    />
              <Route path="*"         element={<NotFound />} />
            </Routes>
          </PageTransition>
        </main>

        {!hideChrome && <Footer />}
      </SmoothScroll>

      {!hideChrome && <StickyBar />}
      {!hideChrome && <MobileNav />}
    </LayoutProvider>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  )
}

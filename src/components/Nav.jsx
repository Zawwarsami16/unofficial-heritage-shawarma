// nav + announcement bar + footer + mobile nav
// kept everything in one file since they share the same store state

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../context/Store.jsx'
import { useLayout } from '../hooks/layout.jsx'

const LINKS = [
  { to:'/',         l:'Home'     },
  { to:'/menu',     l:'Menu'     },
  { to:'/about',    l:'Story'    },
  { to:'/catering', l:'Catering' },
  { to:'/contact',  l:'Contact'  },
  { to:'/loyalty',  l:'Loyalty'  },
  { to:'/games',    l:'Games'    },
]

export function Nav() {
  const { state, dispatch } = useStore()
  const { annH }            = useLayout()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [loc.pathname])

  const cnt = state.cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      {}
      <nav
        className={`nav${scrolled ? ' scrolled' : ''}`}
        style={{
          top: annH, // KEY FIX: nav top = announcement height (0 if hidden)
          transition: 'background .5s, border-color .5s, backdrop-filter .5s, top .3s',
        }}
      >
        {/* Brand */}
        <Link to="/" className="nav-logo">
          <img src="/unofficial-heritage-shawarma/logo.png" alt="Heritage Shawarma" className="nav-logo-img" />
        </Link>

        {/* Center links */}
        <div className="nav-links">
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-a${loc.pathname === l.to ? ' on' : ''}`}
            >
              {l.l}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="nav-right">
          <button
            className="nav-cart"
            onClick={() => dispatch({ type:'CART_OPEN', open:true })}
            aria-label={`Cart, ${cnt} items`}
          >
            🛒{cnt > 0 && <span className="nav-badge">{cnt}</span>}
          </button>
          <Link to="/admin" className="nav-cta">Admin</Link>
          <button
            className={`nav-ham${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {}
      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {LINKS.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nd-a${loc.pathname === l.to ? ' on' : ''}`}
          >
            {l.l}
          </Link>
        ))}
        <div style={{ marginTop:36, display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => { dispatch({ type:'CART_OPEN', open:true }); setOpen(false) }}
          >
            🛒 Cart{cnt > 0 ? ` (${cnt})` : ''}
          </button>
          <a href="tel:2899800149" className="btn btn-outline btn-sm">(289) 980-0149</a>
        </div>
      </div>
    </>
  )
}

export function AnnouncementBar() {
  const { state, dispatch } = useStore()
  if (!state.announceOn || !state.announce) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 600, // higher than nav (500)
      height: 36,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 44px',
      background: 'linear-gradient(90deg,var(--fire),var(--ember),var(--gold2),var(--fire))',
      backgroundSize: '300%',
      animation: 'mShift 7s linear infinite',
    }}>
      <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3.5px', textTransform:'uppercase', color:'var(--void)' }}>
        ✦ {state.announce} ✦
      </span>
      <button
        onClick={() => dispatch({ type:'TOGGLE_ANNOUNCE' })}
        style={{ position:'absolute', right:14, background:'none', border:'none', cursor:'pointer', color:'rgba(0,0,0,.55)', fontSize:20, lineHeight:1, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center' }}
        aria-label="Dismiss"
      >×</button>
    </div>
  )
}

export function StickyBar() {
  const { state, dispatch } = useStore()
  const cnt = state.cart.reduce((s, i) => s + i.qty, 0)
  return (
    <div className="sticky">
      <div className="sb-status">
        <div className="sb-pulse" />
        {state.storeOpen ? 'Open Now' : 'Closed'}
      </div>
      <img src="/unofficial-heritage-shawarma/logo.png" alt="Heritage Shawarma" style={{ height:28, filter:'brightness(0) invert(1)' }} />
      <div style={{ display:'flex', gap:8 }}>
        <button className="btn btn-outline btn-sm" onClick={() => window.location.href = 'tel:2899800149'}>☎ Call</button>
        <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type:'CART_OPEN', open:true })}>
          Order{cnt > 0 ? ` (${cnt})` : ''} →
        </button>
      </div>
    </div>
  )
}

export function MobileNav() {
  const { state, dispatch } = useStore()
  const loc = useLocation()
  const cnt = state.cart.reduce((s, i) => s + i.qty, 0)
  const items = [
    { to:'/',        icon:'🏠', l:'Home'    },
    { to:'/menu',    icon:'🫔', l:'Menu'    },
    { to:'/loyalty', icon:'🔥', l:'Points'  },
    { to:'/contact', icon:'📍', l:'Find Us' },
  ]
  return (
    <div className="mob-nav">
      <div className="mob-nav-row">
        {items.map(it => (
          <Link key={it.to} to={it.to} className={`mob-lnk${loc.pathname === it.to ? ' on' : ''}`}>
            <span className="mob-icon">{it.icon}</span>
            <span className="mob-lbl">{it.l}</span>
          </Link>
        ))}
        <div className="mob-lnk" style={{ cursor:'pointer' }} onClick={() => dispatch({ type:'CART_OPEN', open:true })}>
          <span className="mob-icon">🛒{cnt > 0 ? ` ${cnt}` : ''}</span>
          <span className="mob-lbl">Cart</span>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src="/unofficial-heritage-shawarma/logo.png" alt="Heritage Shawarma" style={{ height:48, marginBottom:12, filter:'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)' }} />
          <p className="f-desc">Authentic halal Middle Eastern cuisine. Crafted fresh daily. Oshawa & Durham Region since 2015.</p>
          <a href="tel:2899800149" style={{ fontFamily:'var(--ff-display)', fontSize:19, color:'var(--gold2)', letterSpacing:1 }}>(289) 980-0149</a>
        </div>
        <div>
          <div className="f-h">Navigate</div>
          {[['/', 'Home'],['/menu','Menu'],['/about','Our Story'],['/catering','Catering'],['/contact','Contact'],['/loyalty','Loyalty'],['/games','Games'],['/qr','QR Menu'],['/admin','Admin']].map(([to, l]) => (
            <Link key={to} to={to} className="f-lnk">{l}</Link>
          ))}
        </div>
        <div>
          <div className="f-h">Order Online</div>
          {['SkipTheDishes', 'Uber Eats', 'DoorDash', 'Direct Pickup', 'Dine In'].map(l => <span key={l} className="f-lnk">{l}</span>)}
          <div className="f-h" style={{ marginTop:20 }}>Social</div>
          <a href="https://www.facebook.com/p/HeritageShawarma-100071722864553/" target="_blank" rel="noopener noreferrer" className="f-lnk">Facebook</a>
          <span className="f-lnk">Instagram</span>
          <span className="f-lnk">Google Maps</span>
        </div>
        <div>
          <div className="f-h">Visit</div>
          <span className="f-lnk">2620 Simcoe St N, Unit 6</span>
          <span className="f-lnk">Oshawa, ON L1L 0R1</span>
          <span className="f-lnk" style={{ marginTop:12, display:'block' }}>Mon–Thu 11AM–10PM</span>
          <span className="f-lnk">Fri–Sat 11AM–11PM</span>
          <span className="f-lnk">Sunday 12PM–9PM</span>
          <span className="f-lnk" style={{ color:'var(--gold2)', marginTop:12, display:'block' }}>✦ 100% Halal Certified</span>
          <span className="f-lnk" style={{ color:'var(--gold2)' }}>✦ Free Plaza Parking</span>
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <span className="f-copy">© 2025 Heritage Shawarma. All rights reserved. Oshawa, Ontario, Canada.</span>
        <span style={{ fontSize:'9px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--fire)', border:'1px solid var(--line2)', padding:'6px 12px' }}>Halal Certified ✦ Since 2015</span>
      </div>
    </footer>
  )
}

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseFloat(e.target.dataset.delay || '0') * 1000
          setTimeout(() => e.target.classList.add('on'), delay)
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -44px 0px' }
    )
    document.querySelectorAll('.rv,.rl,.rr,.rs').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

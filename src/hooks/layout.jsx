// tracks announcement bar + nav heights so pages dont overlap
// uses css custom properties so everything updates in sync
import { useState, useEffect, createContext, useContext } from 'react'

// ─── LAYOUT CONTEXT ──────────────────────────────────────────────────────────
// Single source of truth for all offset calculations
// Nav is always below announcement bar — no more overlap bugs

const LayoutCtx = createContext({ annH: 0, navH: 64, topOffset: 64 })

export function LayoutProvider({ children, announceOn }) {
  const ANN_H = 36
  const NAV_H = 64

  const annH      = announceOn ? ANN_H : 0
  const navH      = NAV_H
  const topOffset = annH + navH

  // Expose as CSS variables so any component can use without JS
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--ann-h',  `${annH}px`)
    root.style.setProperty('--nav-h',  `${navH}px`)
    root.style.setProperty('--top-off',`${topOffset}px`)
  }, [annH, navH, topOffset])

  return (
    <LayoutCtx.Provider value={{ annH, navH, topOffset }}>
      {children}
    </LayoutCtx.Provider>
  )
}

export const useLayout = () => useContext(LayoutCtx)

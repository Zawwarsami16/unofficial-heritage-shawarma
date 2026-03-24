// visual effects — noise card, glitch text, fire line divider, heat bars
import { useEffect, useRef, useState } from 'react'


export function GlitchText({ text, as: Tag = 'span', className = '', style = {} }) {
  const [glitching, setGlitching] = useState(false)
  const [display, setDisplay]     = useState(text)
  const timerRef = useRef(null)
  const iRef     = useRef(null)

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*'

  const startGlitch = () => {
    setGlitching(true)
    let iter = 0
    clearInterval(iRef.current)
    iRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((ch, idx) => {
          if (ch === ' ') return ' '
          if (idx < iter) return text[idx]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iter += 0.35
      if (iter >= text.length) {
        clearInterval(iRef.current)
        setDisplay(text)
        setGlitching(false)
      }
    }, 30)
  }

  useEffect(() => () => clearInterval(iRef.current), [])

  return (
    <Tag
      className={className}
      style={{ cursor: 'default', ...style }}
      onMouseEnter={startGlitch}
      data-text={text}
    >
      {display}
    </Tag>
  )
}


export function FireLine({ width = '100%', height = 48, color = 'var(--fire)', opacity = 0.6 }) {
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const path = svg.querySelector('path')
    let t = 0, raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.04
      const pts = []
      const n   = 32
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * 100
        const y = 50
          + Math.sin(t + i * 0.7)  * 14
          + Math.sin(t * 1.7 + i * 1.2) * 8
          + Math.sin(t * 0.8 + i * 2.1) * 5
        pts.push(`${x},${y}`)
      }
      path.setAttribute('d', `M ${pts.join(' L ')}`)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width, height, display: 'block', opacity }}
    >
      <path stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"/>
    </svg>
  )
}


export function ScrollRing({ size = 72 }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      if (scrollable > 0) setPct((el.scrollTop / scrollable) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const r = size / 2 - 5
  const circ = 2 * Math.PI * r

  return (
    <div style={{
      position: 'fixed', bottom: 72, left: 28, z: 300,
      width: size, height: size,
      zIndex: 300,
      pointerEvents: 'none',
    }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line2)" strokeWidth="1"/>
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--fire)" strokeWidth="1.5"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.15s linear' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--dim)',
        transform: 'rotate(0deg)',
      }}>
        {Math.round(pct)}
      </div>
    </div>
  )
}


export function HeatBars({ count = 12, color = 'var(--fire)', height = 40 }) {
  const bars = Array.from({ length: count }, (_, i) => ({
    delay: Math.random() * 1.5,
    dur:   0.6 + Math.random() * 0.8,
    max:   0.3 + Math.random() * 0.7,
  }))

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 3,
      height, width: count * 9,
    }}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            width: 5,
            background: `linear-gradient(to top, ${color}, var(--gold2))`,
            borderRadius: 2,
            animation: `hBar ${b.dur}s ${b.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes hBar {
          from { height: 20%; opacity: 0.4; }
          to   { height: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}


export function NoiseCard({ children, style = {}, glowColor = 'rgba(255,92,26,0.12)', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = e => {
      const rc = el.getBoundingClientRect()
      el.style.setProperty('--gx', ((e.clientX - rc.left) / rc.width  * 100).toFixed(1) + '%')
      el.style.setProperty('--gy', ((e.clientY - rc.top)  / rc.height * 100).toFixed(1) + '%')
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className={`spotlight-card${className ? ' ' + className : ''}`}
      style={{ '--gx': '50%', '--gy': '50%', ...style }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const raf     = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Trail particles
    const TRAIL = 12
    const particles = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement('div')
      const sz = 2 + (TRAIL - i) * 0.2
      el.style.cssText = [
        'position:fixed', 'border-radius:50%', 'pointer-events:none',
        `z-index:9995`, `width:${sz}px`, `height:${sz}px`,
        `background:rgba(255,92,26,${0.18 - i * 0.012})`,
        'transform:translate(-50%,-50%)', 'opacity:0', 'transition:opacity .2s',
      ].join(';')
      document.body.appendChild(el)
      return { el, x: -200, y: -200 }
    })

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
      particles.forEach(p => p.el.style.opacity = '1')
    }
    const onOut = () => {
      dot.style.opacity = ring.style.opacity = '0'
      particles.forEach(p => p.el.style.opacity = '0')
    }

    // Hover expand on interactive elements
    const onEnterEl = e => {
      if (!e.target || typeof e.target.closest !== 'function') return
      if (!e.target.closest('a,button,[role=button]')) return
      ring.style.transform   = 'translate(-50%,-50%) scale(2.4)'
      ring.style.borderColor = 'rgba(255,92,26,0.5)'
      ring.style.background  = 'rgba(255,92,26,0.06)'
      dot.style.opacity      = '0.3'
    }
    const onLeaveEl = e => {
      if (!e.target || typeof e.target.closest !== 'function') return
      if (!e.target.closest('a,button,[role=button]')) return
      ring.style.transform   = 'translate(-50%,-50%) scale(1)'
      ring.style.borderColor = ''
      ring.style.background  = ''
      dot.style.opacity      = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onOut)
    document.addEventListener('mouseenter', onEnterEl, true)
    document.addEventListener('mouseleave', onLeaveEl, true)

    const tick = () => {
      dot.style.left = pos.current.x + 'px'
      dot.style.top  = pos.current.y + 'px'

      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top  = ringPos.current.y + 'px'

      // Shift chain
      for (let i = TRAIL - 1; i > 0; i--) {
        particles[i].x = lerp(particles[i].x, particles[i - 1].x, 0.3)
        particles[i].y = lerp(particles[i].y, particles[i - 1].y, 0.3)
        particles[i].el.style.left = particles[i].x + 'px'
        particles[i].el.style.top  = particles[i].y + 'px'
      }
      particles[0].x = pos.current.x
      particles[0].y = pos.current.y

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onOut)
      document.removeEventListener('mouseenter', onEnterEl, true)
      document.removeEventListener('mouseleave', onLeaveEl, true)
      cancelAnimationFrame(raf.current)
      particles.forEach(p => p.el.remove())
    }
  }, [])

  return (
    <>
      <div ref={ringRef} aria-hidden style={{
        position:'fixed', width:36, height:36,
        border:'1px solid rgba(255,92,26,0.3)',
        borderRadius:'50%', pointerEvents:'none',
        zIndex:9997, transform:'translate(-50%,-50%)',
        transition:'transform .38s cubic-bezier(.34,1.56,.64,1), border-color .3s, background .3s, opacity .22s',
        opacity:0,
      }}/>
      <div ref={dotRef} aria-hidden style={{
        position:'fixed', width:5, height:5,
        background:'var(--fire)', borderRadius:'50%',
        pointerEvents:'none', zIndex:9998,
        transform:'translate(-50%,-50%)',
        boxShadow:'0 0 10px 2px rgba(255,92,26,0.5)',
        opacity:0, transition:'opacity .2s',
      }}/>
    </>
  )
}

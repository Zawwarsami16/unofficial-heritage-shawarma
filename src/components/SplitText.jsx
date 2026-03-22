// splits text into chars/words for stagger animations
// magnetic button effect is here too
import { useEffect, useRef } from 'react'


export function SplitText({ text, className = '', style = {}, as: Tag = 'div', delay = 0, stagger = 0.022 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split into chars
    const chars = text.split('')
    el.innerHTML = chars.map((ch, i) =>
      ch === ' '
        ? `<span style="display:inline-block;width:.28em"> </span>`
        : `<span class="sc" style="display:inline-block;opacity:0;transform:translateY(60%) rotateX(-45deg);transition:opacity .55s ${delay + i * stagger}s cubic-bezier(0.16,1,0.3,1),transform .55s ${delay + i * stagger}s cubic-bezier(0.16,1,0.3,1)">${ch}</span>`
    ).join('')

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      el.querySelectorAll('.sc').forEach(span => {
        span.style.opacity = '1'
        span.style.transform = 'translateY(0) rotateX(0)'
      })
    }, { threshold: 0.3 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [text, delay, stagger])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: '600px', perspectiveOrigin: '50% 50%', overflow: 'visible', ...style }}
    >
      {text}
    </Tag>
  )
}


export function SplitWords({ text, className = '', style = {}, as: Tag = 'p', delay = 0, stagger = 0.06 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = text.split(' ')
    el.innerHTML = words.map((w, i) =>
      `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:.25em"><span class="sw" style="display:inline-block;opacity:0;transform:translateY(110%);transition:opacity .65s ${delay + i * stagger}s cubic-bezier(0.16,1,0.3,1),transform .65s ${delay + i * stagger}s cubic-bezier(0.16,1,0.3,1)">${w}</span></span>`
    ).join(' ')

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      el.querySelectorAll('.sw').forEach(span => {
        span.style.opacity = '1'
        span.style.transform = 'translateY(0)'
      })
    }, { threshold: 0.2 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [text, delay, stagger])

  return (
    <Tag ref={ref} className={className} style={style}>{text}</Tag>
  )
}


export function LineReveal({ children, delay = 0, style = {}, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const inner = el.querySelector('.lr-inner')
    if (!inner) return

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      inner.style.transform = 'translateY(0)'
      inner.style.opacity   = '1'
    }, { threshold: 0.1 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }} className={className}>
      <div
        className="lr-inner"
        style={{
          transform: 'translateY(105%)',
          opacity: 0,
          transition: `transform .75s ${delay}s cubic-bezier(0.16,1,0.3,1), opacity .75s ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}


export function Magnetic({ children, strength = 0.35, radius = 100, className = '', style = {} }) {
  const ref    = useRef(null)
  const inner  = useRef(null)
  const active = useRef(false)

  useEffect(() => {
    const el = ref.current
    const inn = inner.current
    if (!el || !inn) return

    let raf, tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = e => {
      const rc = el.getBoundingClientRect()
      const mx = e.clientX - (rc.left + rc.width  / 2)
      const my = e.clientY - (rc.top  + rc.height / 2)
      const dist = Math.sqrt(mx*mx + my*my)

      if (dist < radius) {
        active.current = true
        tx = mx * strength
        ty = my * strength
      } else if (active.current) {
        active.current = false
        tx = 0; ty = 0
      }
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      cx += (tx - cx) * 0.14
      cy += (ty - cy) * 0.14
      inn.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`
    }

    window.addEventListener('mousemove', onMove)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [strength, radius])

  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex', ...style }}>
      <div ref={inner} style={{ transition: 'transform .1s' }}>
        {children}
      </div>
    </div>
  )
}

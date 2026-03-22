// wraps lenis smooth scroll + gsap scrolltrigger
// reveal animations use IntersectionObserver so they work without gsap too
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


let lenisInstance = null
export const getLenis = () => lenisInstance

export default function SmoothScroll({ children }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration:      1.22,
      easing:        t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      direction:     'vertical',
      gestureDirection: 'vertical',
      smooth:        true,
      smoothTouch:   false, // disable on touch for native feel
      touchMultiplier: 2,
    })
    lenisInstance = lenis

    // Hook Lenis into GSAP ticker
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisInstance = null
      gsap.ticker.remove(time => lenis.raf(time * 1000))
    }
  }, [])

  return <div ref={wrapRef}>{children}</div>
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


export function useParallax(selector, speed = 0.3) {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    if (!els.length) return
    const triggers = []
    els.forEach(el => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          const y = (self.progress - 0.5) * speed * 200
          el.style.transform = `translateY(${y.toFixed(2)}px)`
        },
      })
      triggers.push(t)
    })
    return () => triggers.forEach(t => t.kill())
  }, [selector, speed])
}


export function AnimCounter({ target, suffix = '', className = '' }) {
  const ref = useRef(null)
  const ran = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || ran.current) return
      ran.current = true
      obs.disconnect()
      const t0 = performance.now(), dur = 1800
      const tick = now => {
        const pct = Math.min((now - t0) / dur, 1)
        const ease = 1 - Math.pow(1 - pct, 3)
        el.textContent = Math.round(target * ease).toLocaleString() + suffix
        if (pct < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix])

  return <span ref={ref} className={className}>0{suffix}</span>
}


import { useState } from 'react'
export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="spb" style={{ width: `${pct}%` }} />
}

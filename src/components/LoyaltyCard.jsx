// physical credit card style loyalty card with 3d tilt
import { useRef, useEffect } from 'react'
import { LOYALTY_TIERS } from '../data/data.js'

const TIER_GRADIENTS = [
  'linear-gradient(135deg, #2A1A0E 0%, #1A0E08 50%, #3A1A0A 100%)',
  'linear-gradient(135deg, #2A1208 0%, #1A0A04 50%, #3A1A04 100%)',
  'linear-gradient(135deg, #2A1E08 0%, #1A1204 50%, #3A280A 100%)',
  'linear-gradient(135deg, #1E1208 0%, #0E0A04 50%, #2E1E04 100%)',
]
const TIER_ACCENT = ['#C8621A', '#D4962A', '#E8C040', '#FFD060']
const TIER_GLOW   = ['rgba(200,98,26,0.3)', 'rgba(212,150,42,0.3)', 'rgba(232,192,64,0.3)', 'rgba(255,208,96,0.35)']

export default function LoyaltyCard({ loyaltyTier, pts, orders, name = 'Heritage Member' }) {
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const tier = LOYALTY_TIERS[loyaltyTier]

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const rc  = card.getBoundingClientRect()
      const x   = (e.clientX - rc.left) / rc.width
      const y   = (e.clientY - rc.top)  / rc.height
      const rx  = (y - 0.5) * -18
      const ry  = (x - 0.5) *  20

      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`
      card.style.boxShadow = `
        ${ry * -1.5}px ${rx * 1.5 + 20}px 60px rgba(0,0,0,0.65),
        0 0 40px ${TIER_GLOW[loyaltyTier]}
      `

      // Holographic shine follows mouse
      if (shineRef.current) {
        shineRef.current.style.background = `
          radial-gradient(
            circle at ${x*100}% ${y*100}%,
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0.04) 30%,
            transparent 70%
          )
        `
      }
    }

    const onLeave = () => {
      card.style.transform = ''
      card.style.boxShadow = ''
      if (shineRef.current) shineRef.current.style.background = ''
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [loyaltyTier])

  const accent = TIER_ACCENT[loyaltyTier]
  const cardNum = `****  ****  ****  ${(pts % 9000 + 1000)}`

  return (
    <div
      ref={cardRef}
      className="loyalty-card"
      style={{
        background: TIER_GRADIENTS[loyaltyTier],
        transition: 'transform .15s ease-out, box-shadow .15s',
        boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${TIER_GLOW[loyaltyTier]}`,
      }}
    >
      {/* Background pattern */}
      <div className="lc-pattern"/>

      {/* Animated shine */}
      <div ref={shineRef} style={{ position:'absolute', inset:0, transition:'background .1s', borderRadius:14, pointerEvents:'none', zIndex:2 }}/>

      {/* Decorative large circle */}
      <div style={{ position:'absolute', right:-60, top:-60, width:240, height:240, borderRadius:'50%', border:`1px solid ${accent}22`, zIndex:0 }}/>
      <div style={{ position:'absolute', right:-20, top:0, width:160, height:160, borderRadius:'50%', border:`1px solid ${accent}18`, zIndex:0 }}/>

      {/* Card content */}
      <div className="lc-content">
        {/* Top row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:15, fontWeight:700, color:accent, letterSpacing:0.5 }}>
              Heritage Shawarma
            </div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', letterSpacing:'2.5px', textTransform:'uppercase', marginTop:1 }}>
              Flame Loyalty · Oshawa, Ontario
            </div>
          </div>
          <div style={{ fontSize:22 }}>{tier.badge}</div>
        </div>

        {/* Chip */}
        <div className="lc-chip" style={{ marginTop:8, marginLeft:4 }}>
          <div style={{ position:'absolute', inset:6, border:`1px solid ${accent}55`, borderRadius:2 }}/>
          {/* Chip lines */}
          {[0.3,0.5,0.7].map(v => (
            <div key={v} style={{ position:'absolute', left:'20%', right:'20%', top:`${v*100}%`, height:1, background:`${accent}44` }}/>
          ))}
        </div>

        {/* Card number */}
        <div style={{ fontFamily:'var(--ff-mono)', fontSize:13, letterSpacing:4, color:'rgba(255,255,255,0.55)', marginTop:12 }}>
          {cardNum}
        </div>

        {/* Bottom row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.3)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:3 }}>Card Holder</div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.85)', letterSpacing:1 }}>
              {name.toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.3)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:3 }}>
              Tier · Points
            </div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:14, fontWeight:700, color:accent, letterSpacing:0.5 }}>
              {tier.name} · {pts.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Holographic strip */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${accent}, var(--gold2), ${accent}, transparent)`,
        backgroundSize:'200% 100%',
        animation:'shimHolo 3s linear infinite',
        borderRadius:'0 0 14px 14px',
      }}/>

      <style>{`@keyframes shimHolo { 0% { background-position:0% 0; } 100% { background-position:200% 0; } }`}</style>
    </div>
  )
}

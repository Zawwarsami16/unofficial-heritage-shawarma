// Home page — Heritage Shawarma
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroGL from '../components/HeroGL.jsx'
import { useStore } from '../context/Store.jsx'
import { useLayout } from '../hooks/layout.jsx'
import { useReveal, AnimCounter } from '../components/SmoothScroll.jsx'
import { SplitWords, Magnetic } from '../components/SplitText.jsx'
import { GlitchText, FireLine, HeatBars, NoiseCard } from '../components/Effects.jsx'
import { STATS, REVIEWS, OFFERS, AWARDS, PLATFORMS, LOYALTY_TIERS } from '../data/data.js'

// Food images from Unsplash — real shawarma photography
const FOOD_IMGS = {
  chicken: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80&auto=format&fit=crop',
  beef:    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop',
  mixed:   'https://images.unsplash.com/photo-1640273374798-5a0bbc50e1d5?w=800&q=80&auto=format&fit=crop',
  plate:   'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?w=800&q=80&auto=format&fit=crop',
  sides:   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop',
}

// 3D tilt on hover — only transform, no layout shifts
const applyTilt = (e, el) => {
  const r = el.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width  - 0.5) * 18
  const y = ((e.clientY - r.top)  / r.height - 0.5) * -18
  el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.02)`
  el.style.boxShadow = `${-x * .6}px ${Math.abs(y * .5) + 16}px 60px rgba(0,0,0,.6)`
}
const resetTilt = el => { el.style.transform = ''; el.style.boxShadow = '' }

function FAQRow({ q, a, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{ borderBottom: '1px solid var(--line2)', cursor: 'pointer', padding: '22px 0', transition: 'border-color .3s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,92,26,.25)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = ''}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--fire)', letterSpacing: '2px', flexShrink: 0 }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 700, color: 'var(--t1)', lineHeight: 1.3 }}>{q}</span>
        </div>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: open ? 'var(--fire)' : 'var(--t3)', flexShrink: 0,
          transition: 'all .3s var(--e2)', transform: open ? 'rotate(45deg)' : '',
          background: open ? 'rgba(255,92,26,.08)' : '',
        }}>+</span>
      </div>
      <div style={{ overflow: 'hidden', maxHeight: open ? 200 : 0, transition: 'max-height .42s var(--e1)', paddingLeft: 52 }}>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--t2)', lineHeight: 1.85, paddingTop: 12, paddingBottom: 4 }}>{a}</p>
      </div>
    </div>
  )
}

function ReviewCard({ r, i }) {
  return (
    <div className="review-card rv" data-delay={i * .07}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg,var(--fire),var(--gold2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700, color: 'var(--void)',
        }}>{r.initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 15, fontWeight: 700 }}>{r.name}</div>
          <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>{r.date} · {r.platform}</div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--gold2)', fontSize: 12, letterSpacing: 2 }}>{'★'.repeat(r.stars)}</div>
      </div>
      <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--t2)', lineHeight: 1.85, fontStyle: 'italic', paddingLeft: 18, position: 'relative' }}>
        <span style={{ position: 'absolute', left: -2, top: -4, fontFamily: 'var(--ff-display)', fontSize: 48, color: 'rgba(255,92,26,.1)', lineHeight: 1 }}>"</span>
        {r.text}
      </p>
    </div>
  )
}

export default function Home() {
  const { state, dispatch, toast } = useStore()
  const { topOffset } = useLayout()
  useReveal()

  const featured = state.menu.filter(i => i.featured && i.available).slice(0, 3)
  const featImgs = [FOOD_IMGS.chicken, FOOD_IMGS.mixed, FOOD_IMGS.plate]
  const tagLabels = ['Most Popular', 'Heritage Special', 'Fan Favourite']

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" style={{ paddingTop: topOffset }}>
        <HeroGL />
        <div className="hero-grad" />

        <div className="hero-content">
          <div className="hero-eyebrow h-a0">
            <span style={{ color: 'var(--fire)' }}>●</span>
            &nbsp;100% Halal &nbsp;·&nbsp; Oshawa, Ontario &nbsp;·&nbsp; Since 2015
          </div>

          <h1 className="hero-h1">
            <div className="h-a1" style={{ fontWeight: 200, fontSize: '.7em', letterSpacing: '-1px', color: 'var(--t3)' }}>
              Where Ancient
            </div>
            <div className="h-a2" style={{ lineHeight: .88, letterSpacing: '-4px' }}>
              <em style={{ fontStyle: 'italic', fontWeight: 900 }}>Recipes</em>
            </div>
            <div className="h-a3" style={{ fontSize: '.77em', letterSpacing: '-2px' }}>
              <span className="stroke">Meet Fire</span>
            </div>
          </h1>

          <p className="hero-sub h-a4">Carved fresh. Every single day.</p>

          <div className="hero-btns h-a5">
            <Magnetic strength={0.32} radius={85}>
              <Link to="/menu" className="btn btn-primary">Explore Menu →</Link>
            </Magnetic>
            <Magnetic strength={0.26} radius={80}>
              <button className="btn btn-outline" onClick={() => dispatch({ type: 'CART_OPEN', open: true })}>
                Order Now
              </button>
            </Magnetic>
            <Magnetic strength={0.22} radius={70}>
              <a className="btn btn-ghost-fire" href="tel:2899800149">☎ (289) 980-0149</a>
            </Magnetic>
          </div>

          <div className="hero-stats h-a6">
            {STATS.map(s => (
              <div key={s.l}>
                <div className="hs-val"><AnimCounter target={s.v} suffix={s.s} /></div>
                <div className="hs-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 20, right: 48, zIndex: 2, opacity: .4 }}>
          <HeatBars count={16} height={40} />
        </div>

        <div className="hero-scroll">
          <span className="hs-scroll-txt">Scroll</span>
          <div className="hs-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" aria-hidden>
        <div className="mq-track">
          {[
            '100% Halal','Fresh Daily','Heritage Recipes',"Oshawa's Finest",
            'Flame Loyalty','Catering Available','11 Spices','Family Owned',
            'Open 7 Days','Free Parking','Dine In · Takeout · Delivery',
            '100% Halal','Fresh Daily','Heritage Recipes',"Oshawa's Finest",
            'Flame Loyalty','Catering Available','11 Spices','Family Owned',
            'Open 7 Days','Free Parking','Dine In · Takeout · Delivery',
          ].map((t, i) => (
            <div className="mq-item" key={i}>{t}<span className="mq-dot" /></div>
          ))}
        </div>
      </div>

      {/* ── FEATURED DISHES ── */}
      <div style={{ background: 'var(--deep)', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle FIRE watermark */}
        <div aria-hidden style={{
          position: 'absolute', bottom: -80, left: -20,
          fontFamily: 'var(--ff-display)', fontSize: 500, fontWeight: 900,
          color: 'rgba(255,92,26,.018)', lineHeight: 1, letterSpacing: -24,
          pointerEvents: 'none', userSelect: 'none',
        }}>FIRE</div>

        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', position: 'relative', zIndex: 1 }}>
          <div className="rv" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 64, paddingBottom: 28, borderBottom: '1px solid var(--line2)',
          }}>
            <div>
              <div className="eyebrow">Signature Dishes</div>
              <h2 style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(44px,6vw,88px)',
                fontWeight: 900, lineHeight: .92, letterSpacing: '-3px',
              }}>
                The Heritage<br />
                <em style={{ color: 'var(--gold2)' }}>Experience</em>
              </h2>
            </div>
            <Magnetic strength={0.3} radius={90}>
              <Link to="/menu" style={{
                fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase',
                color: 'var(--gold2)', borderBottom: '1px solid rgba(232,184,48,.3)',
                paddingBottom: 2, transition: 'color .25s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--t1)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >View Full Menu →</Link>
            </Magnetic>
          </div>

          {/* Cards with real food images */}
          <div className="dish-cards" style={{ perspective: 1600 }}>
            {featured.map((d, i) => (
              <article
                key={d.id}
                className="dish-card rv"
                data-delay={i * .13}
                onMouseMove={e => applyTilt(e, e.currentTarget)}
                onMouseLeave={e => resetTilt(e.currentTarget)}
              >
                {/* Food photo */}
                <div className="dish-card-img-wrap">
                  <img
                    className="dish-card-img"
                    src={featImgs[i]}
                    alt={d.name}
                    loading="lazy"
                  />
                </div>

                <div className="dish-card-body">
                  <div className="dc-num">0{i + 1}</div>
                  <span className={`dc-tag ${i === 0 ? 'hot' : 'outline'}`}>{tagLabels[i]}</span>
                  <div className="dc-name">{d.name}</div>
                  <p className="dc-desc">{d.desc}</p>
                  <div className="dc-tags">
                    {(d.tags || []).slice(0, 3).map(t => (
                      <span key={t} className="dc-tag-sm">{t}</span>
                    ))}
                  </div>
                  <div className="dc-foot">
                    <div>
                      <div className="dc-price">${d.price.toFixed(2)}</div>
                      <div className="dc-cal">{d.cal} cal · {d.prepTime}</div>
                    </div>
                    <Magnetic strength={0.28} radius={70}>
                      <button
                        className="dc-add"
                        onClick={() => { dispatch({ type: 'CART_ADD', item: d }); toast(`${d.name} added 🔥`, 'fire') }}
                      >+ Cart</button>
                    </Magnetic>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUR STORY ── */}
      <section className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Logo watermark */}
        <img aria-hidden src="/unofficial-heritage-shawarma/logo.png" alt="" style={{
          position: 'absolute', right: -80, top: '50%',
          transform: 'translateY(-50%)',
          width: 560, opacity: .035,
          pointerEvents: 'none', userSelect: 'none',
          filter: 'brightness(10)',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div className="rl">
            <div className="eyebrow">Our Story</div>
            <h2 className="sec-h" style={{ marginBottom: 28 }}>
              Rooted in<br /><em>tradition,</em><br />
              <span className="stroke">built for you</span>
            </h2>
            <SplitWords
              text="Heritage Shawarma was born from a single belief — great food should carry a story. Every spice blend, a chapter from a tradition spanning generations."
              style={{ fontSize: 15, fontWeight: 300, color: 'var(--t2)', lineHeight: 2, marginBottom: 16 }}
            />
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--t3)', lineHeight: 1.95, marginBottom: 36 }}>
              We bring authentic Middle Eastern flavours to Oshawa. Halal certified, made fresh daily, with the care that only comes from truly loving what you cook.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Magnetic strength={0.3} radius={80}><Link to="/about" className="btn btn-primary">Our Story →</Link></Magnetic>
              <Magnetic strength={0.22} radius={70}><Link to="/catering" className="btn btn-outline">Catering</Link></Magnetic>
            </div>
          </div>

          <div className="rr">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {STATS.map((s, i) => (
                <NoiseCard key={s.l} style={{ padding: '32px 24px' }}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 52, fontWeight: 900, color: 'var(--gold2)', lineHeight: 1, letterSpacing: -2, marginBottom: 8 }}>
                    <AnimCounter target={s.v} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--t3)' }}>{s.l}</div>
                </NoiseCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FireLine opacity={0.28} />

      {/* ── SPECIAL OFFERS ── */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--line2)', padding: '110px 0' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)' }}>
          <div className="rv" style={{ marginBottom: 64 }}>
            <div className="eyebrow">Today's Deals</div>
            <h2 className="sec-h">Special<br /><em>Offers</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {OFFERS.map((o, i) => {
              const pct = Math.round((o.orig - o.price) / o.orig * 100)
              return (
                <NoiseCard
                  key={o.id} className="rv" data-delay={i * .1}
                  style={{ padding: '44px 36px', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.grad }} />
                  <div style={{ position: 'absolute', top: 20, right: 20, background: o.grad, color: 'var(--void)', fontSize: 9, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 12px' }}>
                    SAVE {pct}%
                  </div>
                  <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '4px 12px', border: '1px solid rgba(232,184,48,.3)', color: 'var(--gold2)', marginBottom: 18 }}>
                    {o.badge}
                  </div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 26, fontWeight: 700, color: 'var(--t1)', marginBottom: 12 }}>{o.title}</div>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--t2)', marginBottom: 24, lineHeight: 1.7 }}>{o.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--ff-display)', fontSize: 44, fontWeight: 900, color: 'var(--gold2)', letterSpacing: -2 }}>${o.price}</span>
                    <span style={{ fontSize: 16, color: 'var(--t3)', textDecoration: 'line-through' }}>${o.orig.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 28, fontStyle: 'italic' }}>⏰ {o.valid}</div>
                  <Link to="/menu" className="btn btn-primary btn-sm">Order This Deal →</Link>
                </NoiseCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ background: 'var(--void)', borderTop: '1px solid var(--line2)', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontFamily: 'var(--ff-display)', fontSize: 520, fontWeight: 900,
          color: 'rgba(255,92,26,.012)', lineHeight: 1,
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: -26,
        }}>LOVE</div>

        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', position: 'relative', zIndex: 1 }}>
          <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <div className="eyebrow">Google Reviews</div>
              <h2 className="sec-h">What People<br /><em>Are Saying</em></h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 72, fontWeight: 900, color: 'var(--gold2)', lineHeight: 1, letterSpacing: -4 }}>4.5</div>
              <div style={{ color: 'var(--gold2)', fontSize: 20, letterSpacing: 3, marginTop: 2 }}>★★★★½</div>
              <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 5 }}>127 verified reviews</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 2 }}>
            {REVIEWS.slice(0, 3).map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {REVIEWS.slice(3, 6).map((r, i) => <ReviewCard key={r.name} r={r} i={i + 3} />)}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line2)', padding: '72px 0' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
          {AWARDS.map((a, i) => (
            <div key={a.title} className="award-card rv" data-delay={i * .1}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{a.icon}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 700, marginBottom: 7 }}>{a.title}</div>
              <div style={{ fontSize: 10, color: 'var(--fire)', letterSpacing: '2px', marginBottom: 4 }}>{a.org}</div>
              <div style={{ fontSize: 10, color: 'var(--t3)' }}>{a.year}</div>
            </div>
          ))}
        </div>
      </section>

      <FireLine color="var(--gold2)" opacity={0.2} />

      {/* ── WHY HERITAGE ── */}
      <div style={{ padding: '110px 0', position: 'relative', overflow: 'hidden', background: 'var(--void)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(60deg,rgba(255,92,26,.015) 0,rgba(255,92,26,.015) .5px,transparent .5px,transparent 44px),repeating-linear-gradient(-60deg,rgba(255,92,26,.015) 0,rgba(255,92,26,.015) .5px,transparent .5px,transparent 44px)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', position: 'relative', zIndex: 1 }}>
          <div className="rv" style={{ marginBottom: 64 }}>
            <div className="eyebrow">Why Heritage</div>
            <h2 className="sec-h">More than<br /><em>a meal</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {[
              { n: '01', t: 'Halal Always',  d: 'Every protein, every sauce, every ingredient — certified halal. Non-negotiable from day one.' },
              { n: '02', t: 'Fresh Daily',   d: 'Marinated overnight. Carved fresh every morning. Nothing pre-cut, nothing reheated.' },
              { n: '03', t: 'Real Recipes',  d: 'Three generations of family spice knowledge. Not a corporate formula — a real tradition.' },
              { n: '04', t: 'Community',     d: "Not a chain. Your neighbourhood restaurant. We know our regulars by name." },
            ].map((w, i) => (
              <NoiseCard key={w.n} className="rv" data-delay={i * .1} style={{ padding: '44px 30px' }}>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: 110, fontWeight: 900, color: 'rgba(255,92,26,.04)', lineHeight: 1, marginBottom: 20, letterSpacing: -5 }}>
                  {w.n}
                </div>
                <GlitchText
                  text={w.t} as="h3"
                  style={{ fontFamily: 'var(--ff-display)', fontSize: 21, fontWeight: 700, marginBottom: 14, display: 'block' }}
                />
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--t3)', lineHeight: 1.95 }}>{w.d}</p>
              </NoiseCard>
            ))}
          </div>
        </div>
      </div>

      {/* ── ORDER PLATFORMS ── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line2)', padding: '80px 0' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', textAlign: 'center' }}>
          <div className="rv" style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Order Online</div>
            <h2 className="sec-h" style={{ textAlign: 'center' }}>Order Your Way<br /><em>Anywhere</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, maxWidth: 860, margin: '0 auto 24px' }}>
            {PLATFORMS.map((p, i) => (
              <NoiseCard key={p.name} className="rv" data-delay={i * .1} style={{ padding: '36px 24px', textAlign: 'center' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ fontSize: 42, marginBottom: 14 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{p.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold2)', borderBottom: '1px solid rgba(232,184,48,.25)', paddingBottom: 2, display: 'inline-block', marginTop: 10 }}>
                    Order Now →
                  </div>
                </a>
              </NoiseCard>
            ))}
          </div>
          <p className="rv" style={{ fontSize: 13, color: 'var(--t3)', fontStyle: 'italic' }}>
            Or order directly here — no platform fees, full Flame Loyalty points earned.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--line2)', padding: '100px 0' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--px)', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 100, alignItems: 'start' }}>
          <div className="rl" style={{ position: 'sticky', top: 'calc(var(--top-off) + 24px)' }}>
            <div className="eyebrow">Common Questions</div>
            <h2 className="sec-h" style={{ marginBottom: 24 }}>Quick<br /><em>Answers</em></h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--t2)', lineHeight: 1.95, marginBottom: 28 }}>
              Everything about Heritage Shawarma — halal, hours, loyalty, catering.
            </p>
            <Link to="/contact" className="btn btn-outline btn-sm">More Questions →</Link>
          </div>
          <div className="rr">
            {[
              { q: 'Is all your food halal certified?',        a: '100% halal — every protein, sauce, ingredient. Certified and non-negotiable from day one.' },
              { q: "What are Heritage's opening hours?",       a: 'Monday–Thursday 11AM–10PM, Friday–Saturday 11AM–11PM, Sunday 12PM–9PM.' },
              { q: 'Do you offer delivery?',                   a: 'Yes — via SkipTheDishes, Uber Eats, and DoorDash. Or order directly here for pickup with full Loyalty Points.' },
              { q: 'How does the Flame Loyalty program work?', a: 'Earn 10 Flame Points per dollar spent. Four tiers: 5% off up to 15% off + free birthday meal.' },
              { q: 'Do you cater events?',                     a: 'Absolutely. Corporate lunches, weddings, private events. Packages start at $299 for 15–25 guests.' },
            ].map((f, i) => <FAQRow key={i} {...f} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg,var(--fire),var(--gold2),var(--fire))',
        backgroundSize: '200%', animation: 'mShift 6s linear infinite',
        padding: '92px var(--px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(28px,4vw,64px)', fontWeight: 900, color: 'var(--void)', letterSpacing: -3, lineHeight: 1, marginBottom: 12 }}>
            Ready to taste<br /><em>real heritage?</em>
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(0,0,0,.48)', maxWidth: 380 }}>
            Dine in, takeout, or delivery — Heritage is always fresh, always halal, always worth it.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Magnetic strength={0.35} radius={90}>
            <button className="btn btn-dark" onClick={() => dispatch({ type: 'CART_OPEN', open: true })}>Order Online →</button>
          </Magnetic>
          <Magnetic strength={0.28} radius={80}>
            <a href="tel:2899800149" className="btn btn-dark">☎ Call Now</a>
          </Magnetic>
          <Magnetic strength={0.25} radius={80}>
            <Link to="/catering" className="btn btn-dark">Catering →</Link>
          </Magnetic>
        </div>
      </div>
    </>
  )
}

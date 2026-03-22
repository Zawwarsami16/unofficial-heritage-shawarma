// home page
// TODO: swap placeholder stats with real numbers from the client
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroGL from '../components/HeroGL.jsx'
import { useStore } from '../context/Store.jsx'
import { useLayout } from '../hooks/layout.jsx'
import { useReveal, AnimCounter } from '../components/SmoothScroll.jsx'
import { SplitText, SplitWords, Magnetic } from '../components/SplitText.jsx'
import { GlitchText, FireLine, HeatBars, NoiseCard, ScrollRing } from '../components/Effects.jsx'
import { STATS, REVIEWS, OFFERS, AWARDS, PLATFORMS, LOYALTY_TIERS } from '../data/data.js'

/* ─── tilt helper ─── */
const tilt = (e, el) => {
  const r  = el.getBoundingClientRect()
  const x  = ((e.clientX - r.left) / r.width  - 0.5) * 22
  const y  = ((e.clientY - r.top)  / r.height - 0.5) * -22
  el.style.transform  = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-10px) scale(1.02)`
  el.style.boxShadow  = `${-x * .7}px ${Math.abs(y * .6) + 18}px 70px rgba(0,0,0,.65), 0 0 0 1px rgba(255,92,26,.2)`
  el.style.borderColor = 'rgba(255,92,26,0.38)'
}
const untilt = el => { el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = '' }

/* ─── FAQ row ─── */
function FAQRow({ q, a, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderBottom: '1px solid var(--line2)', cursor: 'pointer',
        padding: '22px 0',
        transition: 'border-color .3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,92,26,0.28)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = ''}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--fire)', letterSpacing: '2px', flexShrink: 0 }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.3 }}>
            {q}
          </span>
        </div>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: open ? 'var(--fire)' : 'var(--dim)',
          flexShrink: 0, transition: 'all .3s var(--e2)',
          transform: open ? 'rotate(45deg)' : '',
          background: open ? 'rgba(255,92,26,.08)' : '',
        }}>+</span>
      </div>
      <div style={{
        overflow: 'hidden', maxHeight: open ? 200 : 0,
        transition: 'max-height .42s var(--e1)',
        paddingLeft: 52,
      }}>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.85, paddingTop: 12, paddingBottom: 4 }}>{a}</p>
      </div>
    </div>
  )
}

/* ─── Review card ─── */
function ReviewCard({ r, i }) {
  return (
    <NoiseCard className="rv" data-delay={i * .07} style={{ padding: '28px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg,var(--fire),var(--gold2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700, color: 'var(--void)',
        }}>{r.initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 15, fontWeight: 700, color: 'var(--cream)' }}>{r.name}</div>
          <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 2 }}>{r.date} · {r.platform}</div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--gold2)', fontSize: 12, letterSpacing: 2 }}>
          {'★'.repeat(r.stars)}
        </div>
      </div>
      <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.85, fontStyle: 'italic', position: 'relative', paddingLeft: 18 }}>
        <span style={{
          position: 'absolute', left: -2, top: -4,
          fontFamily: 'var(--ff-display)', fontSize: 48,
          color: 'rgba(255,92,26,0.12)', lineHeight: 1,
        }}>"</span>
        {r.text}
      </p>
    </NoiseCard>
  )
}

export default function Home() {
  const { state, dispatch, toast } = useStore()
  const { topOffset } = useLayout()
  useReveal()

  const featured = state.menu.filter(i => i.featured && i.available).slice(0, 3)

  return (
    <>
      {}
      <section className="hero" style={{ paddingTop: topOffset }}>
        <HeroGL />
        <div className="hero-grad" />

        <div className="hero-content">
          {/* Eyebrow */}
          <div className="hero-eyebrow h-a0">
            <span style={{ color: 'var(--fire)' }}>●</span>
            &nbsp;100% Halal &nbsp;·&nbsp; Oshawa, Ontario &nbsp;·&nbsp; Since 2015
          </div>

          {/* Main headline — each word its own line, own color */}
          <h1 className="hero-h1">
            <div className="h-a1" style={{ fontWeight: 300, fontSize: '0.72em', letterSpacing: '-1px', color: 'var(--muted)' }}>
              Where Ancient
            </div>
            <div className="h-a2" style={{ lineHeight: 0.88, letterSpacing: '-4px' }}>
              <em style={{ fontStyle: 'italic', fontWeight: 900 }}>Recipes</em>
            </div>
            <div className="h-a3" style={{ fontSize: '0.78em', letterSpacing: '-2px' }}>
              <span className="stroke">Meet Fire</span>
            </div>
          </h1>

          <p className="hero-sub h-a4">Carved fresh. Every single day.</p>
          <p className="hero-desc h-a4">
            Heritage Shawarma brings you 11-spice marinated proteins, house-made sauces, and warm saj bread —
            a culinary tradition that spans generations, now in your city.
          </p>

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
              <a className="btn btn-ghost-fire" href="tel:2899800149">
                ☎ (289) 980-0149
              </a>
            </Magnetic>
          </div>

          {/* Stats row */}
          <div className="hero-stats h-a6">
            {STATS.map(s => (
              <div key={s.l}>
                <div className="hs-val"><AnimCounter target={s.v} suffix={s.s}/></div>
                <div className="hs-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative heat bars — bottom right */}
        <div style={{ position: 'absolute', bottom: 20, right: 48, zIndex: 2, opacity: 0.45 }}>
          <HeatBars count={16} height={40}/>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll">
          <span className="hs-scroll-txt">Scroll</span>
          <div className="hs-scroll-line" />
        </div>
      </section>

      {}
      <div className="marquee" aria-hidden>
        <div className="mq-track">
          {['100% Halal', 'Fresh Daily', 'Heritage Recipes', "Oshawa's Finest",
             'Flame Loyalty', 'Catering Available', '11 Spices', 'Family Owned',
             'Open 7 Days', 'Free Parking', 'Dine In · Takeout · Delivery',
             '100% Halal', 'Fresh Daily', 'Heritage Recipes', "Oshawa's Finest",
             'Flame Loyalty', 'Catering Available', '11 Spices', 'Family Owned',
             'Open 7 Days', 'Free Parking', 'Dine In · Takeout · Delivery'].map((t, i) => (
            <div className="mq-item" key={i}>
              {t}<span className="mq-dot"/>
            </div>
          ))}
        </div>
      </div>

      {}
      <div style={{ background: 'var(--deep)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <div aria-hidden style={{
          position: 'absolute', bottom: -80, left: -20,
          fontFamily: 'var(--ff-display)', fontSize: 500, fontWeight: 900,
          color: 'rgba(255,92,26,0.018)', lineHeight: 1,
          letterSpacing: -24, pointerEvents: 'none', userSelect: 'none',
        }}>FIRE</div>

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 92px', position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <div className="rv" style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: 64,
            paddingBottom: 28, borderBottom: '1px solid var(--line2)',
          }}>
            <div>
              <div className="eyebrow">Signature Dishes</div>
              <div style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(48px,6vw,88px)',
                fontWeight: 900, lineHeight: .92,
                letterSpacing: '-3px', color: 'var(--cream)',
              }}>
                The Heritage<br/>
                <em style={{ color: 'var(--gold2)' }}>Experience</em>
              </div>
            </div>
            <Magnetic strength={0.3} radius={90}>
              <Link to="/menu" style={{
                fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase',
                color: 'var(--gold2)', borderBottom: '1px solid rgba(232,192,64,.3)',
                paddingBottom: 2, textDecoration: 'none', transition: 'color .25s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                View Full Menu →
              </Link>
            </Magnetic>
          </div>

          {/* Dish cards */}
          <div className="dish-cards" style={{ perspective: 1600 }}>
            {featured.map((d, i) => (
              <article
                key={d.id}
                className="dish-card rv"
                data-delay={i * .13}
                style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                onMouseMove={e => tilt(e, e.currentTarget)}
                onMouseLeave={e => untilt(e.currentTarget)}
              >
                {/* Top edge highlight on hover */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(to right,var(--fire),var(--gold2))',
                  transform: 'scaleX(0)', transition: 'transform .5s var(--e1)',
                  transformOrigin: 'left',
                }} ref={el => {
                  if (!el) return
                  const p = el.parentElement
                  const show = () => el.style.transform = 'scaleX(1)'
                  const hide = () => el.style.transform = 'scaleX(0)'
                  p.addEventListener('mouseenter', show)
                  p.addEventListener('mouseleave', hide)
                }}/>

                <div className="dc-num">0{i + 1}</div>
                <span className={`dc-tag ${i === 0 ? 'hot' : 'outline'}`}>
                  {['Most Popular', 'Heritage Special', 'Fan Favourite'][i]}
                </span>
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
                    >
                      + Cart
                    </button>
                  </Magnetic>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {}
      <section className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* HS watermark */}
        <div aria-hidden style={{
          position: 'absolute', right: -60, top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--ff-display)', fontSize: 400, fontWeight: 900,
          color: 'rgba(255,92,26,0.02)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: -20,
        }}>HS</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left text */}
          <div className="rl">
            <div className="eyebrow">Our Story</div>
            <h2 className="sec-h" style={{ marginBottom: 28 }}>
              Rooted in<br/><em>tradition,</em><br/>
              <span className="stroke">built for you</span>
            </h2>
            <SplitWords
              text="Heritage Shawarma was born from a single belief — great food should carry a story. Every spice blend, a chapter from a tradition spanning generations."
              style={{ fontSize: 15, fontWeight: 300, color: 'var(--muted)', lineHeight: 2, marginBottom: 16 }}
            />
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--dim)', lineHeight: 1.95, marginBottom: 36 }}>
              We bring authentic Middle Eastern flavours to Oshawa. Halal certified, made fresh daily, with the care that only comes from truly loving what you cook.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Magnetic strength={0.3} radius={80}><Link to="/about" className="btn btn-primary">Our Story →</Link></Magnetic>
              <Magnetic strength={0.22} radius={70}><Link to="/catering" className="btn btn-outline">Catering</Link></Magnetic>
            </div>
          </div>

          {/* Right — stat boxes */}
          <div className="rr">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {STATS.map((s, i) => (
                <NoiseCard key={s.l} style={{ padding: '32px 24px' }}>
                  <div style={{
                    fontFamily: 'var(--ff-display)', fontSize: 52,
                    fontWeight: 900, color: 'var(--gold2)',
                    lineHeight: 1, letterSpacing: -2, marginBottom: 8,
                  }}>
                    <AnimCounter target={s.v} suffix={s.s}/>
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--dim)' }}>
                    {s.l}
                  </div>
                </NoiseCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FireLine opacity={0.3}/>

      {}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--line2)', padding: '120px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 92px' }}>
          <div className="rv" style={{ marginBottom: 64 }}>
            <div className="eyebrow">Today's Deals</div>
            <h2 className="sec-h">Special<br/><em>Offers</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {OFFERS.map((o, i) => {
              const pct = Math.round((o.orig - o.price) / o.orig * 100)
              return (
                <NoiseCard
                  key={o.id} className="rv" data-delay={i * .1}
                  glowColor="rgba(255,92,26,0.12)"
                  style={{ padding: '44px 36px', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Top colour bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.grad }}/>
                  {/* Save badge */}
                  <div style={{ position: 'absolute', top: 20, right: 20, background: o.grad, color: 'var(--void)', fontSize: 9, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 12px' }}>
                    SAVE {pct}%
                  </div>
                  <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '4px 12px', border: '1px solid rgba(232,192,64,.3)', color: 'var(--gold2)', marginBottom: 18 }}>
                    {o.badge}
                  </div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700, color: 'var(--cream)', marginBottom: 12 }}>
                    {o.title}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7 }}>{o.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--ff-display)', fontSize: 44, fontWeight: 900, color: 'var(--gold2)', letterSpacing: -2 }}>
                      ${o.price}
                    </span>
                    <span style={{ fontSize: 16, color: 'var(--dim)', textDecoration: 'line-through' }}>${o.orig.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 28, fontStyle: 'italic' }}>⏰ {o.valid}</div>
                  <Link to="/menu" className="btn btn-primary btn-sm">Order This Deal →</Link>
                </NoiseCard>
              )
            })}
          </div>
        </div>
      </section>

      {}
      <section style={{ background: 'var(--void)', borderTop: '1px solid var(--line2)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: 'var(--ff-display)', fontSize: 520, fontWeight: 900,
          color: 'rgba(255,92,26,0.012)', lineHeight: 1,
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: -26,
        }}>LOVE</div>

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 92px', position: 'relative', zIndex: 1 }}>
          <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <div className="eyebrow">Google Reviews</div>
              <h2 className="sec-h">What People<br/><em>Are Saying</em></h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 72, fontWeight: 900, color: 'var(--gold2)', lineHeight: 1, letterSpacing: -4 }}>4.5</div>
              <div style={{ color: 'var(--gold2)', fontSize: 20, letterSpacing: 3, marginTop: 2 }}>★★★★½</div>
              <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 5 }}>127 verified reviews</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 2 }}>
            {REVIEWS.slice(0, 3).map((r, i) => <ReviewCard key={r.name} r={r} i={i}/>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {REVIEWS.slice(3, 6).map((r, i) => <ReviewCard key={r.name} r={r} i={i + 3}/>)}
          </div>
        </div>
      </section>

      {}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line2)', padding: '72px 92px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
          {AWARDS.map((a, i) => (
            <NoiseCard key={a.title} className="rv" data-delay={i * .1} style={{ padding: '30px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{a.icon}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 700, color: 'var(--cream)', marginBottom: 7 }}>{a.title}</div>
              <div style={{ fontSize: 10, color: 'var(--fire)', letterSpacing: '2px', marginBottom: 4 }}>{a.org}</div>
              <div style={{ fontSize: 10, color: 'var(--dim)' }}>{a.year}</div>
            </NoiseCard>
          ))}
        </div>
      </section>

      <FireLine color="var(--gold2)" opacity={0.22}/>

      {}
      <div style={{ padding: '120px 92px', position: 'relative', overflow: 'hidden', background: 'var(--void)' }}>
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(60deg,rgba(255,92,26,.015) 0,rgba(255,92,26,.015) .5px,transparent .5px,transparent 44px),repeating-linear-gradient(-60deg,rgba(255,92,26,.015) 0,rgba(255,92,26,.015) .5px,transparent .5px,transparent 44px)',
          pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="rv" style={{ marginBottom: 64 }}>
            <div className="eyebrow">Why Heritage</div>
            <h2 className="sec-h">More than<br/><em>a meal</em></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {[
              { n: '01', t: 'Halal Always',   d: 'Every protein, every sauce, every ingredient — certified halal. Non-negotiable from day one.' },
              { n: '02', t: 'Fresh Daily',    d: 'Marinated overnight. Carved fresh every morning. Nothing pre-cut, nothing reheated.' },
              { n: '03', t: 'Real Recipes',   d: 'Three generations of family spice knowledge. Not a corporate formula — a real tradition.' },
              { n: '04', t: 'Community',      d: "Not a chain. Your neighbourhood restaurant. We know our regulars by name." },
            ].map((w, i) => (
              <NoiseCard key={w.n} className="rv" data-delay={i * .1} style={{ padding: '44px 30px' }}>
                <div style={{
                  fontFamily: 'var(--ff-display)', fontSize: 110,
                  fontWeight: 900, color: 'rgba(255,92,26,0.042)',
                  lineHeight: 1, marginBottom: 20, letterSpacing: -5,
                }}>
                  {w.n}
                </div>
                <GlitchText
                  text={w.t} as="h3"
                  style={{ fontFamily: 'var(--ff-display)', fontSize: 21, fontWeight: 700, color: 'var(--cream)', marginBottom: 14, display: 'block' }}
                />
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dim)', lineHeight: 1.95 }}>{w.d}</p>
              </NoiseCard>
            ))}
          </div>
        </div>
      </div>

      {}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line2)', padding: '80px 92px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <div className="rv" style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Order Online</div>
            <h2 className="sec-h" style={{ textAlign: 'center' }}>Order Your Way<br/><em>Anywhere</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, maxWidth: 860, margin: '0 auto 24px' }}>
            {PLATFORMS.map((p, i) => (
              <NoiseCard key={p.name} className="rv" data-delay={i * .1} style={{ padding: '36px 24px', textAlign: 'center' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ fontSize: 42, marginBottom: 14 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--cream)', marginBottom: 10 }}>{p.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold2)', borderBottom: '1px solid rgba(232,192,64,.25)', paddingBottom: 2, display: 'inline-block', marginTop: 10 }}>
                    Order Now →
                  </div>
                </a>
              </NoiseCard>
            ))}
          </div>
          <p className="rv" style={{ fontSize: 13, color: 'var(--dim)', fontStyle: 'italic' }}>
            Or order directly here — no platform fees, full Flame Loyalty points earned.
          </p>
        </div>
      </section>

      {}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--line2)', padding: '100px 92px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 100, alignItems: 'start' }}>
          <div className="rl" style={{ position: 'sticky', top: 'calc(var(--top-off) + 24px)' }}>
            <div className="eyebrow">Common Questions</div>
            <h2 className="sec-h" style={{ marginBottom: 24 }}>Quick<br/><em>Answers</em></h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.95, marginBottom: 28 }}>
              Everything about Heritage Shawarma — halal certification, hours, loyalty, catering.
            </p>
            <Link to="/contact" className="btn btn-outline btn-sm">More Questions →</Link>
          </div>
          <div className="rr">
            {[
              { q: 'Is all your food halal certified?',     a: '100% halal — every protein, every sauce, every ingredient. Certified and non-negotiable from day one.' },
              { q: "What are Heritage's opening hours?",    a: 'Monday–Thursday 11AM–10PM, Friday–Saturday 11AM–11PM, Sunday 12PM–9PM.' },
              { q: 'Do you offer delivery?',               a: 'Yes — via SkipTheDishes, Uber Eats, and DoorDash. Or order directly here for pickup with full Loyalty Points.' },
              { q: 'How does the Flame Loyalty program work?', a: 'Earn 10 Flame Points per dollar spent. Four tiers from 5% all the way to 15% off plus a free birthday meal.' },
              { q: 'Do you cater events?',                 a: 'Absolutely. We cater corporate lunches, weddings, private events and more. Packages start at $249.' },
            ].map((f, i) => <FAQRow key={i} {...f} idx={i}/>)}
          </div>
        </div>
      </section>

      {}
      <div style={{
        background: 'linear-gradient(135deg,var(--fire),var(--gold2),var(--fire))',
        backgroundSize: '200%',
        animation: 'mShift 6s linear infinite',
        padding: '92px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 40, flexWrap: 'wrap',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: -80, top: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(28px,4vw,64px)', fontWeight: 900, color: 'var(--void)', letterSpacing: -3, lineHeight: 1, marginBottom: 12 }}>
            Ready to taste<br/><em>real heritage?</em>
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(0,0,0,.48)', maxWidth: 380 }}>
            Dine in, takeout, or delivery — Heritage is always fresh, always halal, always worth it.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Magnetic strength={0.35} radius={90}>
            <button className="btn btn-dark" onClick={() => dispatch({ type: 'CART_OPEN', open: true })}>
              Order Online →
            </button>
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

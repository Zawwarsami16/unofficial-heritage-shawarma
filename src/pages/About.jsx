// about page — story, team, timeline, awards
import { Link } from 'react-router-dom'
import { useLayout } from '../hooks/layout.jsx'
import { useReveal, AnimCounter } from '../components/SmoothScroll.jsx'
import { NoiseCard, FireLine } from '../components/Effects.jsx'
import { SplitText } from '../components/SplitText.jsx'
import { STATS, TEAM, TIMELINE, AWARDS } from '../data/data.js'

export default function About() {
  useReveal()
  const { topOffset } = useLayout()

  return (
    <div style={{ paddingTop: topOffset }}>
      {/* Hero */}
      <div className="page-hero">
        <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="eyebrow rv">Our Story</div>
          <SplitText text="Ten years of" as="h1" style={{ fontFamily:'var(--ff-display)', fontSize:'clamp(52px,8vw,110px)', fontWeight:900, lineHeight:.9, letterSpacing:'-4px', color:'var(--cream)' }}/>
          <SplitText text="passion on" as="h1" delay={0.15} style={{ fontFamily:'var(--ff-display)', fontSize:'clamp(52px,8vw,110px)', fontWeight:900, lineHeight:.9, letterSpacing:'-4px', color:'var(--gold2)', fontStyle:'italic', display:'block' }}/>
          <SplitText text="every plate" as="h1" delay={0.3} style={{ fontFamily:'var(--ff-display)', fontSize:'clamp(52px,8vw,110px)', fontWeight:900, lineHeight:.9, letterSpacing:'-4px', WebkitTextStroke:'1.5px rgba(244,236,216,0.2)', color:'transparent', fontStyle:'italic', display:'block' }}/>
          <p className="rv" style={{ fontSize:15, fontWeight:300, color:'var(--muted)', lineHeight:1.95, maxWidth:560, marginTop:24, marginBottom:32 }}>
            Heritage Shawarma opened in 2015 with three menu items, two staff, and one conviction: Oshawa deserved authentic halal Middle Eastern cuisine made with real craft and real love.
          </p>
          <div className="rv" style={{ display:'flex', gap:12 }}>
            <Link to="/menu" className="btn btn-primary">See the Menu →</Link>
            <Link to="/catering" className="btn btn-outline">Catering</Link>
          </div>
        </div>
        <div className="watermark" style={{ fontSize:280, letterSpacing:'-12px' }}>STORY</div>
      </div>

      {/* Stats bar */}
      <div style={{ background:'linear-gradient(135deg,var(--fire),var(--gold2))', padding:'28px 92px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
          {STATS.map(s => (
            <div key={s.l} style={{ textAlign:'center', padding:'10px 0' }}>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:40, fontWeight:900, color:'var(--void)', lineHeight:1, letterSpacing:-2 }}><AnimCounter target={s.v} suffix={s.s}/></div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(0,0,0,.45)', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder letter */}
      <section className="sec">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:88, alignItems:'center' }}>
          <div className="rl">
            <div className="eyebrow">From the Founder</div>
            <h2 className="sec-h" style={{ marginBottom:28 }}>Ahmed's<br/><em>Letter</em></h2>
            <div style={{ borderLeft:'2px solid var(--gold2)', paddingLeft:28, marginBottom:28 }}>
              <p style={{ fontFamily:'var(--ff-display)', fontSize:17, fontStyle:'italic', color:'var(--cream)', lineHeight:1.85 }}>
                "I didn't come to Canada to open a restaurant. I came to build a life. But every time I couldn't find food that tasted like home — like my mother's shawarma, like the market stalls in Beirut — I felt something missing. Heritage was born from that missing feeling."
              </p>
            </div>
            <p style={{ fontSize:14, fontWeight:300, color:'var(--muted)', lineHeight:1.9, marginBottom:18 }}>
              Ten years later, Heritage has served over 8,400 orders, catered 200+ events, and employed 14 people from the Oshawa community. Every one of those moments matters to me personally.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:28 }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,var(--fire),var(--gold2))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-display)', fontSize:14, fontWeight:700, color:'var(--void)', flexShrink:0 }}>AK</div>
              <div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700 }}>Ahmed Khan</div>
                <div style={{ fontSize:9, color:'var(--fire)', letterSpacing:'2px' }}>FOUNDER & HEAD CHEF</div>
              </div>
            </div>
          </div>
          <div className="rr">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
              {[{i:'🌿',t:'Halal Integrity',d:'Every ingredient certified.'},{i:'🔥',t:'Freshness First',d:'Marinated overnight. Carved to order.'},{i:'📚',t:'Real Recipes',d:'Three generations of family knowledge.'},{i:'🤝',t:'Community',d:'Locally owned, locally committed.'}].map((v,i) => (
                <NoiseCard key={v.t} style={{ padding:28 }} className="rv" data-delay={i*.08}>
                  <div style={{ fontSize:32, marginBottom:12 }}>{v.i}</div>
                  <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, marginBottom:7 }}>{v.t}</div>
                  <p style={{ fontSize:12, fontWeight:300, color:'var(--dim)', lineHeight:1.75 }}>{v.d}</p>
                </NoiseCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FireLine opacity={0.3}/>

      {/* Timeline */}
      <section style={{ background:'var(--deep)', borderTop:'1px solid var(--line2)', padding:'120px 92px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:64 }}><div className="eyebrow">Ten Years</div><h2 className="sec-h">The Heritage<br/><em>Journey</em></h2></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:88 }}>
            <div className="rl" style={{ position:'sticky', top:`calc(${topOffset}px + 32px)`, alignSelf:'start' }}>
              <p style={{ fontSize:14, fontWeight:300, color:'var(--muted)', lineHeight:1.9 }}>From a single shawarma spit to a full catering operation and loyalty program — every year brought new chapters to the Heritage story.</p>
            </div>
            <div className="tl">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="tl-item rv" data-delay={i*.06}>
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="sec">
        <div className="rv" style={{ marginBottom:52 }}><div className="eyebrow">The Team</div><h2 className="sec-h">The People<br/><em>Behind Heritage</em></h2></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
          {TEAM.map((m, i) => (
            <div key={m.name} className="team-card rv" data-delay={i*.08}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,var(--fire),var(--gold2))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-display)', fontSize:14, fontWeight:700, color:'var(--void)', flexShrink:0 }}>{m.initials}</div>
                <div>
                  <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--cream)' }}>{m.name}</div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'var(--fire)' }}>{m.role}</div>
                </div>
              </div>
              <p style={{ fontSize:13, fontWeight:300, color:'var(--muted)', lineHeight:1.82, marginBottom:10 }}>{m.bio}</p>
              <div style={{ fontSize:10, color:'var(--dim)' }}>With Heritage since {m.since}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--line2)', padding:'72px 92px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:44 }}><div className="eyebrow">Recognition</div><h2 className="sec-h">Awards &amp;<br/><em>Recognition</em></h2></div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
            {AWARDS.map((a,i) => (
              <div key={a.title} className="award-card rv" data-delay={i*.1}>
                <div style={{ fontSize:38, marginBottom:14 }}>{a.icon}</div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--cream)', marginBottom:6 }}>{a.title}</div>
                <div style={{ fontSize:10, color:'var(--fire)', letterSpacing:'2px', marginBottom:4 }}>{a.org}</div>
                <div style={{ fontSize:10, color:'var(--dim)' }}>{a.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background:'linear-gradient(135deg,var(--fire),var(--gold2))', padding:'80px 92px', textAlign:'center' }}>
        <h2 style={{ fontFamily:'var(--ff-display)', fontSize:'clamp(28px,4vw,56px)', fontWeight:900, color:'var(--void)', letterSpacing:-3, marginBottom:16 }}>Taste the Heritage</h2>
        <p style={{ fontSize:14, color:'rgba(0,0,0,.5)', maxWidth:420, margin:'0 auto 28px' }}>We're at 2620 Simcoe St N, Unit 6, Oshawa. Come in, meet the team.</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/menu" className="btn btn-dark">Order Now →</Link>
          <Link to="/contact" className="btn btn-dark">Get Directions</Link>
          <Link to="/catering" className="btn btn-dark">Book Catering</Link>
        </div>
      </div>
    </div>
  )
}

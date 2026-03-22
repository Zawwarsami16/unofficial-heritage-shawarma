// catering, contact, loyalty, receipt, admin pages
// kept in one file since they're all smaller pages

// CATERING PAGE
import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLayout } from '../hooks/layout.jsx'
import { useReveal } from '../components/SmoothScroll.jsx'
import { NoiseCard, FireLine } from '../components/Effects.jsx'
import { useStore } from '../context/Store.jsx'
import { LOYALTY_TIERS, FAQS, CATERING_PACKAGES, DEFAULT_MENU, EMPTY_ITEM } from '../data/data.js'
import LoyaltyCard from '../components/LoyaltyCard.jsx'

export default function Catering() {
  useReveal()
  const { topOffset } = useLayout()
  const [form, setForm] = useState({ name:'', email:'', phone:'', date:'', guests:'', pkg:'', notes:'' })
  const [sent, setSent] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div style={{ paddingTop: topOffset }}>
      <div className="page-hero">
        <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div>
            <div className="eyebrow rv">Catering</div>
            <h1 className="sec-h rv" style={{ marginBottom:24 }}>We feed your<br/><em>people</em><br/><span className="stroke">brilliantly</span></h1>
            <p className="rv" style={{ fontSize:15, fontWeight:300, color:'var(--muted)', lineHeight:1.9, marginBottom:28 }}>
              Halal catering for 15 to 300+ guests. Heritage delivers an authentic feast that becomes the most-talked-about part of your event.
            </p>
            <div className="rv" style={{ display:'flex', gap:12 }}>
              <a href="#pkgs" className="btn btn-primary">View Packages →</a>
              <a href="#cform" className="btn btn-outline">Get a Quote</a>
            </div>
          </div>
          <div className="rr">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
              {[{v:'200+',l:'Events Catered'},{v:'15',l:'Min Guests'},{v:'300+',l:'Max Guests'},{v:'100%',l:'Halal Certified'}].map((s,i) => (
                <NoiseCard key={s.l} style={{ padding:'28px 22px', textAlign:'center' }} className="rv" data-delay={i*.08}>
                  <div style={{ fontFamily:'var(--ff-display)', fontSize:40, fontWeight:900, color:'var(--gold2)', lineHeight:1, letterSpacing:-2, marginBottom:6 }}>{s.v}</div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--dim)' }}>{s.l}</div>
                </NoiseCard>
              ))}
            </div>
          </div>
        </div>
        <div className="watermark" style={{ fontSize:240, letterSpacing:'-10px' }}>FEAST</div>
      </div>

      {/* Packages */}
      <section id="pkgs" className="sec">
        <div className="rv" style={{ marginBottom:52 }}><div className="eyebrow">Packages</div><h2 className="sec-h">Choose Your<br/><em>Package</em></h2></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
          {CATERING_PACKAGES.map((p, i) => (
            <NoiseCard key={p.id} className="rv" data-delay={i*.12} style={{ padding:'44px 36px', position:'relative' }}>
              {p.featured && <div style={{ position:'absolute', top:-1, right:20, background:'var(--gold2)', color:'var(--void)', fontSize:8, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'4px 12px' }}>Most Popular</div>}
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(to bottom,${p.color},transparent)` }}/>
              <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:p.color, marginBottom:18 }}>{p.name}</div>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:56, fontWeight:700, color:'var(--cream)', letterSpacing:-3, lineHeight:1, marginBottom:4 }}>${p.price}</div>
              <div style={{ fontSize:12, color:'var(--dim)', marginBottom:6 }}>~${p.pph}/person</div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--gold2)', marginBottom:20 }}>Serves {p.serves} guests</div>
              <hr style={{ border:'none', borderTop:'1px solid var(--line2)', marginBottom:20 }}/>
              <ul style={{ listStyle:'none', marginBottom:24 }}>
                {p.includes.map(inc => <li key={inc} style={{ fontSize:13, fontWeight:300, color:'var(--muted)', padding:'6px 0', borderBottom:'1px solid var(--line2)', display:'flex', gap:10 }}><span style={{ color:'#34D399', flexShrink:0 }}>✓</span>{inc}</li>)}
              </ul>
              <a href="#cform" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', textDecoration:'none', display:'inline-flex' }} onClick={() => set('pkg', p.name)}>Book {p.name} →</a>
            </NoiseCard>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ background:'var(--deep)', borderTop:'1px solid var(--line2)', padding:'100px 92px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:52 }}><div className="eyebrow">How It Works</div><h2 className="sec-h">Simple<br/><em>Process</em></h2></div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
            {[{n:'01',t:'Reach Out',desc:'Call (289) 980-0149 or fill our form. We respond within 4 hours.'},{n:'02',t:'We Consult',desc:'A coordinator discusses your event — count, dietary needs, timeline.'},{n:'03',t:'Custom Quote',desc:'Detailed quote within 24 hours. No hidden fees, no surprises.'},{n:'04',t:'Confirm & Relax',desc:'Lock in with a 25% deposit. We handle everything from prep to cleanup.'}].map((s,i) => (
              <NoiseCard key={s.n} className="rv" data-delay={i*.1} style={{ padding:'40px 28px' }}>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:80, fontWeight:900, color:'rgba(255,92,26,.05)', lineHeight:1, marginBottom:16, letterSpacing:-4 }}>{s.n}</div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, color:'var(--cream)', marginBottom:10 }}>{s.t}</div>
                <p style={{ fontSize:13, fontWeight:300, color:'var(--dim)', lineHeight:1.85 }}>{s.desc}</p>
              </NoiseCard>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="cform" className="sec">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80, alignItems:'start' }}>
          <div className="rl"><div className="eyebrow">Book Now</div><h2 className="sec-h" style={{ marginBottom:20 }}>Request<br/><em>a Quote</em></h2><p style={{ fontSize:14, fontWeight:300, color:'var(--muted)', lineHeight:1.9, marginBottom:28 }}>Fill in your details — we respond with a custom quote within 24 hours.</p></div>
          <div className="rr">
            {sent ? (
              <div style={{ background:'rgba(52,211,153,.07)', border:'1px solid rgba(52,211,153,.3)', padding:'52px 40px', textAlign:'center' }}>
                <div style={{ fontSize:52, marginBottom:18 }}>✅</div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:24, color:'#34D399', marginBottom:10 }}>Request Received!</div>
                <p style={{ fontSize:14, color:'var(--muted)' }}>We'll respond within 24 hours. Urgent? Call (289) 980-0149.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div><label className="flabel">Name *</label><input className="finput" required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Ahmed Khan"/></div>
                  <div><label className="flabel">Email *</label><input className="finput" type="email" required value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@email.com"/></div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div><label className="flabel">Event Date *</label><input className="finput" type="date" required value={form.date} onChange={e=>set('date',e.target.value)}/></div>
                  <div><label className="flabel">Guests *</label><input className="finput" type="number" min="15" required value={form.guests} onChange={e=>set('guests',e.target.value)} placeholder="50"/></div>
                </div>
                <div><label className="flabel">Package</label><select className="fselect" value={form.pkg} onChange={e=>set('pkg',e.target.value)}><option value="">Not sure yet</option>{CATERING_PACKAGES.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}<option value="custom">Custom</option></select></div>
                <div><label className="flabel">Event Details</label><textarea className="ftextarea" value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Tell us about your event — type, venue, dietary requirements..."/></div>
                <button type="submit" className="btn btn-primary">Send Inquiry →</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// CONTACT PAGE  (exported from same file for simplicity)
export function Contact() {
  useReveal()
  const { topOffset } = useLayout()
  const [sent, setSent] = useState(false)
  const [faq,  setFaq]  = useState(null)
  const days = [
    {d:'Monday',   t:'11AM–10PM',td:new Date().getDay()===1},
    {d:'Tuesday',  t:'11AM–10PM',td:new Date().getDay()===2},
    {d:'Wednesday',t:'11AM–10PM',td:new Date().getDay()===3},
    {d:'Thursday', t:'11AM–10PM',td:new Date().getDay()===4},
    {d:'Friday',   t:'11AM–11PM',td:new Date().getDay()===5},
    {d:'Saturday', t:'11AM–11PM',td:new Date().getDay()===6},
    {d:'Sunday',   t:'12PM–9PM', td:new Date().getDay()===0},
  ]
  return (
    <div style={{ paddingTop: topOffset }}>
      <div className="page-hero">
        <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="eyebrow rv">Find Us</div>
          <h1 className="sec-h rv" style={{ marginBottom:16 }}>Come say<br/><em>hello</em></h1>
          <p className="rv" style={{ fontSize:14, fontWeight:300, color:'var(--muted)', maxWidth:460 }}>2620 Simcoe St N, Unit 6, Oshawa ON. Open every day. Free parking. The garlic sauce is worth the trip.</p>
        </div>
        <div className="watermark" style={{ fontSize:240, letterSpacing:'-10px' }}>VISIT</div>
      </div>
      <section className="sec">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          <div className="rl">
            <div className="eyebrow">Hours</div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:700, marginBottom:24, letterSpacing:-1 }}>When We're <em style={{ color:'var(--gold2)' }}>Open</em></h2>
            {days.map(d => (
              <div key={d.d} style={{ display:'flex', justifyContent:'space-between', padding:'12px 14px', background:d.td?'rgba(52,211,153,.06)':'var(--surface)', border:`1px solid ${d.td?'rgba(52,211,153,.35)':'var(--line2)'}`, marginBottom:2 }}>
                <span style={{ fontSize:13, color:d.td?'#34D399':'var(--muted)', fontWeight:d.td?600:300 }}>{d.d}{d.td&&<span style={{ fontSize:9, background:'rgba(52,211,153,.2)', color:'#34D399', padding:'2px 7px', letterSpacing:'1.5px', marginLeft:8 }}>TODAY</span>}</span>
                <span style={{ fontSize:13, fontWeight:500, color:d.td?'#34D399':'var(--gold2)' }}>{d.t}</span>
              </div>
            ))}
          </div>
          <div className="rr">
            <div className="eyebrow">Contact</div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:700, marginBottom:24, letterSpacing:-1 }}>Get in <em style={{ color:'var(--gold2)' }}>Touch</em></h2>
            {[{i:'📍',t:'Address',l:['2620 Simcoe St N, Unit 6','Oshawa, ON L1L 0R1'],h:'https://maps.google.com/?q=2620+Simcoe+St+N+Oshawa'},{i:'☎️',t:'Phone',l:['(289) 980-0149','Mon–Sun during hours'],h:'tel:2899800149'},{i:'📧',t:'Email',l:['hello@heritageshawarma.ca'],h:'mailto:hello@heritageshawarma.ca'},{i:'🅿️',t:'Parking',l:['Free plaza parking','Directly in front'],h:null}].map(info => (
              <div key={info.t} style={{ background:'var(--surface)', border:'1px solid var(--line2)', padding:'18px 20px', display:'flex', gap:14, marginBottom:2, transition:'all .28s var(--e1)', cursor:'default' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.transform='translateX(4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='';e.currentTarget.style.transform=''}}>
                <div style={{ fontSize:24, flexShrink:0 }}>{info.i}</div>
                <div>
                  <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--fire)', marginBottom:5 }}>{info.t}</div>
                  {info.l.map(l => <div key={l} style={{ fontSize:13, color:'var(--muted)' }}>{l}</div>)}
                  {info.h && <a href={info.h} target={info.h.startsWith('http')?'_blank':undefined} style={{ fontSize:10, color:'var(--gold2)', letterSpacing:'2px', borderBottom:'1px solid rgba(232,192,64,.3)', display:'inline-block', marginTop:7 }}>Open →</a>}
                </div>
              </div>
            ))}
            <div style={{ marginTop:20 }}>
              {sent ? (
                <div style={{ textAlign:'center', padding:'36px', background:'rgba(52,211,153,.07)', border:'1px solid rgba(52,211,153,.3)' }}><div style={{ fontSize:36, marginBottom:10 }}>✅</div><div style={{ fontFamily:'var(--ff-display)', fontSize:20, color:'#34D399' }}>Message Sent!</div></div>
              ) : (
                <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <input className="finput" required placeholder="Your name"/>
                    <input className="finput" type="email" required placeholder="Email"/>
                  </div>
                  <textarea className="ftextarea" required placeholder="Message..." style={{ minHeight:100 }}/>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf:'flex-start' }}>Send →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <div style={{ background:'var(--deep)', borderTop:'1px solid var(--line2)', padding:'100px 92px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48 }}><div className="eyebrow">FAQ</div><h2 className="sec-h">Common<br/><em>Questions</em></h2></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
            {FAQS.map((f,i) => (
              <div key={i} className={`faq-item rv${faq===i?' open':''}`} data-delay={i*.05} onClick={() => setFaq(faq===i?null:i)}>
                <div className="faq-q"><span>{f.q}</span><span className="faq-icon">+</span></div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// LOYALTY PAGE
export function Loyalty() {
  useReveal()
  const { topOffset }  = useLayout()
  const { state, loyaltyTier } = useStore()
  const tier = LOYALTY_TIERS[loyaltyTier]
  const next = LOYALTY_TIERS[Math.min(loyaltyTier+1, LOYALTY_TIERS.length-1)]
  const prog = loyaltyTier < 3 ? Math.min(((state.loyalty.total-tier.min)/(next.min-tier.min))*100, 100) : 100
  return (
    <div style={{ paddingTop: topOffset }}>
      <div className="page-hero">
        <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div>
            <div className="eyebrow rv">Flame Loyalty</div>
            <h1 className="sec-h rv" style={{ marginBottom:20 }}>The more you<br/><em>eat</em>, the more<br/><span className="stroke">you save</span></h1>
            <p className="rv" style={{ fontSize:14, fontWeight:300, color:'var(--muted)', lineHeight:1.95, marginBottom:28 }}>10 Flame Points per dollar. 4 tiers. Up to 15% off every order plus exclusive perks.</p>
            <div className="rv"><Link to="/menu" className="btn btn-primary">Start Earning →</Link></div>
          </div>
          <div className="rr">
            <div style={{ background:'var(--surface)', border:`1px solid ${tier.color}44`, padding:'38px 34px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right,${tier.color},transparent)` }}/>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
                <span style={{ fontSize:44 }}>{tier.badge}</span>
                <div><div style={{ fontSize:9, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--dim)', marginBottom:4 }}>Your Tier</div><div style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:700 }}>{tier.name}</div></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2, marginBottom:22 }}>
                {[{v:state.loyalty.pts.toLocaleString(),l:'Points'},{v:state.loyalty.orders,l:'Orders'},{v:tier.disc,l:'Discount'}].map(s => (
                  <div key={s.l} style={{ background:'var(--raised)', border:'1px solid var(--line2)', padding:14, textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--ff-display)', fontSize:26, fontWeight:700, color:'var(--gold2)', lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontSize:9, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'var(--dim)', marginTop:4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {loyaltyTier < 3 && <>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--dim)', marginBottom:7 }}><span>{tier.name}</span><span>{next.name}</span></div>
                <div style={{ height:5, background:'var(--line2)', borderRadius:3, overflow:'hidden', marginBottom:8 }}><div style={{ height:'100%', background:`linear-gradient(to right,${tier.color},${next.color})`, width:`${prog}%`, transition:'width 1.2s var(--e1)' }}/></div>
                <div style={{ fontSize:12, color:'var(--dim)' }}><b style={{ color:'var(--gold2)' }}>{Math.max(next.min-state.loyalty.total,0).toLocaleString()} pts</b> to {next.name} ({next.disc})</div>
              </>}
              {loyaltyTier === 3 && <div style={{ textAlign:'center', padding:'12px', background:'rgba(255,208,96,.07)', border:'1px solid rgba(255,208,96,.2)' }}><span style={{ fontFamily:'var(--ff-display)', fontSize:14, color:'var(--gold2)' }}>👑 Highest tier reached!</span></div>}
            </div>
          </div>
        </div>
        <div className="watermark" style={{ fontSize:240, letterSpacing:'-10px' }}>FLAME</div>
      </div>
      <section className="sec">
        <div className="rv" style={{ marginBottom:52 }}><div className="eyebrow">All Tiers</div><h2 className="sec-h">Flame<br/><em>Tier Levels</em></h2></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
          {LOYALTY_TIERS.map((t,i) => (
            <div key={t.name} className="tier-card rv" data-delay={i*.1} style={{ border:`1px solid ${loyaltyTier===i?t.color+'44':'var(--line2)'}` }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';if(loyaltyTier!==i)e.currentTarget.style.borderColor='var(--line)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';if(loyaltyTier!==i)e.currentTarget.style.borderColor=''}}>
              {loyaltyTier===i && <div style={{ position:'absolute', top:0, right:0, background:t.color, color:'var(--void)', fontSize:8, fontWeight:700, letterSpacing:'2px', padding:'4px 10px' }}>YOURS</div>}
              <div style={{ fontSize:34, marginBottom:10 }}>{t.badge}</div>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, marginBottom:4 }}>{t.name}</div>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:44, fontWeight:900, color:t.color, letterSpacing:-2, lineHeight:1, marginBottom:14 }}>{t.disc}</div>
              <hr style={{ border:'none', borderTop:'1px solid var(--line2)', marginBottom:12 }}/>
              <ul style={{ listStyle:'none' }}>{t.perks.map(p => <li key={p} style={{ fontSize:11, fontWeight:300, color:'var(--muted)', padding:'4px 0', borderBottom:'1px solid var(--line2)', display:'flex', gap:8 }}><span style={{ color:'var(--fire)', fontSize:8, marginTop:2 }}>✦</span>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// RECEIPT PAGE
export function Receipt() {
  const loc = useLocation()
  const o = loc.state
  if (!o) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--void)' }}><div style={{ textAlign:'center' }}><div style={{ fontFamily:'var(--ff-display)', fontSize:24, color:'var(--cream)', marginBottom:16 }}>No order found</div><Link to="/menu" className="btn btn-primary">Browse Menu</Link></div></div>
  return (
    <div style={{ minHeight:'100vh', background:'var(--void)', paddingTop:60, paddingBottom:100 }}>
      <div className="receipt-wrap">
        <div style={{ textAlign:'center', marginBottom:28, fontSize:48 }}>🎉</div>
        <div className="receipt-card">
          <div style={{ textAlign:'center', marginBottom:28, paddingBottom:24, borderBottom:'1px solid var(--line2)' }}>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--fire)', marginBottom:8 }}>Heritage Shawarma</div>
            <h1 style={{ fontFamily:'var(--ff-display)', fontSize:28, fontWeight:700, color:'var(--cream)', marginBottom:4 }}>Order Confirmed!</h1>
            <div style={{ fontSize:12, color:'var(--dim)' }}>ID: <span style={{ fontFamily:'var(--ff-mono)', color:'var(--gold2)' }}>{o.oid}</span></div>
          </div>
          <div style={{ marginBottom:22 }}>
            {o.items?.map(i => <div key={i.id} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--line2)', fontSize:13, color:'var(--muted)' }}><span>{i.name} × {i.qty}</span><span style={{ color:'var(--cream)', fontWeight:500 }}>${(i.price*i.qty).toFixed(2)}</span></div>)}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--muted)', marginBottom:5 }}><span>HST (13%)</span><span>${(o.total-o.total/1.13).toFixed(2)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--ff-display)', fontSize:22, fontWeight:700, color:'var(--cream)', borderTop:'1px solid var(--line2)', paddingTop:10, marginBottom:20 }}><span>Total</span><span style={{ color:'var(--gold2)' }}>${o.total.toFixed(2)}</span></div>
          <div style={{ background:'rgba(232,192,64,.07)', border:'1px solid rgba(232,192,64,.2)', padding:'16px', marginBottom:24 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'var(--fire)', marginBottom:5 }}>Flame Points Earned</div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:700, color:'var(--gold2)' }}>+{o.pts||Math.floor(o.total*10)} pts</div>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/menu" className="btn btn-primary">Order Again →</Link>
            <Link to="/loyalty" className="btn btn-outline">View Points</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ADMIN PAGE

// IMAGE UPLOAD UTILITY
// Accepts: URL string OR File object → returns compressed base64
function toBase64(file, maxW = 640) {
  return new Promise(res => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width)
      const w = Math.round(img.width  * scale)
      const h = Math.round(img.height * scale)
      const cv = document.createElement('canvas')
      cv.width = w; cv.height = h
      cv.getContext('2d').drawImage(img, 0, 0, w, h)
      res(cv.toDataURL('image/webp', 0.82))
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}

// IMAGE CELL — used in menu table row
// Shows thumbnail + upload/URL/remove controls
function ImageCell({ item, dispatch, toast }) {
  const fileRef = useRef(null)
  const [urlMode, setUrlMode] = useState(false)
  const [urlVal,  setUrlVal]  = useState('')
  const [loading, setLoading] = useState(false)

  const applyUrl = () => {
    const v = urlVal.trim()
    if (!v) return
    dispatch({ type: 'UPDATE_IMAGE', id: item.id, image: v })
    toast('Image updated ✓', 'fire')
    setUrlMode(false)
    setUrlVal('')
  }

  const applyFile = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const b64 = await toBase64(file)
      dispatch({ type: 'UPDATE_IMAGE', id: item.id, image: b64 })
      toast('Image uploaded ✓', 'fire')
    } catch { toast('Upload failed', 'error') }
    setLoading(false)
    e.target.value = ''
  }

  const remove = () => {
    dispatch({ type: 'REMOVE_IMAGE', id: item.id })
    toast('Image removed', 'info')
  }

  if (item.image) return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{
        width:52, height:40, background:'var(--panel)',
        border:'1px solid var(--line2)',
        display:'flex', alignItems:'center', justifyContent:'center',
        overflow:'hidden', flexShrink:0,
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width:'100%', height:'100%', objectFit:'cover',
            mixBlendMode:'luminosity', opacity:.9,
          }}
          onError={e => e.target.style.display='none'}
        />
      </div>
      <button
        onClick={remove}
        style={{ fontSize:9, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'4px 8px', background:'rgba(248,113,113,.1)', border:'1px solid rgba(248,113,113,.25)', color:'#F87171', cursor:'pointer', transition:'all .2s' }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(248,113,113,.2)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(248,113,113,.1)'}
      >✕ Remove</button>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5, minWidth:170 }}>
      {urlMode ? (
        <div style={{ display:'flex', gap:4 }}>
          <input
            autoFocus
            value={urlVal}
            onChange={e=>setUrlVal(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') applyUrl(); if(e.key==='Escape') setUrlMode(false) }}
            placeholder="https://res.cloudinary.com/..."
            style={{ flex:1, background:'var(--panel)', border:'1px solid rgba(255,92,26,.4)', color:'var(--cream)', padding:'5px 8px', fontSize:11, outline:'none', fontFamily:'var(--ff-mono)', minWidth:0 }}
          />
          <button onClick={applyUrl} style={{ padding:'4px 10px', background:'linear-gradient(135deg,var(--fire),var(--gold2))', border:'none', color:'var(--void)', fontSize:10, fontWeight:700, cursor:'pointer' }}>✓</button>
          <button onClick={()=>setUrlMode(false)} style={{ padding:'4px 8px', background:'transparent', border:'1px solid var(--line2)', color:'var(--dim)', fontSize:12, cursor:'pointer' }}>✕</button>
        </div>
      ) : (
        <div style={{ display:'flex', gap:4 }}>
          {/* File upload */}
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={applyFile}/>
          <button
            onClick={()=>fileRef.current?.click()}
            disabled={loading}
            style={{ fontSize:9, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 10px', background:'var(--panel)', border:'1px solid var(--line2)', color: loading ? 'var(--dim)' : 'var(--muted)', cursor:'pointer', transition:'all .2s', display:'flex', alignItems:'center', gap:5 }}
            onMouseEnter={e=>{ if(!loading) e.currentTarget.style.borderColor='rgba(255,92,26,.4)' }}
            onMouseLeave={e=>e.currentTarget.style.borderColor=''}
          >
            {loading ? '⏳' : '📁'} {loading ? 'Processing...' : 'Upload'}
          </button>
          {/* URL paste */}
          <button
            onClick={()=>setUrlMode(true)}
            style={{ fontSize:9, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 10px', background:'var(--panel)', border:'1px solid var(--line2)', color:'var(--muted)', cursor:'pointer', transition:'all .2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,92,26,.4)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor=''}
          >🔗 URL</button>
        </div>
      )}
      <div style={{ fontSize:9, color:'var(--dim)', fontStyle:'italic' }}>Upload file or paste Cloudinary URL</div>
    </div>
  )
}

// ADMIN PAGE
const PW = 'heritage2025'

export function Admin() {
  const { state, dispatch, toast } = useStore()
  const nav = useNavigate()
  const [auth,      setAuth]      = useState(false)
  const [pw,        setPw]        = useState('')
  const [err,       setErr]       = useState(false)
  const [tab,       setTab]       = useState('overview')
  const [form,      setForm]      = useState({...EMPTY_ITEM})
  const [filterCat, setFilterCat] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const setF = (k,v) => setForm(f => ({...f,[k]:v}))

  const login  = e => { e.preventDefault(); pw===PW ? (setAuth(true),setErr(false)) : (setErr(true),setPw('')) }
  const addItem = e => {
    e.preventDefault()
    const price = parseFloat(form.price)
    if (!form.name || isNaN(price) || price <= 0) { toast('Name and valid price required','error'); return }
    dispatch({ type:'ADD_ITEM', item:{
      ...form,
      id: form.cat[0]+Date.now().toString(36),
      price,
      cal: parseInt(form.cal)||0,
      tags: typeof form.tags==='string' ? form.tags.split(',').map(t=>t.trim()).filter(Boolean) : form.tags,
    }})
    toast(`"${form.name}" added 🔥`, 'fire')
    setForm({...EMPTY_ITEM})
  }

  // Login screen
  if (!auth) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--deep)', padding:20 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:700, background:'linear-gradient(135deg,var(--fire),var(--gold2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:8 }}>Heritage Admin</div>
          <div style={{ fontSize:11, color:'var(--dim)', letterSpacing:'3px', textTransform:'uppercase' }}>Management Portal</div>
        </div>
        <div style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:'40px 32px' }}>
          <form onSubmit={login} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <label className="flabel">Password</label>
              <input className="finput" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password" autoFocus/>
              {err && <div style={{ fontSize:12, color:'#F87171', marginTop:5 }}>Wrong password. Try again.</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifyContent:'center' }}>Enter →</button>
          </form>
          <div style={{ textAlign:'center', marginTop:18 }}>
            <Link to="/" style={{ fontSize:12, color:'var(--dim)', textDecoration:'none' }}>← Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  )

  const menuFiltered = state.menu.filter(i => filterCat==='all' || i.cat===filterCat)

  return (
    <div className="admin-wrap">
      {/* Top bar */}
      <div className="admin-topbar">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Link to="/" style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, background:'linear-gradient(135deg,var(--fire),var(--gold2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', textDecoration:'none' }}>Heritage</Link>
          <span style={{ fontSize:8, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'3px 8px', background:'rgba(255,92,26,.1)', color:'var(--fire)', border:'1px solid rgba(255,92,26,.25)' }}>ADMIN</span>
        </div>
        <div style={{ display:'flex', gap:2 }}>
          {['overview','menu','add-item','settings'].map(t => (
            <button key={t} className={`atab${tab===t?' on':''}`} onClick={() => setTab(t)}>
              {t.replace('-',' ').replace(/\b\w/g, c=>c.toUpperCase())}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Link to="/" className="btn btn-outline btn-xs">View Site</Link>
          <button className="btn btn-outline btn-xs" onClick={() => setAuth(false)}>Logout</button>
        </div>
      </div>

      <div className="admin-body">

        {/* ── OVERVIEW ── */}
        {tab==='overview' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginBottom:28 }}>
              {[
                { v:state.menu.length,                                          l:'Menu Items',   c:'var(--gold2)' },
                { v:state.menu.filter(i=>i.available).length,                  l:'Available',    c:'#34D399'      },
                { v:state.loyalty.orders,                                       l:'Total Orders', c:'var(--fire)'  },
                { v:`$${state.recentOrders.reduce((s,o)=>s+o.total,0).toFixed(0)}`, l:'Revenue',c:'var(--glow)'  },
              ].map(s => (
                <div key={s.l} className="astat">
                  <div className="astat-v" style={{ color:s.c }}>{s.v}</div>
                  <div className="astat-l">{s.l}</div>
                </div>
              ))}
            </div>
            {state.recentOrders.length > 0 ? (
              <div style={{ background:'var(--surface)', border:'1px solid var(--line2)' }}>
                <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--line2)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--cream)' }}>Recent Orders</span>
                  <span style={{ fontSize:10, color:'var(--dim)' }}>{state.recentOrders.length} orders</span>
                </div>
                <table className="admin-tbl" style={{ width:'100%' }}>
                  <thead><tr>{['Order ID','Date','Total','Items','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {state.recentOrders.map(o=>(
                      <tr key={o.id}>
                        <td><span style={{ fontFamily:'var(--ff-mono)', fontSize:11, color:'var(--gold2)' }}>{o.id}</span></td>
                        <td>{o.date}</td>
                        <td style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--gold2)' }}>${o.total.toFixed(2)}</td>
                        <td>{o.items?.length} items</td>
                        <td><span style={{ fontSize:8.5, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'3px 8px', background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.25)', color:'#34D399' }}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--dim)', fontSize:14 }}>
                No orders yet. Share the site to start receiving orders.
              </div>
            )}
          </>
        )}

        {/* ── MENU ── */}
        {tab==='menu' && (
          <>
            {/* Category filter */}
            <div style={{ display:'flex', gap:4, marginBottom:16, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                {['all','wraps','plates','sides','drinks','desserts'].map(c=>(
                  <button key={c} className={`atab${filterCat===c?' on':''}`} onClick={()=>setFilterCat(c)} style={{ textTransform:'capitalize' }}>{c}</button>
                ))}
              </div>
              <span style={{ fontSize:11, color:'var(--dim)' }}>{menuFiltered.length} items · click image cell to add photo</span>
            </div>

            {/* Cloudinary tip */}
            <div style={{ background:'rgba(232,192,64,.05)', border:'1px solid rgba(232,192,64,.15)', borderLeft:'3px solid var(--gold2)', padding:'12px 16px', marginBottom:14, display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:16, flexShrink:0 }}>💡</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--gold2)', marginBottom:3 }}>Best way to add images: Cloudinary (free)</div>
                <div style={{ fontSize:12, color:'var(--dim)', lineHeight:1.7 }}>
                  Go to <span style={{ fontFamily:'var(--ff-mono)', color:'var(--muted)' }}>cloudinary.com</span> → free account → upload your food photo → copy the URL → paste in the 🔗 URL button below.
                  Or just drag a file directly using 📁 Upload.
                </div>
              </div>
            </div>

            <div style={{ background:'var(--surface)', border:'1px solid var(--line2)', overflowX:'auto' }}>
              <table className="admin-tbl" style={{ width:'100%', minWidth:900 }}>
                <thead>
                  <tr>
                    {['Image','Name','Category','Price','Available','Featured','Remove'].map(h=><th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {menuFiltered.map(item=>(
                    <tr key={item.id}>
                      {/* IMAGE CELL */}
                      <td style={{ minWidth:200 }}>
                        <ImageCell item={item} dispatch={dispatch} toast={toast}/>
                      </td>
                      {/* NAME + DESC */}
                      <td>
                        <div style={{ fontWeight:600, color:'var(--cream)', fontSize:13 }}>{item.name}</div>
                        <div style={{ fontSize:10, color:'var(--dim)', marginTop:3, maxWidth:220 }}>{item.desc.slice(0,60)}…</div>
                      </td>
                      {/* CAT */}
                      <td>
                        <span style={{ fontSize:8.5, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'3px 8px', background:'var(--panel)', border:'1px solid var(--line2)', color:'var(--fire)' }}>
                          {item.cat}
                        </span>
                      </td>
                      {/* PRICE */}
                      <td>
                        <input
                          type="number" step="0.01"
                          defaultValue={item.price.toFixed(2)}
                          onBlur={e=>dispatch({type:'UPDATE_PRICE',id:item.id,price:e.target.value})}
                          style={{ width:72, background:'var(--panel)', border:'1px solid var(--line2)', color:'var(--cream)', padding:'5px 8px', fontSize:12, outline:'none' }}
                        />
                      </td>
                      {/* AVAILABLE */}
                      <td>
                        <label className="tgl">
                          <input type="checkbox" checked={item.available} onChange={()=>dispatch({type:'TOGGLE_AVAIL',id:item.id})}/>
                          <span className="tgl-t"/>
                        </label>
                      </td>
                      {/* FEATURED */}
                      <td>
                        <label className="tgl">
                          <input type="checkbox" checked={!!item.featured} onChange={()=>dispatch({type:'TOGGLE_FEAT',id:item.id})}/>
                          <span className="tgl-t"/>
                        </label>
                      </td>
                      {/* REMOVE */}
                      <td>
                        <button
                          className="btn-danger"
                          onClick={()=>{ if(window.confirm(`Remove "${item.name}"?`)){ dispatch({type:'REMOVE_ITEM',id:item.id}); toast('Removed','info') }}}
                        >Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── ADD ITEM ── */}
        {tab==='add-item' && (
          <form onSubmit={addItem} style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:32, maxWidth:780 }}>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:700, color:'var(--cream)', marginBottom:24 }}>Add New Menu Item</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <div><label className="flabel">Name *</label><input className="finput" required value={form.name} onChange={e=>setF('name',e.target.value)} placeholder="Grilled Chicken Wrap"/></div>
              <div><label className="flabel">Category</label>
                <select className="fselect" value={form.cat} onChange={e=>setF('cat',e.target.value)}>
                  {'wraps plates sides drinks desserts'.split(' ').map(c=>(
                    <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div><label className="flabel">Price ($) *</label><input className="finput" type="number" step="0.01" min="0" required value={form.price} onChange={e=>setF('price',e.target.value)} placeholder="12.99"/></div>
              <div><label className="flabel">Calories</label><input className="finput" type="number" value={form.cal} onChange={e=>setF('cal',e.target.value)} placeholder="450"/></div>
              <div><label className="flabel">Prep Time</label><input className="finput" value={form.prepTime} onChange={e=>setF('prepTime',e.target.value)} placeholder="5–7 min"/></div>
              <div><label className="flabel">Tags (comma-separated)</label><input className="finput" value={form.tags} onChange={e=>setF('tags',e.target.value)} placeholder="Halal, New, Chef Special"/></div>
              <div style={{ gridColumn:'1/-1' }}>
                <label className="flabel">Description</label>
                <textarea className="ftextarea" value={form.desc} onChange={e=>setF('desc',e.target.value)} placeholder="Describe the dish — ingredients, flavour, what makes it special..."/>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label className="flabel">Image URL (optional — paste Cloudinary/any URL)</label>
                <input className="finput" value={form.image||''} onChange={e=>setF('image',e.target.value)} placeholder="https://res.cloudinary.com/yourname/image/upload/dish.jpg"/>
                <div style={{ fontSize:11, color:'var(--dim)', marginTop:4 }}>Leave blank to use emoji icon. You can always add/change image later from the Menu tab.</div>
              </div>
              <div>
                <label className="flabel">Options</label>
                <div style={{ display:'flex', gap:20, marginTop:8 }}>
                  {[['veg','🌿 Veg'],['spicy','🌶 Spicy'],['featured','⭐ Featured'],['available','✓ Available']].map(([k,l])=>(
                    <label key={k} style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:13, color:'var(--muted)' }}>
                      <input type="checkbox" checked={!!form[k]} onChange={e=>setF(k,e.target.checked)} style={{ accentColor:'var(--fire)' }}/>{l}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button type="submit" className="btn btn-primary">Add to Menu →</button>
              <button type="button" className="btn btn-outline" onClick={()=>setForm({...EMPTY_ITEM})}>Clear Form</button>
            </div>
          </form>
        )}

        {/* ── SETTINGS ── */}
        {tab==='settings' && (
          <div style={{ maxWidth:680, display:'flex', flexDirection:'column', gap:14 }}>
            {/* Announcement */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:28 }}>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, marginBottom:18 }}>Announcement Bar</div>
              <div style={{ marginBottom:14 }}>
                <label className="flabel">Text</label>
                <input className="finput" value={state.announce} onChange={e=>dispatch({type:'SET_ANNOUNCE',text:e.target.value})} placeholder="Now booking summer events!"/>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <label className="tgl"><input type="checkbox" checked={state.announceOn} onChange={()=>dispatch({type:'TOGGLE_ANNOUNCE'})}/><span className="tgl-t"/></label>
                <div style={{ fontSize:13, color:state.announceOn?'#34D399':'var(--dim)' }}>
                  Announcement {state.announceOn?'visible':'hidden'}
                </div>
              </div>
            </div>
            {/* Store status */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:28 }}>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, marginBottom:18 }}>Store Status</div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <label className="tgl"><input type="checkbox" checked={state.storeOpen} onChange={()=>dispatch({type:'TOGGLE_STORE'})}/><span className="tgl-t"/></label>
                <div style={{ fontSize:14, fontWeight:700, color:state.storeOpen?'#34D399':'#F87171' }}>
                  Store is {state.storeOpen?'OPEN':'CLOSED'}
                </div>
              </div>
            </div>
            {/* Reset */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:28 }}>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, marginBottom:10 }}>Reset Menu</div>
              <p style={{ fontSize:13, color:'var(--dim)', marginBottom:18, lineHeight:1.75 }}>
                Removes all changes (prices, images, custom items) and restores the original Heritage Shawarma menu. Cannot be undone.
              </p>
              <button
                className="btn-danger"
                style={{ padding:'10px 20px', fontSize:11, letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer' }}
                onClick={()=>{ if(window.confirm('Reset menu to defaults? This cannot be undone.')) { dispatch({type:'RESET_MENU'}); toast('Menu reset','info') }}}
              >Reset to Defaults</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

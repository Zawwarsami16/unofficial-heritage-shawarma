// stripped down menu page for in-restaurant qr code scanning
// no nav/footer, just the menu and cart
import { useState } from 'react'
import { useStore } from '../context/Store.jsx'
import { CATS } from '../data/data.js'

export default function QRMenu() {
  const { state, dispatch, toast } = useStore()
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = state.menu.filter(i => {
    if (!i.available) return false
    if (cat !== 'all' && i.cat !== cat) return false
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const icon = c => ({ wraps:'🫔', plates:'🍽', sides:'🥙', drinks:'🍋', desserts:'🍯' }[c] || '✦')
  const cnt  = state.cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{ minHeight:'100vh', background:'var(--void)', color:'var(--cream)', fontFamily:'var(--ff-body)' }}>
      {/* Header */}
      <div style={{ background:'var(--deep)', borderBottom:'1px solid var(--line2)', padding:'20px 20px 0', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:700, background:'linear-gradient(135deg,var(--fire),var(--gold2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Heritage Shawarma
            </div>
            <div style={{ fontSize:9, color:'var(--dim)', letterSpacing:'2px', textTransform:'uppercase' }}>Oshawa · 100% Halal</div>
          </div>
          {cnt > 0 && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => dispatch({ type:'CART_OPEN', open:true })}
              style={{ gap:6 }}
            >
              🛒 {cnt}
            </button>
          )}
        </div>

        {/* Search */}
        <input
          style={{ width:'100%', background:'var(--surface)', border:'1px solid var(--line2)', color:'var(--cream)', padding:'8px 14px', fontSize:13, outline:'none', marginBottom:12 }}
          placeholder="Search menu..."
          value={search} onChange={e => setSearch(e.target.value)}
        />

        {/* Category tabs — horizontal scroll */}
        <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:12 }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                flexShrink:0, fontSize:9.5, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase',
                padding:'6px 14px', background:cat===c.id?'linear-gradient(135deg,var(--fire),var(--gold2))':'transparent',
                border:`1px solid ${cat===c.id?'transparent':'var(--line2)'}`, color:cat===c.id?'var(--void)':'var(--dim)',
                cursor:'pointer', transition:'all .22s',
              }}
            >
              {c.icon} {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div style={{ padding:'12px 16px 100px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--dim)' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
            <div>No items found</div>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid var(--line2)', alignItems:'flex-start' }}
            >
              <div style={{ fontSize:32, lineHeight:1, flexShrink:0, width:42, textAlign:'center' }}>{icon(item.cat)}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                  <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--cream)', paddingRight:8 }}>{item.name}</div>
                  <div style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:700, color:'var(--gold2)', flexShrink:0, letterSpacing:'-0.5px' }}>${item.price.toFixed(2)}</div>
                </div>
                <p style={{ fontSize:12, fontWeight:300, color:'var(--dim)', lineHeight:1.7, marginBottom:8 }}>{item.desc}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {item.cal > 0 && <span style={{ fontSize:9, color:'var(--dim)' }}>{item.cal} cal</span>}
                    {item.prepTime && <span style={{ fontSize:9, color:'var(--dim)' }}>· {item.prepTime}</span>}
                    {item.veg && <span style={{ fontSize:8, fontWeight:700, background:'#34D399', color:'var(--void)', padding:'1px 6px' }}>VEG</span>}
                    {item.spicy && <span style={{ fontSize:8, fontWeight:700, background:'var(--fire)', color:'white', padding:'1px 6px' }}>SPICY</span>}
                  </div>
                  <button
                    onClick={() => { dispatch({ type:'CART_ADD', item }); toast(`${item.name} added 🔥`, 'fire') }}
                    style={{ background:'linear-gradient(135deg,var(--fire),var(--gold2))', color:'var(--void)', border:'none', padding:'7px 14px', fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer', flexShrink:0 }}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, background:'var(--deep)', borderTop:'1px solid var(--line2)', padding:'10px 16px', textAlign:'center' }}>
        <div style={{ fontSize:10, color:'var(--dim)' }}>📍 2620 Simcoe St N, Unit 6, Oshawa · <a href="tel:2899800149" style={{ color:'var(--gold2)' }}>(289) 980-0149</a></div>
      </div>
    </div>
  )
}

// full menu with category filter, search, grid/list toggle
// press / to focus the search bar
import { useState, useMemo, useRef, useEffect } from 'react'
import { useStore } from '../context/Store.jsx'
import { useReveal } from '../components/SmoothScroll.jsx'
import { useLayout } from '../hooks/layout.jsx'
import { CATS } from '../data/data.js'

export default function MenuPage() {
  useReveal()
  const { state, dispatch, toast, isWished } = useStore()
  const { topOffset } = useLayout()
  const [cat,    setCat]    = useState('all')
  const [search, setSearch] = useState('')
  const [veg,    setVeg]    = useState(false)
  const [spicy,  setSpicy]  = useState(false)
  const [sort,   setSort]   = useState('default')
  const [view,   setView]   = useState('grid')  // grid | list
  const inputRef = useRef(null)

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const fn = e => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); inputRef.current?.focus() } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const countByCat = useMemo(() => {
    const m = {}
    state.menu.forEach(i => { m[i.cat] = (m[i.cat]||0) + 1 })
    m.all = state.menu.length
    return m
  }, [state.menu])

  const filtered = useMemo(() => {
    let items = state.menu.filter(i => {
      if (cat !== 'all' && i.cat !== cat) return false
      if (search && !i.name.toLowerCase().includes(search.toLowerCase()) &&
          !i.desc.toLowerCase().includes(search.toLowerCase())) return false
      if (veg   && !i.veg)   return false
      if (spicy && !i.spicy) return false
      return true
    })
    if (sort === 'price-asc')  items = [...items].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') items = [...items].sort((a,b) => b.price - a.price)
    if (sort === 'name')       items = [...items].sort((a,b) => a.name.localeCompare(b.name))
    if (sort === 'cal')        items = [...items].sort((a,b) => a.cal - b.cal)
    return items
  }, [state.menu, cat, search, veg, spicy, sort])

  const icon = c => ({ wraps:'🫔', plates:'🍽', sides:'🥙', drinks:'🍋', desserts:'🍯' }[c] || '✦')

  return (
    <div style={{ paddingTop: topOffset }}>
      {/* Hero */}
      <div className="page-hero" style={{ paddingBottom:0 }}>
        <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1, paddingBottom:48 }}>
          <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:14 }}>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--fire)' }}>Full Menu</span>
            <span style={{ fontSize:9, color:'var(--dim)' }}>·</span>
            <span style={{ fontSize:9, color:'var(--dim)' }}>{state.menu.filter(i=>i.available).length} items available</span>
            <span style={{ fontSize:9, color:'var(--dim)' }}>·</span>
            <span style={{ fontSize:9, color:'#34D399' }}>✦ Halal Certified</span>
          </div>
          <h1 className="sec-h" style={{ marginBottom:0 }}>Everything<br/><em>We Serve</em></h1>
        </div>
        <div className="watermark" style={{ fontSize:180 }}>MENU</div>
      </div>

      {/* Mega category filter */}
      <div style={{ background:'var(--deep)', borderBottom:'1px solid var(--line2)', padding:'0 92px', position:'sticky', top: topOffset, zIndex:200 }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          {/* Category tabs */}
          <div className="mega-filter" style={{ borderBottom:'1px solid var(--line2)' }}>
            {CATS.map(c => (
              <button key={c.id} className={`mf-btn${cat===c.id?' on':''}`} onClick={()=>setCat(c.id)}>
                <span className="mf-btn-icon">{c.icon}</span>
                <span className="mf-btn-label">{c.l}</span>
                <span className="mf-btn-count">{countByCat[c.id]||0}</span>
              </button>
            ))}
          </div>

          {/* Search + filters row */}
          <div style={{ display:'flex', gap:8, alignItems:'center', padding:'12px 0', flexWrap:'wrap' }}>
            {/* Search */}
            <div className="search-wrap" style={{ flex:1, minWidth:180 }}>
              <span className="search-icon">🔍</span>
              <input
                ref={inputRef}
                className="fsearch"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${filtered.length} items... (press /)`}
                style={{ width:'100%', paddingLeft:38 }}
              />
              {search && <button className="search-clear" onClick={() => setSearch('')}>×</button>}
            </div>

            {/* Toggle filters */}
            {[['🌿 Veg', veg, () => setVeg(v=>!v)], ['🌶 Spicy', spicy, () => setSpicy(s=>!s)]].map(([l,on,fn]) => (
              <button key={l} onClick={fn} style={{
                fontSize:9.5, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase',
                padding:'7px 14px', background:on?'#34D399':'transparent',
                border:`1px solid ${on?'#34D399':'var(--line2)'}`, color:on?'var(--void)':'var(--dim)',
                cursor:'pointer', transition:'all .22s', borderRadius:20, whiteSpace:'nowrap',
              }}>{l}</button>
            ))}

            {/* Sort */}
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{
              background:'var(--surface)', border:'1px solid var(--line2)', color:'var(--dim)',
              padding:'7px 12px', fontSize:10, cursor:'pointer', outline:'none', letterSpacing:'1px',
            }}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name">Name A–Z</option>
              <option value="cal">Calories ↑</option>
            </select>

            {/* View toggle */}
            <div style={{ display:'flex', gap:0, border:'1px solid var(--line2)' }}>
              {[['grid','▦'],['list','≡']].map(([v,icon]) => (
                <button key={v} onClick={()=>setView(v)} style={{
                  padding:'7px 11px', background:view===v?'var(--raised)':'transparent',
                  border:'none', color:view===v?'var(--gold2)':'var(--dim)',
                  cursor:'pointer', fontSize:14, transition:'all .2s',
                }}>{icon}</button>
              ))}
            </div>

            <span style={{ fontSize:11, color:'var(--dim)', marginLeft:'auto', whiteSpace:'nowrap' }}>
              {filtered.length} of {state.menu.length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid / List */}
      <div style={{ padding:'32px 92px 92px', maxWidth:1400, margin:'0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:52, marginBottom:16, opacity:.2 }}>🔍</div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:22, color:'var(--cream)', marginBottom:8 }}>No items found</div>
            <p style={{ color:'var(--dim)', fontSize:14 }}>Try removing some filters or searching for something else.</p>
            <button className="btn btn-outline btn-sm" style={{ marginTop:20 }} onClick={() => { setSearch(''); setCat('all'); setVeg(false); setSpicy(false) }}>Clear filters</button>
          </div>
        ) : view === 'grid' ? (
          <div className="menu-grid">
            {filtered.map(item => <MenuCard key={item.id} item={item} icon={icon} dispatch={dispatch} toast={toast} isWished={isWished}/>)}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {filtered.map(item => <MenuRow key={item.id} item={item} icon={icon} dispatch={dispatch} toast={toast} isWished={isWished}/>)}
          </div>
        )}
      </div>
    </div>
  )
}

function MenuCard({ item, icon, dispatch, toast, isWished }) {
  const wished = isWished(item.id)
  return (
    <div className={`mc${!item.available?' off':''}`} style={{ position:'relative', overflow:'hidden' }}>
      {/* Background image — blends with dark surface */}
      {item.image && (
        <div style={{
          position:'absolute', inset:0, zIndex:0,
          backgroundImage:`url(${item.image})`,
          backgroundSize:'cover', backgroundPosition:'center',
          opacity:.13,
          maskImage:'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          WebkitMaskImage:'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          pointerEvents:'none',
        }}/>
      )}
      <div style={{ position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        {/* Show image thumbnail if exists, else emoji icon */}
        {item.image ? (
          <div style={{
            width:52, height:52,
            borderRadius:4,
            overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.08)',
            flexShrink:0,
          }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'luminosity' }}
              onError={e=>{ e.target.style.display='none' }}
            />
          </div>
        ) : (
          <div className="mc-icon" style={{ transition:'transform .4s var(--e2)' }}>{icon(item.cat)}</div>
        )}
        <div style={{ display:'flex', gap:3, flexWrap:'wrap', justifyContent:'flex-end' }}>
          {item.veg   && <span className="badge badge-veg">Veg</span>}
          {item.spicy && <span className="badge badge-hot">Hot</span>}
          {item.featured && <span style={{ fontSize:8, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'2px 7px', background:'linear-gradient(135deg,var(--fire),var(--gold2))', color:'var(--void)' }}>Popular</span>}
        </div>
      </div>
      <div style={{ position:'relative', zIndex:1 }}>
      <div className="mc-name">{item.name}</div>
      <p className="mc-desc">{item.desc}</p>
      {item.prepTime && <div style={{ fontSize:10, color:'var(--dim)', marginBottom:8 }}>⏱ {item.prepTime}</div>}
      <div style={{ display:'flex', flexWrap:'wrap', gap:3, marginBottom:14 }}>
        {(item.tags||[]).slice(0,3).map(t => (
          <span key={t} style={{ fontSize:8.5, fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', padding:'2px 7px', background:'var(--raised)', border:'1px solid var(--line2)', color:'var(--dim)' }}>{t}</span>
        ))}
      </div>
      <div className="mc-foot">
        <div>
          <div className="mc-price">${item.price.toFixed(2)}</div>
          {item.cal > 0 && <div style={{ fontSize:11, color:'var(--dim)', marginTop:2 }}>{item.cal} cal</div>}
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <button
            onClick={() => { dispatch({type:'TOGGLE_WISH',id:item.id}); toast(wished?'Removed from saved':'Saved! ❤️','info') }}
            style={{ background:'none', border:'1px solid var(--line2)', color:wished?'#F87171':'var(--dim)', padding:'7px 9px', cursor:'pointer', fontSize:14, transition:'all .22s' }}
          >{wished?'❤️':'🤍'}</button>
          {item.available && (
            <button className="mc-add" onClick={() => { dispatch({type:'CART_ADD',item}); toast(`${item.name} added 🔥`,'fire') }}>+ Add</button>
          )}
        </div>
      </div>
      </div>{/* /position relative wrapper */}
    </div>
  )
}

function MenuRow({ item, icon, dispatch, toast, isWished }) {
  const wished = isWished(item.id)
  return (
    <div style={{ display:'flex', gap:16, padding:'16px 20px', background:'var(--surface)', border:'1px solid var(--line2)', alignItems:'center', transition:'border-color .3s', cursor:'default' }}
      onMouseEnter={e=>e.currentTarget.style.borderColor='var(--line)'}
      onMouseLeave={e=>e.currentTarget.style.borderColor=''}
    >
      <div style={{ fontSize:28, flexShrink:0 }}>{icon(item.cat)}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:3, flexWrap:'wrap' }}>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--cream)' }}>{item.name}</div>
          {item.veg     && <span className="badge badge-veg">Veg</span>}
          {item.spicy   && <span className="badge badge-hot">Hot</span>}
          {item.featured && <span style={{ fontSize:7.5, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'2px 7px', background:'linear-gradient(135deg,var(--fire),var(--gold2))', color:'var(--void)' }}>Popular</span>}
        </div>
        <p style={{ fontSize:13, fontWeight:300, color:'var(--dim)', lineHeight:1.5, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:500 }}>{item.desc}</p>
      </div>
      <div style={{ display:'flex', gap:16, alignItems:'center', flexShrink:0 }}>
        {item.cal > 0 && <span style={{ fontSize:11, color:'var(--dim)' }}>{item.cal} cal</span>}
        {item.prepTime && <span style={{ fontSize:11, color:'var(--dim)' }}>⏱ {item.prepTime}</span>}
        <div style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:700, color:'var(--gold2)', letterSpacing:-1 }}>${item.price.toFixed(2)}</div>
        <button onClick={() => { dispatch({type:'TOGGLE_WISH',id:item.id}) }} style={{ background:'none', border:'1px solid var(--line2)', color:wished?'#F87171':'var(--dim)', padding:'6px 8px', cursor:'pointer', fontSize:13, transition:'all .2s' }}>{wished?'❤️':'🤍'}</button>
        {item.available && <button className="mc-add" onClick={() => { dispatch({type:'CART_ADD',item}); toast(`Added 🔥`,'fire') }}>+ Add</button>}
      </div>
    </div>
  )
}

// cart sidebar + the HAI chatbot widget
// TODO: persist cart across sessions eventually
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store.jsx'
import { LOYALTY_TIERS } from '../data/data.js'

/* ── CART ── */
export function CartSidebar() {
  const { state, dispatch, subtotal, tax, total, loyaltyTier, completeOrder, toast } = useStore()
  const nav = useNavigate()
  if (!state.cartOpen) return null
  const close = () => dispatch({ type:'CART_OPEN', open:false })
  const tier = LOYALTY_TIERS[loyaltyTier]
  const next = LOYALTY_TIERS[Math.min(loyaltyTier+1, LOYALTY_TIERS.length-1)]
  const prog = loyaltyTier<3 ? Math.min(((state.loyalty.total-tier.min)/(next.min-tier.min))*100,100) : 100
  const checkout = () => {
    if(!state.cart.length) return
    const r = completeOrder()
    toast(`Order placed! +${r.pts} flame points 🔥`, 'fire')
    close(); nav('/receipt', { state: r })
  }
  const icon = c=>({wraps:'🫔',plates:'🍽',sides:'🥙',drinks:'🍋',desserts:'🍯'}[c]||'🍴')
  return (
    <>
      <div className="cart-overlay" onClick={close}/>
      <aside className="cart-panel">
        <div className="cart-hd">
          <div>
            <span style={{fontFamily:'var(--ff-display)',fontSize:22,fontWeight:700}}>Your Order</span>
            {state.cart.length>0&&<span style={{fontSize:11,color:'var(--dim)',marginLeft:10}}>{state.cart.reduce((s,i)=>s+i.qty,0)} items</span>}
          </div>
          <button className="cart-close" onClick={close}>×</button>
        </div>
        <div className="cart-tabs">
          {[['pickup','🛍 Pickup'],['delivery','🛵 Delivery'],['dinein','🍽 Dine In']].map(([k,l])=>(
            <button key={k} className={`ctab${state.orderType===k?' on':''}`} onClick={()=>dispatch({type:'SET_ORDER_TYPE',orderType:k})}>{l}</button>
          ))}
        </div>
        {state.cart.length===0 ? (
          <div className="cart-empty">
            <div style={{fontSize:44,opacity:.22,animation:'haiFlt 3s ease-in-out infinite'}}>🫙</div>
            <div>Your cart is empty</div>
            <Link to="/menu" className="btn btn-outline btn-sm" onClick={close}>Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-list">
            {state.cart.map(item=>(
              <div key={item.id} className="cart-row">
                <div className="cart-icon">{icon(item.cat)}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'var(--ff-display)',fontSize:15,fontWeight:700,marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--gold2)',marginBottom:8}}>${(item.price*item.qty).toFixed(2)}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <button className="qty-btn" onClick={()=>dispatch({type:'CART_QTY',id:item.id,qty:item.qty-1})}>−</button>
                    <span style={{fontSize:13,fontWeight:600,minWidth:20,textAlign:'center'}}>{item.qty}</span>
                    <button className="qty-btn" onClick={()=>dispatch({type:'CART_QTY',id:item.id,qty:item.qty+1})}>+</button>
                    <button style={{marginLeft:'auto',background:'none',border:'none',color:'var(--dim)',cursor:'pointer',fontSize:14,transition:'color .2s'}} onMouseEnter={e=>e.target.style.color='#F87171'} onMouseLeave={e=>e.target.style.color=''} onClick={()=>{dispatch({type:'CART_REMOVE',id:item.id});toast('Removed','info')}}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {state.cart.length>0&&(
          <div className="cart-foot">
            <div style={{background:'rgba(232,192,64,.06)',border:'1px solid rgba(232,192,64,.14)',padding:'12px 14px',marginBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
                <span style={{fontFamily:'var(--ff-display)',fontSize:13,fontWeight:600,color:'var(--gold2)'}}>{tier.badge} {tier.name}</span>
                <span style={{fontSize:11,color:'var(--dim)'}}>{state.loyalty.pts.toLocaleString()} pts</span>
              </div>
              <div style={{height:3,background:'var(--line2)',borderRadius:2,overflow:'hidden',marginBottom:6}}>
                <div style={{height:'100%',background:'linear-gradient(to right,var(--fire),var(--gold2))',width:`${prog}%`,transition:'width .9s var(--e1)'}}/>
              </div>
              <div style={{fontSize:11,color:'var(--dim)'}}>Earn <b style={{color:'var(--gold2)'}}>+{Math.floor(total*10)} pts</b> this order</div>
            </div>
            <textarea style={{width:'100%',background:'var(--surface)',border:'1px solid var(--line2)',color:'var(--cream)',padding:'9px 12px',fontSize:13,resize:'none',height:52,marginBottom:14,fontFamily:'var(--ff-body)',outline:'none'}} placeholder="Special requests..." value={state.note} onChange={e=>dispatch({type:'SET_NOTE',note:e.target.value})}/>
            <div>
              <div className="ct-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="ct-row"><span>HST (13%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="ct-row big"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:14}} onClick={checkout}>
              Place Order · ${total.toFixed(2)}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

/* ── HAI ── */
const KB = [
  {k:/hi|hello|hey|salam/,a:'Ahlan! I\'m HAI 🔥 — Heritage AI. Ask me anything about our menu, hours, or catering!'},
  {k:/chicken/,a:'Chicken Shawarma — 24h marinated in 11 spices. Wrap $12.99 or Plate $16.99 with saffron rice. Our most-ordered dish!'},
  {k:/beef|lamb/,a:'Beef & Lamb — slow-roasted shoulder. Wrap $14.99, Plate $19.99. Rich, bold flavour.'},
  {k:/halal/,a:'100% halal certified. Every ingredient, every protein. Non-negotiable from day one.'},
  {k:/hour|open|time/,a:'Mon–Thu 11AM–10PM · Fri–Sat 11AM–11PM · Sunday 12PM–9PM.'},
  {k:/location|where|address|find|park/,a:'2620 Simcoe St N, Unit 6, Oshawa ON. Free plaza parking right in front. Call (289) 980-0149.'},
  {k:/price|cost|menu|how much/,a:'Wraps $10.99–$15.99 · Plates $13.99–$34.99 · Sides $0.99–$7.49 · Drinks $1.49–$4.49 · Desserts $3.99–$7.49'},
  {k:/cater|event|party|wedding|corporate/,a:'We cater 15–300+ guests! Packages from $299. Call (289) 980-0149 or visit our Catering page.'},
  {k:/knafeh|dessert|baklava/,a:'Knafeh ($7.49) — warm cheese pastry, rose water, pistachios. Life-changing. Baklava 3pc $5.99.'},
  {k:/loyalty|point|reward|discount/,a:'Earn 10 flame points per dollar! 4 tiers: 5% → 8% → 12% → 15% off. Check the Loyalty page!'},
  {k:/spicy|hot|harissa/,a:'Spicy Chicken Wrap ($13.99) — harissa, jalapeños, spicy garlic. Not for the faint-hearted.'},
  {k:/grand|platter|two|share/,a:'Heritage Grand Platter ($34.99) — all meats, saffron rice, hummus, fattoush, all four sauces. The full Heritage experience for two.'},
]
const match = m => { const l=m.toLowerCase(); for(const {k,a} of KB){ if(k.test(l)) return a } return 'Great question! Call us at (289) 980-0149 or visit 2620 Simcoe St N, Oshawa. Open daily!' }
const QUICK = ['Menu prices','Halal certified?','Opening hours','Loyalty rewards','Catering info','Spicy options']

export function HAI() {
  const [open,setOpen]=useState(false)
  const [msgs,setMsgs]=useState([{r:'bot',t:'Ahlan! I\'m HAI 🔥 — Heritage AI. Ask me about the menu, hours, loyalty, or catering!'}])
  const [inp,setInp]=useState('')
  const [typing,setTyping]=useState(false)
  const end=useRef(null)
  useEffect(()=>{end.current?.scrollIntoView({behavior:'smooth'})},[msgs,typing])
  const send=txt=>{
    const m=txt||inp.trim();if(!m)return
    setInp('');setMsgs(p=>[...p,{r:'usr',t:m}]);setTyping(true)
    setTimeout(()=>{setTyping(false);setMsgs(p=>[...p,{r:'bot',t:match(m)}])},600+Math.random()*500)
  }
  return (
    <>
      <button className="hai-fab" onClick={()=>setOpen(o=>!o)} aria-label="Chat">{open?'✕':'🔥'}</button>
      {open&&(
        <div className="hai-win">
          <div className="hai-hd">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div className="hai-av">HAI</div>
              <div>
                <div style={{fontFamily:'var(--ff-display)',fontSize:14,fontWeight:600}}>HAI — Heritage AI</div>
                <div style={{fontSize:9.5,color:'#34D399',display:'flex',alignItems:'center',gap:5}}>
                  <span style={{width:5,height:5,borderRadius:'50%',background:'#34D399',display:'inline-block'}}/>Online
                </div>
              </div>
            </div>
            <button style={{background:'none',border:'none',color:'var(--dim)',cursor:'pointer',fontSize:20,lineHeight:1,transition:'all .2s'}} onMouseEnter={e=>e.target.style.color='var(--cream)'} onClick={()=>setOpen(false)}>×</button>
          </div>
          <div className="hai-msgs">
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',gap:8,alignSelf:m.r==='usr'?'flex-end':'flex-start',maxWidth:'90%',flexDirection:m.r==='usr'?'row-reverse':'row'}}>
                {m.r==='bot'&&<div className="hai-av" style={{width:26,height:26,fontSize:8.5,flexShrink:0}}>HAI</div>}
                <div className={m.r==='usr'?'hai-usr':'hai-bot'}>{m.t}</div>
              </div>
            ))}
            {typing&&<div style={{display:'flex',gap:8,alignSelf:'flex-start'}}><div className="hai-av" style={{width:26,height:26,fontSize:8.5,flexShrink:0}}>HAI</div><div className="hai-bot"><div className="hai-typing"><span/><span/><span/></div></div></div>}
            <div ref={end}/>
          </div>
          <div className="hai-qbtns">{QUICK.map(q=><button key={q} className="hai-qbtn" onClick={()=>send(q)}>{q}</button>)}</div>
          <div className="hai-irow">
            <input className="hai-inp" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything..."/>
            <button className="hai-send" onClick={()=>send()}>→</button>
          </div>
        </div>
      )}
    </>
  )
}

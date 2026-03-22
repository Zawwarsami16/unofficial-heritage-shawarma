// 4 games: tic-tac-toe (minimax ai), spice scramble, trivia, snake
// snake canvas doesnt use roundRect because it breaks on older safari
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLayout } from '../hooks/layout.jsx'
import { useReveal } from '../components/SmoothScroll.jsx'
import { useStore } from '../context/Store.jsx'
import { NoiseCard } from '../components/Effects.jsx'

/* ── TTT helpers ── */
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
function checkWin(b){for(const[a,c,d]of WIN_LINES){if(b[a]&&b[a]===b[c]&&b[c]===b[d])return b[a]}if(b.every(Boolean))return'draw';return null}
function findWinLine(b){for(const l of WIN_LINES){const[a,c,d]=l;if(b[a]&&b[a]===b[c]&&b[c]===b[d])return l}return null}
function minimax(b,depth,isMax){const w=checkWin(b);if(w==='O')return 10-depth;if(w==='X')return depth-10;if(w==='draw')return 0;const scores=[];for(let i=0;i<9;i++){if(!b[i]){b[i]=isMax?'O':'X';scores.push(minimax(b,depth+1,!isMax));b[i]=null}}return isMax?Math.max(...scores):Math.min(...scores)}
function getBestMove(b){let best=-Infinity,idx=0;for(let i=0;i<9;i++){if(!b[i]){b[i]='O';const s=minimax(b,0,false);b[i]=null;if(s>best){best=s;idx=i}}}return idx}


function TicTacToe(){
  const{toast}=useStore()
  const[board,setBoard]=useState(Array(9).fill(null))
  const[xTurn,setXTurn]=useState(true)
  const[scores,setScores]=useState({x:0,o:0,d:0})
  const[status,setStatus]=useState('')
  const[winLine,setWinLine]=useState(null)
  const[busy,setBusy]=useState(false)
  const winner=checkWin(board)

  const click=i=>{
    if(board[i]||winner||!xTurn||busy)return
    const nb=[...board];nb[i]='X';setBoard(nb);setXTurn(false)
    const w=checkWin(nb)
    if(w==='X'){setStatus('🎉 You win!');setScores(s=>({...s,x:s.x+1}));setWinLine(findWinLine(nb));toast('You beat the AI! 🏆','fire');return}
    if(w==='draw'){setStatus('🤝 Draw!');setScores(s=>({...s,d:s.d+1}));return}
    setBusy(true)
    setTimeout(()=>{
      const m=getBestMove([...nb]);const ab=[...nb];ab[m]='O';setBoard(ab);setXTurn(true);setBusy(false)
      const w2=checkWin(ab)
      if(w2==='O'){setStatus('🤖 AI wins!');setScores(s=>({...s,o:s.o+1}));setWinLine(findWinLine(ab))}
      else if(w2==='draw'){setStatus('🤝 Draw!');setScores(s=>({...s,d:s.d+1}))}
    },420)
  }
  const reset=()=>{setBoard(Array(9).fill(null));setXTurn(true);setStatus('');setWinLine(null)}

  return(
    <div style={{userSelect:'none'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:2,marginBottom:22}}>
        {[['You (X)',scores.x,'var(--fire)'],['Draw',scores.d,'var(--dim)'],['AI (O)',scores.o,'var(--gold2)']].map(([l,v,c])=>(
          <div key={l} style={{background:'var(--raised)',border:'1px solid var(--line2)',padding:'12px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--ff-display)',fontSize:28,fontWeight:700,color:c,lineHeight:1}}>{v}</div>
            <div style={{fontSize:9,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'var(--dim)',marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',fontFamily:'var(--ff-display)',fontSize:16,color:'var(--gold2)',marginBottom:16,minHeight:24}}>
        {status||(busy?'AI thinking...':(xTurn?'Your turn — place X':''))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3,maxWidth:258,margin:'0 auto 22px'}}>
        {board.map((cell,i)=>{
          const isW=winLine?.includes(i)
          return(
            <button key={i} onClick={()=>click(i)} style={{
              aspectRatio:'1/1',background:isW?'rgba(255,92,26,0.18)':'var(--surface)',
              border:`1px solid ${isW?'rgba(255,92,26,0.55)':'var(--line2)'}`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'var(--ff-display)',fontSize:46,fontWeight:700,
              color:cell==='X'?'var(--fire)':'var(--gold2)',
              cursor:(cell||winner||busy)?'default':'pointer',
              transition:'all .2s',transform:isW?'scale(1.04)':'',
            }}
            onMouseEnter={e=>{if(!cell&&!winner&&xTurn&&!busy)e.currentTarget.style.background='var(--raised)'}}
            onMouseLeave={e=>{if(!isW)e.currentTarget.style.background=''}}>
              {cell}
            </button>
          )
        })}
      </div>
      <div style={{textAlign:'center'}}>
        <button className="btn btn-outline btn-sm" onClick={reset}>New Game</button>
      </div>
    </div>
  )
}


const WORDS=[
  {w:'SHAWARMA', h:"Lebanon's most beloved street food", e:'🫔'},
  {w:'HUMMUS',   h:'Creamy chickpea spread, house-made fresh', e:'🥙'},
  {w:'TAHINI',   h:'Sesame paste — the soul of Heritage sauces', e:'🌰'},
  {w:'FALAFEL',  h:'Golden crispy plant-based chickpea balls', e:'🟤'},
  {w:'HARISSA',  h:'North African chili paste — fiery and complex', e:'🌶'},
  {w:'KNAFEH',   h:'Warm shredded wheat pastry with sweet cheese', e:'🍯'},
  {w:'BAKLAVA',  h:'Layered phyllo pastry soaked in honey', e:'🍮'},
  {w:'FATTOUSH', h:'Lebanese salad with crispy pita chips', e:'🥗'},
  {w:'KOFTA',    h:'Seasoned ground beef and lamb skewer', e:'🍢'},
  {w:'SAFFRON',  h:'Golden spice in Heritage rice', e:'✨'},
  {w:'TABBOULEH',h:'Fresh parsley and bulgur wheat salad', e:'🌿'},
  {w:'JALLAB',   h:'Grape, rose water and pomegranate drink', e:'🍹'},
  {w:'SUMAC',    h:'Deep red spice with tangy citrus flavour', e:'🔴'},
  {w:'ZAATAR',   h:'Herb blend of thyme, sesame, and sumac', e:'🌱'},
]

function scramble(word){
  const a=word.split('')
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a.join('')===word?scramble(word):a.join('')
}

function SpiceScramble(){
  const{toast}=useStore()
  const[deck]=useState(()=>[...WORDS].sort(()=>Math.random()-.5))
  const[idx,setIdx]=useState(0)
  const[sc,setSc]=useState(()=>scramble(WORDS[0].w))
  const[guess,setGuess]=useState('')
  const[result,setResult]=useState({msg:'',ok:null})
  const[score,setScore]=useState(0)
  const[streak,setStreak]=useState(0)
  const[time,setTime]=useState(30)
  const[revealed,setRevealed]=useState(false)
  const ivRef=useRef(null)
  const inputRef=useRef(null)
  const cur=deck[idx%deck.length]

  useEffect(()=>{
    setTime(30)
    clearInterval(ivRef.current)
    ivRef.current=setInterval(()=>{
      setTime(t=>{
        if(t<=1){clearInterval(ivRef.current);setResult({msg:`⏰ Time's up! Answer: ${cur.w}`,ok:false});setRevealed(true);return 0}
        return t-1
      })
    },1000)
    return()=>clearInterval(ivRef.current)
  },[idx])

  const next=useCallback(()=>{
    clearInterval(ivRef.current)
    const ni=idx+1;const nw=deck[ni%deck.length]
    setIdx(ni);setSc(scramble(nw.w));setGuess('');setResult({msg:'',ok:null});setRevealed(false)
    setTimeout(()=>inputRef.current?.focus(),50)
  },[idx,deck])

  const check=()=>{
    if(revealed)return
    clearInterval(ivRef.current)
    if(guess.trim().toUpperCase()===cur.w){
      const bonus=time>20?15:time>10?10:5,ns=streak+1
      setScore(s=>s+bonus);setStreak(ns)
      setResult({msg:`✅ Correct! +${bonus} pts${ns>=3?` 🔥 ${ns}x!`:''}`,ok:true})
      toast(ns>=3?`🔥 ${ns}x streak!`:`+${bonus} pts!`,'fire')
      setTimeout(next,900)
    }else{setStreak(0);setResult({msg:'❌ Try again!',ok:false})}
  }

  const reveal=()=>{clearInterval(ivRef.current);setResult({msg:`💡 Answer: ${cur.w}`,ok:false});setRevealed(true)}
  const circ=2*Math.PI*22
  const tc=time>20?'#34D399':time>10?'var(--gold2)':'var(--fire)'

  return(
    <div style={{textAlign:'center'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--dim)'}}>
          Word {(idx%deck.length)+1}/{deck.length}{streak>=2&&<span style={{marginLeft:10,color:'var(--fire)'}}>🔥 {streak}x</span>}
        </div>
        <div style={{fontFamily:'var(--ff-display)',fontSize:26,fontWeight:700,color:'var(--gold2)',lineHeight:1}}>{score} pts</div>
      </div>
      <div style={{position:'relative',width:56,height:56,margin:'0 auto 16px'}}>
        <svg width={56} height={56} style={{transform:'rotate(-90deg)'}}>
          <circle cx={28} cy={28} r={22} fill="none" stroke="var(--line2)" strokeWidth={2}/>
          <circle cx={28} cy={28} r={22} fill="none" stroke={tc} strokeWidth={2.5}
            strokeDasharray={circ} strokeDashoffset={circ*(1-time/30)} strokeLinecap="round"
            style={{transition:'stroke-dashoffset .9s linear,stroke .3s'}}/>
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--ff-mono)',fontSize:14,fontWeight:700,color:tc}}>{time}</div>
      </div>
      <div style={{fontSize:36,marginBottom:10}}>{cur.e}</div>
      <div style={{fontFamily:'var(--ff-mono)',fontSize:'clamp(20px,4vw,34px)',letterSpacing:6,color:'var(--ember)',fontWeight:700,marginBottom:14,wordBreak:'break-all'}}>{sc}</div>
      <p style={{fontSize:13,color:'var(--dim)',fontStyle:'italic',lineHeight:1.65,maxWidth:300,margin:'0 auto 20px'}}>💡 {cur.h}</p>
      <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:12}}>
        <input ref={inputRef}
          style={{background:'var(--surface)',border:`1px solid ${result.ok===true?'#34D399':result.ok===false?'var(--fire)':'var(--line2)'}`,color:'var(--cream)',padding:'10px 14px',fontSize:14,textTransform:'uppercase',letterSpacing:3,width:190,textAlign:'center',outline:'none',fontFamily:'var(--ff-mono)',transition:'border-color .25s'}}
          value={guess} onChange={e=>setGuess(e.target.value.toUpperCase())}
          onKeyDown={e=>e.key==='Enter'&&!revealed&&check()}
          placeholder="TYPE ANSWER" maxLength={12} disabled={revealed} autoFocus/>
        {!revealed&&<button className="btn btn-primary btn-sm" onClick={check}>Check</button>}
      </div>
      <div style={{minHeight:22,fontSize:13,fontWeight:600,color:result.ok===true?'#34D399':result.ok===false?'var(--fire)':'transparent',marginBottom:14}}>
        {result.msg||'.'}
      </div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {!revealed&&<button className="btn btn-outline btn-xs" onClick={reveal}>Reveal</button>}
        {revealed&&<button className="btn btn-primary btn-sm" onClick={next}>Next →</button>}
        <button className="btn btn-ghost btn-xs" onClick={()=>{clearInterval(ivRef.current);next()}}>Skip</button>
      </div>
    </div>
  )
}


const QS=[
  {q:'How long does Heritage marinate their chicken?',opts:['1 hour','4 hours','Overnight 24h','30 minutes'],ans:2,ex:'Full 24 hours in 11 heritage spices.'},
  {q:'What street is Heritage Shawarma on in Oshawa?',opts:['King Street','Simcoe Street N','Dundas Street','Wilson Road'],ans:1,ex:'2620 Simcoe St N, Unit 6, Oshawa.'},
  {q:'How many Flame Points per dollar spent?',opts:['1','5','10','20'],ans:2,ex:'10 Flame Points per dollar — they add up fast!'},
  {q:'What certification does Heritage hold?',opts:['Organic','Halal','Kosher','Free-range'],ans:1,ex:'100% Halal certified — every ingredient, every protein.'},
  {q:'The Grand Platter is designed for how many?',opts:['One person','Two people','Four people','Eight people'],ans:1,ex:'Grand Platter ($34.99) — the ultimate for two.'},
  {q:'Which dessert has warm cheese and rose water syrup?',opts:['Baklava','Halva','Knafeh','Maamoul'],ans:2,ex:'Knafeh ($7.49) — our most popular dessert, served warm.'},
  {q:'Ayran is described as what?',opts:['A lemon drink','A grape juice','A chilled yogurt drink','A spiced tea'],ans:2,ex:'Traditional chilled yogurt drink — pairs perfectly with shawarma.'},
  {q:'What year did Heritage Shawarma open?',opts:['2010','2012','2015','2019'],ans:2,ex:'Heritage opened in 2015 with 3 menu items and 2 staff.'},
  {q:'How many spices in Heritage chicken marinade?',opts:['4','7','11','15'],ans:2,ex:'The signature marinade uses exactly 11 heritage spices.'},
  {q:'Highest Flame Loyalty tier name?',opts:['Gold Flame','Fire Keeper','Heritage Legend','Grand Master'],ans:2,ex:'Heritage Legend — 15% off plus free birthday meal.'},
  {q:'What bread is used in Heritage wraps?',opts:['Naan','Tortilla','Saj bread','Sourdough'],ans:2,ex:'Warm saj bread — traditional and freshly made.'},
  {q:'Which delivery platform carries Heritage?',opts:['Grubhub','Postmates','SkipTheDishes','Instacart'],ans:2,ex:'Available on SkipTheDishes, Uber Eats, and DoorDash.'},
]

function Trivia(){
  const{toast}=useStore()
  const[qi,setQi]=useState(0)
  const[chosen,setChosen]=useState(null)
  const[score,setScore]=useState(0)
  const[done,setDone]=useState(false)
  const[history,setHistory]=useState([])
  const[time,setTime]=useState(20)
  const ivRef=useRef(null)

  useEffect(()=>{
    if(chosen!==null||done)return
    setTime(20)
    clearInterval(ivRef.current)
    ivRef.current=setInterval(()=>{
      setTime(t=>{
        if(t<=1){
          clearInterval(ivRef.current)
          setChosen(-1)
          setHistory(h=>[...h,{qi,timedOut:true}])
          return 0
        }
        return t-1
      })
    },1000)
    return()=>clearInterval(ivRef.current)
  },[qi,done])

  const pick=i=>{
    if(chosen!==null)return
    clearInterval(ivRef.current)
    setChosen(i)
    const ok=i===QS[qi].ans
    if(ok){setScore(s=>s+1);toast('+1 🎉','fire')}
    setHistory(h=>[...h,{qi,chosen:i,correct:ok}])
    setTimeout(()=>{
      if(qi+1>=QS.length)setDone(true)
      else{setQi(q=>q+1);setChosen(null)}
    },1500)
  }

  const restart=()=>{setQi(0);setChosen(null);setScore(0);setDone(false);setHistory([])}

  if(done){
    const pct=Math.round(score/QS.length*100)
    return(
      <div style={{textAlign:'center'}}>
        <div style={{fontFamily:'var(--ff-display)',fontSize:68,fontWeight:900,color:'var(--gold2)',letterSpacing:-3,lineHeight:1,marginBottom:6}}>
          {score}<span style={{fontSize:28,color:'var(--dim)'}}>/{QS.length}</span>
        </div>
        <div style={{fontFamily:'var(--ff-display)',fontSize:18,color:'var(--cream)',marginBottom:8}}>
          {pct>=90?'🏆 Heritage Expert!':pct>=70?'🔥 Great work!':pct>=50?'👍 Not bad!':'🫔 Keep visiting!'}
        </div>
        <p style={{fontSize:13,color:'var(--dim)',marginBottom:22}}>
          {pct>=90?'You really know your shawarma.':'Visit more and you\'ll ace it next time!'}
        </p>
        <div style={{textAlign:'left',maxHeight:200,overflowY:'auto',marginBottom:20}}>
          {QS.map((q,i)=>{
            const h=history.find(x=>x.qi===i)
            return(
              <div key={i} style={{display:'flex',gap:8,padding:'7px 0',borderBottom:'1px solid var(--line2)',alignItems:'flex-start'}}>
                <span style={{fontSize:13,flexShrink:0}}>{h?.correct?'✅':'❌'}</span>
                <div>
                  <div style={{fontSize:12,color:'var(--cream)',marginBottom:1}}>{q.q}</div>
                  {!h?.correct&&<div style={{fontSize:11,color:'var(--gold2)'}}>💡 {q.ex}</div>}
                </div>
              </div>
            )
          })}
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn btn-primary btn-sm" onClick={restart}>Play Again</button>
          <Link to="/menu" className="btn btn-outline btn-sm">Order Now</Link>
        </div>
      </div>
    )
  }

  const q=QS[qi]
  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--dim)'}}>Q{qi+1}/{QS.length}</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:11,color:time<=5?'var(--fire)':'var(--dim)',fontFamily:'var(--ff-mono)',fontWeight:700}}>⏱{time}s</span>
          <span style={{fontFamily:'var(--ff-display)',fontSize:20,fontWeight:700,color:'var(--gold2)'}}>{score} correct</span>
        </div>
      </div>
      <div style={{height:3,background:'var(--line2)',borderRadius:2,overflow:'hidden',marginBottom:8}}>
        <div style={{height:'100%',background:'linear-gradient(to right,var(--fire),var(--gold2))',width:`${qi/QS.length*100}%`,transition:'width .5s var(--e1)'}}/>
      </div>
      <div style={{height:2,background:'var(--line2)',borderRadius:1,overflow:'hidden',marginBottom:18}}>
        <div style={{height:'100%',background:time>10?'#34D399':time>5?'var(--gold2)':'var(--fire)',width:`${time/20*100}%`,transition:'width .9s linear,background .3s'}}/>
      </div>
      <div style={{background:'var(--raised)',border:'1px solid var(--line2)',padding:'16px 18px',marginBottom:14}}>
        <p style={{fontFamily:'var(--ff-display)',fontSize:15,color:'var(--cream)',lineHeight:1.55}}>{q.q}</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
        {q.opts.map((opt,i)=>{
          const ok=chosen!==null&&i===q.ans,wr=chosen===i&&i!==q.ans,fd=chosen!==null&&!ok&&chosen!==i
          return(
            <button key={i} onClick={()=>pick(i)} style={{
              padding:'12px 14px',textAlign:'left',fontSize:13,lineHeight:1.4,
              background:ok?'rgba(52,211,153,.15)':wr?'rgba(248,113,113,.15)':fd?'rgba(255,255,255,.02)':'var(--surface)',
              border:`1px solid ${ok?'#34D399':wr?'#F87171':'var(--line2)'}`,
              color:ok?'#34D399':wr?'#F87171':fd?'var(--dim)':'var(--muted)',
              cursor:chosen!==null?'default':'pointer',transition:'all .2s',
            }}>
              <span style={{fontFamily:'var(--ff-mono)',marginRight:8,fontSize:10,color:'var(--dim)'}}>{['A','B','C','D'][i]}.</span>
              {opt}{ok?' ✓':wr?' ✗':''}
            </button>
          )
        })}
      </div>
      {chosen!==null&&(
        <div style={{marginTop:12,padding:'10px 14px',background:'rgba(232,192,64,.06)',border:'1px solid rgba(232,192,64,.18)',fontSize:13,color:'var(--muted)',lineHeight:1.7}}>
          💡 {q.ex}
        </div>
      )}
    </div>
  )
}


const GS=20,CS=17

function SnakeGame(){
  const{toast}=useStore()
  const cvRef=useRef(null)
  const gRef=useRef({snake:[{x:10,y:10}],dir:{x:1,y:0},nextDir:{x:1,y:0},food:{x:15,y:10},score:0,running:false,dead:false})
  const rafRef=useRef(null)
  const lastRef=useRef(0)
  const[ui,setUI]=useState({score:0,dead:false,started:false,best:parseInt(localStorage.getItem('hs-snake')||'0')})
  const W=GS*CS

  const rndFood=snake=>{
    let p
    do{p={x:Math.floor(Math.random()*GS),y:Math.floor(Math.random()*GS)}}
    while(snake.some(s=>s.x===p.x&&s.y===p.y))
    return p
  }

  const drawRRect=(ctx,x,y,w,h,r)=>{
    ctx.beginPath()
    ctx.moveTo(x+r,y)
    ctx.lineTo(x+w-r,y)
    ctx.arcTo(x+w,y,x+w,y+r,r)
    ctx.lineTo(x+w,y+h-r)
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
    ctx.lineTo(x+r,y+h)
    ctx.arcTo(x,y+h,x,y+h-r,r)
    ctx.lineTo(x,y+r)
    ctx.arcTo(x,y,x+r,y,r)
    ctx.closePath()
    ctx.fill()
  }

  const draw=useCallback(()=>{
    const cv=cvRef.current;if(!cv)return
    const ctx=cv.getContext('2d'),g=gRef.current
    ctx.fillStyle='#07051A';ctx.fillRect(0,0,W,W)
    ctx.strokeStyle='rgba(255,92,26,0.04)';ctx.lineWidth=0.5
    for(let x=0;x<=GS;x++){ctx.beginPath();ctx.moveTo(x*CS,0);ctx.lineTo(x*CS,W);ctx.stroke()}
    for(let y=0;y<=GS;y++){ctx.beginPath();ctx.moveTo(0,y*CS);ctx.lineTo(W,y*CS);ctx.stroke()}
    ctx.font=`${CS-2}px serif`;ctx.textAlign='center';ctx.textBaseline='middle'
    ctx.fillText('🫔',g.food.x*CS+CS/2,g.food.y*CS+CS/2+1)
    g.snake.forEach((seg,i)=>{
      const isH=i===0,t=i/Math.max(g.snake.length-1,1)
      const r=Math.round(255-t*160),gr=Math.round(92-t*70),b=Math.round(26-t*20)
      ctx.fillStyle=isH?'rgb(255,92,26)':`rgb(${r},${gr},${b})`
      const pad=isH?1:2,x=seg.x*CS+pad,y=seg.y*CS+pad,sz=CS-pad*2
      drawRRect(ctx,x,y,sz,sz,isH?4:2)
      if(isH){ctx.fillStyle='rgba(255,255,255,0.9)';ctx.beginPath();ctx.arc(x+sz*0.65,y+sz*0.3,2.5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#333';ctx.beginPath();ctx.arc(x+sz*0.65,y+sz*0.3,1.2,0,Math.PI*2);ctx.fill()}
    })
  },[W])

  const tick=useCallback(time=>{
    const g=gRef.current
    if(!g.running){draw();return}
    const speed=Math.max(75,200-g.score*8)
    if(time-lastRef.current<speed){rafRef.current=requestAnimationFrame(tick);return}
    lastRef.current=time
    g.dir={...g.nextDir}
    const head={x:g.snake[0].x+g.dir.x,y:g.snake[0].y+g.dir.y}
    if(head.x<0||head.x>=GS||head.y<0||head.y>=GS){g.running=false;g.dead=true;const best=Math.max(g.score,parseInt(localStorage.getItem('hs-snake')||'0'));localStorage.setItem('hs-snake',best);setUI(u=>({...u,dead:true,score:g.score,best}));draw();return}
    if(g.snake.some(s=>s.x===head.x&&s.y===head.y)){g.running=false;g.dead=true;const best=Math.max(g.score,parseInt(localStorage.getItem('hs-snake')||'0'));localStorage.setItem('hs-snake',best);setUI(u=>({...u,dead:true,score:g.score,best}));draw();return}
    g.snake.unshift(head)
    if(head.x===g.food.x&&head.y===g.food.y){g.score++;g.food=rndFood(g.snake);setUI(u=>({...u,score:g.score}));if(g.score%5===0)toast(`${g.score} shawarmas! 🔥`,'fire')}
    else g.snake.pop()
    draw();rafRef.current=requestAnimationFrame(tick)
  },[draw])

  const start=useCallback(()=>{
    cancelAnimationFrame(rafRef.current)
    const g=gRef.current
    g.snake=[{x:10,y:10}];g.dir={x:1,y:0};g.nextDir={x:1,y:0};g.food=rndFood([{x:10,y:10}]);g.score=0;g.running=true;g.dead=false
    lastRef.current=0;setUI(u=>({...u,score:0,dead:false,started:true}))
    rafRef.current=requestAnimationFrame(tick)
  },[tick])

  const onKey=useCallback(e=>{
    const g=gRef.current
    if(!g.running){if(e.code==='Space'||e.code==='Enter')start();return}
    const m={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},KeyW:{x:0,y:-1},KeyS:{x:0,y:1},KeyA:{x:-1,y:0},KeyD:{x:1,y:0}}
    const nd=m[e.code];if(nd){const c=g.dir;if(!(nd.x===-c.x&&nd.y===-c.y))g.nextDir=nd;e.preventDefault()}
  },[start])

  useEffect(()=>{
    window.addEventListener('keydown',onKey);rafRef.current=requestAnimationFrame(tick)
    return()=>{window.removeEventListener('keydown',onKey);cancelAnimationFrame(rafRef.current)}
  },[onKey,tick])

  const dpad=dir=>{
    const g=gRef.current;if(!g.running){start();return}
    const m={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}}
    const nd=m[dir],c=g.dir;if(!(nd.x===-c.x&&nd.y===-c.y))g.nextDir=nd
  }

  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
      <div style={{display:'flex',gap:24}}>
        {[{v:ui.score,l:'Score',c:'var(--gold2)'},{v:ui.best,l:'Best',c:'var(--fire)'}].map(s=>(
          <div key={s.l} style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--ff-display)',fontSize:28,fontWeight:700,color:s.c,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:9,color:'var(--dim)',letterSpacing:'2px',textTransform:'uppercase'}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{position:'relative',lineHeight:0}}>
        <canvas ref={cvRef} width={W} height={W} style={{display:'block',border:'1px solid var(--line2)'}}/>
        {(!ui.started||ui.dead)&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(7,5,26,.88)',gap:10}}>
            {ui.dead&&<div style={{fontFamily:'var(--ff-display)',fontSize:20,color:'var(--fire)'}}>Game Over!</div>}
            <div style={{fontSize:30}}>🫔</div>
            <div style={{fontFamily:'var(--ff-display)',fontSize:15,color:'var(--cream)'}}>{ui.dead?`Score: ${ui.score}`:'Eat the Shawarma'}</div>
            <button className="btn btn-primary btn-sm" onClick={start}>{ui.dead?'Play Again':'Start Game'}</button>
            <div style={{fontSize:10,color:'var(--dim)'}}>Arrow keys / WASD · Space to start</div>
          </div>
        )}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,42px)',gridTemplateRows:'repeat(2,42px)',gap:2}}>
        {[null,{l:'↑',d:'up'},null,{l:'←',d:'left'},{l:'↓',d:'down'},{l:'→',d:'right'}].map((btn,i)=>btn?(
          <button key={i} onPointerDown={()=>dpad(btn.d)} style={{background:'var(--surface)',border:'1px solid var(--line2)',color:'var(--muted)',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',userSelect:'none',WebkitUserSelect:'none',touchAction:'none',transition:'background .15s'}}
            onMouseEnter={e=>e.currentTarget.style.background='var(--raised)'} onMouseLeave={e=>e.currentTarget.style.background=''}>{btn.l}</button>
        ):<div key={i}/>)}
      </div>
    </div>
  )
}


const GAME_LIST=[
  {id:'ttt',   title:'Tic-Tac-Toe',    icon:'⭕',badge:'vs AI',   desc:'Beat our minimax AI. Unbeatable. Can you even draw?',   component:TicTacToe},
  {id:'spice', title:'Spice Scramble', icon:'🌶',badge:'Timed',   desc:'Unscramble heritage food words before 30 seconds run out.',component:SpiceScramble},
  {id:'trivia',title:'Heritage Trivia',icon:'🏆',badge:'12 Qs',   desc:'12 questions. How well do you really know Heritage?',   component:Trivia},
  {id:'snake', title:'Shawarma Snake', icon:'🫔',badge:'Classic', desc:'Eat shawarma to grow. Don\'t hit walls. Don\'t eat yourself.',component:SnakeGame},
]

export default function Games(){
  useReveal()
  const{topOffset}=useLayout()
  const[active,setActive]=useState(null)
  const G=active?GAME_LIST.find(g=>g.id===active):null
  const Comp=G?.component

  return(
    <div style={{paddingTop:topOffset}}>
      <div className="page-hero">
        <div style={{maxWidth:1400,margin:'0 auto',position:'relative',zIndex:1}}>
          <div className="eyebrow rv">While You Wait</div>
          <h1 className="sec-h rv" style={{marginBottom:16}}>Heritage<br/><em>Games</em></h1>
          <p className="rv" style={{fontSize:14,fontWeight:300,color:'var(--muted)',maxWidth:460}}>
            Beat the AI, unscramble the spices, test your Heritage knowledge, or eat shawarma as a snake. All free, no signup.
          </p>
        </div>
        <div className="watermark" style={{fontSize:200}}>PLAY</div>
      </div>

      <section className="sec">
        {active&&Comp?(
          <div style={{maxWidth:580,margin:'0 auto'}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setActive(null)} style={{marginBottom:28}}>← All Games</button>
            <NoiseCard style={{padding:'36px 32px'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
                <div style={{fontSize:40,lineHeight:1}}>{G.icon}</div>
                <div>
                  <h2 style={{fontFamily:'var(--ff-display)',fontSize:24,fontWeight:700,color:'var(--cream)',lineHeight:1}}>{G.title}</h2>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'var(--fire)',marginTop:4}}>{G.badge}</div>
                </div>
              </div>
              <Comp/>
            </NoiseCard>
          </div>
        ):(
          <>
            <div className="rv" style={{marginBottom:52}}>
              <div className="eyebrow">Choose a Game</div>
              <h2 className="sec-h">Pick Your<br/><em>Challenge</em></h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:2}}>
              {GAME_LIST.map((g,i)=>(
                <NoiseCard key={g.id} className="rv" data-delay={i*.1} style={{padding:'52px 40px',textAlign:'center',cursor:'pointer'}} onClick={()=>setActive(g.id)}>
                  <div style={{display:'flex',justifyContent:'center',gap:10,marginBottom:18,alignItems:'flex-start'}}>
                    <div style={{fontSize:50,lineHeight:1}}>{g.icon}</div>
                    <span style={{fontSize:8,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',padding:'4px 10px',background:'linear-gradient(135deg,var(--fire),var(--gold2))',color:'var(--void)',marginTop:4}}>{g.badge}</span>
                  </div>
                  <div style={{fontFamily:'var(--ff-display)',fontSize:22,fontWeight:700,color:'var(--cream)',marginBottom:10}}>{g.title}</div>
                  <p style={{fontSize:13,fontWeight:300,color:'var(--dim)',marginBottom:24,lineHeight:1.7}}>{g.desc}</p>
                  <div className="btn btn-outline btn-sm" style={{pointerEvents:'none',display:'inline-flex'}}>Play Now →</div>
                </NoiseCard>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

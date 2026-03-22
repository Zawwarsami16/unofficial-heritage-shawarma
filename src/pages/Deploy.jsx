// deploy guide — only accessible at /deploy, not in nav
// explains github pages, menu updates, backend options
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLayout } from '../hooks/layout.jsx'
import { Terminal, BashLine, CodeSnippet, DeploySteps } from '../components/Terminal.jsx'
import { NoiseCard } from '../components/Effects.jsx'

export default function Deploy() {
  const { topOffset } = useLayout()
  const [tab, setTab] = useState('deploy')

  return (
    <div style={{ paddingTop: topOffset, minHeight: '100vh', background: 'var(--void)' }}>
      {/* Header */}
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid var(--line2)', padding: '48px 92px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Link to="/admin" style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '2px', textDecoration: 'none' }}>← Admin</Link>
            <span style={{ color: 'var(--dim)', fontSize: 10 }}>/</span>
            <span style={{ fontSize: 10, color: 'var(--fire)', letterSpacing: '2px' }}>Deploy Guide</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 0, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: 8 }}>
                Technical Documentation
              </div>
              <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: 'var(--cream)', letterSpacing: -2, lineHeight: 1 }}>
                Deploy · Backend<br/><em style={{ color: 'var(--gold2)' }}>& Menu Updates</em>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/" className="btn btn-outline btn-sm">View Site →</Link>
              <Link to="/admin" className="btn btn-primary btn-sm">Admin Panel →</Link>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginTop: 32 }}>
            {[
              { id: 'deploy',  l: '🚀 Deployment'     },
              { id: 'menu',    l: '✏️ Menu Updates'    },
              { id: 'backend', l: '⚙️ Backend Options' },
              { id: 'domain',  l: '🌐 Custom Domain'   },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '14px 24px', background: 'transparent', border: 'none',
                borderBottom: `2px solid ${tab === t.id ? 'var(--fire)' : 'transparent'}`,
                color: tab === t.id ? 'var(--cream)' : 'var(--dim)',
                fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .25s', whiteSpace: 'nowrap',
                fontFamily: 'var(--ff-body)',
              }}>{t.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 92px 100px' }}>

        {/* ── DEPLOYMENT ── */}
        {tab === 'deploy' && <DeployTab/>}
        {tab === 'menu'   && <MenuUpdateTab/>}
        {tab === 'backend'&& <BackendTab/>}
        {tab === 'domain' && <DomainTab/>}
      </div>
    </div>
  )
}


function DeployTab() {
  return (
    <div>
      {/* Recommended option banner */}
      <div style={{ background: 'rgba(52,211,153,.06)', border: '1px solid rgba(52,211,153,.25)', borderLeft: '3px solid #34D399', padding: '18px 24px', marginBottom: 36, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 700, color: '#34D399', marginBottom: 4 }}>Quickest: Vercel drag-and-drop (30 seconds)</div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            Run <span className="code-pill">npm run build</span> → go to vercel.com → drag the <span className="code-pill">dist/</span> folder into browser. Done. Free forever.
          </p>
        </div>
      </div>

      {/* Option 1 — GitHub Pages */}
      <div style={{ marginBottom: 52 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, color: 'var(--cream)' }}>Option 1 — GitHub Pages</div>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 11px', background: 'linear-gradient(135deg,var(--fire),var(--gold2))', color: 'var(--void)' }}>FREE FOREVER</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 28, maxWidth: 680 }}>
          Your site lives at <span className="code-pill">yourusername.github.io/heritage-shawarma</span>. Completely free, fast CDN, auto-deploys with one command.
        </p>

        <DeploySteps steps={[
          {
            title: 'Install Git for Windows',
            desc: 'One-time setup. Download and install from git-scm.com — use all default options.',
            cmd: 'winget install Git.Git',
            output: '# Or download manually from: https://git-scm.com/download/win',
          },
          {
            title: 'Create a free GitHub account',
            desc: 'Go to github.com → Sign up → verify your email. Remember your username.',
          },
          {
            title: 'Create a new repository named exactly: heritage-shawarma',
            desc: 'On GitHub: click + → New Repository → name it heritage-shawarma → set Public → Create Repository. Do NOT add a README.',
          },
          {
            title: 'Install project and build',
            desc: 'Open PowerShell in your hs-v6 folder:',
            cmd: 'cd C:\\Users\\Admin\\Downloads\\hs-v6\nnpm install\nnpm run build',
            output: '✓ 60 modules transformed.\n✓ built in 5.3s',
          },
          {
            title: 'Initialize git and push',
            desc: 'Run these commands one by one (replace YOUR_USERNAME):',
            code: `cd C:\\Users\\Admin\\Downloads\\hs-v6
git init
git add .
git commit -m "Heritage Shawarma — initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/heritage-shawarma.git
git push -u origin main`,
            lang: 'bash',
            file: 'PowerShell',
          },
          {
            title: 'Deploy to GitHub Pages',
            desc: 'One command deploys your dist/ folder to live:',
            cmd: 'npx gh-pages -d dist',
            output: 'Published\n✓ Your site is live!',
          },
          {
            title: '🎉 Your site is live!',
            desc: 'Wait 2–3 minutes, then visit:',
            cmd: 'https://YOUR_USERNAME.github.io/heritage-shawarma/',
          },
        ]}/>
      </div>

      {/* Other options */}
      <div>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>Other Free Platforms</h3>
        <p style={{ fontSize: 13, color: 'var(--dim)', marginBottom: 24 }}>All 100% free for static sites like this one:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {[
            { name: 'Vercel',          icon: '▲', ease: 'Easiest',  url: 'vercel.com',           desc: 'Drag & drop your dist/ folder. Instant. Free custom domain option.' },
            { name: 'Netlify',         icon: '◆', ease: 'Popular',  url: 'netlify.com',          desc: 'Drag & drop or connect GitHub. Very generous free tier.' },
            { name: 'Cloudflare Pages',icon: '☁', ease: 'Fastest',  url: 'pages.cloudflare.com', desc: 'World\'s fastest CDN. Free tier. Connect GitHub for auto-deploy.' },
          ].map(p => (
            <NoiseCard key={p.name} style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ fontSize: 32 }}>{p.icon}</div>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 9px', background: 'linear-gradient(135deg,var(--fire),var(--gold2))', color: 'var(--void)' }}>{p.ease}</span>
              </div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 18, fontWeight: 700, color: 'var(--cream)', marginBottom: 6 }}>{p.name}</div>
              <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.75, marginBottom: 12 }}>{p.desc}</p>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--fire)' }}>{p.url}</div>
            </NoiseCard>
          ))}
        </div>
      </div>
    </div>
  )
}


function MenuUpdateTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>Two ways to update the menu</h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 36, maxWidth: 620 }}>
        No backend, no database required. Your menu saves in the browser permanently. You have full control.
      </p>

      {/* Method 1 — Admin panel */}
      <NoiseCard style={{ padding: '32px', marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,var(--fire),var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>⚙️</div>
          <div>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--cream)' }}>Method 1 — Admin Panel</div>
            <div style={{ fontSize: 9, color: '#34D399', letterSpacing: '2px', textTransform: 'uppercase' }}>Recommended · No coding needed</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 }}>
          Go to <Link to="/admin" style={{ color: 'var(--gold2)', fontFamily: 'var(--ff-mono)', fontSize: 13 }}>/admin</Link> → Password: <span className="code-pill">heritage2025</span> → "Menu" tab or "Add Item" tab.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['✓ Add new menu items with full details','✓ Remove items instantly','✓ Toggle item availability (hide without deleting)','✓ Update price on any item','✓ Toggle Featured status','✓ Manage announcement bar','✓ Open/close store status','✓ View recent orders'].map(f => (
            <div key={f} style={{ fontSize: 13, color: 'var(--muted)', padding: '8px 12px', background: 'var(--raised)', border: '1px solid var(--line2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#34D399', flexShrink: 0, marginTop: 1 }}>{f.slice(0,1)}</span>
              <span>{f.slice(2)}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(52,211,153,.06)', border: '1px solid rgba(52,211,153,.2)', padding: '12px 16px', marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#34D399', marginBottom: 3 }}>💾 Auto-saves to browser localStorage</div>
          <p style={{ fontSize: 13, color: 'var(--dim)' }}>Changes persist forever. All visitors see the same menu. No server needed.</p>
        </div>
      </NoiseCard>

      {/* Method 2 — data.js */}
      <NoiseCard style={{ padding: '32px', marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,var(--fire),var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📝</div>
          <div>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--cream)' }}>Method 2 — Edit data.js</div>
            <div style={{ fontSize: 9, color: 'var(--gold2)', letterSpacing: '2px', textTransform: 'uppercase' }}>For permanent default menu changes</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 }}>
          Open <span className="code-pill">src/data/data.js</span> in Notepad++ or VS Code. Add your item to the DEFAULT_MENU array:
        </p>
        <CodeSnippet
          label="src/data/data.js"
          language="js"
          code={`{ 
  id: 'w7',              // unique — any string
  cat: 'wraps',          // wraps | plates | sides | drinks | desserts
  name: 'Lamb Souvlaki Wrap',
  desc: 'Marinated lamb, tzatziki, red onion, tomato in saj bread.',
  price: 15.49,          // number — no quotes
  cal: 570,
  tags: ['Halal', 'Chef Special'],
  veg: false,
  spicy: false,
  available: true,
  featured: false,
  prepTime: '8–10 min',
},`}
        />
        <p style={{ fontSize: 13, color: 'var(--dim)', marginTop: 14 }}>Then rebuild and redeploy:</p>
        <BashLine cmd="npm run build && npx gh-pages -d dist" comment="build and push live"/>
      </NoiseCard>

      {/* Change admin password */}
      <NoiseCard style={{ padding: '28px' }}>
        <div style={{ fontFamily: 'var(--ff-display)', fontSize: 18, fontWeight: 700, color: 'var(--cream)', marginBottom: 10 }}>🔑 Change Admin Password</div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Open <span className="code-pill">src/pages/AllPages.jsx</span> and find:</p>
        <CodeSnippet
          code={`const PW = 'heritage2025'  // ← change this to your password`}
          language="js"
        />
      </NoiseCard>
    </div>
  )
}


function BackendTab() {
  return (
    <div>
      <div style={{ background: 'rgba(52,211,153,.06)', border: '1px solid rgba(52,211,153,.25)', borderLeft: '3px solid #34D399', padding: '20px 24px', marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--ff-display)', fontSize: 18, fontWeight: 700, color: '#34D399', marginBottom: 6 }}>Right now — you do NOT need a backend.</div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
          This site uses localStorage for menu management and orders. For one restaurant location, this works perfectly. The admin panel gives you full menu control. When you need more, add it piece by piece.
        </p>
      </div>

      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700, color: 'var(--cream)', marginBottom: 24 }}>When would you need a backend?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 52 }}>
        {[
          { icon:'💳', title:'Real Online Payments',      desc:'If customers pay online (not just place orders for pickup) → need Stripe. Requires a server to process payments securely.' },
          { icon:'📧', title:'Automated Email Receipts',  desc:'Auto-email order confirmations → need Node.js + Resend or SendGrid. About 2 hours to set up.' },
          { icon:'🔄', title:'Real-Time Menu Sync',       desc:'Multiple staff updating menu simultaneously across all devices → need Supabase or Firebase database.' },
          { icon:'📊', title:'Analytics & Reporting',     desc:'Track orders over time, revenue trends, best-sellers, peak hours → need a proper database.' },
          { icon:'🛵', title:'Delivery Platform Integration', desc:'Connecting to Skip/Uber Eats APIs directly → requires a backend server and their developer accounts.' },
          { icon:'👤', title:'Customer Accounts',         desc:'Customers log in, see past orders across devices → requires authentication + database.' },
        ].map(w => (
          <NoiseCard key={w.title} style={{ padding: '24px 22px' }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{w.icon}</div>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: 15, fontWeight: 700, color: 'var(--cream)', marginBottom: 7 }}>{w.title}</div>
            <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.8 }}>{w.desc}</p>
          </NoiseCard>
        ))}
      </div>

      {/* Stack recommendation */}
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>
        Recommended free backend stack
      </h2>
      <p style={{ fontSize: 14, color: 'var(--dim)', marginBottom: 28 }}>If you ever need a backend — this is the best free combination:</p>

      <div style={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
        {[
          { icon:'⚡', name:'Supabase', desc:'Database + Auth', color:'#34D399' },
          { icon:'→', name:null },
          { icon:'💳', name:'Stripe', desc:'Payments', color:'#C792EA' },
          { icon:'→', name:null },
          { icon:'📧', name:'Resend', desc:'Emails', color:'#82AAFF' },
          { icon:'→', name:null },
          { icon:'🌐', name:'This Site', desc:'React + Vite', color:'var(--gold2)' },
        ].map((n,i) => n.name ? (
          <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--line2)', padding:'16px 18px', textAlign:'center', flex:1, minWidth:100 }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{n.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:n.color, letterSpacing:'1.5px', marginBottom:2 }}>{n.name}</div>
            <div style={{ fontSize:10, color:'var(--dim)' }}>{n.desc}</div>
          </div>
        ) : <div key={i} style={{ color:'var(--fire)', fontSize:18, padding:'0 2px' }}>→</div>)}
      </div>

      {[
        { name:'Supabase',  icon:'⚡', free:'500MB free forever', badge:'Best Choice', desc:'Postgres database + auth + realtime + storage. Replaces localStorage for everything. Free tier is more than enough for a restaurant.', cmd:'npm install @supabase/supabase-js', url:'supabase.com' },
        { name:'Stripe',    icon:'💳', free:'2.9% + 30¢/transaction', badge:'For Payments', desc:'Industry standard payments. No monthly fee — only pay per transaction. Very secure, easy to integrate.', cmd:'npm install @stripe/stripe-js', url:'stripe.com' },
        { name:'Resend',    icon:'📧', free:'3,000 emails/month free', badge:'For Emails', desc:'Send order confirmation emails. Incredibly simple API. Free tier is more than enough.', cmd:'npm install resend', url:'resend.com' },
      ].map(s => (
        <NoiseCard key={s.name} style={{ padding:'28px', marginBottom:2 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ fontSize:26 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, color:'var(--cream)' }}>{s.name}</div>
                <div style={{ fontSize:10, color:'#34D399', letterSpacing:'1.5px' }}>{s.free}</div>
              </div>
            </div>
            <span style={{ fontSize:8, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'4px 11px', background:'linear-gradient(135deg,var(--fire),var(--gold2))', color:'var(--void)' }}>{s.badge}</span>
          </div>
          <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.8, marginBottom:14 }}>{s.desc}</p>
          <BashLine cmd={s.cmd} comment={`docs at ${s.url}`}/>
        </NoiseCard>
      ))}
    </div>
  )
}


function DomainTab() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:700, color:'var(--cream)', marginBottom:8 }}>Get a professional URL</h2>
      <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.85, marginBottom:36, maxWidth:620 }}>
        Instead of <span className="code-pill">yourusername.github.io/heritage-shawarma</span>, get <span style={{ color:'var(--gold2)', fontFamily:'var(--ff-mono)', fontSize:13 }}>heritageshawarma.ca</span>
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:40, marginBottom:40 }}>
        <NoiseCard style={{ padding:'28px' }}>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, color:'var(--cream)', marginBottom:14 }}>Domain Cost</div>
          {[{item:'.ca domain',cost:'~$15/yr'},{item:'Hosting (Vercel)',cost:'Free'},{item:'SSL Certificate',cost:'Free'},{item:'Total / year',cost:'$15/yr'}].map((r,i) => (
            <div key={r.item} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--line2)' }}>
              <span style={{ fontSize:13, color:'var(--muted)' }}>{r.item}</span>
              <span style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:i===3?'var(--gold2)':'var(--cream)' }}>{r.cost}</span>
            </div>
          ))}
        </NoiseCard>

        <div>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:700, color:'var(--cream)', marginBottom:16 }}>Best domain registrars</div>
          {[{n:'Namecheap',url:'namecheap.com',price:'~$12/yr .com'},{n:'Porkbun',url:'porkbun.com',price:'~$10/yr .com (cheapest)'},{n:'Google Domains',url:'domains.google',price:'~$12/yr .com'}].map(d => (
            <div key={d.n} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', background:'var(--surface)', border:'1px solid var(--line2)', marginBottom:2 }}>
              <div>
                <div style={{ fontFamily:'var(--ff-display)', fontSize:15, fontWeight:700, color:'var(--cream)' }}>{d.n}</div>
                <div style={{ fontSize:11, color:'var(--dim)', fontFamily:'var(--ff-mono)' }}>{d.url}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--gold2)' }}>{d.price}</div>
            </div>
          ))}
        </div>
      </div>

      <DeploySteps steps={[
        { title:'Buy a domain', desc:'Go to namecheap.com or porkbun.com. Search for heritageshawarma.ca (or .com). Add to cart, checkout.' },
        { title:'Deploy to Vercel or Netlify', desc:'Drag your dist/ folder to vercel.com. Get your free URL first (e.g. heritage-shawarma.vercel.app).' },
        { title:'Add custom domain in Vercel dashboard', desc:'Vercel dashboard → Settings → Domains → Add Domain → type heritageshawarma.ca' },
        { title:'Update DNS at Namecheap', desc:'Vercel gives you DNS records. Copy them into Namecheap\'s Advanced DNS panel. Takes 5–10 minutes.' },
        { title:'SSL is automatic', desc:'Vercel and Netlify automatically provision a free HTTPS certificate. Your site is secure at heritageshawarma.ca.' },
      ]}/>
    </div>
  )
}

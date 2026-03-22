// terminal/code block components used in the deploy guide page
import { useState, useRef } from 'react'


export function Terminal({ title = 'terminal', children, copyText = '', language = 'bash' }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const text = copyText || (typeof children === 'string' ? children : '')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="terminal" style={{ marginBottom:2 }}>
      {/* Window chrome */}
      <div className="terminal-bar">
        <span className="terminal-dot red"/>
        <span className="terminal-dot yel"/>
        <span className="terminal-dot grn"/>
        <span className="terminal-title">{title}</span>
        {(copyText || typeof children === 'string') && (
          <button className={`copy-btn${copied?' copied':''}`} onClick={copy}>
            {copied ? '✓ copied' : 'copy'}
          </button>
        )}
      </div>
      {/* Body */}
      <div className="terminal-body">
        {typeof children === 'string' ? (
          <div className="code-lines">
            {children.split('\n').map((line, i) => (
              <div key={i} className="code-line">
                <span>{line || ' '}</span>
              </div>
            ))}
          </div>
        ) : children}
      </div>
    </div>
  )
}


export function BashLine({ cmd, comment = '', output = '' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(()=>setCopied(false), 1600) }
  return (
    <div style={{ marginBottom: output ? 0 : 2 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--ff-mono)', fontSize:12.5, background:'var(--panel)', border:'1px solid var(--line2)', padding:'10px 16px', cursor:'pointer', transition:'all .2s', group:'true' }}
        onClick={copy}
        onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,92,26,.4)'}
        onMouseLeave={e=>e.currentTarget.style.borderColor=''}
      >
        <span style={{ color:'var(--fire)', flexShrink:0, userSelect:'none' }}>$</span>
        <span style={{ color:'#C3E88D', flex:1 }}>{cmd}</span>
        {comment && <span style={{ color:'#545C7E', fontStyle:'italic', fontSize:11 }}># {comment}</span>}
        <span style={{ fontSize:10, color:copied?'#34D399':'var(--dim)', flexShrink:0, letterSpacing:'1px', transition:'color .2s' }}>
          {copied ? '✓ copied' : 'click to copy'}
        </span>
      </div>
      {output && (
        <div style={{ fontFamily:'var(--ff-mono)', fontSize:11.5, color:'#545C7E', padding:'6px 16px', background:'#070510', borderLeft:'1px solid var(--line2)', borderRight:'1px solid var(--line2)', borderBottom:'1px solid var(--line2)', lineHeight:1.7 }}>
          {output}
        </div>
      )}
    </div>
  )
}


export function CodeSnippet({ code, language = 'js', label = '' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false), 1600) }

  // Simple syntax highlight — JS/JSX keywords
  const highlight = (line) => {
    const keywords = ['import','export','default','from','const','let','var','function','return','if','else','for','while','class','extends','new','await','async','=>','{','}','(',')',';',',','.']
    return line
  }

  return (
    <div style={{ position:'relative', marginBottom:2 }}>
      {label && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 16px', background:'#0A0810', borderTop:'1px solid var(--line2)', borderLeft:'1px solid var(--line2)', borderRight:'1px solid var(--line2)' }}>
          <span style={{ fontSize:9, color:'var(--dim)', letterSpacing:'2px', textTransform:'uppercase', fontFamily:'var(--ff-mono)' }}>{label}</span>
          <span style={{ fontSize:9, color:'var(--fire)', letterSpacing:'2px' }}>{language}</span>
        </div>
      )}
      <div style={{ background:'#0A0810', border:'1px solid var(--line2)', padding:'14px 16px', fontFamily:'var(--ff-mono)', fontSize:12.5, lineHeight:1.85, color:'#C8C0E0', overflowX:'auto', position:'relative' }}>
        <div className="code-lines">
          {code.split('\n').map((line, i) => (
            <div key={i} className="code-line">
              <span dangerouslySetInnerHTML={{ __html: syntaxHL(line, language) }}/>
            </div>
          ))}
        </div>
        <button
          onClick={copy}
          style={{ position:'absolute', top:8, right:8, background:'rgba(255,92,26,.12)', border:'1px solid rgba(255,92,26,.3)', color:copied?'#34D399':'var(--gold2)', fontFamily:'var(--ff-mono)', fontSize:9, padding:'4px 10px', cursor:'pointer', transition:'all .2s', letterSpacing:'1px' }}
        >{copied ? '✓ copied' : 'copy'}</button>
      </div>
    </div>
  )
}

function syntaxHL(line, lang) {
  // Basic JS/bash syntax highlighting via regex
  let s = line
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  if (lang === 'bash' || lang === 'sh') {
    s = s
      .replace(/^(\$\s*)/,'<span style="color:var(--fire)">$1</span>')
      .replace(/(#.*)$/,'<span style="color:#545C7E;font-style:italic">$1</span>')
      .replace(/'([^']*)'/g,"<span style='color:#C3E88D'>'$1'</span>")
      .replace(/"([^"]*)"/g,'<span style="color:#C3E88D">"$1"</span>')
    return s
  }
  // JS/JSX
  s = s
    .replace(/\/\/.*/g, m => `<span class="syn-cmt">${m}</span>`)
    .replace(/'([^']*)'/g, m => `<span class="syn-str">${m}</span>`)
    .replace(/"([^"]*)"/g, m => `<span class="syn-str">${m}</span>`)
    .replace(/`([^`]*)`/g, m => `<span class="syn-str">${m}</span>`)
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|async|await|class|extends|new|typeof|null|undefined|true|false)\b/g,
      m => `<span class="syn-key">${m}</span>`)
    .replace(/\b(\d+\.?\d*)\b/g, m => `<span class="syn-num">${m}</span>`)
  return s
}


export function DeploySteps({ steps }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:18, padding:'20px 0', borderBottom:'1px solid var(--line2)', alignItems:'flex-start' }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--fire),var(--gold2))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-display)', fontSize:14, fontWeight:700, color:'var(--void)', flexShrink:0 }}>
            {i+1}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:700, color:'var(--cream)', marginBottom:5 }}>{step.title}</div>
            <div style={{ fontSize:13, fontWeight:300, color:'var(--muted)', lineHeight:1.75, marginBottom: step.cmd ? 12 : 0 }}>{step.desc}</div>
            {step.cmd && <BashLine cmd={step.cmd} output={step.output}/>}
            {step.code && <CodeSnippet code={step.code} language={step.lang || 'bash'} label={step.file}/>}
          </div>
        </div>
      ))}
    </div>
  )
}

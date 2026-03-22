// webgl fire effect for the hero background
// uses three.js instanced mesh for performance — tested on mid-range android
import { useEffect, useRef } from 'react'
import * as THREE from 'three'


const VERT = `
precision mediump float;

attribute vec3  aOffset;    // birth position
attribute float aSize;      // base size
attribute float aPhase;     // random phase
attribute float aSpeed;     // rise speed
attribute vec3  aColor;     // base color
attribute float aType;      // 0=ember 1=spice 2=star

uniform float uTime;
uniform vec2  uMouse;       // -1 to 1

varying float vAlpha;
varying vec3  vColor;
varying float vType;
varying float vLife;

void main() {
  vec3 pos = aOffset;
  float life = mod(aPhase + uTime * aSpeed, 5.0);
  float t = life / 5.0;
  vLife = t;

  if (aType < 0.5) {
    // EMBERS — rise from bottom, spiral out
    pos.y += life * 0.85;
    pos.x += sin(life * 2.8 + aPhase * 6.28) * 0.3 * t;
    pos.z += cos(life * 2.2 + aPhase * 6.28) * 0.22 * t;
    // Mouse push
    vec2 toMouse = uMouse - pos.xy * 0.08;
    pos.xy += toMouse * 0.018 * (1.0 - t);
    vColor = mix(
      vec3(1.0, 0.98, 0.85),
      mix(vec3(1.0, 0.55, 0.05), vec3(0.6, 0.05, 0.01), t * 1.6),
      t
    );
    vAlpha = sin(t * 3.14159) * 0.9;

  } else if (aType < 1.5) {
    // SPICE DUST — gentle drift
    pos.y += life * 0.28;
    pos.x += sin(aPhase * 3.14 + uTime * 0.4) * 0.18;
    pos.z += cos(aPhase * 2.71 + uTime * 0.32) * 0.12;
    vColor = aColor;
    vAlpha = sin(t * 3.14159) * 0.65;

  } else {
    // BACKGROUND STARS — barely move
    pos.x += sin(uTime * 0.06 + aPhase) * 0.04;
    pos.y += cos(uTime * 0.04 + aPhase) * 0.03;
    vColor = vec3(1.0, 0.88, 0.65);
    vAlpha = (sin(aPhase + uTime * 0.8) * 0.5 + 0.5) * 0.4;
  }

  vType = aType;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float psize = aSize * (aType > 1.5 ? 180.0 : 250.0) / max(-mv.z, 1.0);
  psize *= (1.0 - t * (aType < 0.5 ? 0.7 : 0.3));
  gl_PointSize = max(psize, 0.5);
  gl_Position  = projectionMatrix * mv;
}
`


const FRAG = `
precision mediump float;
varying float vAlpha;
varying vec3  vColor;
varying float vType;
varying float vLife;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha;
  vec3 col = vColor;

  if (vType < 0.5) {
    // Ember — bright core + glow halo
    float core  = 1.0 - smoothstep(0.0, 0.2, d);
    float outer = 1.0 - d * 2.0;
    alpha = (outer * 0.55 + core * 0.45) * vAlpha;
    col   = col + vec3(core * 0.35, core * 0.15, 0.0);
  } else if (vType < 1.5) {
    // Spice — soft disc
    alpha = (0.5 - d) * 2.0 * vAlpha;
  } else {
    // Star — crisp point with soft edge
    alpha = smoothstep(0.5, 0.1, d) * vAlpha;
  }

  gl_FragColor = vec4(col, max(alpha, 0.0));
}
`


const FIRE_VERT = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
const FIRE_FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;
varying vec2  vUv;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.3,1.7);a*=.52;}
  return v;
}

void main(){
  vec2 uv = vUv;
  // Flip y for fire rising
  float fy = 1.0 - uv.y;
  // Only show fire in bottom 45%
  float fireZone = 1.0 - smoothstep(0.0, 0.45, uv.y);

  // Distort UVs with time
  vec2 d = uv;
  d.y += uTime * 0.28;
  d.x += sin(uv.y * 5.0 + uTime * 0.9) * 0.04;

  // Mouse influence — fire bends toward cursor
  vec2 toMouse = uMouse * 0.5 + 0.5 - uv;
  float mDist  = length(toMouse);
  d += toMouse * (1.0 / (mDist * 12.0 + 1.0)) * 0.07;

  // Build fire shape
  float f  = fbm(d * vec2(2.6, 1.8)) * 0.55
           + fbm(d * vec2(4.2, 2.4) + vec2(8.3, 2.1)) * 0.28
           + fbm(d * vec2(1.4, 3.2) + vec2(uTime * 0.1)) * 0.17;
  f = pow(f, 1.35);

  // Shape mask — wide bottom, narrow top, horizontal falloff
  float horizFall = pow(max(1.0 - abs(uv.x - 0.5) * 2.2, 0.0), 0.65);
  float vertFall  = 1.0 - smoothstep(0.0, 0.42, uv.y);
  f *= horizFall * vertFall;

  // Color ramp
  vec3 col = vec3(0.0);
  col = mix(col, vec3(0.5, 0.03, 0.01),  smoothstep(0.0,  0.18, f));
  col = mix(col, vec3(0.9, 0.18, 0.02),  smoothstep(0.14, 0.34, f));
  col = mix(col, vec3(1.0, 0.50, 0.04),  smoothstep(0.30, 0.52, f));
  col = mix(col, vec3(1.0, 0.78, 0.18),  smoothstep(0.48, 0.68, f));
  col = mix(col, vec3(1.0, 0.96, 0.72),  smoothstep(0.65, 0.85, f));
  col = mix(col, vec3(1.0, 1.0,  1.0),   smoothstep(0.82, 1.0,  f));

  // Additive scatter embers above main fire
  float scatter = fbm(uv * 5.5 + vec2(uTime * 0.3)) * max(1.0 - uv.y * 1.6, 0.0);
  col += vec3(1.0, 0.55, 0.08) * max(scatter, 0.0) * 0.12;

  float alpha = smoothstep(0.06, 0.28, f) * 0.82 * fireZone;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`

export default function HeroGL() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    /* ── RENDERER ── */
    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // cap at 1.5 for perf
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x02010A, 1)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 80)
    camera.position.set(0, 1, 10)

    /* ── FIRE BACKGROUND — fullscreen quad ── */
    const fireMat = new THREE.ShaderMaterial({
      vertexShader: FIRE_VERT, fragmentShader: FIRE_FRAG,
      uniforms: {
        uTime:  { value: 0 },
        uRes:   { value: new THREE.Vector2(canvas.offsetWidth, canvas.offsetHeight) },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const fireQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fireMat)
    fireQuad.frustumCulled = false; fireQuad.renderOrder = 0
    scene.add(fireQuad)

    /* ── GPU INSTANCED PARTICLES — single draw call ── */
    const EMBERS = 320, SPICE = 180, STARS = 600
    const TOTAL  = EMBERS + SPICE + STARS

    const geo    = new THREE.BufferGeometry()
    const offArr = new Float32Array(TOTAL * 3)
    const szArr  = new Float32Array(TOTAL)
    const phArr  = new Float32Array(TOTAL)
    const spArr  = new Float32Array(TOTAL)
    const colArr = new Float32Array(TOTAL * 3)
    const tyArr  = new Float32Array(TOTAL)

    const SPICE_COLS = [
      [0.9,0.38,0.05],[0.85,0.62,0.08],[0.72,0.28,0.06],
      [0.95,0.52,0.12],[0.68,0.22,0.04],[0.88,0.72,0.18],
    ]

    for (let i = 0; i < TOTAL; i++) {
      if (i < EMBERS) {
        offArr[i*3]   = (Math.random()-0.5)*2.8
        offArr[i*3+1] = -2.8
        offArr[i*3+2] = (Math.random()-0.5)*1.5
        szArr[i]      = Math.random()*4+2
        phArr[i]      = Math.random()*5
        spArr[i]      = 0.28+Math.random()*0.35
        colArr[i*3]   = 1; colArr[i*3+1] = 0.6; colArr[i*3+2] = 0.1
        tyArr[i]      = 0
      } else if (i < EMBERS+SPICE) {
        offArr[i*3]   = (Math.random()-0.5)*7
        offArr[i*3+1] = (Math.random()-0.5)*6
        offArr[i*3+2] = (Math.random()-0.5)*3+1
        szArr[i]      = Math.random()*3.5+1.2
        phArr[i]      = Math.random()*4
        spArr[i]      = 0.12+Math.random()*0.18
        const c = SPICE_COLS[Math.floor(Math.random()*SPICE_COLS.length)]
        colArr[i*3]=c[0]; colArr[i*3+1]=c[1]; colArr[i*3+2]=c[2]
        tyArr[i] = 1
      } else {
        offArr[i*3]   = (Math.random()-0.5)*22
        offArr[i*3+1] = (Math.random()-0.5)*14
        offArr[i*3+2] = Math.random()*-30 - 3
        szArr[i]      = Math.random()*1.8+0.6
        phArr[i]      = Math.random()*Math.PI*2
        spArr[i]      = 0.05+Math.random()*0.08
        tyArr[i]      = 2
      }
    }

    geo.setAttribute('aOffset', new THREE.BufferAttribute(offArr, 3))
    geo.setAttribute('aSize',   new THREE.BufferAttribute(szArr, 1))
    geo.setAttribute('aPhase',  new THREE.BufferAttribute(phArr, 1))
    geo.setAttribute('aSpeed',  new THREE.BufferAttribute(spArr, 1))
    geo.setAttribute('aColor',  new THREE.BufferAttribute(colArr, 3))
    geo.setAttribute('aType',   new THREE.BufferAttribute(tyArr, 1))

    // Dummy position attribute (required by THREE.Points)
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TOTAL*3), 3))

    const partMat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    scene.add(new THREE.Points(geo, partMat))

    /* ── MOUSE ── */
    let mx = 0, my = 0
    const onMove = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * -2
    }
    window.addEventListener('mousemove', onMove)

    /* ── RESIZE ── */
    const resize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      fireMat.uniforms.uRes.value.set(w, h)
    }
    window.addEventListener('resize', resize)

    /* ── ANIMATE — RAF with delta cap for consistency ── */
    const t0 = performance.now(); let lastT = t0, raf
    let camX = 0, camY = 1

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const now  = performance.now()
      const dt   = Math.min((now - lastT) / 1000, 0.05)
      const time = (now - t0) / 1000
      lastT = now

      // Smooth mouse follow for camera + fire
      camX += (mx * 0.8 - camX) * dt * 1.8
      camY += (1 + my * 0.3 - camY) * dt * 1.8
      camera.position.x = camX
      camera.position.y = camY
      camera.lookAt(0, 0, 0)

      partMat.uniforms.uTime.value  = time
      partMat.uniforms.uMouse.value.set(mx, my)
      fireMat.uniforms.uTime.value  = time
      fireMat.uniforms.uMouse.value.set(mx, my)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      renderer.dispose(); geo.dispose(); partMat.dispose(); fireMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
    />
  )
}

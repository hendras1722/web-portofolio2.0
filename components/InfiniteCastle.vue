<template>
  <div ref="containerRef" class="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#080402]" />

  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-3">
    <UButton
      :icon="cameraIcon"
      color="gray"
      variant="solid"
      size="lg"
      class="!bg-black/60 !backdrop-blur-md !border !border-amber-500/30 !rounded-full !px-5 !py-3 hover:!border-amber-400/70 transition-colors"
      @click="cycleCamera"
    >
      <span class="text-amber-100 text-sm">{{ cameraLabel }}</span>
    </UButton>

    <UButton
      icon="i-heroicons-sparkles"
      color="gray"
      variant="solid"
      size="lg"
      class="!bg-black/60 !backdrop-blur-md !border !border-amber-500/30 !rounded-full !px-5 !py-3 hover:!border-amber-400/70 transition-colors"
      @click="$emit('replay-intro')"
    >
      <span class="text-amber-100 text-sm">Intro</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineEmits<{ 'replay-intro': [] }>()

type CameraMode = 0 | 1 | 2

interface CastleLayer {
  name: 'near' | 'mid' | 'far'
  count: number
  speed: number
  spread: number
  scale: number
  buildings: number
  windowsPer: number
  lights: number
  pagodaChance: number
  zOffset: number
}

interface LayerChunk {
  group: THREE.Group
  baseY: number
  layer: CastleLayer
  span: number
}

interface FlickerLight {
  light: THREE.PointLight
  base: number
  phase: number
  speed: number
}

const CHUNK_H = 150
const CAMERA_LABELS = ['Eye Level', 'Top-Down', 'High Angle']
const CAMERA_ICONS = ['i-heroicons-camera', 'i-heroicons-arrow-down-circle', 'i-heroicons-video-camera']

const containerRef = ref<HTMLDivElement | null>(null)
const cameraMode = ref<CameraMode>(0)
const cameraLabel = computed(() => CAMERA_LABELS[cameraMode.value])
const cameraIcon = computed(() => CAMERA_ICONS[cameraMode.value])

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let clock: THREE.Clock
let animationFrameId = 0

const flickerLights: FlickerLight[] = []
const layerChunks: LayerChunk[] = []
const disposables: Array<{ dispose: () => void }> = []

let realCastleGroup: THREE.Group | null = null
const realCastleFade = { elapsed: 0, duration: 2.2, materials: [] as THREE.Material[] }

const state = {
  flow: 0,
  flowTarget: 0,
  flowVel: 0,
  shiftAngle: 0,
  targetShiftAngle: 0,
  pointerYaw: 0,
  pointerPitch: 0,
  lastScrollY: 0,
}

function isSmallScreen(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

function rand(a: number, b: number): number {
  return a + Math.random() * (b - a)
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T
}

function wrap(v: number, min: number, span: number): number {
  return ((v - min) % span + span) % span + min
}

/* ---------------- textures ---------------- */
function createShojiTexture(base: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = base
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(180,160,130,${Math.random() * 0.16})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
  }
  ctx.strokeStyle = '#2a160a'
  ctx.lineWidth = 9
  ctx.strokeRect(0, 0, 256, 256)
  ctx.lineWidth = 4
  for (let i = 1; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(i * 64, 0)
    ctx.lineTo(i * 64, 256)
    ctx.stroke()
  }
  for (let i = 1; i < 6; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * 42.6)
    ctx.lineTo(256, i * 42.6)
    ctx.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

function createWoodTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = '#221208'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#140a04'
  for (let i = 0; i < 26; i++) ctx.fillRect(0, Math.random() * 128, 128, Math.random() * 4 + 1)
  ctx.fillStyle = 'rgba(60,32,16,0.3)'
  for (let i = 0; i < 14; i++) ctx.fillRect(0, Math.random() * 128, 128, 1.5)
  return new THREE.CanvasTexture(c)
}

interface Materials {
  wood: THREE.MeshStandardMaterial
  shoji: THREE.MeshStandardMaterial
  shojiRose: THREE.MeshStandardMaterial
  roof: THREE.MeshStandardMaterial
  winWarm: THREE.MeshBasicMaterial
  winRed: THREE.MeshBasicMaterial
  lantern: THREE.MeshBasicMaterial
  lanternRose: THREE.MeshBasicMaterial
}

interface Geometries {
  box: THREE.BoxGeometry
  pyramid: THREE.ConeGeometry
  pillar: THREE.CylinderGeometry
  window: THREE.PlaneGeometry
  lantern: THREE.BoxGeometry
}

let MAT: Materials
let GEO: Geometries

function initMaterials(): Materials {
  const woodTex = createWoodTexture()
  const shojiTex = createShojiTexture('#f2e8d5')
  const shojiRoseTex = createShojiTexture('#f0dce2')
  const mat: Materials = {
    wood: new THREE.MeshStandardMaterial({ map: woodTex, color: 0x4a2a18, roughness: 0.75, metalness: 0.08 }),
    shoji: new THREE.MeshStandardMaterial({ map: shojiTex, emissive: 0xffa23c, emissiveIntensity: 0.42, roughness: 0.55 }),
    shojiRose: new THREE.MeshStandardMaterial({ map: shojiRoseTex, emissive: 0xff7f96, emissiveIntensity: 0.34, roughness: 0.55 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x120d0a, roughness: 0.8, metalness: 0.18 }),
    winWarm: new THREE.MeshBasicMaterial({ color: 0xffb257, side: THREE.DoubleSide }),
    winRed: new THREE.MeshBasicMaterial({ color: 0xff6236, side: THREE.DoubleSide }),
    lantern: new THREE.MeshBasicMaterial({ color: 0xffc067 }),
    lanternRose: new THREE.MeshBasicMaterial({ color: 0xff8fa3 }),
  }
  disposables.push(woodTex, shojiTex, shojiRoseTex, ...Object.values(mat))
  return mat
}

function initGeometry(): Geometries {
  const geo: Geometries = {
    box: new THREE.BoxGeometry(1, 1, 1),
    pyramid: new THREE.ConeGeometry(0.72, 1, 4),
    pillar: new THREE.CylinderGeometry(0.5, 0.55, 1, 6),
    window: new THREE.PlaneGeometry(1, 1),
    lantern: new THREE.BoxGeometry(2, 3.2, 2),
  }
  disposables.push(...Object.values(geo))
  return geo
}

/* ---------------- chunk builder ---------------- */
const _m = new THREE.Matrix4()
const _m2 = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _p = new THREE.Vector3()
const _s = new THREE.Vector3()
const _e = new THREE.Euler()

function buildChunk(layer: CastleLayer): THREE.Group {
  const g = new THREE.Group()
  const S = layer.scale
  const spread = layer.spread

  const bodiesWarm: THREE.Matrix4[] = []
  const bodiesRose: THREE.Matrix4[] = []
  const roofs: THREE.Matrix4[] = []
  const pillars: THREE.Matrix4[] = []
  const winWarm: THREE.Matrix4[] = []
  const winRed: THREE.Matrix4[] = []
  const bridges: THREE.Matrix4[] = []
  const anchors: THREE.Vector3[] = []

  for (let i = 0; i < layer.buildings; i++) {
    const w = rand(11, 20) * S
    const h = rand(8, 15) * S
    const d = rand(11, 20) * S

    const px = rand(-spread, spread)
    const py = rand(-CHUNK_H / 2, CHUNK_H / 2)
    const pz = rand(-spread, spread)

    const rx = pick([0, 0, 0, Math.PI / 2, Math.PI, -Math.PI / 2])
    const rz = pick([0, 0, 0, Math.PI / 2, -Math.PI / 2])
    const ry = pick([0, Math.PI / 2, Math.PI, -Math.PI / 2])
    _e.set(rx, ry, rz)
    const bq = new THREE.Quaternion().setFromEuler(_e)
    const bp = new THREE.Vector3(px, py, pz)

    _m.compose(bp, bq, new THREE.Vector3(w, h, d))
    ;(Math.random() > 0.82 ? bodiesRose : bodiesWarm).push(_m.clone())

    const tiers = 3 + Math.floor(Math.random() * 3)
    const roofSpan = Math.max(w, d)
    let yCursor = h / 2
    for (let t = 0; t < tiers; t++) {
      const f = 1 - t * (0.17 + Math.random() * 0.05)
      const tw = roofSpan * (1.18 * f)
      const th = (h * 0.2) * (1 - t * 0.1)
      _p.set(0, yCursor + th / 2, 0)
      _q.setFromEuler(_e.set(0, Math.PI / 4, 0))
      _s.set(tw, th, tw)
      _m2.compose(_p, _q, _s)
      _m.compose(bp, bq, new THREE.Vector3(1, 1, 1))
      roofs.push(_m.multiply(_m2).clone())
      yCursor += th * 0.82
    }

    ;([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).forEach(([sx, sz]) => {
      _p.set(sx * (w / 2 - 0.6 * S), 0, sz * (d / 2 - 0.6 * S))
      _q.identity()
      _s.set(0.8 * S, h + 1.4 * S, 0.8 * S)
      _m2.compose(_p, _q, _s)
      _m.compose(bp, bq, new THREE.Vector3(1, 1, 1))
      pillars.push(_m.multiply(_m2).clone())
    })

    const perFace = Math.ceil(layer.windowsPer / 4)
    const faces = [
      { n: new THREE.Vector3(0, 0, 1), ry: 0 },
      { n: new THREE.Vector3(0, 0, -1), ry: Math.PI },
      { n: new THREE.Vector3(1, 0, 0), ry: Math.PI / 2 },
      { n: new THREE.Vector3(-1, 0, 0), ry: -Math.PI / 2 },
    ]
    faces.forEach((face) => {
      const along = face.n.z !== 0 ? w : d
      const cols = Math.max(2, Math.round(Math.sqrt((perFace * along) / h)))
      const rows = Math.max(2, Math.ceil(perFace / cols))
      const winW = (along / cols) * 0.55
      const winH = (h / rows) * 0.5
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          if (Math.random() < 0.18) continue
          const u = ((cx + 0.5) / cols - 0.5) * along * 0.92
          const v = ((cy + 0.5) / rows - 0.5) * h * 0.86
          const off = (face.n.z !== 0 ? d : w) / 2 + 0.12 * S
          _p.set(face.n.x * off + (face.n.z !== 0 ? u : 0), v, face.n.z * off + (face.n.x !== 0 ? u : 0))
          _q.setFromEuler(_e.set(0, face.ry, 0))
          _s.set(winW, winH, 1)
          _m2.compose(_p, _q, _s)
          _m.compose(bp, bq, new THREE.Vector3(1, 1, 1))
          const mtx = _m.multiply(_m2).clone()
          ;(Math.random() > 0.88 ? winRed : winWarm).push(mtx)
        }
      }
    })

    anchors.push(bp.clone())
  }

  for (let i = 0; i < anchors.length; i++) {
    let best = -1
    let bestD = Infinity
    for (let j = 0; j < anchors.length; j++) {
      if (i === j) continue
      const dd = anchors[i]!.distanceTo(anchors[j]!)
      if (dd < bestD) {
        bestD = dd
        best = j
      }
    }
    if (best < 0 || bestD > spread * 1.1) continue
    const a = anchors[i]!
    const b = anchors[best]!
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const dir = b.clone().sub(a)
    const len = dir.length() * 0.82
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().normalize())
    _m.compose(mid, q, new THREE.Vector3(len, 0.7 * S, 3.4 * S))
    bridges.push(_m.clone())
    _p.copy(mid)
    _p.y += 2.6 * S
    _m.compose(_p, q, new THREE.Vector3(len * 0.98, 0.45 * S, 4.2 * S))
    bridges.push(_m.clone())
  }

  if (Math.random() < layer.pagodaChance) {
    const px = rand(-spread * 0.7, spread * 0.7)
    const pz = rand(-spread * 0.7, spread * 0.7)
    const py = rand(-CHUNK_H / 3, CHUNK_H / 3)
    const baseW = rand(13, 18) * S
    const storeys = 5 + Math.floor(Math.random() * 3)
    let y = py
    for (let t = 0; t < storeys; t++) {
      const f = 1 - t * 0.11
      const bw = baseW * f
      const bh = rand(5, 7) * S
      _m.compose(new THREE.Vector3(px, y + bh / 2, pz), new THREE.Quaternion(), new THREE.Vector3(bw * 0.72, bh, bw * 0.72))
      bodiesWarm.push(_m.clone())
      _p.set(px, y + bh + (bh * 0.22) / 2, pz)
      _q.setFromEuler(_e.set(0, Math.PI / 4, 0))
      _s.set(bw * 1.5, bh * 0.42, bw * 1.5)
      _m.compose(_p, _q, _s)
      roofs.push(_m.clone())
      y += bh * 1.02
    }
    _p.set(px, y + 4 * S, pz)
    _q.setFromEuler(_e.set(0, Math.PI / 4, 0))
    _s.set(2.2 * S, 9 * S, 2.2 * S)
    _m.compose(_p, _q, _s)
    roofs.push(_m.clone())
  }

  function batch(geo: THREE.BufferGeometry, mat: THREE.Material, list: THREE.Matrix4[]): void {
    if (!list.length) return
    const im = new THREE.InstancedMesh(geo, mat, list.length)
    list.forEach((mtx, i) => im.setMatrixAt(i, mtx))
    im.instanceMatrix.needsUpdate = true
    im.frustumCulled = false
    g.add(im)
  }

  batch(GEO.box, MAT.shoji, bodiesWarm)
  batch(GEO.box, MAT.shojiRose, bodiesRose)
  batch(GEO.pyramid, MAT.roof, roofs)
  batch(GEO.pillar, MAT.wood, pillars)
  batch(GEO.box, MAT.wood, bridges)
  batch(GEO.window, MAT.winWarm, winWarm)
  batch(GEO.window, MAT.winRed, winRed)

  for (let l = 0; l < layer.lights; l++) {
    const rose = Math.random() > 0.85
    const lanternGroup = new THREE.Group()
    const body = new THREE.Mesh(GEO.lantern, rose ? MAT.lanternRose : MAT.lantern)
    body.scale.setScalar(S)
    lanternGroup.add(body)
    const light = new THREE.PointLight(rose ? 0xff6f91 : 0xff8a2e, 2.6, 90 * S)
    lanternGroup.add(light)
    lanternGroup.position.set(rand(-spread * 0.8, spread * 0.8), rand(-CHUNK_H / 2, CHUNK_H / 2), rand(-spread * 0.8, spread * 0.8))
    g.add(lanternGroup)
    flickerLights.push({ light, base: 2.6, phase: Math.random() * Math.PI * 2, speed: rand(3, 7) })
  }

  g.position.z = layer.zOffset
  return g
}

/* ---------------- particles ---------------- */
interface ParticleSystem {
  points: THREE.Points
  vel: Float32Array
  spreadY: number
}

function createParticles(count: number, size: number, spreadXZ: number, spreadY: number, palette: number[][], speedRange: [number, number]): ParticleSystem {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const vel = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = rand(-spreadXZ, spreadXZ)
    pos[i * 3 + 1] = rand(-spreadY, spreadY)
    pos[i * 3 + 2] = rand(-spreadXZ, spreadXZ)
    const c = pick(palette)
    col[i * 3] = c[0]!
    col[i * 3 + 1] = c[1]!
    col[i * 3 + 2] = c[2]!
    vel[i] = rand(speedRange[0], speedRange[1])
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const mat = new THREE.PointsMaterial({ size, vertexColors: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  disposables.push(geo, mat)
  return { points, vel, spreadY }
}

function updateParticles(ps: ParticleSystem, camY: number, dt: number, drift: number): void {
  const posAttr = ps.points.geometry.attributes.position as THREE.BufferAttribute
  const arr = posAttr.array as Float32Array
  const n = ps.vel.length
  for (let i = 0; i < n; i++) {
    arr[i * 3 + 1] = arr[i * 3 + 1]! - (ps.vel[i]! + drift) * dt
    arr[i * 3] = arr[i * 3]! + Math.sin(i + performance.now() * 0.0006) * 0.05
    if (arr[i * 3 + 1]! < camY - ps.spreadY) arr[i * 3 + 1] = camY + ps.spreadY
    if (arr[i * 3 + 1]! > camY + ps.spreadY) arr[i * 3 + 1] = camY - ps.spreadY
  }
  posAttr.needsUpdate = true
}

let dustSystem: ParticleSystem
let emberSystem: ParticleSystem

/* ---------------- conveyor ---------------- */
function updateConveyor(camY: number): void {
  const modeBoost = cameraMode.value === 1 ? 1.8 : 1.0
  const bgBoost = cameraMode.value === 1 ? 2.4 : 1.0

  layerChunks.forEach((c) => {
    const boost = c.layer.name === 'near' ? modeBoost : c.layer.name === 'far' ? bgBoost : (modeBoost + bgBoost) / 2
    const target = c.baseY - state.flow * c.layer.speed * boost
    const wrapped = wrap(target, camY - c.span / 2, c.span)
    c.group.position.y += (wrapped - c.group.position.y) * (Math.abs(wrapped - c.group.position.y) > c.span * 0.45 ? 1 : 0.16)
    c.group.rotation.z += (state.shiftAngle - c.group.rotation.z) * 0.045
  })
}

/* ---------------- audio: biwa pluck cue on camera shift ---------------- */
let audioCtx: AudioContext | null = null
let lastPluckAt = -Infinity
const PLUCK_MIN_INTERVAL = 0.2

interface BiwaChain {
  filter: BiquadFilterNode
  gain: GainNode
  delay: DelayNode
  delayGain: GainNode
}
let biwaChain: BiwaChain | null = null

const BIWA_NOTES = [146.83, 196.0, 220.0, 293.66, 329.63, 392.0, 440.0]

function ensureAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioContextCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextCtor) return null
  if (!audioCtx) audioCtx = new AudioContextCtor()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

// The delay/delayGain pair forms a feedback loop for the echo tail, so it must be
// built once and reused — creating a fresh one per pluck leaves the previous loop
// running forever (it never reaches exact silence), leaking nodes on every click.
function ensureBiwaChain(ctx: AudioContext): BiwaChain {
  if (biwaChain) return biwaChain

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'

  const gain = ctx.createGain()

  const delay = ctx.createDelay()
  delay.delayTime.value = 0.19
  const delayGain = ctx.createGain()
  delayGain.gain.value = 0.3

  filter.connect(gain)
  gain.connect(ctx.destination)
  gain.connect(delay)
  delay.connect(delayGain)
  delayGain.connect(delay)
  delayGain.connect(ctx.destination)

  biwaChain = { filter, gain, delay, delayGain }
  return biwaChain
}

function playBiwaPluck(): void {
  const ctx = ensureAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  if (now - lastPluckAt < PLUCK_MIN_INTERVAL) return
  lastPluckAt = now

  const chain = ensureBiwaChain(ctx)
  const freq = pick(BIWA_NOTES)

  const o1 = ctx.createOscillator()
  const o2 = ctx.createOscillator()
  o1.type = 'sawtooth'
  o2.type = 'triangle'
  o1.frequency.setValueAtTime(freq * 1.08, now)
  o1.frequency.exponentialRampToValueAtTime(freq, now + 0.08)
  o2.frequency.setValueAtTime(freq * 0.98, now)
  o2.frequency.exponentialRampToValueAtTime(freq, now + 0.1)

  chain.filter.frequency.cancelScheduledValues(now)
  chain.filter.frequency.setValueAtTime(2400, now)
  chain.filter.frequency.exponentialRampToValueAtTime(400, now + 1.2)

  chain.gain.gain.cancelScheduledValues(now)
  chain.gain.gain.setValueAtTime(0.0001, now)
  chain.gain.gain.linearRampToValueAtTime(0.5, now + 0.015)
  chain.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9)

  o1.connect(chain.filter)
  o2.connect(chain.filter)

  o1.start(now)
  o2.start(now)
  o1.stop(now + 2.1)
  o2.stop(now + 2.1)
  o1.onended = () => o1.disconnect()
  o2.onended = () => o2.disconnect()
}

/* ---------------- camera control ---------------- */
let lastCycleAt = -Infinity
const CYCLE_MIN_INTERVAL = 250

function cycleCamera(): void {
  const t = performance.now()
  if (t - lastCycleAt < CYCLE_MIN_INTERVAL) return
  lastCycleAt = t

  cameraMode.value = ((cameraMode.value + 1) % 3) as CameraMode
  state.targetShiftAngle += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2)
  flashOverlay()
  playBiwaPluck()
}

let flashAnimation: Animation | null = null

function flashOverlay(): void {
  if (!containerRef.value) return
  flashAnimation?.cancel()
  flashAnimation = containerRef.value.animate(
    [{ filter: 'brightness(2.4)' }, { filter: 'brightness(1)' }],
    { duration: 340, easing: 'ease-out' },
  )
}

/* ---------------- real castle (gltf keep) ---------------- */
const CASTLE_ASSET_URLS = import.meta.glob('../assets/japanese_castle/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function resolveCastleAssetUrl(filename: string): string | undefined {
  const entry = Object.entries(CASTLE_ASSET_URLS).find(([path]) => path.endsWith(`/${filename}`))
  return entry?.[1]
}

const TEXTURE_MAP_PROPS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'] as const

function trackMeshForDisposal(mesh: THREE.Mesh): void {
  disposables.push(mesh.geometry)
  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
  mats.forEach((mat) => {
    disposables.push(mat)
    TEXTURE_MAP_PROPS.forEach((prop) => {
      const tex = (mat as unknown as Record<string, THREE.Texture | null>)[prop]
      if (tex) disposables.push(tex)
    })
  })
}

async function loadRealCastle(): Promise<void> {
  const sceneUrl = resolveCastleAssetUrl('scene.gltf')
  const binUrl = resolveCastleAssetUrl('scene.bin')
  if (!sceneUrl || !binUrl) return

  try {
    const gltfJson = await (await fetch(sceneUrl)).json()
    gltfJson.buffers[0].uri = binUrl
    gltfJson.images?.forEach((img: { uri: string }) => {
      const filename = img.uri.split('/').pop()
      if (!filename) return
      const url = resolveCastleAssetUrl(filename)
      if (url) img.uri = url
    })

    const loader = new GLTFLoader()
    loader.parse(JSON.stringify(gltfJson), '', (gltf) => {
      const model = gltf.scene

      const box = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      box.getSize(size)

      const targetHeight = 190
      const scale = targetHeight / (size.y || 1)
      model.scale.setScalar(scale)

      const groundedBox = new THREE.Box3().setFromObject(model)
      const center = new THREE.Vector3()
      groundedBox.getCenter(center)
      model.position.x -= center.x
      model.position.y -= groundedBox.min.y
      model.position.z -= center.z

      const group = new THREE.Group()
      group.add(model)
      group.position.set(0, -25, -170)

      const materials: THREE.Material[] = []
      group.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return
        const mesh = child as THREE.Mesh
        trackMeshForDisposal(mesh)
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((mat) => {
          mat.transparent = true
          mat.opacity = 0
          materials.push(mat)
        })
      })

      realCastleFade.elapsed = 0
      realCastleFade.materials = materials
      realCastleGroup = group
      scene.add(group)

      const keepLight = new THREE.PointLight(0xffb257, 4, 420, 2)
      keepLight.position.set(40, 90, -110)
      scene.add(keepLight)
    }, (err) => {
      console.error('[InfiniteCastle] failed to parse real castle model', err)
    })
  } catch (err) {
    console.error('[InfiniteCastle] failed to load real castle model', err)
  }
}

/* ---------------- scene lifecycle ---------------- */
function initScene(container: HTMLDivElement): void {
  const small = isSmallScreen()
  clock = new THREE.Clock()

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x080402)
  scene.fog = new THREE.FogExp2(0x1a0c05, 0.0032)

  camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.5, 1400)
  camera.position.set(0, 0, 40)
  scene.add(camera)

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.28
  container.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0x2a1408, 1.5))
  const dir = new THREE.DirectionalLight(0xff8a3d, 0.5)
  dir.position.set(30, 60, 40)
  scene.add(dir)

  const blaze = new THREE.PointLight(0xff5a12, 7, 700, 2)
  blaze.position.set(20, -60, -320)
  scene.add(blaze)

  MAT = initMaterials()
  GEO = initGeometry()

  const layers: CastleLayer[] = [
    { name: 'near', count: small ? 3 : 5, speed: 1.00, spread: 78, scale: 1.00, buildings: small ? 6 : 10, windowsPer: 36, lights: 1, pagodaChance: 0.5, zOffset: -20 },
    { name: 'mid', count: small ? 2 : 4, speed: 0.60, spread: 130, scale: 1.45, buildings: small ? 5 : 9, windowsPer: 30, lights: 1, pagodaChance: 0.7, zOffset: -170 },
    { name: 'far', count: small ? 2 : 4, speed: 0.25, spread: 210, scale: 2.10, buildings: small ? 5 : 8, windowsPer: 26, lights: 0, pagodaChance: 0.8, zOffset: -380 },
  ]

  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      const g = buildChunk(layer)
      const baseY = -i * CHUNK_H
      g.position.y = baseY
      scene.add(g)
      layerChunks.push({ group: g, baseY, layer, span: layer.count * CHUNK_H })
    }
  })

  dustSystem = createParticles(small ? 400 : 900, 1.1, 240, 320, [[0.75, 0.6, 0.45], [0.6, 0.5, 0.4], [0.85, 0.75, 0.6]], [8, 26])
  emberSystem = createParticles(small ? 260 : 600, 1.5, 200, 300, [[1, 0.55, 0.15], [1, 0.35, 0.12], [1, 0.75, 0.35]], [4, 16])
  scene.add(dustSystem.points, emberSystem.points)

  void loadRealCastle()
}

function onPointerMove(e: PointerEvent): void {
  const nx = (e.clientX / window.innerWidth) * 2 - 1
  const ny = (e.clientY / window.innerHeight) * 2 - 1
  state.pointerYaw = nx * 0.08
  state.pointerPitch = ny * 0.05
}

function onPageScroll(): void {
  const scrollY = window.scrollY
  const delta = scrollY - state.lastScrollY
  state.lastScrollY = scrollY
  state.flowTarget += delta * 0.9
}

function onResize(): void {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate(): void {
  animationFrameId = requestAnimationFrame(animate)
  if (document.hidden) return

  const dt = Math.min(clock.getDelta(), 0.05)
  const t = clock.elapsedTime

  const autoSpeed = cameraMode.value === 1 ? 9 : 5
  state.flowTarget += autoSpeed * dt

  const diff = state.flowTarget - state.flow
  state.flowVel += (diff * 3.4 - state.flowVel * 4.2) * dt
  state.flow += state.flowVel * dt

  state.shiftAngle += (state.targetShiftAngle - state.shiftAngle) * 0.06

  const camY = -state.flow * 0.55

  if (cameraMode.value === 0) {
    camera.rotation.set(0, 0, 0)
    camera.position.set(Math.sin(state.flow * 0.006) * 14, camY, 40 + Math.cos(state.flow * 0.004) * 10)
    camera.rotation.z = Math.sin(state.flow * 0.003) * 0.07
    camera.rotation.y = Math.cos(state.flow * 0.005) * 0.06
  } else if (cameraMode.value === 1) {
    camera.rotation.set(0, 0, 0)
    camera.position.set(0, camY + 70, 0)
    camera.rotation.x = -Math.PI / 2
    camera.rotation.z = state.flow * 0.0012
  } else {
    camera.rotation.set(0, 0, 0)
    camera.position.set(Math.cos(state.flow * 0.004) * 22, camY + 48, 70)
    camera.rotation.x = -Math.PI / 3.3
    camera.rotation.z = Math.sin(state.flow * 0.0025) * 0.05
  }
  camera.rotation.y += state.pointerYaw
  camera.rotation.x += state.pointerPitch

  const depthNorm = Math.min(1, Math.abs(state.flow) / 9000)
  ;(scene.fog as THREE.FogExp2).density = 0.003 + depthNorm * 0.0026

  updateConveyor(camY)

  flickerLights.forEach((f) => {
    f.light.intensity = f.base + Math.sin(t * f.speed + f.phase) * 0.45 + Math.sin(t * f.speed * 2.7 + f.phase) * 0.18
  })

  const pDrift = cameraMode.value === 1 ? 40 : 10
  updateParticles(dustSystem, camY, dt, pDrift)
  updateParticles(emberSystem, camY, dt, pDrift * 0.6)

  if (realCastleGroup && realCastleFade.elapsed < realCastleFade.duration) {
    realCastleFade.elapsed += dt
    const p = Math.min(1, realCastleFade.elapsed / realCastleFade.duration)
    const eased = p * p * (3 - 2 * p)
    realCastleFade.materials.forEach((mat) => { mat.opacity = eased })
    if (p >= 1) realCastleFade.materials.forEach((mat) => { mat.transparent = false })
  }

  renderer.render(scene, camera)
}

onMounted(() => {
  if (!containerRef.value) return
  initScene(containerRef.value)
  animate()

  state.lastScrollY = window.scrollY
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('scroll', onPageScroll, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('scroll', onPageScroll)

  disposables.forEach((d) => d.dispose())
  realCastleGroup = null
  realCastleFade.materials = []
  renderer?.dispose()
  if (renderer?.domElement.parentElement) {
    renderer.domElement.parentElement.removeChild(renderer.domElement)
  }
  flashAnimation?.cancel()
  flashAnimation = null
  audioCtx?.close()
  audioCtx = null
  biwaChain = null
})
</script>

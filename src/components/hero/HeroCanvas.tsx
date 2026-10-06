import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPx;
  varying float vA;

  void main() {
    vec3 p = position;
    float d = length(p.xy - uMouse * vec2(14.0, 8.0));
    float w = sin(p.x * 0.55 + uTime * 0.9) * 0.45
            + cos(p.y * 0.8 + uTime * 0.7) * 0.4
            + sin(length(p.xy) * 0.9 - uTime * 1.4) * 0.3;
    w += exp(-d * 0.35) * 1.4;
    p.z = w;
    vA = smoothstep(-0.4, 1.6, w);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.2 + vA * 3.0) * uPx * (9.0 / -mv.z) * 1.6;
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 c = mix(vec3(0.85, 0.9, 1.0), vec3(1.0, 0.88, 0.3), vA);
    gl_FragColor = vec4(c, (0.75 - d) * (0.35 + vA * 0.65));
  }
`

function WaveField() {
  const reduced = useReducedMotion()
  const { size, viewport } = useThree()
  const px = viewport.dpr ?? 1

  const geom = useMemo(() => {
    const small = size.width < 700
    const NX = small ? 64 : 130
    const NZ = small ? 34 : 64
    const pos = new Float32Array(NX * NZ * 3)
    let k = 0
    for (let i = 0; i < NX; i++) {
      for (let j = 0; j < NZ; j++) {
        pos[k++] = (i / (NX - 1) - 0.5) * 34
        pos[k++] = (j / (NZ - 1) - 0.5) * 20
        pos[k++] = 0
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [size.width])

  const mat = useRef<THREE.ShaderMaterial>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPx: { value: px },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    if (!reduced) uniforms.uTime.value += delta
    mouse.current.lerp(target.current, 0.05)
    uniforms.uMouse.value.copy(mouse.current)
    const c = state.camera as THREE.PerspectiveCamera
    c.position.x = mouse.current.x * 0.9
    c.lookAt(0, 0, -2)
  })

  // track pointer over the whole hero
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (0.5 - e.clientY / window.innerHeight) * 2
      target.current.set(x, y)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <points rotation={[-Math.PI / 2, 0, 0]} geometry={geom}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

interface HeroCanvasProps {
  /** when false, the render loop is frozen (off-screen) */
  active: boolean
}

/** Lazily-imported WebGL hero. Renders a static frame when reduced motion. */
export default function HeroCanvas({ active }: HeroCanvasProps) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        camera={{ fov: 55, near: 0.1, far: 100, position: [0, 3.4, 9] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <WaveField />
      </Canvas>
    </div>
  )
}
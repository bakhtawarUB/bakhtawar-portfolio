import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerFine } from '../../hooks/usePointerFine'
import { profile } from '../../data/profile'

/**
 * The signature "identity verification" card that replaces a plain portrait.
 * The photo sits under the scanline / hologram layers; if it ever fails to load
 * the monogram behind it stays visible.
 */
export function IdCard() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const fine = usePointerFine()

  // subtle 3D tilt following the pointer
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !fine || !ref.current) return
    const b = ref.current.getBoundingClientRect()
    const rx = ((e.clientY - b.top) / b.height - 0.5) * -9
    const ry = ((e.clientX - b.left) / b.width - 0.5) * 11
    gsap.to(ref.current, { rotateX: rx, rotateY: ry, duration: 0.5, ease: 'power2.out', transformPerspective: 900 })
  }
  const onLeave = () => {
    if (reduced || !ref.current) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power2.out' })
  }

  return (
    <figure className="idcard" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="idcard-inner">
        <div className="id-photo" role="img" aria-label={`Portrait of ${profile.name}`}>
          <span aria-hidden="true">B</span>
          <img
            className="id-photo-img"
            src="/media/photo.jpg"
            width={1024}
            height={1024}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div className="id-scan" aria-hidden="true" />
        <div className="id-holo" aria-hidden="true" />
        <i className="cn tl" aria-hidden="true" />
        <i className="cn tr" aria-hidden="true" />
        <i className="cn bl" aria-hidden="true" />
        <i className="cn br" aria-hidden="true" />

        <div className="id-top">
          <span className="id-chip">IDENTITY</span>
          <span className="id-dot" />
        </div>

        <div className="id-data">
          <div className="id-name">{profile.name}</div>
          <div className="id-role">{profile.role}</div>
          <dl className="id-rows">
            <div>
              <dt>STATUS</dt>
              <dd>VERIFIED</dd>
            </div>
            <div>
              <dt>LOC</dt>
              <dd>LAHORE · PK</dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>BK-2252</dd>
            </div>
          </dl>
        </div>

        <figcaption className="id-foot">
          <span className="id-mrz">P&lt;PAKBKASHIF&lt;&lt;2252&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
          <span className="id-live">LIVE</span>
        </figcaption>
      </div>
    </figure>
  )
}
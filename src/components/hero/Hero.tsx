import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'
import { profile } from '../../data/profile'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

export function Hero() {
  const reduced = useReducedMotion()
  const { setRef, inView } = useInView<HTMLElement>({ threshold: 0, once: false, rootMargin: '120px' })
  const [mountCanvas, setMountCanvas] = useState(false)
  const scope = useRef<HTMLElement | null>(null)

  // defer WebGL until after first paint, then keep it around once mounted
  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => setMountCanvas(true), 250)
    return () => window.clearTimeout(id)
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced || !scope.current) return
    const root = scope.current
    const ctx = gsap.context(() => {
      gsap.from('.name i', {
        yPercent: 108,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.14,
        delay: 0.15,
      })
      gsap.from('.hero-foot > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.55,
      })
      gsap.from('.stamp', {
        scale: 0,
        rotate: -120,
        duration: 1.4,
        ease: 'back.out(1.5)',
        delay: 0.7,
      })
      gsap.to('.name', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(root, {
        scale: 0.93,
        borderRadius: '32px',
        transformOrigin: '50% 100%',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      className="hero"
      id="top"
      ref={(node) => {
        scope.current = node
        setRef(node)
      }}
      aria-label="Introduction"
    >
      {mountCanvas ? (
        <Suspense fallback={null}>
          <HeroCanvas active={inView} />
        </Suspense>
      ) : null}

      <div className="hero-ghost" aria-hidden="true">
        {profile.first}
      </div>

      <figure className="stamp" aria-label="Verified engineer, open to roles">
        <svg viewBox="0 0 200 200" role="img">
          <circle cx="100" cy="100" r="98" fill="#ff8a3d" />
          <defs>
            <path id="stamp-circle" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" />
          </defs>
          <text
            className="ring"
            fontFamily="Geist, sans-serif"
            fontWeight="600"
            fontSize="15"
            letterSpacing="3.2"
            fill="#080b24"
          >
            <textPath href="#stamp-circle" xlinkHref="#stamp-circle">
              VERIFIED ENGINEER / OPEN TO ROLES /
            </textPath>
          </text>
          <path
            d="M68 102l22 22 44-48"
            fill="none"
            stroke="#1d34ff"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </figure>

      <div className="hud hud-tl" aria-hidden="true">
        <span className="hud-key">{'{'}</span> IDENTITY ENGINEER
      </div>
      <div className="hud hud-tr" aria-hidden="true">
        LAT 31.52° / LON 74.35°
      </div>
      <div className="hud hud-bl" aria-hidden="true">
        KYC · KYB · AML · SDK
      </div>
      <div className="hud hud-br" aria-hidden="true">
        STATUS <b>VERIFIED</b>
      </div>

      <div className="wrap">
        <h1 className="name" aria-label={profile.name}>
          <span>
            <i>{profile.first}</i>
          </span>
          <span>
            <i>{profile.last}</i>
          </span>
        </h1>
        <div className="hero-foot">
          <p className="big">{profile.tagline}</p>
          <p>
            {profile.heroNote}
            <br />
            {profile.heroNote2}
          </p>
          <div>
            <p className="avail">{profile.availability}</p>
            <div className="cta">
              <a className="y" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a href={profile.cv} download>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
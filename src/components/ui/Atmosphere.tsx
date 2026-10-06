/**
 * Site-wide atmosphere: a fixed, non-interactive layer with an animated aurora,
 * a fine grid and film grain. Pure CSS/SVG — cheap and reduced-motion safe.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmo-aurora" />
      <div className="atmo-grid" />
      <div className="atmo-noise" />
    </div>
  )
}
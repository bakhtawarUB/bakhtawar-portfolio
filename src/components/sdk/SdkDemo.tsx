import { useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SNIPPET = `<script src="https://cdn.shuftipro.com/verify-sdk.js"><\u002Fscript>
<script>
  const kit = VerifyKit.init('YOUR_CLIENT_ID')

  kit.on('verified', (session) => {
    // session.token proves the person is verified
  })

  kit.mount('#verify') // document -> selfie -> liveness
<\u002Fscript>`

export function SdkDemo() {
  const reduced = useReducedMotion()
  const [state, setState] = useState<'idle' | 'run' | 'done'>('idle')
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const run = () => {
    window.clearTimeout(timer.current)
    setState('run')
    timer.current = window.setTimeout(() => setState('done'), reduced ? 100 : 1400)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <section className="sdk" id="sdk" aria-label="Try the verification SDK">
      <div className="wrap">
        <h2 className="section-h2">Try the SDK</h2>
        <p className="bs">
          This is the shape of what a client embeds. One snippet, and identity verification runs
          inside their own app.
        </p>

        <div className="sdk-grid">
          <figure className="sdk-code">
            <figcaption className="sdk-cap">
              <span className="sdk-fn">verify.html</span>
              <button type="button" className="sdk-copy" onClick={copy}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </figcaption>
            <pre>
              <code>{SNIPPET}</code>
            </pre>
          </figure>

          <div className="sdk-live">
            <p>Rendered on the client page</p>
            <div className="sdk-frame" aria-live="polite">
              {state === 'idle' ? (
                <button type="button" className="sdk-launch" onClick={run}>
                  Verify identity
                </button>
              ) : null}
              {state === 'run' ? (
                <p className="sdk-running">
                  <span className="sdk-spin" aria-hidden="true" />
                  Running checks…
                </p>
              ) : null}
              {state === 'done' ? (
                <div className="sdk-ok">
                  <strong>✓ Verified</strong>
                  <span className="sdk-ok-meta">session.token → your backend</span>
                  <button type="button" className="sdk-again" onClick={run}>
                    Verify another
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
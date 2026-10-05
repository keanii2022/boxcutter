/**
 * The box+crack mark: two open flaps meeting at a seam, a jagged crack
 * running from that seam down through the front face — the same crack the
 * wordmark visually breaks through in Nav.tsx. Filled as cardboard (Step 45)
 * so the box pops on the dark page. Colors are CSS vars so it follows the
 * page's own tokens rather than being baked in; app/icon.svg and
 * app/opengraph-image.tsx repeat the same values as literals.
 */
export default function BoxCutterLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M14 30 L6 12 L28 12 L34 30 Z M34 30 L36 12 L58 12 L50 30 Z"
        fill="var(--oa-cardboard)"
      />
      <path d="M14 30 L50 30 L50 58 L14 58 Z" fill="var(--oa-cardboard-shade)" />
      <path
        d="M14 30 L6 12 L28 12 L34 30 M34 30 L36 12 L58 12 L50 30 M14 30 L50 30 L50 58 L14 58 Z"
        fill="none"
        stroke="var(--oa-cardboard-edge)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M34 30 L41 37 L31 43 L43 51 L35 58"
        fill="none"
        stroke="var(--sc-accent)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

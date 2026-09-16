/**
 * The box+crack mark: two open flaps meeting at a seam, a jagged crack
 * running from that seam down through the front face — the same crack the
 * wordmark visually breaks through in Nav.tsx. Colors are CSS vars so it
 * follows the page's own tokens rather than being baked in.
 */
export default function BoxCutterLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M14 30 L6 12 L28 12 L34 30 M34 30 L36 12 L58 12 L50 30 M14 30 L50 30 L50 58 L14 58 Z"
        fill="none"
        stroke="var(--sc-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M34 30 L41 37 L31 43 L43 51 L35 58"
        fill="none"
        stroke="var(--sc-accent)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

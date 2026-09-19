import { BOOKING_URL } from "../lib/content";

// Evenly spread around the link's own centre; each becomes a CSS custom
// property so the scattered starting position is plain arithmetic instead
// of relying on CSS trig functions (cos()/sin() in calc()), which not every
// browser this site targets supports consistently yet.
const PARTICLE_COUNT = 6;
const PARTICLE_RADIUS = 26;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    dx: Math.round(Math.cos(angle) * PARTICLE_RADIUS),
    dy: Math.round(Math.sin(angle) * PARTICLE_RADIUS),
  };
});

/**
 * The "Book a call" link, everywhere it appears. Hovering/focusing it packs
 * the words themselves away: the label shrinks into the link's own centre
 * while a few pieces fly inward from around it, and a box fades in over the
 * exact same spot — the box replaces the words in place, it doesn't sit
 * beside them. Pure CSS (:hover / :focus-visible), no JS state.
 */
export default function BookCallLink({
  className,
  id,
}: {
  className: string;
  id?: string;
}) {
  return (
    <a
      id={id}
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cta-label">Book a call →</span>
      <span className="cta-box-anim" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="cta-box-anim__particle"
            style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px` } as React.CSSProperties}
          />
        ))}
        <img src="/media/cta-box-open.png" alt="" className="cta-box-anim__box" />
      </span>
    </a>
  );
}

"use client";

import { useRef } from "react";
import { BOOKING_URL } from "../lib/content";

// Evenly spread around the icon's centre; each becomes a CSS custom
// property so the scattered starting position is plain arithmetic instead
// of relying on CSS trig functions (cos()/sin() in calc()), which not every
// browser this site targets supports consistently yet.
const PARTICLE_COUNT = 6;
const PARTICLE_RADIUS = 22;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    dx: Math.round(Math.cos(angle) * PARTICLE_RADIUS),
    dy: Math.round(Math.sin(angle) * PARTICLE_RADIUS),
  };
});

/**
 * The "Book a call" link, everywhere it appears. Hovering (or focusing) it
 * plays out the same beat the box-cutter cursor implies: a handful of
 * little pieces fly inward and land as a box, which the cursor is already
 * mid-cut on — the video is the real about-github-scrub clip, not a
 * separate asset, so the cut itself is the same animation, not a mimic of
 * it. Leaving resets it (pause + rewind) so hovering again replays the
 * whole thing rather than resuming mid-cut.
 */
export default function BookCallLink({
  className,
  id,
}: {
  className: string;
  id?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  function handleLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <a
      id={id}
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      Book a call →
      <span className="cta-box-anim" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="cta-box-anim__particle"
            style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px` } as React.CSSProperties}
          />
        ))}
        <video
          ref={videoRef}
          className="cta-box-anim__video"
          src="/media/about-github-scrub.mp4"
          muted
          playsInline
          preload="auto"
        />
      </span>
    </a>
  );
}

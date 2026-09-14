"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return true;
}

/**
 * A muted, looping background video that respects prefers-reduced-motion
 * (falls back to a paused still first frame, same rule as the rest of the
 * page) and actually plays: the `autoplay` attribute only triggers
 * playback when present at mount, and this component's reduced-motion
 * value flips true→false right after hydration, so the declarative
 * attribute would silently no-op. Plays imperatively instead, with a
 * visibilitychange retry for a tab that's backgrounded right as it mounts.
 */
export default function LoopVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      if (reduced || document.hidden) return;
      el.play().catch(() => {});
    };

    if (reduced) el.pause();
    else tryPlay();

    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      loop={!reduced}
      muted
      playsInline
      aria-hidden="true"
    />
  );
}

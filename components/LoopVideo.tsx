"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
 *
 * `src` is withheld from the element until it's within a viewport of
 * scroll — same IntersectionObserver idiom as TerminalLine's typing
 * trigger — so a below-fold instance (Contact's SocialClip) doesn't fetch
 * its whole file on initial load alongside the hero's own video.
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const tryPlay = () => {
      if (reduced || document.hidden) return;
      el.play().catch(() => {});
    };

    if (reduced) el.pause();
    else tryPlay();

    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, [reduced, inView]);

  return (
    <video
      ref={ref}
      className={className}
      src={inView ? src : undefined}
      preload="none"
      loop={!reduced}
      muted
      playsInline
      aria-hidden="true"
    />
  );
}

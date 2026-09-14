"use client";

import { useState, useSyncExternalStore } from "react";

const SPLINE_SRC =
  "https://my.spline.design/sfrobotcharacter-2sV2FP4SBEzBuFUSX9p3RLJ2/";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// navigator.connection is Chromium-only and isn't in lib.dom.d.ts.
type NetworkInformation = { saveData?: boolean };

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const nav = navigator as Navigator & { connection?: NetworkInformation };
  return reduced || Boolean(nav.connection?.saveData);
}

// No browser signal exists on the server, so it can't guess "scene" and
// then have the client reconcile a mismatch — always resolve to the cheap,
// static poster for the server/first-hydration pass. useSyncExternalStore
// is the mechanism this is built for: unlike a manual effect+setState, its
// getServerSnapshot makes the SSR value explicit instead of an inferred
// initial state, and it re-subscribes if the OS setting changes later.
function getServerSnapshot(): boolean {
  return true;
}

/**
 * The little diorama world (SF Robot Character scene) — lives in the About
 * chapter's own column now, not as the page's opening beat (PLAN.md Step 4
 * revision: a full-bleed spinning world was the first thing visitors saw,
 * which read as distracting rather than inviting).
 *
 * Still a live Spline iframe (1,492 objects / 935+ materials, WebGPU-
 * dependent) — too heavy to mount before first paint, and wrong to force on
 * a reduced-motion or data-saver visitor. Reduced-motion visitors park on
 * the poster for good; everyone else gets it mounted post-hydration,
 * matching scroll-craft's own reduced-motion rule that a poster holds and
 * the heavy asset is never fetched (public/scrollcraft/scrollcraft.js).
 */
export default function SplineWorld() {
  const wantsStatic = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [loaded, setLoaded] = useState(false);
  const posterHidden = !wantsStatic && loaded;

  return (
    <div
      className="world"
      aria-label="A small 3D diorama: the outside.ai robot on a Golden Gate Bridge miniature, spinning"
    >
      <div
        className={`world__poster${posterHidden ? " world__poster--hidden" : ""}`}
        aria-hidden={posterHidden}
      >
        <span className="world__poster-mark">outside.ai</span>
      </div>
      {!wantsStatic && (
        <iframe
          src={SPLINE_SRC}
          title="outside.ai — SF Robot Character, a Spline 3D scene"
          className={`world__frame${loaded ? " world__frame--visible" : ""}`}
          frameBorder={0}
          onLoad={() => {
            // The iframe's own load event fires once Spline's shell is
            // ready — well before the WebGPU scene has anything on screen,
            // and there's no ready signal to wait for across the origin
            // boundary. Hold the poster a beat longer as a deliberate
            // buffer against revealing a blank canvas under it.
            window.setTimeout(() => setLoaded(true), 1300);
          }}
        />
      )}
    </div>
  );
}

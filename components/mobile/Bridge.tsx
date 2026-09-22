"use client";

import { useCallback, useRef, useState } from "react";

const WIRE_PATH = "M120 100 C 200 124 280 124 366 100";
const CONNECT_THRESHOLD = 0.82;

/**
 * Mobile's "signature moment" (PLAN.md Step 29/34): the desktop Bridge
 * (components/Bridge.tsx) is something you watch — a signal auto-pulsing
 * across a dashed cable. On a phone the same artwork becomes something you
 * *do*: drag the glowing dot from the human side to the AI side yourself,
 * literally closing the gap. No scroll-wheel equivalent reads the same way
 * (it's a touch-only gesture), and it upgrades the metaphor from passive
 * ("watch the bridge form") to literal ("you're the one bridging it").
 *
 * Reuses the desktop artwork's exact classnames (bridge/bridge__wire/
 * bridge__node/bridge__ring/bridge__pulse) so the idle state — before a
 * visitor touches it — is the identical ambient animation, ring-pulses and
 * `prefers-reduced-motion` handling included, for free. Only the drag
 * mechanics and the solid "connected" wire-fill are new, mobile-only
 * classes (m-bridge__*).
 */
export default function MobileBridge() {
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [connected, setConnected] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);

  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (connected) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      dragStartXRef.current = e.clientX;
      dragStartProgressRef.current = progress;
    },
    [connected, progress]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const track = trackRef.current;
      if (!track) return;
      const width = track.getBoundingClientRect().width;
      const dx = e.clientX - dragStartXRef.current;
      setProgress(clamp01(dragStartProgressRef.current + dx / width));
    },
    [dragging]
  );

  const finishDrag = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (progress >= CONNECT_THRESHOLD) {
      setProgress(1);
      setConnected(true);
    } else {
      setProgress(0);
    }
  }, [dragging, progress]);

  const connectInstantly = useCallback(() => {
    if (connected) return;
    setProgress(1);
    setConnected(true);
  }, [connected]);

  return (
    <div className="m-bridge">
      <div
        ref={trackRef}
        className={`m-bridge__track${connected ? " m-bridge__track--connected" : ""}`}
        role="slider"
        tabIndex={0}
        aria-label="Drag to close the gap between you and BoxCutter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={connected ? "Connected" : `${Math.round(progress * 100)}%`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            connectInstantly();
          }
        }}
      >
        <div className="bridge" aria-hidden="true">
          <svg viewBox="0 0 480 200" className="bridge__svg">
            <path className="bridge__wire" d={WIRE_PATH} />
            <path
              className="m-bridge__wire-fill"
              d={WIRE_PATH}
              pathLength={100}
              style={{
                strokeDashoffset: 100 - progress * 100,
                transition: dragging ? "none" : "stroke-dashoffset 320ms ease-out",
              }}
            />

            <g className="bridge__node bridge__node--human">
              <circle className="bridge__ring" cx="86" cy="100" r="34" />
              <circle cx="74" cy="82" r="8" />
              <path d="M61 114 A 13 13 0 0 1 87 114" />
              <circle cx="99" cy="87" r="9" />
              <path d="M84 122 A 15 15 0 0 1 114 122" />
            </g>

            <g className="bridge__node bridge__node--ai">
              <circle className="bridge__ring" cx="394" cy="100" r="30" />
              <rect x="379" y="85" width="30" height="30" rx="6" />
              <path d="M394 85 V75 M394 115 V125 M379 100 H369 M409 100 H419" />
              <circle className="bridge__chip-dot" cx="388" cy="95" r="2.5" />
              <circle className="bridge__chip-dot" cx="400" cy="105" r="2.5" />
              <path d="M388 95 L400 105" className="bridge__chip-wire" />
            </g>

            <circle
              className={`bridge__pulse${dragging || connected ? " m-bridge__pulse--manual" : ""}`}
              r="6"
              style={{
                offsetPath: `path("${WIRE_PATH}")`,
                offsetDistance: `${progress * 100}%`,
                transition: dragging ? "none" : "offset-distance 320ms ease-out",
              }}
            />
          </svg>
        </div>
      </div>
      <p
        className={`m-bridge__label${connected ? " m-bridge__label--connected" : ""}`}
        aria-hidden="true"
      >
        {connected ? "Connected. Let’s talk." : "Drag to close the gap →"}
      </p>
    </div>
  );
}

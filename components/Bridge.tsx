const WIRE_PATH = "M120 100 C 200 124 280 124 366 100";

/**
 * The central About visual: people on one side, AI on the other, a signal
 * pulsing back and forth across a sagging cable between them — a two-way
 * connection, not a static logo. Replaces the Spline robot embed (PLAN.md
 * Step 20; Spline stays scoped to the old globe/robot scene only, see
 * memory/feedback-spline-scope-globe-only). Pure CSS/SVG, same "breathing"
 * idiom as ScrollPulse.tsx — no iframe, no lazy-mount, no poster needed.
 */
export default function Bridge() {
  return (
    <div
      className="bridge"
      role="img"
      aria-label="A signal pulsing back and forth across a bridge between a person and an AI system"
    >
      <svg viewBox="0 0 480 200" className="bridge__svg" aria-hidden="true">
        <path className="bridge__wire" d={WIRE_PATH} />

        {/* human side: two overlapping figures */}
        <g className="bridge__node bridge__node--human">
          <circle className="bridge__ring" cx="86" cy="100" r="34" />
          <circle cx="74" cy="82" r="8" />
          <path d="M61 114 A 13 13 0 0 1 87 114" />
          <circle cx="99" cy="87" r="9" />
          <path d="M84 122 A 15 15 0 0 1 114 122" />
        </g>

        {/* AI side: a chip with pins and a small internal circuit */}
        <g className="bridge__node bridge__node--ai">
          <circle className="bridge__ring" cx="394" cy="100" r="30" />
          <rect x="379" y="85" width="30" height="30" rx="6" />
          <path d="M394 85 V75 M394 115 V125 M379 100 H369 M409 100 H419" />
          <circle className="bridge__chip-dot" cx="388" cy="95" r="2.5" />
          <circle className="bridge__chip-dot" cx="400" cy="105" r="2.5" />
          <path d="M388 95 L400 105" className="bridge__chip-wire" />
        </g>

        <circle className="bridge__pulse" r="5" />
      </svg>
    </div>
  );
}

/**
 * On a portrait screen (phone or iPad held upright, Step 41) the clip sits
 * in a rounded frame sized to the screen width with the copy underneath,
 * instead of covering the whole stage — the clip is ~2:1, so covering a
 * tall screen cut both characters in half. `.bridge__frame` is a plain
 * full-stage box otherwise, so the landscape composition is unchanged.
 *
 * A flipbook, not a video (Step 44): a real iPhone wouldn't step a
 * <video> with scroll reliably — frozen on its last frame, or not moving
 * at all in Low Power Mode. Still images on a canvas always paint. 100
 * WebP frames (20fps of the original 5s clip), 2164w on desktop and 1280w
 * on phones. The poster stays underneath as the placeholder until the
 * first frame lands.
 *
 * `flow` (phone tree, Step 46): no pin. Pinned, the frame and copy held
 * mid-screen with a screen's worth of empty dark stage around them —
 * ~1,000px of black between "Book a call" and the next section on a real
 * iPhone. As a flow act the framed clip scrolls with the page and scrubs
 * as it travels up the screen: lead/settle start it once the frame is
 * mostly clear of the bottom dock and finish it as the frame reaches the
 * top, and the copy just fades in under it rather than cueing out.
 */
export default function BridgeChapter({ flow = false }: { flow?: boolean }) {
  return (
    <section
      id="chapter-bridge"
      className={flow ? "bridge--flow" : undefined}
      data-chapter="Bridge"
      data-sc-act={flow ? "flow" : "scrub"}
      data-sc-span={flow ? undefined : "1.75"}
    >
      <div data-sc-stage>
        <div className="bridge__frame">
          <img className="sc-stage__poster" src="/media/bridge-scrub-poster.jpg" alt="" />
          <canvas
            data-sc-sequence="/media/seq/bridge/{iii}.webp:100:1"
            data-sc-sequence-mobile="/media/seq/bridge-m/{iii}.webp:100:1"
            data-sc-lead={flow ? "0.2" : "0.15"}
            data-sc-settle={flow ? "0.32" : "0.3"}
            aria-hidden="true"
          />
        </div>
        <div className="sc-scrim sc-scrim--lead" aria-hidden="true" />
        <div className="sc-copy sc-copy--lead" data-sc-cue={flow ? "0.1" : "0 0.8 0"}>
          <h2 className="sc-display sc-display--lg" data-sc-kinetic="lines">
            People have ideas.
          </h2>
          <p className="sc-body">I have solutions.</p>
        </div>
      </div>
    </section>
  );
}

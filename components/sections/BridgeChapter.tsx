/**
 * On a portrait screen (phone or iPad held upright, Step 41) the clip sits
 * in a rounded frame sized to the screen width with the copy underneath,
 * instead of covering the whole stage — the clip is ~2:1, so covering a
 * tall screen cut both characters in half. `.bridge__frame` is a plain
 * full-stage box otherwise, so the landscape composition is unchanged.
 */
export default function BridgeChapter() {
  return (
    <section
      id="chapter-bridge"
      data-chapter="Bridge"
      data-sc-act="scrub"
      data-sc-span="1.75"
      data-sc-drift="#08090b"
    >
      <div data-sc-stage>
        <div className="bridge__frame">
          <img className="sc-stage__poster" src="/media/bridge-scrub-poster.jpg" alt="" />
          <video
            data-sc-scrub
            data-sc-lead="0.15"
            data-sc-settle="0.3"
            data-sc-src="/media/bridge-scrub.mp4"
            data-sc-src-mobile="/media/bridge-scrub-m.mp4"
            muted
            playsInline
          />
        </div>
        <div className="sc-scrim sc-scrim--lead" aria-hidden="true" />
        <div className="sc-copy sc-copy--lead" data-sc-cue="0 0.8 0">
          <h2 className="sc-display sc-display--lg" data-sc-kinetic="lines">
            People have ideas.
          </h2>
          <p className="sc-body">I have solutions.</p>
        </div>
      </div>
    </section>
  );
}

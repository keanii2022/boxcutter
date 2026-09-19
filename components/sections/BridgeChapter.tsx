export default function BridgeChapter() {
  return (
    <section
      id="chapter-bridge"
      data-chapter="Bridge"
      data-sc-act="scrub"
      data-sc-span="1.6"
      data-sc-drift="#08090b"
    >
      <div data-sc-stage>
        <img className="sc-stage__poster" src="/media/bridge-scrub-poster.jpg" alt="" />
        <video
          data-sc-scrub
          data-sc-lead="0.15"
          data-sc-src="/media/bridge-scrub.mp4"
          data-sc-src-mobile="/media/bridge-scrub-m.mp4"
          muted
          playsInline
        />
        <div className="sc-scrim sc-scrim--lead" aria-hidden="true" />
        <div className="sc-copy sc-copy--lead" data-sc-cue="0 0.8 0">
          <h2 className="sc-display sc-display--lg" data-sc-kinetic="lines">
            Most people try to cross this alone.
          </h2>
          <p className="sc-body">You don&rsquo;t have to.</p>
        </div>
      </div>
    </section>
  );
}

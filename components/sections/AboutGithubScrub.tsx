/**
 * A thin scrub band between About's principles and the GitHub stats — pure
 * filler for the gap that used to sit there, not a chapter beat of its own.
 * A plain flow act (not pinned/scrub) on purpose: a pinned band this short
 * would need a full extra viewport of document height for its pin math
 * regardless of how short it looks on screen, reopening the exact dead-space
 * problem this is here to close. A flow act's video already scrubs across
 * its own natural scroll-through life with no pin needed.
 *
 * The clip: box-cutter slices the tape, box opens — trimmed from the
 * supplied export down to just that ~5s (the source ran 187s but everything
 * past ~5s was blank white, clearly unintentional export padding) and
 * re-encoded smaller (1280w, no audio, ~700KB).
 *
 * Re-encoded again for scrubbing (Step 42), same settings as scroll-craft's
 * encode.sh: that first pass kept the source's 60fps and only two
 * keyframes in five seconds, so every scroll-driven seek decoded up to
 * ~250 frames — fine on a laptop, but on an iPhone the clip never moved.
 * Now 30fps with a keyframe every 8 frames (every 4 in the `-m` variant).
 */
export default function AboutGithubScrub() {
  return (
    <section
      id="chapter-about-scrub"
      data-chapter="About/GitHub bridge"
      data-sc-act="flow"
      className="thin-scrub"
    >
      <video
        data-sc-scrub
        data-sc-src="/media/about-github-scrub.mp4"
        data-sc-src-mobile="/media/about-github-scrub-m.mp4"
        className="thin-scrub__video"
        muted
        playsInline
      />
    </section>
  );
}

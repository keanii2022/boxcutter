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
 * Now a flipbook, not a video (Step 44): even re-encoded for scrubbing
 * (Step 42), a real iPhone never moved it — iOS won't reliably step a
 * <video> with scroll, least of all in Low Power Mode. Still images on a
 * canvas always paint. 101 WebP frames (20fps of the 5s clip), 1280w on
 * desktop and 960w on phones.
 */
export default function AboutGithubScrub() {
  return (
    <section
      id="chapter-about-scrub"
      data-chapter="About/GitHub bridge"
      data-sc-act="flow"
      className="thin-scrub"
    >
      <canvas
        data-sc-sequence="/media/seq/box/{iii}.webp:101:1"
        data-sc-sequence-mobile="/media/seq/box-m/{iii}.webp:101:1"
        className="thin-scrub__video"
        aria-hidden="true"
      />
    </section>
  );
}

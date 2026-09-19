/**
 * A thin scrub band between About's principles and the GitHub stats — pure
 * filler for the gap that used to sit there, not a chapter beat of its own.
 * A plain flow act (not pinned/scrub) on purpose: a pinned band this short
 * would need a full extra viewport of document height for its pin math
 * regardless of how short it looks on screen, reopening the exact dead-space
 * problem this is here to close. A flow act's video already scrubs across
 * its own natural scroll-through life with no pin needed.
 *
 * Waiting on the actual clip — data-sc-src points at a file that doesn't
 * exist yet. Until it's added at that path the band just shows as a plain
 * canvas-toned strip (the engine fails the fetch silently and leaves the
 * poster/background in place), not a broken image.
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
        className="thin-scrub__video"
        muted
        playsInline
      />
    </section>
  );
}

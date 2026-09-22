import LoopVideo from "../LoopVideo";
import BookCallLink from "../BookCallLink";

/**
 * Mobile-composed opening beat (PLAN.md Step 30) — same hook headline and
 * DIY-research video as the desktop Opening, but built for a single
 * phone-width column from scratch rather than reusing `.opening__inner`'s
 * two-column grid (which, below its own 860px breakpoint, just falls back
 * to the grid's bare single-column default — headline, sub, video and CTA
 * stacked in source order with no layout decisions made for a phone at
 * all). Here the video sits right under the headline instead of after the
 * sub-copy: the hook needs a payoff before a visitor scrolls past it, not
 * one more paragraph in between.
 *
 * Video is `diy-research-m.mp4`, not the desktop file (PLAN.md Step 35):
 * the source is 1440x1440 for a desktop column that renders it up to
 * 44rem, but `.m-opening__video` never displays it past 19rem — a mobile
 * Lighthouse pass flagged it as the single largest above-the-fold asset
 * (714KB) and the top contributor to a mediocre Speed Index. Re-encoded at
 * 640x640 (105KB) — same "half-ish the desktop file" convention already
 * established for `bridge-scrub-m.mp4` — with no visible quality loss at
 * the size it's actually shown.
 */
export default function MobileOpening() {
  return (
    <section
      id="chapter-hero"
      className="m-opening"
      aria-label="BoxCutter"
      /* Same drift anchor as the desktop Opening (see components/sections/
         Opening.tsx) — without an act here, the drift chain has nothing to
         evaluate while scrolled back above Bridge's own range. */
      data-sc-act="flow"
      data-sc-drift="#ffffff"
    >
      <div className="m-opening__inner">
        <h1 className="m-opening__headline sc-display sc-display--lg">
          Don&apos;t have the time?
        </h1>
        <div
          className="m-opening__video"
          role="img"
          aria-label="A cascade of late-night searches: how to run a small business without hiring five people"
        >
          <LoopVideo
            src="/media/diy-research-m.mp4"
            className="m-opening__video-clip"
          />
        </div>
        <p className="sc-body m-opening__sub">
          Solutions for small businesses and individuals. Let me handle the
          hard work.
        </p>
        <BookCallLink className="opening__cta m-opening__cta" />
      </div>
    </section>
  );
}

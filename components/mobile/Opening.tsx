import LoopImage from "../LoopImage";
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
 * The clip is an animated WebP (Step 46, see LoopImage) shared with the
 * desktop Opening: 960x960 at 20fps, 306KB — sharp at the 19rem it's
 * shown here even on a 3x screen, and lighter than the 714KB desktop video
 * a mobile Lighthouse pass once flagged (Step 35).
 */
export default function MobileOpening() {
  return (
    <section
      id="chapter-hero"
      className="m-opening"
      aria-label="BoxCutter"
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
          <LoopImage
            src="/media/diy-research.webp"
            still="/media/diy-research-m-poster.jpg"
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

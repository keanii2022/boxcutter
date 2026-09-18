import LoopVideo from "../LoopVideo";
import { BOOKING_URL } from "../../lib/content";

/**
 * The page's opening beat: the "do you have a problem?" hook paired with a
 * screen recording of scrolling through DIY-business-ops videos, standing
 * in for the visitor's own late-night research habit.
 */
export default function Opening() {
  return (
    <section
      id="chapter-hero"
      className="opening"
      aria-label="BoxCutter"
      /* data-sc-act="flow" registers this section as a (non-pinning, purely
         passive) act for no reason other than to give the drift chain an
         anchor above Bridge. Without an act here at all, the drift loop has
         nothing to evaluate while scrolled back above Bridge's own range —
         both acts read raw=0, neither branch fires, and --sc-canvas is left
         at whatever it was last set to instead of resetting to white. */
      data-sc-act="flow"
      data-sc-drift="#ffffff"
    >
      <div className="opening__inner">
        <div className="opening__content">
          <h1 className="opening__headline sc-display sc-display--lg">
            Don&apos;t have the time?
          </h1>
          <a
            className="opening__cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call →
          </a>
        </div>
        <div
          className="opening__video"
          role="img"
          aria-label="A cascade of late-night searches: how to run a small business without hiring five people"
        >
          <LoopVideo
            src="/media/diy-research.mp4"
            className="opening__video-clip"
          />
        </div>
      </div>
    </section>
  );
}

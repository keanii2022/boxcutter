import LoopVideo from "../LoopVideo";
import { BOOKING_URL } from "../../lib/content";

/**
 * The page's opening beat: the "do you have a problem?" hook paired with a
 * screen recording of scrolling through DIY-business-ops videos, standing
 * in for the visitor's own late-night research habit.
 */
export default function Opening() {
  return (
    <section id="chapter-hero" className="opening" aria-label="BoxCutter">
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

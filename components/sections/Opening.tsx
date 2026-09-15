import LoopVideo from "../LoopVideo";

/**
 * The page's opening beat. Was the full-bleed spinning Spline world; moved
 * to the About chapter's own column instead (see components/SplineWorld.tsx)
 * — a world spinning as the very first thing on screen read as distracting,
 * not inviting. This is the "do you have a problem?" hook paired with a
 * screen recording of scrolling through DIY-business-ops videos, standing
 * in for the visitor's own late-night research habit.
 */
export default function Opening() {
  return (
    <section id="chapter-hero" className="opening" aria-label="outside.ai">
      <div className="opening__inner">
        <h1 className="opening__headline sc-display sc-display--lg">
          Don&apos;t have the time?
        </h1>
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

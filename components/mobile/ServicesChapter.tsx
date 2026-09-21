import { OVERWHELM_LINES } from "../../lib/content";
import TaskMarquee from "../TaskMarquee";
import ServicesCarousel from "../ServicesCarousel";
import CostEstimatorModal from "./CostEstimatorModal";

/**
 * Mobile Services chapter (PLAN.md Step 32). The intro and ServicesCarousel
 * are unchanged from the desktop version — ServicesCarousel is already a
 * wrapping grid that degrades to a single tap-to-expand column on narrow
 * viewports (see its own CSS comment), not a horizontal scroller, so it
 * needed no touch-specific rework. Only the estimator entry point swaps to
 * the mobile full-screen wizard (CostEstimatorModal in this folder).
 */
export default function MobileServicesChapter() {
  const [headline, ...rest] = OVERWHELM_LINES;

  return (
    <div
      id="chapter-services"
      data-chapter="Services"
      data-sc-act="flow"
      data-sc-drift="#ffffff"
      className="services"
    >
      <section className="sc-section services__intro">
        <div className="sc-wrap sc-stack" data-sc-in data-sc-stagger="70">
          <p className="sc-label">the problem</p>
          <h2 className="sc-display sc-display--lg services__headline">{headline}</h2>
          {rest.map((line) => (
            <p className="sc-body services__intro-line" key={line}>
              {line}
            </p>
          ))}
          <TaskMarquee />
        </div>
      </section>

      <section className="sc-section services__offerings">
        <div className="sc-wrap">
          <p className="sc-label">what we do</p>
          <ServicesCarousel />
          <CostEstimatorModal />
        </div>
      </section>
    </div>
  );
}

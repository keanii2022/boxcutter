import { OVERWHELM_LINES } from "../../lib/content";
import TaskMarquee from "../TaskMarquee";
import ServicesCarousel from "../ServicesCarousel";

export default function ServicesChapter() {
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
        </div>
      </section>
    </div>
  );
}

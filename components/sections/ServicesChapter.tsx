import { BOOKING_URL, OVERWHELM_LINES, STORY_STEPS } from "../../lib/content";
import TaskMarquee from "../TaskMarquee";

// One typographic identity per crossfading line (question 1-3, then the
// three offerings) — cycles all three brand fonts so the reveal has rhythm
// instead of six copies of the same sentence shape.
const LINE_STYLES = [
  "services__line--serif-italic",
  "services__line--mono",
  "services__line--sans",
  "services__line--serif-bold",
  "services__line--sans-italic",
  "services__line--mono-bold",
];

export default function ServicesChapter() {
  return (
    <section
      id="chapter-services"
      data-chapter="Services"
      data-sc-act="pin"
      data-sc-span="4.5"
      /* data-sc-drift is one-way: Bridge drifts the page dark and nothing
         reverts it once that act completes, so every section after it
         (Services, About, GitHub, Contact) would stay dark forever without
         this bringing the canvas back to the brand's actual white. */
      data-sc-drift="#ffffff"
      className="services"
    >
      <div data-sc-stage className="services__stage">
        <div className="services__argument">
          {OVERWHELM_LINES.map((line, i) => (
            <p
              key={line.text}
              className={`sc-lede services__line services__line--question ${LINE_STYLES[i]}`}
              data-sc-cue={
                i === 0
                  ? `${line.cueFrom} ${line.cueTo} 0`
                  : `${line.cueFrom} ${line.cueTo}`
              }
              data-sc-kinetic="words"
            >
              {line.text}
            </p>
          ))}
          {STORY_STEPS.map((step, i) => (
            <p
              key={step.label}
              className={`sc-lede services__line ${LINE_STYLES[i + OVERWHELM_LINES.length]}`}
              data-sc-cue={`${step.cueFrom} ${step.cueTo}`}
              data-sc-kinetic="words"
            >
              {step.line}
            </p>
          ))}
        </div>
        <a
          className="services__cta"
          data-sc-cue="0.9"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get on a call →
        </a>
        <TaskMarquee />
      </div>
    </section>
  );
}

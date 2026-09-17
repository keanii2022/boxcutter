import { BOOKING_URL, OVERWHELM_LINES, STORY_STEPS } from "../../lib/content";
import TaskMarquee from "../TaskMarquee";

export default function ServicesChapter() {
  return (
    <section
      id="chapter-services"
      data-chapter="Services"
      data-sc-act="pin"
      data-sc-span="4.5"
      className="services"
    >
      <div data-sc-stage className="services__stage">
        <div className="services__argument">
          {OVERWHELM_LINES.map((line, i) => (
            <p
              key={line.text}
              className="sc-lede services__line services__line--question"
              data-sc-cue={
                i === 0
                  ? `${line.cueFrom} ${line.cueTo} 0`
                  : `${line.cueFrom} ${line.cueTo}`
              }
              data-sc-kinetic={i === 0 ? "lines" : undefined}
            >
              {line.text}
            </p>
          ))}
          {STORY_STEPS.map((step) => (
            <p
              key={step.label}
              className="sc-lede services__line"
              data-sc-cue={`${step.cueFrom} ${step.cueTo}`}
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

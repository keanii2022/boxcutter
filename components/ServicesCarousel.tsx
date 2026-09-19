"use client";

import { useState } from "react";
import { BOOKING_URL, STORY_STEPS } from "../lib/content";
import { SERVICE_OPENED_EVENT } from "../lib/serviceEvents";
import ServiceIcon from "./ServiceIcon";

export default function ServicesCarousel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    const opening = openIndex !== i;
    setOpenIndex(opening ? i : null);
    if (opening) {
      window.dispatchEvent(new CustomEvent(SERVICE_OPENED_EVENT, { detail: i }));
    }
  }

  return (
    <div className="services-carousel" data-sc-in data-sc-stagger="90">
      {STORY_STEPS.map((step, i) => {
        const open = openIndex === i;
        return (
          <div
            className="service-card"
            data-open={open ? "true" : undefined}
            key={step.label}
          >
            <button
              type="button"
              className="service-card__toggle"
              aria-expanded={open}
              onClick={() => toggle(i)}
            >
              <ServiceIcon variant={step.icon} />
              <span className="service-card__headtext">
                <span className="service-card__name">{step.label}</span>
                <span className="service-card__teaser">{step.line}</span>
              </span>
              <span className="service-card__chevron" aria-hidden="true" />
            </button>
            <div className="service-card__detail" inert={!open}>
              <div className="service-card__detail-inner">
                <ul className="service-card__examples">
                  {step.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <a
                  className="service-card__cta"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  I need this →
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

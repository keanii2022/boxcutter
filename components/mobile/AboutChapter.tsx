"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ABOUT_HEADLINE, ABOUT_LEDE, ABOUT_PRINCIPLES } from "../../lib/content";

/**
 * Phone About as a slideshow (Step 48). The desktop column — headline,
 * three long paragraphs, then the "how I work" principle — ran edge to
 * edge on a phone in large body type: on a real iPhone it read as one big
 * wall of text. Here each piece is its own card, read one at a time:
 * swipe, or tap the arrows/dots. Same copy as the desktop chapter
 * (lib/content.ts), set at body size instead of lede size.
 *
 * The track is a native horizontal scroll-snap strip, so swiping is the
 * browser's own gesture; the buttons just scroll it to a card, and the
 * active dot follows the scroll position rather than the other way round.
 */
export default function MobileAboutChapter() {
  const [opening, story, turn] = ABOUT_LEDE;
  const slides: ReactNode[] = [
    <Fragment key="opening">
      <h2 className="sc-display m-about__title">{ABOUT_HEADLINE}</h2>
      <p className="m-about__body">{opening}</p>
    </Fragment>,
    <p className="m-about__body" key="story">
      {story}
    </p>,
    <p className="m-about__body" key="turn">
      {turn}
    </p>,
    ...ABOUT_PRINCIPLES.map((p) => (
      <Fragment key={p.title}>
        <p className="sc-label">how I work</p>
        <h3 className="sc-display m-about__title">{p.title}</h3>
        <p className="m-about__body">{p.body}</p>
      </Fragment>
    )),
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Active card = the one whose left edge is nearest the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const origin = cards[0]?.offsetLeft ?? 0;
        let nearest = 0;
        cards.forEach((card, i) => {
          const d = Math.abs(card.offsetLeft - origin - track.scrollLeft);
          const best = Math.abs(cards[nearest].offsetLeft - origin - track.scrollLeft);
          if (d < best) nearest = i;
        });
        setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const cards = track ? (Array.from(track.children) as HTMLElement[]) : [];
    if (!track || !cards[i]) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: cards[i].offsetLeft - cards[0].offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div id="chapter-about" data-chapter="About" className="about m-about">
      <section className="sc-section">
        <div className="sc-wrap" data-sc-in>
          <hr className="sc-rule about__rule" />
          <div
            className="m-about__slides"
            role="region"
            aria-roledescription="carousel"
            aria-label="About BoxCutter"
          >
            <div className="m-about__track" ref={trackRef} tabIndex={0}>
              {slides.map((content, i) => (
                <div
                  className="m-about__card"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                  key={i}
                >
                  {content}
                </div>
              ))}
            </div>
            <div className="m-about__controls">
              <button
                type="button"
                className="m-about__arrow"
                aria-label="Previous"
                disabled={active === 0}
                onClick={() => goTo(active - 1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5 L8 12 L15 19" />
                </svg>
              </button>
              <div className="m-about__dots">
                {slides.map((_, i) => (
                  <button
                    type="button"
                    className="m-about__dot"
                    aria-label={`Go to ${i + 1} of ${slides.length}`}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => goTo(i)}
                    key={i}
                  />
                ))}
              </div>
              <button
                type="button"
                className="m-about__arrow"
                aria-label="Next"
                disabled={active === slides.length - 1}
                onClick={() => goTo(active + 1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5 L16 12 L9 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

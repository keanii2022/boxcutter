import { ABOUT_PRINCIPLES, ABOUT_STORY } from "../../lib/content";

export default function AboutChapter() {
  return (
    <div id="chapter-about" data-chapter="About" className="about">
      <section className="sc-section about__story">
        <div className="sc-wrap about__story-inner">
          <div className="sc-stack" data-sc-in data-sc-stagger="70">
            <hr className="sc-rule about__rule" data-sc-reveal="up" data-sc-reveal-at="0.1 0.6" />
            {ABOUT_STORY.map(({ heading, body }, i) =>
              // The first heading is the chapter's own; the rest head their
              // paragraph under it (Step 49).
              [
                i === 0 ? (
                  <h2 className="sc-display sc-display--md" key={heading}>
                    {heading}
                  </h2>
                ) : (
                  <h3 className="sc-display about__subhead" key={heading}>
                    {heading}
                  </h3>
                ),
                <p className="sc-body about__lede" key={body}>
                  {body}
                </p>,
              ]
            )}
          </div>
        </div>
      </section>

      <section className="sc-section about__principles">
        <div className="sc-wrap">
          <p className="sc-label">how I work</p>
          <div className="principles" data-sc-in data-sc-stagger="60">
            {ABOUT_PRINCIPLES.map((p) => (
              <div className="principles__item" key={p.title}>
                <h3 className="sc-display sc-display--md">{p.title}</h3>
                <p className="sc-body principles__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

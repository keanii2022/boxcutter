import { PORTFOLIO_ITEMS } from "../../lib/content";

const GITHUB_METRICS = ["Public repos", "Commits, last 12 months", "Current streak"];

export default function PortfolioChapter() {
  return (
    <div id="chapter-portfolio" data-chapter="Portfolio" className="portfolio">
      <section className="sc-section portfolio__rail-section" data-sc-act="pan" data-sc-span="5">
        <div data-sc-stage>
          <div className="rail" data-sc-pan="0.08">
            <div className="rail__lead sc-stack">
              <hr className="sc-rule" data-sc-reveal="up" data-sc-reveal-at="0.05 0.4" />
              <h2 className="sc-display sc-display--md">What I&rsquo;m building.</h2>
              <p className="sc-body">
                Four projects, each with its own client. One is a robotics
                company. One is my son.
              </p>
            </div>
            {PORTFOLIO_ITEMS.map((item) => (
              <article className="portfolio-item" key={item.name}>
                <div data-sc-tilt="6" className="portfolio-item__panel">
                  <p className="sc-label">{item.role}</p>
                  <h3 className="sc-display sc-display--sm">{item.name}</h3>
                  <p className="sc-body">{item.blurb}</p>
                </div>
              </article>
            ))}
            <p className="rail__close sc-body">
              More lands here as each one ships.
            </p>
          </div>
        </div>
      </section>

      <section className="sc-section portfolio__github">
        <div className="sc-wrap sc-stack" data-sc-in data-sc-stagger="60">
          <p className="sc-label">live from GitHub</p>
          <div className="github-stats">
            {GITHUB_METRICS.map((label) => (
              <div className="github-stats__item" key={label}>
                <p className="github-stats__value" aria-hidden="true">
                  &middot; &middot; &middot;
                </p>
                <p className="sc-label">{label}</p>
              </div>
            ))}
          </div>
          <p className="sc-body github-stats__note">
            Wired to the public GitHub API in a later pass: it pulls real
            numbers, not invented ones, so it stays honest until then.
          </p>
        </div>
      </section>
    </div>
  );
}

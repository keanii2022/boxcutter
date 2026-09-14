const GITHUB_METRICS = ["Public repos", "Commits, last 12 months", "Current streak"];

export default function GithubStatsChapter() {
  return (
    <section
      id="chapter-github"
      data-chapter="GitHub"
      className="sc-section github-section"
    >
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
  );
}

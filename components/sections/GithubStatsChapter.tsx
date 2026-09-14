"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "keanii2022";

type Stats = {
  publicRepos: number;
  stars: number;
  recentPushes: number;
};

type GithubUser = { public_repos?: number };
type GithubRepo = { stargazers_count?: number };
type GithubEvent = { type?: string };

export default function GithubStatsChapter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
          ),
        ]);
        if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error("GitHub API error");
        }

        const user = (await userRes.json()) as GithubUser;
        const repos = (await reposRes.json()) as GithubRepo[];
        const events = (await eventsRes.json()) as GithubEvent[];

        const stars = repos.reduce(
          (sum, repo) => sum + (repo.stargazers_count ?? 0),
          0
        );
        const recentPushes = events.filter((e) => e.type === "PushEvent")
          .length;

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            stars,
            recentPushes,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics: { label: string; value: number | undefined }[] = [
    { label: "Public repos", value: stats?.publicRepos },
    { label: "Stars earned", value: stats?.stars },
    { label: "Recent pushes", value: stats?.recentPushes },
  ];

  return (
    <section
      id="chapter-github"
      data-chapter="GitHub"
      className="sc-section github-section"
    >
      <div className="sc-wrap sc-stack" data-sc-in data-sc-stagger="60">
        <p className="sc-label">live from GitHub</p>
        <div className="github-stats">
          {metrics.map((metric) => (
            <div className="github-stats__item" key={metric.label}>
              <p className="github-stats__value" aria-hidden="true">
                {error ? (
                  "—"
                ) : metric.value !== undefined ? (
                  metric.value
                ) : (
                  <>&middot; &middot; &middot;</>
                )}
              </p>
              <p className="sc-label">{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="sc-body github-stats__note">
          {error
            ? "GitHub’s API didn’t answer just now — real numbers, when it does."
            : "Live from the public GitHub API: real numbers, not invented ones."}
        </p>
      </div>
    </section>
  );
}

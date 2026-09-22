"use client";

import { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "keanii2022";

type Stats = {
  publicRepos: number;
  lastPushAt: string | null;
};

type GithubUser = { public_repos?: number };
type GithubEvent = { type?: string; created_at?: string };

// "89 recent pushes" reads as a running total but it isn't one — the events
// API only ever hands back the account's last ~100 public events, so once
// pushes already dominate that window (as they do here) the count plateaus
// near a ceiling no matter how much more gets pushed. A relative timestamp
// off the same data has nowhere to plateau — it visibly moves — which is
// the more honest answer to "is this actually live."
function relativeTime(iso: string, now: number): string {
  const diffMs = now - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

// Renders the classic green contribution heatmap from public profile data —
// no auth token needed (unlike GitHub's own GraphQL contributions API).
// Third-party (unofficial) service; swap for GitHub's real API if this ever
// goes down or the user gets a token for the real thing.
const CONTRIBUTIONS_CHART_SRC = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;

export default function GithubStatsChapter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const contributionsScrollRef = useRef<HTMLDivElement>(null);
  const contributionsImgRef = useRef<HTMLImageElement>(null);
  // Ticks the clock forward on its own so "3m ago" becomes "4m ago" without
  // needing a fresh fetch — otherwise it'd only update on next page load.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
          ),
        ]);
        if (!userRes.ok || !eventsRes.ok) {
          throw new Error("GitHub API error");
        }

        const user = (await userRes.json()) as GithubUser;
        const events = (await eventsRes.json()) as GithubEvent[];

        const lastPush = events.find((e) => e.type === "PushEvent");

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            lastPushAt: lastPush?.created_at ?? null,
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

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (error) return;
    const img = contributionsImgRef.current;
    const scrollEl = contributionsScrollRef.current;
    if (!img || !scrollEl) return;

    // Below 640px this strip scrolls (see .github-contributions-scroll);
    // default to its right edge — the most recent weeks — rather than
    // leaving a freshly-loaded phone visitor looking at last January. A
    // no-op everywhere the strip isn't scrollable (scrollWidth ===
    // clientWidth). A plain onLoad prop on the <img> misses this on repeat
    // visits: the browser cache means the image is often already
    // `complete` by the time React attaches the listener, so 'load' never
    // fires — check `complete` directly and only fall back to the event
    // for a genuinely fresh load.
    const scrollToRecent = () => {
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    };
    if (img.complete) {
      scrollToRecent();
    } else {
      img.addEventListener("load", scrollToRecent, { once: true });
      return () => img.removeEventListener("load", scrollToRecent);
    }
  }, [error]);

  const metrics: { label: string; value: string | number | undefined }[] = [
    { label: "Public repos", value: stats?.publicRepos },
    {
      label: "Last push",
      value: stats?.lastPushAt ? relativeTime(stats.lastPushAt, now) : undefined,
    },
  ];

  return (
    <section
      id="chapter-github"
      data-chapter="GitHub"
      className="sc-section github-section"
    >
      <div className="sc-wrap sc-stack" data-sc-in data-sc-stagger="60">
        <p className="sc-label">live from GitHub</p>
        <p className="github-live">
          Always working
          <span className="github-live__dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
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
        {!error && (
          <div className="github-contributions-scroll" ref={contributionsScrollRef}>
            {/* eslint-disable-next-line @next/next/no-img-element -- external, dynamically-sized SVG */}
            <img
              ref={contributionsImgRef}
              src={CONTRIBUTIONS_CHART_SRC}
              alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
              className="github-contributions"
              loading="lazy"
            />
          </div>
        )}
        <p className="sc-body github-stats__note">
          {error
            ? "GitHub’s API didn’t answer just now — real numbers, when it does."
            : "Live from the public GitHub API: real numbers, not invented ones."}
        </p>
      </div>
    </section>
  );
}

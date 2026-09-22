import LoopVideo from "./LoopVideo";

const INSTAGRAM_URL =
  "https://www.instagram.com/boxcutter.sf/?utm_source=ig_web_button_share_sheet";

/**
 * A Canva mockup the user made themselves: a fake social post (an open box,
 * their box logo as the profile photo, animated floating hearts) — concrete
 * proof the "automated content" pitch isn't hypothetical. The Instagram
 * badge links off to the real account it's standing in for.
 *
 * `reveal="cue"` (default) is the desktop Contact chapter's pin-progress
 * reveal (`data-sc-cue`, keyed to `data-sc-act`). That attribute only means
 * anything inside a pinned act — reused as-is in a plain flow section
 * (mobile's Contact composition, PLAN.md Step 34) it would never fire,
 * leaving the clip permanently at its `[data-sc-cue]` default of
 * `opacity: 0`. `reveal="flow"` swaps it for the IntersectionObserver-driven
 * `data-sc-in` every other flow chapter uses instead.
 */
export default function SocialClip({
  reveal = "cue",
}: {
  reveal?: "cue" | "flow";
}) {
  return (
    <div
      className="social-clip-wrap"
      data-sc-cue={reveal === "cue" ? "0.15" : undefined}
      data-sc-in={reveal === "flow" ? true : undefined}
    >
      <LoopVideo src="/media/box-socials.mp4" className="social-clip" />
      <a
        className="social-clip__ig"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="BoxCutter on Instagram: @boxcutter.sf"
      >
        <svg className="social-clip__ig-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="10" y="10" width="44" height="44" rx="14" className="social-clip__ig-shape" />
          <circle cx="32" cy="32" r="12" className="social-clip__ig-shape" />
          <circle cx="45" cy="19" r="3" className="social-clip__ig-accent" />
        </svg>
      </a>
    </div>
  );
}

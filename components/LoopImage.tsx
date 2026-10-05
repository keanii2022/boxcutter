/**
 * A short, silent looping clip as an animated WebP rather than a <video>
 * (Step 46). Replaces LoopVideo: on a real iPhone the muted, inline,
 * play()-started videos still sat on their poster until tapped — iOS
 * blocks video autoplay under Low Power Mode and Low Data Mode, and a site
 * can't tell which setting it's up against. An animated image isn't
 * subject to any autoplay policy, so it always moves; neither clip has
 * sound, so nothing is lost.
 *
 * prefers-reduced-motion gets the still first frame instead, via
 * <picture> — no JS, and the animated file is never fetched for it.
 * `display: contents` on the <picture> (.loop-image) keeps the <img>
 * sizing against the clip's own container, as the <video> did.
 */
export default function LoopImage({
  src,
  still,
  className,
  lazy = false,
}: {
  /** the animated WebP */
  src: string;
  /** a still of its first frame, for reduced motion */
  still: string;
  className?: string;
  /** below the fold: let the browser defer the fetch */
  lazy?: boolean;
}) {
  return (
    <picture className="loop-image">
      <source srcSet={still} media="(prefers-reduced-motion: reduce)" />
      <img
        src={src}
        alt=""
        className={className}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
      />
    </picture>
  );
}

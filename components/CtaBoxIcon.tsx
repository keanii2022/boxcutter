/**
 * The open-box payoff on the primary "Book a call" links: hidden until
 * hover/focus, then pops in as if the cursor's own box-cutter (see the
 * global `cursor` rule in site.css) just sliced it open.
 */
export default function CtaBoxIcon() {
  return (
    <img src="/media/cta-box-open.png" alt="" aria-hidden="true" className="cta-box-icon" />
  );
}

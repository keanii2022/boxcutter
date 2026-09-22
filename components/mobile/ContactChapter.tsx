import TerminalLine from "../TerminalLine";
import SocialClip from "../SocialClip";
import BookCallLink from "../BookCallLink";
import MobileBridge from "./Bridge";

/**
 * Mobile-composed Contact chapter (PLAN.md Step 34). The desktop version
 * (components/sections/ContactChapter.tsx) is a pinned, vertically-centred
 * two-column stage (`data-sc-act="pin"`, `.sc-stage { height: 100svh;
 * overflow: clip }`) — fine on a wide screen where copy+image fit
 * side-by-side inside one viewport height, but on a phone the same content
 * stacked in one column runs taller than 100svh, and `overflow: clip`
 * doesn't let you scroll the overflow into view — it just cuts it off,
 * top and bottom, for the section's entire pin duration. Rebuilt as a
 * plain flow section instead (same fix shape as GitHub's switch off
 * scroll-scrub, Step 29's plan) so nothing is ever unreachable.
 *
 * Two independent reveal groups, not one: the copy/CTA/Bridge block
 * reveals together via `data-sc-in`/`data-sc-stagger` (same idiom as every
 * other mobile flow chapter); SocialClip sits far enough below it to earn
 * its own reveal timing, and already manages that itself in `reveal="flow"`
 * mode — nesting it inside the first group's stagger would double up two
 * separate reveal mechanisms on the same element.
 */
export default function MobileContactChapter() {
  return (
    <section
      id="chapter-contact"
      data-chapter="Contact"
      data-sc-act="flow"
      className="m-contact"
    >
      <div className="sc-wrap sc-stack m-contact__inner" data-sc-in data-sc-stagger="70">
        <hr className="sc-rule contact__rule" />
        <h2 className="sc-display sc-display--lg contact__headline">
          Tell us where you&rsquo;re at.
        </h2>
        <p className="sc-body contact__sub">
          What&rsquo;s got you stuck. What you&rsquo;re trying to get done.
          Thirty minutes is enough to start.
        </p>
        <BookCallLink id="m-contact-cta" className="contact__cta" />
        <MobileBridge />
        <TerminalLine text="> ready when you are_" />
      </div>
      <div className="sc-wrap m-contact__social">
        <SocialClip reveal="flow" />
      </div>
    </section>
  );
}

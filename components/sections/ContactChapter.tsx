import TerminalLine from "../TerminalLine";
import SocialClip from "../SocialClip";
import { BOOKING_URL } from "../../lib/content";

export default function ContactChapter() {
  return (
    <section
      id="chapter-contact"
      data-chapter="Contact"
      data-sc-act="pin"
      data-sc-span="2.8"
      className="contact"
    >
      <div data-sc-stage className="contact__stage">
        <div className="contact__grid">
          <div className="contact__copy">
            <hr className="sc-rule contact__rule" data-sc-reveal="up" data-sc-reveal-at="0 0.2" />
            <h2
              className="sc-display sc-display--lg contact__headline"
              data-sc-cue="0.08"
              data-sc-kinetic="lines"
            >
              Tell us where you&rsquo;re at.
            </h2>
            <p className="sc-body contact__sub" data-sc-cue="0.22">
              What&rsquo;s got you stuck. What you&rsquo;re trying to get
              done. Twenty minutes is enough to start.
            </p>
            <a
              className="contact__cta"
              data-sc-cue="0.55"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call →
            </a>
            <TerminalLine text="> ready when you are_" />
          </div>
          <SocialClip />
        </div>
      </div>
    </section>
  );
}

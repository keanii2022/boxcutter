import TerminalLine from "../TerminalLine";
import SocialClip from "../SocialClip";

export default function ContactChapter() {
  return (
    <section
      id="chapter-contact"
      data-chapter="Contact"
      data-sc-act="pin"
      data-sc-span="3.8"
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
              Tell me the problem once.
            </h2>
            <p className="sc-body contact__sub" data-sc-cue="0.22">
              Twenty minutes is usually enough to know if I&rsquo;m the right
              one to solve it.
            </p>
            <p className="contact__cta" data-sc-cue="0.55">
              Book a call →
              <span className="contact__cta-note">(Calendly link coming soon)</span>
            </p>
            <TerminalLine text="> ready when you are_" />
          </div>
          <SocialClip />
        </div>
      </div>
    </section>
  );
}

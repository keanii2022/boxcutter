import TerminalLine from "../TerminalLine";
import SocialClip from "../SocialClip";
import Bridge from "../Bridge";
import BookCallLink from "../BookCallLink";

export default function ContactChapter() {
  return (
    <section
      id="chapter-contact"
      data-chapter="Contact"
      data-sc-act="pin"
      data-sc-span="1.3"
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
            <div className="contact__cta-row" data-sc-cue="0.55">
              <BookCallLink id="contact-cta" className="contact__cta" />
              <div className="contact__bridge">
                <Bridge />
              </div>
            </div>
            <TerminalLine text="> ready when you are_" />
          </div>
          <SocialClip />
        </div>
      </div>
    </section>
  );
}

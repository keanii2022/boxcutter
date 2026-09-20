const PRINCIPLES = [
  {
    title: "One conversation, start to finish.",
    body: "You tell me what's going on once. I figure out what it actually takes to fix it and get it done — no re-explaining yourself on every call, no getting passed around to someone else. Just one person who already knows what you need, seeing it through.",
  },
];

export default function AboutChapter() {
  return (
    <div id="chapter-about" data-chapter="About" className="about">
      <section className="sc-section about__story">
        <div className="sc-wrap about__story-inner">
          <div className="sc-stack" data-sc-in data-sc-stagger="70">
            <hr className="sc-rule about__rule" data-sc-reveal="up" data-sc-reveal-at="0.1 0.6" />
            <h2 className="sc-display sc-display--md">
              I&rsquo;m the bridge between you and the machine.
            </h2>
            <p className="sc-body about__lede">
              You don&rsquo;t need to understand how any of this works. You
              just need someone who does &mdash; and who&rsquo;ll explain it
              like a person, not a manual.
            </p>
            <p className="sc-body about__lede">
              BoxCutter is Hispanic-owned, built in San Francisco, and priced
              for people who don&rsquo;t have big-tech budgets &mdash;
              individuals and small businesses. I&rsquo;ve seen a solution I
              couldn&rsquo;t afford. Had an idea I never got to execute. Found
              a way in and still didn&rsquo;t have the money to walk through
              it. I know what it feels like to want to give up completely and
              just stay stuck there.
            </p>
            <p className="sc-body about__lede">
              I got out of that. Now I meet people where they are &mdash; no
              jargon, one phone call to start, pricing that fits what
              you&rsquo;ve actually got &mdash; and build the bridge the rest
              of the way myself.
            </p>
          </div>
        </div>
      </section>

      <section className="sc-section about__principles">
        <div className="sc-wrap">
          <p className="sc-label">how I work</p>
          <div className="principles" data-sc-in data-sc-stagger="60">
            {PRINCIPLES.map((p) => (
              <div className="principles__item" key={p.title}>
                <h3 className="sc-display sc-display--md">{p.title}</h3>
                <p className="sc-body principles__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

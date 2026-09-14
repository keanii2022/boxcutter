const PRINCIPLES = [
  {
    title: "One conversation, not five hires.",
    body: "You describe the problem once. I figure out what it actually needs (design, backend, automation, analytics) and handle the parts myself or bring in the right piece.",
  },
  {
    title: "I show the work, not a portfolio of headshots.",
    body: "What I've built is public: the code, the commits, the projects still in progress. Judge the work directly instead of a testimonial written by no one yet.",
  },
  {
    title: "Automation is the point, not a buzzword.",
    body: "Robotics consulting and evaluation is one half. The other is building systems (content, ops, tooling) that keep running after the conversation ends.",
  },
];

export default function AboutChapter() {
  return (
    <div id="chapter-about" data-chapter="About" className="about">
      <section className="sc-section about__story">
        <div className="sc-wrap sc-stack" data-sc-in data-sc-stagger="70">
          <hr className="sc-rule about__rule" data-sc-reveal="up" data-sc-reveal-at="0.1 0.6" />
          <h2 className="sc-display sc-display--md">I am the entity outside.ai.</h2>
          <p className="sc-body about__lede">
            I think outside of the box: literally the name. Most of what I do
            starts as a problem a small business or startup has been living
            with quietly: a product nobody can operate at scale, a process
            three people are stitching together by hand, a launch that needs
            more disciplines than one hire covers. I sit outside the org
            chart and bring the solution in from wherever it actually lives.
          </p>
          <p className="sc-body about__lede">
            I&rsquo;m keeping my face out of this for now: the work speaks
            first, and the introductions come once we&rsquo;re actually
            talking.
          </p>
        </div>
      </section>

      <section className="sc-section about__principles">
        <div className="sc-wrap">
          <p className="sc-label">how I work</p>
          <div className="principles" data-sc-in data-sc-stagger="60">
            {PRINCIPLES.map((p) => (
              <div className="principles__item" key={p.title}>
                <h3 className="sc-display sc-display--sm">{p.title}</h3>
                <p className="sc-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

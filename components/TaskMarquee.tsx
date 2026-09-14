import { TASK_WORDS } from "../lib/content";

/**
 * The scattered version of the Services argument: every task a founder is
 * juggling, endless and borderless, moving on its own rather than on the
 * reader's scroll. Purely atmospheric, so it's hidden from assistive tech —
 * the same information is stated plainly in the argument above it.
 */
export default function TaskMarquee() {
  const track = TASK_WORDS.map((word, i) => (
    <span className="task-marquee__word" key={i}>
      {word}
      <span className="task-marquee__dash" aria-hidden="true">
        &mdash;
      </span>
    </span>
  ));

  return (
    <div
      className="task-marquee"
      data-sc-cue="0.28 1"
      aria-hidden="true"
    >
      <div className="task-marquee__track">
        <div className="task-marquee__set">{track}</div>
        <div className="task-marquee__set">{track}</div>
      </div>
    </div>
  );
}

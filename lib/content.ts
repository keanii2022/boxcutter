// Shared, real data — not lorem. Single source so the Services chapter's
// cue windows and the Ledger's check-off thresholds can't drift apart.

// The opening build-up, ahead of the specific jobs below. Same crossfading
// argument, same pin, just the first three beats.
export type CueLine = {
  text: string;
  cueFrom: number;
  cueTo: number;
};

export const OVERWHELM_LINES: CueLine[] = [
  { text: "Are you overwhelmed?", cueFrom: 0, cueTo: 0.17 },
  { text: "Running operations on your own?", cueFrom: 0.13, cueTo: 0.31 },
  {
    text: "Trying to figure out how to do the following tasks without spreading yourself too thin?",
    cueFrom: 0.27,
    cueTo: 0.47,
  },
];

// Endless, borderless ticker running underneath the argument once the
// question lands — the scattered version of the specific jobs below.
export const TASK_WORDS: string[] = [
  "SEO",
  "Bookkeeping",
  "Hiring",
  "Legal",
  "Backend",
  "Analytics",
  "Support",
  "Marketing",
  "Design",
  "Compliance",
  "Integrations",
  "Ops",
];

export type ServiceJob = {
  problem: string;
  specialist: string;
  /** act progress (0-1) window this line is fully readable in */
  cueFrom: number;
  cueTo: number;
};

export const SERVICE_JOBS: ServiceJob[] = [
  {
    problem: "Your product works. Nobody outside your team can find it.",
    specialist: "an SEO consultant",
    cueFrom: 0.41,
    cueTo: 0.58,
  },
  {
    problem: "The MVP holds up in the demo. It buckles at 200 real users.",
    specialist: "a backend engineer",
    cueFrom: 0.54,
    cueTo: 0.71,
  },
  {
    problem: "You can see the funnel leaking. You can't see where.",
    specialist: "an analytics consultant",
    cueFrom: 0.67,
    cueTo: 0.84,
  },
  {
    problem: "Every new tool needs its own glue, by hand, again.",
    specialist: "an integrations engineer",
    cueFrom: 0.8,
    cueTo: 1,
  },
];

export type PortfolioItem = {
  name: string;
  role: string;
  blurb: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    name: "Yeti Survival",
    role: "Personal project · in development",
    blurb: "A survival game built for my son. Full loop, solo dev.",
  },
  {
    name: "Robotics UI System",
    role: "Client work · confidential, San Francisco",
    blurb: "Product UI for a robotics company's internal tooling.",
  },
  {
    name: "WPM Typing Pulse",
    role: "Personal tool",
    blurb: "A typing-speed tracker, built to sharpen my own React/TS.",
  },
  {
    name: "Content Pipeline",
    role: "Personal project · in development",
    blurb: "An automated content system: proving the loop before selling it.",
  },
];

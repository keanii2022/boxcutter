// Shared, real data — not lorem. Single source so the Services chapter's
// cue windows and the ToDoList's check-off thresholds can't drift apart.

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

export type StoryStep = {
  /** short to-do label for the ToDoList checkoff */
  label: string;
  /** the sentence shown in the Services chapter's crossfading argument */
  line: string;
  /** act progress (0-1) window this line is fully readable in */
  cueFrom: number;
  cueTo: number;
};

// The three real offerings, not a fixed idea-to-client story arc.
export const STORY_STEPS: StoryStep[] = [
  {
    label: "Website & ads",
    line: "A website that works and ads that bring people to it — built and kept running, every month, priced for a small business.",
    cueFrom: 0.41,
    cueTo: 0.66,
  },
  {
    label: "Startup support",
    line: "Starting from nothing? We help you build the business itself, not just the site.",
    cueFrom: 0.61,
    cueTo: 0.86,
  },
  {
    label: "Custom work",
    line: "Need something nobody else offers? Get on a call and we'll build exactly that.",
    cueFrom: 0.81,
    cueTo: 1,
  },
];

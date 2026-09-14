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

// The open-ended version of the pitch: not four fixed specialist roles,
// but the actual arc from idea to client. Step 2 is the DIY-video's
// counterpart — having the resources but not knowing how to use them.
export const STORY_STEPS: StoryStep[] = [
  {
    label: "Business idea",
    line: "You have a business idea and no map for turning it into something real.",
    cueFrom: 0.41,
    cueTo: 0.58,
  },
  {
    label: "Research",
    line: "You search “how to run a business” at midnight instead of running one.",
    cueFrom: 0.54,
    cueTo: 0.71,
  },
  {
    label: "outside.ai",
    line: "outside.ai takes it from there and builds the thing itself.",
    cueFrom: 0.67,
    cueTo: 0.84,
  },
  {
    label: "Clientele",
    line: "You go from an idea to a business with actual clients.",
    cueFrom: 0.8,
    cueTo: 1,
  },
];

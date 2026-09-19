// Shared, real data — not lorem. Single source so ToDoList's labels and the
// Services carousel's cards can't drift out of copy sync.

// One link, used by every CTA site-wide (Nav, Opening, Services, Contact).
export const BOOKING_URL = "https://calendly.com/keani-boxcuttersf/30min";

// The opening build-up, ahead of the specific offerings below.
export const OVERWHELM_LINES: string[] = [
  "Are you overwhelmed?",
  "Running operations on your own?",
  "Trying to figure out how to do the following tasks without spreading yourself too thin?",
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

export type ServiceIconName = "website" | "startup" | "custom";

export type StoryStep = {
  /** short to-do label for the ToDoList checkoff, and the carousel card's title */
  label: string;
  /** the fuller description shown in the carousel card's dropdown */
  line: string;
  /** short, concrete examples shown as bullets in the carousel card's dropdown */
  examples: string[];
  icon: ServiceIconName;
  /** the label ToDoList itself shows — the idea-to-execution arc, not the service name */
  todoLabel: string;
};

// The three real offerings, ordered start-to-scale: nothing yet (Startup
// support) → up and running (Website & ads) → outgrowing the basics
// (Custom work) — not a fixed idea-to-client story arc.
export const STORY_STEPS: StoryStep[] = [
  {
    label: "Startup support",
    line: "Starting from nothing? We help you build the business itself, not just the site.",
    examples: [
      "Business & legal setup — LLC, contracts, compliance",
      "First website, brand, and messaging",
      "Picking the right tools instead of guessing",
    ],
    icon: "startup",
    todoLabel: "Idea",
  },
  {
    label: "Website & ads",
    line: "A website that works and ads that bring people to it — built and kept running, every month, priced for a small business.",
    examples: [
      "Website design, build, and hosting",
      "Ad campaigns that actually convert",
      "Ongoing maintenance & updates, monthly",
    ],
    icon: "website",
    todoLabel: "Box Cutter SF",
  },
  {
    label: "Custom work",
    line: "Need something nobody else offers? Get on a call and we'll build exactly that.",
    examples: [
      "Internal tools & automations",
      "Backend, integrations, and APIs",
      "Anything else — just ask",
    ],
    icon: "custom",
    todoLabel: "Execute",
  },
];

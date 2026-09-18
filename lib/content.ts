// Shared, real data — not lorem. Single source so ToDoList's labels and the
// Services carousel's cards can't drift out of copy sync.

// One link, used by every CTA site-wide (Nav, Opening, Services, Contact).
export const BOOKING_URL = "https://calendly.com/keani-boxcutter/30min";

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
  icon: ServiceIconName;
};

// The three real offerings, ordered start-to-scale: nothing yet (Startup
// support) → up and running (Website & ads) → outgrowing the basics
// (Custom work) — not a fixed idea-to-client story arc.
export const STORY_STEPS: StoryStep[] = [
  {
    label: "Startup support",
    line: "Starting from nothing? We help you build the business itself, not just the site.",
    icon: "startup",
  },
  {
    label: "Website & ads",
    line: "A website that works and ads that bring people to it — built and kept running, every month, priced for a small business.",
    icon: "website",
  },
  {
    label: "Custom work",
    line: "Need something nobody else offers? Get on a call and we'll build exactly that.",
    icon: "custom",
  },
];

// Shared, real data — not lorem. Single source so ToDoList's labels and the
// Services carousel's cards can't drift out of copy sync.

// One link, used by every CTA site-wide (Nav, Opening, Services, Contact).
export const BOOKING_URL = "https://calendly.com/keani-boxcuttersf/30min";

// Where the Custom Work card's inquiry field routes to.
export const CONTACT_EMAIL = "keani@boxcutter.com";

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
  "Finances",
  "Team",
  "Legal",
  "Systems",
  "Analytics",
  "Support",
  "Marketing",
  "Design",
  "Branding",
  "Automation",
  "Strategy",
];

// Custom Work card's budget-friendly framing — the soft, name-your-own-budget
// path (Custom Work's email+message form) vs. the Cost Estimator's real numbers.
export const CUSTOM_WORK_BUDGET_LABEL =
  "On a budget? Tell me what's on your mind and we can go from there";

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
    line: CUSTOM_WORK_BUDGET_LABEL,
    examples: [
      "Internal tools & automations",
      "Backend, integrations, and APIs",
      "Anything else — just ask",
    ],
    icon: "custom",
    todoLabel: "Execute",
  },
];

// Pricing & Cost Estimator — real numbers, confirmed 2026-09-19. Feeds the
// Services-section estimator trigger (Step 25) and CostEstimator (Step 26).

export type PricingTier = {
  label: string;
  price: string;
  description: string;
};

export const STARTER_TIER: PricingTier = {
  label: "Starter",
  price: "$150–$300",
  description: "A first website, brand, and messaging — everything you need to go live.",
};

export const FULL_LAUNCH_TIER: PricingTier = {
  label: "Full Launch",
  price: "$400–$800",
  description: "Everything in Starter, built out further, plus 2 free months of Full Launch Management included.",
};

export const MOBILE_UX_ADDON: PricingTier = {
  label: "Mobile UX Site",
  price: "$60",
  description: "A site built specifically for how people use it on their phone — not your desktop site shrunk down, a separate mobile experience in the same brand.",
};

export const FULL_LAUNCH_MANAGEMENT: PricingTier = {
  label: "Full Launch Management",
  price: "$100–$300/mo",
  description: "Unlimited, 24/7 access, no credits to track — free for your first 2 months with Full Launch, then paid month to month.",
};

export type CreditPack = {
  price: string;
  credits: number;
  bonus?: number;
};

// $ → credits, with the bonus credits included at the higher tiers.
export const CREDIT_PACKS: CreditPack[] = [
  { price: "$30", credits: 30 },
  { price: "$60", credits: 60, bonus: 20 },
  { price: "$90", credits: 90, bonus: 30 },
];

export type CreditCost = {
  credits: number;
  label: string;
};

export const CREDIT_COSTS: CreditCost[] = [
  { credits: 10, label: "A 20-minute 1-on-1 — questions, prompt and agent suggestions" },
  { credits: 20, label: "Debugging, polishing, or adding one feature" },
  { credits: 30, label: "Tell me the problem, I'll research and fix it myself" },
];

export const GENERAL_MANAGEMENT: PricingTier = {
  label: "General Management",
  price: "$80–$300/mo",
  description:
    "Buy-as-you-go access to me with credits, open to any client. Turnaround is a bit slower than Full Launch Management, and cost can flex with the job — Full Launch Management is flat and fast, credits are pay-as-you-go.",
};

export const SOLUTION_TRAINING: PricingTier = {
  label: "AI → Human Solution Training",
  price: "$200 total ($100/week, 2 weeks)",
  description: "Two weeks, project-led and hands-on, until you can run what we built yourself.",
};

// Services-section estimator trigger (Step 25).
export const ESTIMATOR_TRIGGER_COPY =
  "Got an idea of what you can spend already? Check out my cost estimator";

// What credits can buy, beyond web builds — shown near the token marketplace entry point.
export const CREDIT_MARKETPLACE_DESCRIPTION =
  "Credits aren't just for web work — use them for 1-on-1s, debugging and feature work, hands-off fixes, email management, customer service support, graphic design, logo creation, or talking through your branding.";

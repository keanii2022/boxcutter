# BoxCutter

**Live:** [boxcutter-xi.vercel.app](https://boxcutter-xi.vercel.app)

A scroll-driven landing page for BoxCutter — plainspoken, no-jargon help with AI and tech for small businesses and solo founders. Built as a single cinematic scroll rather than a stack of sections: a typing wordmark, a pinned "to-do list" that checks itself off as you scroll through the services pitch, a live GitHub activity chart, and a booking CTA that follows you to Contact.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Custom scroll-choreography engine (`public/scrollcraft/scrollcraft.js`) driving pinned sections and per-section CSS custom properties — no scroll library
- Plain CSS with a small token system (`styles/tokens.css`, `styles/scrollcraft.css`) instead of a utility framework
- Live data: the GitHub section pulls real commit activity from the public GitHub API at runtime

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — Next.js App Router entry (`page.tsx`, `layout.tsx`)
- `components/sections/` — one component per scroll chapter (Opening, Services, About, GitHub stats, Contact)
- `components/` — shared UI (nav, logo, scroll-driven bits like `ScrollPulse` and `TaskMarquee`)
- `lib/content.ts` — copy and timing constants, kept separate from markup so cue windows can't drift out of sync with the components that read them
- `styles/` — tokens, the scroll-craft base layer, and site-specific rules

## Status

The full scroll experience (Opening → Services → About → GitHub → Contact) is finished and live on `main`.

import MobileNav from "../../components/mobile/Nav";
import MobileOpening from "../../components/mobile/Opening";
import BridgeChapter from "../../components/sections/BridgeChapter";
import MobileServicesChapter from "../../components/mobile/ServicesChapter";
import AboutChapter from "../../components/sections/AboutChapter";
import AboutGithubScrub from "../../components/sections/AboutGithubScrub";
import GithubStatsChapter from "../../components/sections/GithubStatsChapter";
import MobileContactChapter from "../../components/mobile/ContactChapter";

// `proxy.ts` forks phone-class UAs here (Step 28). Every chapter has now had
// its own mobile pass (Steps 30-34): Nav/Opening, Services/Cost Estimator,
// and Contact got dedicated components/mobile/ builds where the desktop
// composition itself didn't translate (touch targets, a pinned stage
// clipping stacked content, drag-input sliders); About and GitHub stats
// needed no separate component, just shared-CSS fixes (badge clearance,
// a legible contribution graph), so they still import straight from
// components/sections/. BridgeChapter (the scroll-scrubbed "People have
// ideas" video hero) is shared too — on any portrait screen its wide clip
// sits in a rounded frame instead of being cropped (Step 41), and here it
// scrolls with the page instead of pinning (`flow`, Step 46).
export default function MobileHome() {
  return (
    <>
      {/* ToDoList lives inside MobileNav's bottom dock here, not floating
          over the page — see .todo--docked in styles/site.css. */}
      <MobileNav />
      <main id="top">
        <MobileOpening />
        <BridgeChapter flow />
        <MobileServicesChapter />
        <AboutChapter />
        <AboutGithubScrub />
        <GithubStatsChapter />
        <MobileContactChapter />
      </main>
    </>
  );
}

import MobileNav from "../../components/mobile/Nav";
import ToDoList from "../../components/ToDoList";
import MobileOpening from "../../components/mobile/Opening";
import BridgeChapter from "../../components/sections/BridgeChapter";
import MobileServicesChapter from "../../components/mobile/ServicesChapter";
import AboutChapter from "../../components/sections/AboutChapter";
import AboutGithubScrub from "../../components/sections/AboutGithubScrub";
import GithubStatsChapter from "../../components/sections/GithubStatsChapter";
import ContactChapter from "../../components/sections/ContactChapter";

// Temporary: `proxy.ts` forks phone-class UAs here, but some sections still
// don't have their own mobile composition (Steps 33-34 remain). Nav/Opening
// (Step 30) and Services/Cost Estimator (Step 32) got their own mobile
// builds in components/mobile/; About (Step 31) needed no separate build,
// just a shared-CSS clearance fix. GitHub stats and Contact still render
// `app/page.tsx`'s desktop tree so mobile visitors keep the current, working
// experience while that work lands section by section, instead of a
// placeholder that would regress production. Replace piece by piece — don't
// just delete this duplication in one shot once Step 33 starts.
export default function MobileHome() {
  return (
    <>
      <MobileNav />
      <ToDoList />
      <main id="top">
        <MobileOpening />
        <BridgeChapter />
        <MobileServicesChapter />
        <AboutChapter />
        <AboutGithubScrub />
        <GithubStatsChapter />
        <ContactChapter />
      </main>
    </>
  );
}

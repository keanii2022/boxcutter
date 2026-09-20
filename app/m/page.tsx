import MobileNav from "../../components/mobile/Nav";
import ToDoList from "../../components/ToDoList";
import MobileOpening from "../../components/mobile/Opening";
import BridgeChapter from "../../components/sections/BridgeChapter";
import ServicesChapter from "../../components/sections/ServicesChapter";
import AboutChapter from "../../components/sections/AboutChapter";
import AboutGithubScrub from "../../components/sections/AboutGithubScrub";
import GithubStatsChapter from "../../components/sections/GithubStatsChapter";
import ContactChapter from "../../components/sections/ContactChapter";

// Temporary: `proxy.ts` forks phone-class UAs here, but most of the
// mobile-specific composition still doesn't exist (Steps 31-34). Nav and
// Opening got their own mobile builds in Step 30 (components/mobile/);
// everything below Opening still renders `app/page.tsx`'s desktop tree so
// mobile visitors keep the current, working experience while that work
// lands section by section, instead of a placeholder that would regress
// production. Replace piece by piece — don't just delete this duplication
// in one shot once Step 31 starts.
export default function MobileHome() {
  return (
    <>
      <MobileNav />
      <ToDoList />
      <main id="top">
        <MobileOpening />
        <BridgeChapter />
        <ServicesChapter />
        <AboutChapter />
        <AboutGithubScrub />
        <GithubStatsChapter />
        <ContactChapter />
      </main>
    </>
  );
}

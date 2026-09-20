import Nav from "../../components/Nav";
import ToDoList from "../../components/ToDoList";
import Opening from "../../components/sections/Opening";
import BridgeChapter from "../../components/sections/BridgeChapter";
import ServicesChapter from "../../components/sections/ServicesChapter";
import AboutChapter from "../../components/sections/AboutChapter";
import AboutGithubScrub from "../../components/sections/AboutGithubScrub";
import GithubStatsChapter from "../../components/sections/GithubStatsChapter";
import ContactChapter from "../../components/sections/ContactChapter";

// Temporary: `proxy.ts` forks phone-class UAs here, but the mobile-specific
// composition doesn't exist yet (Steps 29-34). Rendering the same tree as
// `app/page.tsx` keeps mobile visitors on the current, working experience
// while that work lands section by section, instead of a placeholder that
// would regress production. Replace piece by piece — don't just delete this
// duplication in one shot once Step 30 starts.
export default function MobileHome() {
  return (
    <>
      <Nav />
      <ToDoList />
      <main id="top">
        <Opening />
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

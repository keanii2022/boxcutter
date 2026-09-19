import Nav from "../components/Nav";
import ToDoList from "../components/ToDoList";
import Opening from "../components/sections/Opening";
import BridgeChapter from "../components/sections/BridgeChapter";
import ServicesChapter from "../components/sections/ServicesChapter";
import AboutChapter from "../components/sections/AboutChapter";
import AboutGithubScrub from "../components/sections/AboutGithubScrub";
import GithubStatsChapter from "../components/sections/GithubStatsChapter";
import ContactChapter from "../components/sections/ContactChapter";

export default function Home() {
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

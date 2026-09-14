import Nav from "../components/Nav";
import ToDoList from "../components/ToDoList";
import Opening from "../components/sections/Opening";
import ServicesChapter from "../components/sections/ServicesChapter";
import AboutChapter from "../components/sections/AboutChapter";
import GithubStatsChapter from "../components/sections/GithubStatsChapter";
import ContactChapter from "../components/sections/ContactChapter";

export default function Home() {
  return (
    <>
      <Nav />
      <ToDoList />
      <main id="top">
        <Opening />
        <ServicesChapter />
        <AboutChapter />
        <GithubStatsChapter />
        <ContactChapter />
      </main>
    </>
  );
}

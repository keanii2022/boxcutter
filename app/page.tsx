import Nav from "../components/Nav";
import Ledger from "../components/Ledger";
import Opening from "../components/sections/Opening";
import ServicesChapter from "../components/sections/ServicesChapter";
import AboutChapter from "../components/sections/AboutChapter";
import PortfolioChapter from "../components/sections/PortfolioChapter";
import ContactChapter from "../components/sections/ContactChapter";

export default function Home() {
  return (
    <>
      <Nav />
      <Ledger />
      <main id="top">
        <Opening />
        <ServicesChapter />
        <AboutChapter />
        <PortfolioChapter />
        <ContactChapter />
      </main>
    </>
  );
}

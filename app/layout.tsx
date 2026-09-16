import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import "../styles/scrollcraft.css";
import "../styles/tokens.css";
import "../styles/site.css";
import "./globals.css";
import ScrollCraftMount from "../components/ScrollCraftMount";
import ScrollPulse from "../components/ScrollPulse";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BoxCutter: Keani Antezana",
  description:
    "BoxCutter: think outside the box. Plainspoken, no-jargon help with AI and tech for small businesses and solo founders, from Keani Antezana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <span data-sc-progress />
        <div className="sc-grain" aria-hidden="true" />
        {children}
        <ScrollCraftMount />
        <ScrollPulse />
      </body>
    </html>
  );
}

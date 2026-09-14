import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import "../styles/scrollcraft.css";
import "../styles/tokens.css";
import "../styles/site.css";
import "./globals.css";
import ScrollCraftMount from "../components/ScrollCraftMount";

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
  title: "outside.ai: Keani Antezana",
  description:
    "outside.ai: automated solutions and robotics consulting from Keani Antezana. One conversation instead of five hires.",
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
      </body>
    </html>
  );
}

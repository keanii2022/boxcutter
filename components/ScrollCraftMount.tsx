"use client";

import Script from "next/script";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: HTMLElement) => unknown };
  }
}

export default function ScrollCraftMount() {
  return (
    <Script
      src="/scrollcraft/scrollcraft.js"
      strategy="afterInteractive"
      onReady={() => {
        window.ScrollCraft?.mount(document.body);
      }}
    />
  );
}

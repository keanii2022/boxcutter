"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Ported from the wpm-fidget project's useWpmPulse hook — the live-typing-
// speed logic only, not its UI, colors, or the run/checkpoint/timer scaffold
// built around it there (none of that applies to a plain contact field).
const WINDOW_MS = 4000;
const PULSE_MS = 160;

function computeLiveWpm(charTimes: number[], now: number) {
  const recent = charTimes.filter((t) => now - t <= WINDOW_MS);
  const words = recent.length / 5;
  const wpm = Math.round(words / (WINDOW_MS / 60000));
  return { wpm, recent };
}

/**
 * Tracks typing speed from a rolling window of keystrokes and flips `pulse`
 * true for PULSE_MS on every character typed, so a caller can flash a border
 * or glow in time with typing instead of just on/off focus.
 */
export function useWpmPulse() {
  const [wpm, setWpm] = useState(0);
  const [pulse, setPulse] = useState(false);
  const charTimes = useRef<number[]>([]);
  const prevLength = useRef(0);
  const pulseTimeout = useRef<number | null>(null);

  const onValueChange = useCallback((value: string) => {
    const now = Date.now();
    const grew = value.length > prevLength.current;
    prevLength.current = value.length;
    if (!grew) return;

    charTimes.current.push(now);
    const { wpm: currentWpm, recent } = computeLiveWpm(charTimes.current, now);
    charTimes.current = recent;
    setWpm(currentWpm);

    setPulse(true);
    if (pulseTimeout.current) window.clearTimeout(pulseTimeout.current);
    pulseTimeout.current = window.setTimeout(() => setPulse(false), PULSE_MS);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();
      const { recent } = computeLiveWpm(charTimes.current, now);
      charTimes.current = recent;
      if (charTimes.current.length === 0) setWpm(0);
    }, 200);
    return () => window.clearInterval(interval);
  }, []);

  return { wpm, pulse, onValueChange };
}

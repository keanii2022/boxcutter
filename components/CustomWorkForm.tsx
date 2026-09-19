"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "../lib/content";
import { useWpmPulse } from "./useWpmPulse";

type Status = "idle" | "sending" | "sent" | "error";

// Public by design — Web3Forms access keys are meant to be embedded in
// client code (they identify where a submission gets routed, not a secret).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * The Custom Work card's dropdown, in place of the other two cards' examples
 * list: a client explains what they need directly instead of picking from
 * bullets that can't cover a one-off. The textarea's border pulses with the
 * writer's own typing speed (logic ported from the wpm-fidget project's
 * useWpmPulse, restyled to this site's single accent instead of that
 * project's tiered palette).
 */
export default function CustomWorkForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { wpm, pulse, onValueChange } = useWpmPulse();

  const glow = pulse
    ? `0 0 ${(6 + Math.min(wpm, 90) * 0.35).toFixed(1)}px color-mix(in oklab, var(--sc-accent) 70%, transparent)`
    : "none";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim() || status === "sending") return;

    if (!WEB3FORMS_KEY) {
      // No backend configured yet — hand off to the visitor's own mail
      // client so the field still does something useful in the meantime.
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Custom work inquiry"
      )}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Custom work inquiry — BoxCutter",
          from_name: email,
          email,
          message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="custom-work-form__status custom-work-form__status--sent">
        Got it — I&rsquo;ll reply at {email}.
      </p>
    );
  }

  return (
    <form className="custom-work-form" onSubmit={handleSubmit}>
      <div className="custom-work-form__field">
        <label className="custom-work-form__label" htmlFor="custom-work-email">
          Your email
        </label>
        <input
          id="custom-work-email"
          className="custom-work-form__input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="custom-work-form__field">
        <label className="custom-work-form__label" htmlFor="custom-work-message">
          What do you need?
        </label>
        <textarea
          id="custom-work-message"
          className="custom-work-form__textarea"
          style={{ boxShadow: glow }}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onValueChange(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="custom-work-form__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send →"}
      </button>
      {status === "error" && (
        <p className="custom-work-form__status custom-work-form__status--error">
          Something went wrong — email {CONTACT_EMAIL} directly instead.
        </p>
      )}
    </form>
  );
}

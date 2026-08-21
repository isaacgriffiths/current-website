"use client";

import { useState } from "react";
import { person } from "@/content/profile";

type Status = "idle" | "sending" | "sent" | "error";

const intents = [
  "A role I am hiring for",
  "A copy of your CV",
  "A project or collaboration",
  "Something else",
];

const field =
  "w-full rounded-lg border border-line bg-ink-raised/60 px-4 py-3 text-[0.9375rem] text-ivory placeholder:text-faint transition-colors focus:border-amber focus:outline-none";
const labelClass = "block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "That did not send.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "That did not send.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-amber/30 bg-amber/[0.06] p-8">
        <p className="key">Received</p>
        <p className="mt-3 text-lg leading-relaxed text-ivory">
          Thanks — that reached me. I reply to everything, usually within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* honeypot — real people leave this empty */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" required maxLength={120} className={`${field} mt-2`} placeholder="Jane Okoro" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            className={`${field} mt-2`}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="intent">
          What are you after?
        </label>
        <select id="intent" name="intent" className={`${field} mt-2`} defaultValue={intents[0]}>
          {intents.map((intent) => (
            <option key={intent} value={intent} className="bg-ink-raised">
              {intent}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          className={`${field} mt-2 resize-y`}
          placeholder="A sentence or two about the role or the problem is plenty."
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error} You can email me directly at{" "}
          <a className="underline underline-offset-2" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-amber px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-amber-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <p className="font-mono text-[0.6875rem] text-faint">
          Or email{" "}
          <a className="text-muted underline underline-offset-2 hover:text-ivory" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </p>
      </div>
    </form>
  );
}

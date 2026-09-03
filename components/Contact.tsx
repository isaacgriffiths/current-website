"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { person } from "@/content/profile";
import { CONTACT_INTENT_EVENT, CV_REQUEST_INTENT } from "./CvRequestLink";

type Status = "idle" | "sending" | "sent" | "error";
type DeliveryKind = "message" | "cv";

const intents = [
  "A role I am hiring for",
  "A copy of my CV",
  "A project or collaboration",
  "Something else",
] as const;

type Intent = (typeof intents)[number];

const field =
  "w-full rounded-lg border border-white/10 bg-ink/55 px-4 py-3 text-base text-ivory shadow-inner shadow-black/5 placeholder:text-faint/80 transition-[border-color,background-color,box-shadow] hover:border-white/20 focus:border-accent/70 focus:bg-ink/75 focus:outline-none focus:ring-4 focus:ring-accent/10";
const labelClass = "key block text-muted";
const subscribeToHydration = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

function IntentSelect({ onChange }: { onChange(intent: Intent): void }) {
  const hydrated = useHydrated();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => listRef.current?.focus());
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [open]);

  useEffect(() => {
    const selectRequestedIntent = (event: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : null;
      if (typeof detail !== "string") return;

      const index = intents.findIndex((intent) => intent === detail);
      if (index < 0) return;

      setSelectedIndex(index);
      setActiveIndex(index);
      setOpen(false);
      onChange(intents[index]);
    };

    window.addEventListener(CONTACT_INTENT_EVENT, selectRequestedIntent);
    return () => window.removeEventListener(CONTACT_INTENT_EVENT, selectRequestedIntent);
  }, [onChange]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    setSelectedIndex(index);
    setActiveIndex(index);
    setOpen(false);
    onChange(intents[index]);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const move = (amount: number) => {
    setActiveIndex((current) => (current + amount + intents.length) % intents.length);
  };

  const chooseNative = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = intents.findIndex((intent) => intent === event.target.value);
    if (index < 0) return;

    setSelectedIndex(index);
    setActiveIndex(index);
    onChange(intents[index]);
  };

  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAt(selectedIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAt(selectedIndex);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAt(selectedIndex);
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(intents.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(activeIndex);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${open ? "z-40" : ""}`}>
      <label
        id={`${id}-label`}
        htmlFor={hydrated ? `${id}-button` : `${id}-native`}
        className={labelClass}
      >
        What are you after?
      </label>

      <div className={hydrated ? "hidden" : "relative mt-2"}>
        <select
          id={`${id}-native`}
          name="intent"
          value={intents[selectedIndex]}
          onChange={chooseNative}
          className={`${field} appearance-none pr-12`}
        >
          {intents.map((intent) => (
            <option key={intent} value={intent}>
              {intent}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <button
        ref={buttonRef}
        id={`${id}-button`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-hidden={!hydrated}
        tabIndex={hydrated ? 0 : -1}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={onButtonKeyDown}
        className={`${field} mt-2 ${hydrated ? "flex" : "hidden"} items-center justify-between gap-4 text-left`}
      >
        <span id={`${id}-value`}>{intents[selectedIndex]}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-accent" : ""
          }`}
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {hydrated && open ? (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-option-${activeIndex}`}
          onKeyDown={onListKeyDown}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-white/15 bg-ink-raised p-1.5 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)] outline-none ring-1 ring-black/20"
        >
          {intents.map((intent, index) => {
            const selected = selectedIndex === index;
            const active = activeIndex === index;

            return (
              <li
                key={intent}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={selected}
                onPointerMove={() => setActiveIndex(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-4 py-3 text-base transition-colors ${
                  active ? "bg-white/[0.08] text-ivory" : "text-muted"
                } ${selected ? "text-accent" : ""}`}
              >
                <span>{intent}</span>
                <span
                  aria-hidden
                  className={`text-accent transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                >
                  &#10003;
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [intent, setIntent] = useState<Intent>(intents[0]);
  const [sentKind, setSentKind] = useState<DeliveryKind>("message");
  const [sentTo, setSentTo] = useState("");
  const isCvRequest = intent === CV_REQUEST_INTENT;

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

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        kind?: DeliveryKind;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "That did not send.");
      }

      const submittedEmail = typeof data.email === "string" ? data.email : "";
      setSentKind(body.kind === "cv" ? "cv" : "message");
      setSentTo(submittedEmail);
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "That did not send.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-accent/25 bg-accent/[0.055] p-6">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
          aria-hidden
        >
          &#10003;
        </div>
        <p className="key mt-5 text-accent">
          {sentKind === "cv" ? "CV sent" : "Message received"}
        </p>
        <p className="mt-3 leading-relaxed text-ivory">
          {sentKind === "cv" ? (
            <>
              I&rsquo;ve emailed my latest 2026 CV to <strong>{sentTo}</strong>. The PDF is
              attached to your personalised confirmation email.
            </>
          ) : (
            "Thanks, that reached me. I reply to everything, usually within a day or two."
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setIntent(intents[0]);
            setSentKind("message");
            setSentTo("");
            setStatus("idle");
          }}
          className="key mt-5 text-accent underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot: real people leave this empty. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            className={`${field} mt-2`}
            placeholder="Jane Okoro"
          />
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

      <IntentSelect onChange={setIntent} />

      {isCvRequest ? (
        <p className="rounded-lg border border-accent/20 bg-accent/[0.045] px-4 py-3 text-base leading-relaxed text-muted">
          Enter your name and email, then I&rsquo;ll send the latest PDF straight to your inbox.
        </p>
      ) : (
        <div>
          <label className={labelClass} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            maxLength={4000}
            className={`${field} mt-2 resize-y`}
            placeholder="A sentence or two about the role or the problem is plenty."
          />
        </div>
      )}

      {status === "error" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-base text-red-200"
        >
          {error} You can email me directly at{" "}
          <a className="underline underline-offset-2" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="key group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(0,254,254,0.75)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_14px_36px_-12px_rgba(0,254,254,0.9)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
        >
          {status === "sending"
            ? "Sending..."
            : isCvRequest
              ? "Email me the CV"
              : "Send message"}
          {status !== "sending" ? (
            <span
              aria-hidden
              className="text-base transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              &rarr;
            </span>
          ) : null}
        </button>
        <p className="text-sm leading-relaxed text-faint">
          Prefer email?{" "}
          <a
            className="text-muted underline underline-offset-2 hover:text-ivory"
            href={`mailto:${person.email}`}
          >
            {person.email}
          </a>
        </p>
      </div>
    </form>
  );
}

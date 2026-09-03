"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { triage } from "@/content/profile";

const STEP_MS = 620;
const START_MS = 900;
const QUERY = "(prefers-reduced-motion: reduce)";

/** Subscribes to the OS motion preference rather than sampling it once. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * The signature element: a thin request becoming a routable one, live.
 * This is the shape of the work, so the page shows it rather than describing it.
 */
export default function TriageDemo() {
  const total = triage.questions.length;
  const reduced = usePrefersReducedMotion();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timers = Array.from({ length: total + 1 }, (_, i) =>
      window.setTimeout(() => setElapsed(i + 1), START_MS + i * STEP_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [total, reduced]);

  // With motion suppressed the demo shows its finished state instead of building up.
  const step = reduced ? total + 1 : elapsed;
  const routed = step > total;

  return (
    <figure className="m-0">
      <div className="rounded-md border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="key text-accent">Intake</span>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint">
            <span className={`h-1.5 w-1.5 rounded-full bg-accent ${routed ? "" : "live-dot"}`} />
            {routed ? "complete" : "asking"}
          </span>
        </div>

        <p className="pt-5 font-mono text-base leading-relaxed text-muted">
          <span className="text-faint">&gt;&nbsp;</span>
          {triage.before}
        </p>

        <ul className="mt-5 space-y-0 border-t border-dashed border-white/10 pt-1">
          {triage.questions.map((q, i) => {
            const visible = step > i;
            return (
              <li
                key={q.key}
                className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 border-b border-white/[0.07] py-2.5 transition-all duration-500 ease-out sm:grid-cols-[8.5rem_1fr]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(6px)",
                }}
                aria-hidden={!visible}
              >
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                  {q.key}
                </span>
                <span className="font-mono text-sm text-ivory">{q.value}</span>
              </li>
            );
          })}
        </ul>

        <div
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-accent/30 bg-accent/[0.07] px-4 py-3 transition-all duration-500 ease-out"
          style={{ opacity: routed ? 1 : 0, transform: routed ? "none" : "translateY(6px)" }}
          aria-hidden={!routed}
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Routed
          </span>
          <span className="font-mono text-sm text-ivory">{triage.after.queue}</span>
          <span className="text-faint">·</span>
          <span className="font-mono text-sm text-ivory">{triage.after.priority}</span>
          <span className="ml-auto font-mono text-xs text-faint">{triage.after.note}</span>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-faint">
        Illustrative. The pattern, not a real ticket.
      </figcaption>
    </figure>
  );
}

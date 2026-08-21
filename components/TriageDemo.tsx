"use client";

import { useEffect, useState } from "react";
import { triage } from "@/content/profile";

const STEP_MS = 620;
const START_MS = 900;

/**
 * The signature element: a thin request becoming a routable one, live.
 * This is the shape of the work, so the page opens by doing it rather than describing it.
 */
export default function TriageDemo() {
  const total = triage.questions.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setStep(total + 1);
      return;
    }

    const timers = Array.from({ length: total + 1 }, (_, i) =>
      window.setTimeout(() => setStep(i + 1), START_MS + i * STEP_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [total]);

  const routed = step > total;

  return (
    <figure className="m-0">
      <div className="rounded-xl border border-line bg-ink-raised/80 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="key">Intake</span>
          <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
            <span className={`h-1.5 w-1.5 rounded-full bg-amber ${routed ? "" : "live-dot"}`} />
            {routed ? "complete" : "asking"}
          </span>
        </div>

        <p className="pt-5 font-mono text-sm leading-relaxed text-muted">
          <span className="text-faint">&gt;&nbsp;</span>
          {triage.before}
        </p>

        <ul className="mt-5 space-y-0 border-t border-dashed border-line pt-1">
          {triage.questions.map((q, i) => {
            const visible = step > i;
            return (
              <li
                key={q.key}
                className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 border-b border-line/60 py-2.5 transition-all duration-500 ease-out sm:grid-cols-[8.5rem_1fr]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(6px)",
                }}
                aria-hidden={!visible}
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
                  {q.key}
                </span>
                <span className="font-mono text-[0.8125rem] text-ivory">{q.value}</span>
              </li>
            );
          })}
        </ul>

        <div
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-amber/30 bg-amber/[0.07] px-4 py-3 transition-all duration-500 ease-out"
          style={{ opacity: routed ? 1 : 0, transform: routed ? "none" : "translateY(6px)" }}
          aria-hidden={!routed}
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-amber">
            Routed
          </span>
          <span className="font-mono text-[0.8125rem] text-ivory">{triage.after.queue}</span>
          <span className="text-faint">·</span>
          <span className="font-mono text-[0.8125rem] text-ivory">{triage.after.priority}</span>
          <span className="ml-auto font-mono text-[0.6875rem] text-faint">{triage.after.note}</span>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-faint">
        Illustrative. The pattern, not a real ticket.
      </figcaption>
    </figure>
  );
}

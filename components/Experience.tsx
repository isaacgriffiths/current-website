import { experience } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="Where it was earned"
      intro="Four years inside GSK, most recent first."
    >
      {/* A spine rather than cards: the dates are a real sequence, so the shape says so. */}
      <Reveal>
        <div className="relative mx-auto max-w-3xl">
          <span
            className="absolute left-[0.3125rem] top-3 hidden h-[calc(100%-2rem)] w-px bg-white/10 sm:block"
            aria-hidden
          />
          <ol>
            {experience.map((role) => (
              <li key={role.index} className="relative pb-14 last:pb-0 sm:pl-12">
                <span
                  className={`absolute left-0 top-2.5 hidden h-2.5 w-2.5 rounded-full sm:block ${
                    role.current ? "bg-accent" : "border border-white/30 bg-ink"
                  }`}
                  aria-hidden
                />

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="display text-xl leading-tight sm:text-2xl">{role.title}</h3>
                  {role.current ? (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent">
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {role.org} · {role.place} · {role.period}
                </p>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/80">{role.summary}</p>

                <ul className="mt-5 space-y-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-white/25" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-faint">
                  {role.tags.join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}

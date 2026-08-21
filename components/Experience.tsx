import { experience } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="The record"
      intro="Numbered in the order it happened. Most recent first."
    >
      {/* the spine: the timeline is real, so it gets a real line */}
      <div className="relative">
        <span className="absolute left-[0.4375rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block" aria-hidden />
        <ol>
          {experience.map((role, i) => (
          <li key={role.index} className="relative pb-14 last:pb-0 md:pl-14">
            <span
              className={`absolute left-0 top-1.5 hidden h-[0.9375rem] w-[0.9375rem] rounded-full border-2 md:block ${
                role.current ? "border-amber bg-amber" : "border-line-strong bg-ink"
              }`}
              aria-hidden
            />
            <Reveal delay={i * 90}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint">{role.index}</span>
                <h3 className="display text-2xl md:text-[1.75rem]">{role.title}</h3>
                {role.current ? (
                  <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-amber">
                    Current
                  </span>
                ) : null}
              </div>

              <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                {role.org} · {role.place} · {role.period}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/80">{role.summary}</p>

              {role.points.length > 0 ? (
                <ul className="mt-5 max-w-2xl space-y-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-6 max-w-2xl font-mono text-[0.6875rem] leading-relaxed text-faint">
                {role.tags.join(" · ")}
              </p>
            </Reveal>
          </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

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
      <div className="mx-auto grid max-w-4xl gap-5">
        {experience.map((role, i) => (
          <Reveal key={role.index} delay={i * 90}>
            <article
              className={`rounded-2xl border bg-white/[0.03] p-6 sm:p-8 ${
                role.current ? "border-amber/30" : "border-white/10"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div>
                  <h3 className="display text-xl leading-tight sm:text-2xl">{role.title}</h3>
                  <p className="mt-2 text-[0.875rem] text-muted">
                    {role.org} · {role.place}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {role.current ? (
                    <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-amber">
                      Current
                    </span>
                  ) : null}
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    {role.period}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/80">{role.summary}</p>

              <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-faint">
                {role.tags.join(" · ")}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

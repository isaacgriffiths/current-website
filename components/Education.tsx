import { education, interests } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Education() {
  return (
    <Section
      id="education"
      label="Education & off the clock"
      title="Earned alongside the job"
      intro="A degree apprenticeship means the coursework and the delivery ran at the same time, for four years."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <article className="flex h-full flex-col rounded-xl border border-line bg-ink-raised/50 p-7">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber">
              {education.degree.period}
            </p>
            <h3 className="display mt-3 text-2xl leading-tight">{education.degree.title}</h3>
            <p className="mt-2 text-sm text-muted">{education.degree.school}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/80">{education.degree.detail}</p>

            <p className="mt-7 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
              Strongest modules
            </p>
            <ul className="mt-3 space-y-2 border-t border-line pt-3">
              {education.degree.highlights.map((h) => (
                <li key={h} className="font-mono text-[0.75rem] leading-relaxed text-ivory/70">
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-7 space-y-2 border-t border-line pt-5">
              {education.earlier.map((e) => (
                <li key={e.title} className="text-[0.875rem] text-muted">
                  <span className="text-ivory/85">{e.title}</span> — {e.detail}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={90} className="h-full">
          <article className="flex h-full flex-col rounded-xl border border-line bg-ink-raised/50 p-7">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber">
              Outside work
            </p>
            <h3 className="display mt-3 text-2xl leading-tight">Where the side projects come from</h3>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {interests.map((interest) => (
                <li key={interest.title} className="py-4">
                  <h4 className="text-[0.9375rem] text-ivory">{interest.title}</h4>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">{interest.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

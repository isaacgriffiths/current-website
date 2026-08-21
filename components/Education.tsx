import { education, interests } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Education() {
  return (
    <Section
      id="education"
      label="Education & off the clock"
      title="Earned alongside the job"
      intro="A degree apprenticeship means four years of coursework and full-time delivery running at the same time."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Reveal className="h-full">
          <article className="h-full rounded-2xl border border-accent/25 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
              {education.degree.period}
            </p>
            <h3 className="display mt-3 text-xl leading-tight sm:text-2xl">{education.degree.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">{education.degree.school}</p>

            <dl className="mt-7">
              {education.degree.highlights.map((h) => {
                const [module, mark] = h.split(" — ");
                return (
                  <div key={h} className="flex items-baseline gap-3 border-b border-white/10 py-2.5">
                    <dt className="text-[0.875rem] text-ivory/75">{module}</dt>
                    <span className="h-px flex-1 bg-white/10" aria-hidden />
                    <dd className="font-mono text-[0.8125rem] text-accent">{mark}</dd>
                  </div>
                );
              })}
            </dl>

            <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
              {education.earlier.map((e) => `${e.title} (${e.detail})`).join(". ")}.
            </p>
          </article>
        </Reveal>

        <Reveal className="h-full">
          <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
              Outside work
            </p>
            <dl className="mt-5">
              {interests.map((interest) => (
                <div
                  key={interest.title}
                  className="border-t border-white/10 py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[0.9375rem] text-ivory">{interest.title}</dt>
                  <dd className="mt-1 text-[0.875rem] leading-relaxed text-muted">{interest.body}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

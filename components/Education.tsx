import { education, interests } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" label="Education & off the clock" title="Earned alongside the job">
      <div className="grid gap-14 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber">
              {education.degree.period}
            </p>
            <h3 className="display mt-3 text-3xl leading-tight">{education.degree.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">{education.degree.school}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/80">
              A degree apprenticeship, which means four years of coursework and full-time delivery
              running at the same time.
            </p>

            <dl className="mt-9 max-w-lg">
              {education.degree.highlights.map((h) => {
                const [module, mark] = h.split(" — ");
                return (
                  <div key={h} className="flex items-baseline gap-4 border-b border-line py-2.5">
                    <dt className="text-[0.875rem] text-ivory/75">{module}</dt>
                    <span className="h-px flex-1 bg-line" aria-hidden />
                    <dd className="font-mono text-[0.8125rem] text-amber">{mark}</dd>
                  </div>
                );
              })}
            </dl>

            <p className="mt-7 max-w-lg text-[0.875rem] leading-relaxed text-muted">
              {education.earlier.map((e) => `${e.title} (${e.detail})`).join(". ")}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={90} className="md:col-span-4 md:col-start-9">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
              Outside work
            </p>
            <dl className="mt-6">
              {interests.map((interest) => (
                <div key={interest.title} className="border-t border-line py-4 first:border-t-0 first:pt-0">
                  <dt className="text-[0.9375rem] text-ivory">{interest.title}</dt>
                  <dd className="mt-1 text-[0.875rem] leading-relaxed text-muted">{interest.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

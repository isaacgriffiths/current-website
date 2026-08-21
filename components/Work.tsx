import { projects } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import TriageDemo from "./TriageDemo";

const rows = [
  { key: "Problem", of: (p: (typeof projects)[number]) => p.problem },
  { key: "Approach", of: (p: (typeof projects)[number]) => p.approach },
  { key: "Result", of: (p: (typeof projects)[number]) => p.result },
];

export default function Work() {
  return (
    <Section
      id="work"
      label="Selected work"
      title="Problem, approach, result"
      intro="Described at outcome level. Internal systems stay internal."
    >
      {/* The signature: the intake pattern, running rather than described. */}
      <Reveal>
        <div className="mx-auto mb-14 max-w-md">
          <TriageDemo />
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 70} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display text-lg leading-tight sm:text-xl">{project.title}</h3>
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                  {project.context}
                </span>
              </div>

              <dl className="mt-5 space-y-4 border-t border-white/10 pt-5">
                {rows.map((row) => (
                  <div key={row.key}>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber">
                      {row.key}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {row.of(project)}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-auto pt-6 font-mono text-[0.6875rem] leading-relaxed text-faint">
                {project.tags.join(" · ")}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

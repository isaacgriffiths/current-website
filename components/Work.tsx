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
      {/* The signature: the intake pattern running, rather than described. */}
      <Reveal>
        <div className="mx-auto mb-16 max-w-md">
          <TriageDemo />
        </div>
      </Reveal>

      {/* Case studies as records on rules — deliberately not another card grid. */}
      <Reveal>
        <div className="border-t border-white/10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="grid gap-x-12 gap-y-5 border-b border-white/10 py-9 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <h3 className="display text-xl leading-tight sm:text-2xl">{project.title}</h3>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  {project.context}
                </p>
                <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-faint">
                  {project.tags.join(" · ")}
                </p>
              </div>

              <dl className="space-y-4 md:col-span-8">
                {rows.map((row) => (
                  <div key={row.key} className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent sm:pt-1">
                      {row.key}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-muted">{row.of(project)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

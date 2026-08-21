import { projects } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

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
      <div className="border-t border-line">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 70}>
            <article className="grid gap-x-10 gap-y-5 border-b border-line py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="display text-2xl leading-tight md:text-[1.75rem]">{project.title}</h3>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  {project.context}
                </p>
                <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-faint">
                  {project.tags.join(" · ")}
                </p>
              </div>

              <dl className="space-y-4 md:col-span-8">
                {rows.map((row) => (
                  <div key={row.key} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-5">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber sm:pt-1">
                      {row.key}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-muted">{row.of(project)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

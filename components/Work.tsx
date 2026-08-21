import { projects } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

const fields = [
  { key: "Problem", get: (p: (typeof projects)[number]) => p.problem },
  { key: "Approach", get: (p: (typeof projects)[number]) => p.approach },
  { key: "Result", get: (p: (typeof projects)[number]) => p.result },
];

export default function Work() {
  return (
    <Section
      id="work"
      label="Selected work"
      title="Problem, approach, result"
      intro="Described at outcome level. Internal systems stay internal; the thinking travels."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 80} className="h-full">
            <article className="flex h-full flex-col rounded-xl border border-line bg-ink-raised/50 p-7 transition-colors hover:border-line-strong">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display text-xl leading-tight">{project.title}</h3>
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                  {project.context}
                </span>
              </div>

              <dl className="mt-6 space-y-4 border-t border-line pt-6">
                {fields.map((field) => (
                  <div key={field.key}>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber">
                      {field.key}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {field.get(project)}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

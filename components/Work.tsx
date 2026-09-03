import { projects } from "@/content/profile";
import Entry, { EntryList } from "./Entry";
import Section from "./Section";
import Tags from "./Tags";
import TriageDemo from "./TriageDemo";

const rows = [
  { key: "Problem", of: (p: (typeof projects)[number]) => p.problem },
  { key: "Approach", of: (p: (typeof projects)[number]) => p.approach },
  { key: "Result", of: (p: (typeof projects)[number]) => p.result },
] as const;

export default function Work() {
  return (
    <Section id="work" label="Selected work" ariaLabel="Selected work">
      {/* The signature: the intake pattern running, rather than described. */}
      <div className="mb-12">
        <TriageDemo />
      </div>

      <EntryList>
        {projects.map((project) => (
          <Entry key={project.title} meta={project.context}>
            <h3 className="font-medium leading-snug text-ivory transition-colors group-hover:text-accent">{project.title}</h3>

            <dl className="mt-3 space-y-3">
              {rows.map((row) => (
                <div key={row.key}>
                  <dt className="key text-faint">{row.key}</dt>
                  <dd className="mt-1 text-base leading-normal">{row.of(project)}</dd>
                </div>
              ))}
            </dl>

            <Tags items={project.tags} />
          </Entry>
        ))}
      </EntryList>

      <p className="text-base leading-normal text-faint">
        Described at outcome level. Internal systems stay internal.
      </p>
    </Section>
  );
}

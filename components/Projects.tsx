import { projects } from "@/content/profile";
import ArrowLink from "./ArrowLink";
import Entry, { EntryList } from "./Entry";
import Section from "./Section";
import Tags from "./Tags";

type Project = (typeof projects)[number];
type Featured = Project & { featured: true; url?: string };

const featured = projects.filter((project): project is Featured => "featured" in project && project.featured === true);

export default function Projects() {
  return (
    <Section id="projects" label="Personal projects" ariaLabel="Personal projects">
      <EntryList>
        {featured.map((project) => (
          <Entry key={project.title} meta={project.context}>
            <h3 className="font-medium leading-snug text-ivory transition-colors group-hover:text-accent">
              {project.url ? (
                <ArrowLink href={project.url} label={project.title} external className="group-hover:text-accent">
                  {project.title}
                </ArrowLink>
              ) : (
                project.title
              )}
            </h3>

            <p className="mt-3 text-base leading-normal">{project.approach}</p>
            <p className="mt-2 text-base leading-normal text-muted">{project.result}</p>

            <Tags items={project.tags} />
          </Entry>
        ))}
      </EntryList>
    </Section>
  );
}

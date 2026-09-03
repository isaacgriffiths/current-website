import { experience } from "@/content/profile";
import ArrowLink from "./ArrowLink";
import CvRequestLink from "./CvRequestLink";
import Entry, { EntryList } from "./Entry";
import Section from "./Section";
import Tags from "./Tags";

export default function Experience() {
  return (
    <Section id="experience" label="Experience" ariaLabel="Work experience">
      <EntryList>
        {experience.map((role) => (
          <Entry key={role.index} meta={role.period}>
            <h3 className="font-medium leading-snug text-ivory transition-colors group-hover:text-accent">
              <ArrowLink
                href={role.url}
                label={`${role.title} at GSK`}
                external
                className="group-hover:text-accent"
              >
                {role.title}
              </ArrowLink>
              {role.current ? (
                <span className="key ml-2 align-middle text-accent">Current</span>
              ) : null}
            </h3>
            <p className="mt-1 text-base text-muted">
              {role.org} <span aria-hidden>&middot;</span> {role.place}
            </p>

            <p className="mt-3 text-base leading-normal">{role.summary}</p>

            <Tags items={role.tags} />
          </Entry>
        ))}
      </EntryList>

      <div className="mt-4">
        <CvRequestLink />
      </div>
    </Section>
  );
}

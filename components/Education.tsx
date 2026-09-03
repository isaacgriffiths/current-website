import { education } from "@/content/profile";
import Entry, { EntryList } from "./Entry";
import Section from "./Section";

const SEPARATOR = " | ";

export default function Education() {
  const { degree } = education;

  return (
    <Section id="education" label="Education" ariaLabel="Education and interests">
      <EntryList>
        <Entry meta={degree.period}>
          <h3 className="font-medium leading-snug text-ivory transition-colors group-hover:text-accent">{degree.title}</h3>
          <p className="mt-1 text-base text-muted">
            {degree.specialism} <span aria-hidden>&middot;</span> {degree.school}
          </p>
          <p className="mt-3 text-base leading-normal">{degree.detail}</p>

          <p className="mt-4 text-base leading-normal">
            <span className="font-medium text-ivory">{degree.status}</span>
            <span className="text-faint"> &middot; {degree.statusDetail}</span>
          </p>

          <div className="mt-6">
            <p className="key mb-2 text-faint">Selected results</p>
            <dl className="border-t border-white/10">
              {degree.highlights.map((highlight) => {
                const [module, mark] = highlight.split(SEPARATOR);
                return (
                  <div
                    key={highlight}
                    className="flex items-baseline gap-3 border-b border-white/10 py-2.5"
                  >
                    <dt className="text-base text-ivory/80">{module}</dt>
                    <span className="h-px flex-1 bg-white/10" aria-hidden />
                    <dd className="font-mono text-xs text-accent">{mark}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <p className="mt-4 text-base leading-normal text-faint">
            {education.earlier.map((item) => `${item.title} (${item.detail})`).join(". ")}.
          </p>
        </Entry>

      </EntryList>
    </Section>
  );
}

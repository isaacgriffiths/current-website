import { skills } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      label="Skills"
      title="The toolkit"
      intro="Things I have used to ship something real, not things I have read about."
    >
      {/* Dense and typographic: no boxes, no chips, label in the margin. */}
      <Reveal>
        <dl className="mx-auto max-w-4xl border-t border-white/10">
          {skills.map((group) => (
            <div
              key={group.group}
              className="grid gap-1 border-b border-white/10 py-5 md:grid-cols-[13rem_1fr] md:gap-10"
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent md:pt-1">
                {group.group}
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ivory/80">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

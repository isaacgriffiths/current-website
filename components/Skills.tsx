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
      <dl className="border-t border-line">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 50}>
            <div className="grid gap-1 border-b border-line py-5 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber md:pt-1">
                {group.group}
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ivory/80">
                {group.items.join(", ")}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

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
      <div className="border-t border-line">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 60}>
            <div className="grid gap-3 border-b border-line py-6 md:grid-cols-[13rem_1fr] md:gap-8">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber md:pt-1">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-ink-raised/50 px-3 py-1.5 text-[0.8125rem] text-ivory/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

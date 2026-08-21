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
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[0.8125rem] text-ivory/80"
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

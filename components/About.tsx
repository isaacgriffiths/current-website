import { about, stats } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section
      id="about"
      label="About"
      title="Built in a regulated queue"
      bordered={false}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="space-y-6 md:col-span-7 md:col-start-5">
          {about.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-lg leading-[1.7] text-ivory/85">{para}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={120}>
        <dl className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink px-6 py-7">
              <dt className="display flex items-baseline text-4xl text-ivory">
                {s.value}
                <span className="ml-0.5 text-xl text-amber">{s.suffix}</span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

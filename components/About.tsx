import { about, stats } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section
      id="about"
      label="About"
      title="Built in a regulated queue"
      intro="Four years at GSK, from lab benches and incident response into agentic systems heading for production."
    >
      {/* Numbers stacked in the margin, prose running beside them: the section
          reads like an annotated page rather than another grid of tiles. */}
      <Reveal>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <dl className="md:col-span-4">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 py-5 first:border-t-0 first:pt-0">
                <dt className="display flex items-baseline text-3xl text-ivory sm:text-4xl">
                  {s.value}
                  <span className="ml-0.5 text-lg text-accent sm:text-xl">{s.suffix}</span>
                </dt>
                <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-5 md:col-span-8">
            {about.map((para, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-ivory/80">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

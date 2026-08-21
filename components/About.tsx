import { about, person, stats } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" label="About" title="Built in a regulated queue" bordered={false}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser */}
            <img
              src={person.photo}
              alt={person.name}
              width={900}
              height={900}
              className="w-full max-w-[16rem] rounded-lg bg-ink-raised object-cover md:max-w-none"
            />
            <figcaption className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-faint">
              {person.name}
              <br />
              {person.location}
            </figcaption>
          </figure>
        </Reveal>

        <div className="space-y-6 md:col-span-7 md:col-start-6">
          {about.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-lg leading-[1.7] text-ivory/85">{para}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={120}>
        <dl className="mt-16 grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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

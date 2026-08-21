import { about, person, stats } from "@/content/profile";
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
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <Reveal>
          <figure className="relative m-0 mx-auto max-w-[18rem] md:mx-0">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser */}
              <img
                src={person.photo}
                alt={person.name}
                width={2000}
                height={2000}
                className="block w-full saturate-[0.72] contrast-[1.06]"
              />
              {/* settles the RGB lighting in the shot towards the page palette */}
              <div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(125,211,252,0.38), rgba(46,78,140,0.16) 55%, rgba(10,13,19,0.72))",
                }}
                aria-hidden
              />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[0.6875rem] leading-relaxed text-faint md:text-left">
              {person.name}
              <br />
              {person.location}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className="space-y-5">
            {about.map((para, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-ivory/80">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6 text-center"
            >
              <dt className="display flex items-baseline justify-center text-3xl text-ivory sm:text-4xl">
                {s.value}
                <span className="ml-0.5 text-lg text-accent sm:text-xl">{s.suffix}</span>
              </dt>
              <dd className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

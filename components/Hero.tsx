import { person } from "@/content/profile";
import TriageDemo from "./TriageDemo";

export default function Hero() {
  return (
    <header id="top" className="relative pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid-field pointer-events-none absolute inset-x-0 -top-24 h-[34rem]" aria-hidden />

      <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="key reveal" style={{ animationDelay: "0ms" }}>
            {person.billing} · {person.employer}
          </p>

          <h1
            className="display reveal mt-5 text-[3.25rem] leading-[0.92] sm:text-7xl xl:text-[5.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            Isaac
            <br />
            Griffiths
          </h1>

          <p
            className="reveal mt-7 max-w-lg text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: "180ms" }}
          >
            {person.tagline}
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "260ms" }}>
            <a
              href="#contact"
              className="rounded-full bg-amber px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-amber-deep"
            >
              Request my CV
            </a>
            <a
              href="#work"
              className="rounded-full border border-line-strong px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-muted hover:bg-ink-raised"
            >
              See the work
            </a>
          </div>

          <div
            className="reveal mt-9 flex items-center gap-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint"
            style={{ animationDelay: "340ms" }}
          >
            <a href={person.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ivory">
              LinkedIn
            </a>
            <span className="h-3 w-px bg-line-strong" />
            <a href={person.links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ivory">
              GitHub
            </a>
            <span className="h-3 w-px bg-line-strong" />
            <span>{person.location}</span>
          </div>
        </div>

        <div className="reveal" style={{ animationDelay: "420ms" }}>
          <TriageDemo />
        </div>
      </div>
    </header>
  );
}

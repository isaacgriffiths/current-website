import { person } from "@/content/profile";

export default function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 sm:px-8"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="aurora absolute inset-[-12%]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="reveal glass w-full max-w-2xl rounded-2xl px-6 py-10 text-center sm:px-12 sm:py-14">
        {/* The source is a square headshot, so the circle is framed by scaling
            about a point above centre — otherwise the crop lands on his collar. */}
        <div className="mx-auto mb-7 h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/25 sm:h-32 sm:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser */}
          <img
            src={person.photo}
            alt={person.name}
            width={2000}
            height={2000}
            className="h-full w-full origin-[50%_26%] scale-[1.45] object-cover saturate-[0.78]"
          />
        </div>

        <h1 className="display text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl">
          {person.name}
        </h1>

        <p className="key mt-5 block">{person.billing}</p>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
          {person.tagline}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="btn w-full bg-accent text-ink hover:bg-accent-deep sm:w-auto"
          >
            Request my CV
          </a>
          <a
            href="#work"
            className="btn w-full border border-white/25 text-ivory hover:border-white/45 hover:bg-white/5 sm:w-auto"
          >
            See the work
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/70">
          <a href={person.links.linkedin} target="_blank" rel="noreferrer" className="py-2 transition-colors hover:text-ivory">
            LinkedIn
          </a>
          <span className="h-3 w-px bg-white/20" />
          <a href={person.links.github} target="_blank" rel="noreferrer" className="py-2 transition-colors hover:text-ivory">
            GitHub
          </a>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="hidden sm:block">{person.location}</span>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 flex flex-col items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ivory/45 transition-colors hover:text-ivory"
      >
        Scroll to explore
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className="live-dot">
          <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </header>
  );
}

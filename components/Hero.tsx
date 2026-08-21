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
        <p className="key">{person.billing}</p>

        <h1 className="display mt-5 text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl">
          {person.name}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
          {person.tagline}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-amber px-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-amber-deep sm:w-auto"
          >
            Request my CV
          </a>
          <a
            href="#work"
            className="flex min-h-11 w-full items-center justify-center rounded-full border border-white/20 px-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
          >
            See the work
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/50">
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

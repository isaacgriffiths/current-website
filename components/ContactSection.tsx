import { person } from "@/content/profile";
import ContactForm from "./Contact";
import Section from "./Section";

export default function ContactSection() {
  return (
    <Section id="contact" label="Contact" ariaLabel="Contact" compactAfter>
      <div className="relative -mx-6 overflow-hidden border-y border-white/10 bg-white/[0.035] shadow-none sm:mx-0 sm:rounded-xl sm:border sm:shadow-[0_24px_80px_-40px_rgba(0,254,254,0.22)] lg:-mx-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-accent/[0.08] blur-3xl"
        />

        <div className="relative p-6 sm:p-8 lg:px-8 lg:py-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <p className="key text-accent">Open to the right role</p>
          </div>

          <h3 className="mt-5 max-w-md text-2xl font-semibold tracking-tight text-ivory sm:text-3xl lg:mt-4">
            Have a problem worth sitting beside?
          </h3>
          <p className="mt-4 max-w-xl leading-relaxed lg:mt-3">
            I am interested in agentic and forward deployed engineering roles where AI has to
            survive real users, real operations and real constraints. Tell me what you are
            building, or what is stuck. Or just ask for my CV. The form lands directly in my inbox.
          </p>

          <a
            href={`mailto:${person.email}`}
            className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-ivory transition-colors hover:text-accent lg:hidden"
          >
            {person.email}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              &rarr;
            </span>
          </a>
        </div>

        <div className="relative border-t border-white/10 bg-ink/25 p-6 sm:p-8 lg:p-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

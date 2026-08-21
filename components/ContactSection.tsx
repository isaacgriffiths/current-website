import { person } from "@/content/profile";
import ContactForm from "./Contact";
import Reveal from "./Reveal";
import Section from "./Section";

export default function ContactSection() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Start a conversation"
      intro="Hiring, curious, or after the full CV as a PDF. This reaches me directly."
    >
      <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[0.9375rem] leading-relaxed text-ivory/80">
              I am open to conversations about forward deployed and agentic engineering roles,
              particularly where the work has to survive real operations rather than a demo.
            </p>
            <dl className="mt-7 space-y-5 border-t border-white/10 pt-7">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${person.email}`}
                    className="break-all text-[0.9375rem] text-ivory underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    {person.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                  Elsewhere
                </dt>
                <dd className="mt-1.5 flex gap-5">
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.9375rem] text-ivory underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={person.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.9375rem] text-ivory underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    GitHub
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                  Based in
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] text-muted">{person.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

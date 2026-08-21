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
      intro="Hiring, curious, or want the full CV as a PDF — this reaches me directly."
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-ivory/85">
              I am open to conversations about AI and agentic engineering roles, particularly where the
              work has to survive real operations rather than a demo.
            </p>
            <dl className="space-y-5 border-t border-line pt-8">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${person.email}`}
                    className="text-[0.9375rem] text-ivory underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    {person.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">Elsewhere</dt>
                <dd className="mt-1.5 flex gap-5">
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.9375rem] text-ivory underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={person.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.9375rem] text-ivory underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-amber"
                  >
                    GitHub
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">Based in</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-muted">{person.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

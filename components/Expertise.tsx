import { expertise } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      label="Expertise"
      title="What I am for"
      intro="Three things I am reliably useful at, and the reason each one holds up in a regulated environment."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {expertise.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="h-full">
            <article className="flex h-full flex-col rounded-xl border border-line bg-ink-raised/50 p-7 transition-colors hover:border-line-strong hover:bg-ink-raised">
              <h3 className="display text-xl leading-tight">{item.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 font-mono text-[0.75rem] leading-relaxed text-ivory/70">
                    <span className="text-amber" aria-hidden>
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { expertise } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      label="Expertise"
      title="What I am for"
      intro="Four things I am reliably useful at, and why each one holds up in a regulated environment."
    >
      {/* The one section where cards genuinely earn it: four peers, compared side by side. */}
      <Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {expertise.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8"
            >
              <h3 className="display text-xl leading-tight">{item.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.875rem] leading-relaxed text-ivory/75">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

import { skills } from "@/content/profile";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" label="Skills" ariaLabel="Skills and tools">
      {/* Deliberately not pills. Sixty of them in a column this narrow is a
          wall, and it would spend the pill treatment that the entries above
          use for a handful of tags each. */}
      <dl className="border-t border-white/10">
        {skills.map((group) => (
          <div
            key={group.group}
            className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt className="key text-accent sm:pt-1">{group.group}</dt>
            <dd className="text-base leading-normal text-ivory/80">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-base leading-normal text-faint">
        Things I have used to ship something real, not things I have read about.
      </p>
    </Section>
  );
}

import { about } from "@/content/profile";
import Section from "./Section";

function HighlightedCopy({
  copy,
  highlights,
}: {
  copy: string;
  highlights: readonly string[];
}) {
  const escaped = highlights.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = copy.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <strong key={`${part}-${index}`} className="font-medium text-ivory">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <Section id="about" label="About" ariaLabel="About me">
      {about.map((paragraph, i) => (
        <p key={paragraph.copy} className={i === about.length - 1 ? "" : "mb-4"}>
          <HighlightedCopy copy={paragraph.copy} highlights={paragraph.highlights} />
        </p>
      ))}

    </Section>
  );
}

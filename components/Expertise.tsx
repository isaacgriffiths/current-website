import { expertise } from "@/content/profile";
import Entry, { EntryList, Points } from "./Entry";
import Section from "./Section";

export default function Expertise() {
  return (
    <Section id="expertise" label="Expertise" ariaLabel="What I am for">
      {/* The numerals are a real ranking, not decoration: the four are ordered
          by how central each one is to the work. */}
      <EntryList>
        {expertise.map((item, i) => (
          <Entry key={item.title} meta={String(i + 1).padStart(2, "0")}>
            <h3 className="font-medium leading-snug text-ivory transition-colors group-hover:text-accent">{item.title}</h3>
            <p className="mt-2 text-base leading-normal">{item.body}</p>
            <Points items={item.points} />
          </Entry>
        ))}
      </EntryList>
    </Section>
  );
}

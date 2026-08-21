import Reveal from "./Reveal";

export default function Section({
  id,
  label,
  title,
  intro,
  children,
  bordered = true,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${bordered ? "border-t border-line" : ""}`}>
      <Reveal>
        <div className="mb-12 md:mb-16 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="key">{label}</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">{title}</h2>
          </div>
          {intro ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:col-span-8 md:mt-0 md:self-end">
              {intro}
            </p>
          ) : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

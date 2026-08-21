import Reveal from "./Reveal";

export default function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <Reveal>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          {label ? <p className="key">{label}</p> : null}
          <h2 className="display mt-3 text-[2rem] sm:text-4xl md:text-5xl">{title}</h2>
          {intro ? (
            <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {intro}
            </p>
          ) : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

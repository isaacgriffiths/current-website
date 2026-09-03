/**
 * A section of the CV.
 *
 * The heading only shows below `lg`, where it sticks to the top of the viewport
 * as you scroll past it. On desktop the left rail is always in view and already
 * says which section you are in, so a second label would be saying it twice --
 * the heading stays in the accessibility tree and leaves the layout.
 */
export default function Section({
  id,
  label,
  ariaLabel,
  compactAfter = false,
  children,
}: {
  id: string;
  label: string;
  ariaLabel?: string;
  compactAfter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel ?? label}
      className={`scroll-mt-16 lg:scroll-mt-24 ${
        compactAfter ? "mb-12 md:mb-16 lg:mb-16" : "mb-16 md:mb-24 lg:mb-36"
      }`}
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-ink/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="key section-label font-medium text-ivory lg:sr-only">{label}</h2>
      </div>
      {children}
    </section>
  );
}

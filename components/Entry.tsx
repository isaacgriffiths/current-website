/**
 * One record in a list of records -- a role, a case study, a qualification.
 *
 * Two columns: the key in the margin (dates, context, a numeral) and the
 * substance beside it. Hovering one entry dims its siblings and lifts a panel
 * behind the one you are on, so a long list reads one item at a time. The
 * dimming is desktop-only; on a touch screen there is no hover to reward it.
 */
export function EntryList({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <ul className="group/list" aria-label={ariaLabel}>
      {children}
    </ul>
  );
}

export default function Entry({
  meta,
  children,
}: {
  meta: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50">
        <div
          aria-hidden
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/[0.045] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] lg:group-hover:drop-shadow-lg"
        />
        <header className="key z-10 mb-2 mt-1 text-faint sm:col-span-2">{meta}</header>
        <div className="z-10 sm:col-span-6">{children}</div>
      </div>
    </li>
  );
}

/** The bullets under an entry. A rule rather than a disc: quieter at this size. */
export function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-normal">
          <span className="mt-2.5 h-px w-3 shrink-0 bg-white/25" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

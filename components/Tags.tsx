export default function Tags({
  items,
  ariaLabel = "Technologies and skills used",
}: {
  items: readonly string[];
  ariaLabel?: string;
}) {
  return (
    <ul className="mt-3 flex flex-wrap" aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item} className="mr-1.5 mt-2">
          <div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
}

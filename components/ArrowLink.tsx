/**
 * A link with an arrow that steps out on hover. External links open in a new
 * tab and say so to a screen reader; internal ones stay put.
 */
export default function ArrowLink({
  href,
  label,
  external = false,
  className = "",
  onClick,
  children,
}: {
  href: string;
  label?: string;
  external?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-label={external ? `${label ?? ""} (opens in a new tab)`.trim() : label}
      onClick={onClick}
      className={`group/link inline-flex items-baseline font-medium leading-tight text-ivory transition-colors hover:text-accent focus-visible:text-accent ${className}`}
    >
      <span>
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
          />
        </svg>
      </span>
    </a>
  );
}

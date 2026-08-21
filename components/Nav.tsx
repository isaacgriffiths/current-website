"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";

/**
 * Desktop: a fixed left index that tracks the section you are reading.
 * Below lg: a slim sticky bar, because a vertical rail on a phone is decoration.
 */
export default function Nav() {
  const [active, setActive] = useState<string>(nav[0].id);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-amber focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
      >
        Skip to content
      </a>

      {/* Desktop rail */}
      <nav
        aria-label="Sections"
        className="fixed left-0 top-0 z-40 hidden h-screen w-[13.5rem] flex-col justify-between border-r border-line px-8 py-10 lg:flex"
      >
        <a
          href="#top"
          className="font-mono text-sm tracking-[0.3em] text-ivory transition-colors hover:text-amber"
        >
          {person.initials}
        </a>

        <ul className="space-y-1">
          {nav.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center gap-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors"
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      on ? "w-6 bg-amber" : "w-3 bg-line-strong group-hover:w-5 group-hover:bg-muted"
                    }`}
                  />
                  <span className={on ? "text-ivory" : "text-faint group-hover:text-muted"}>
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="font-mono text-[0.625rem] leading-relaxed text-faint">
          {person.location}
          <br />
          Open to conversations
        </p>
      </nav>

      {/* Mobile bar */}
      <div className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="#top" className="font-mono text-sm tracking-[0.3em] text-ivory">
            {person.initials}
          </a>
          <a
            href="#contact"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-amber"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}

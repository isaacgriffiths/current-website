"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";

const socials = [
  {
    name: "LinkedIn",
    href: person.links.linkedin,
    path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z",
    box: "0 0 24 24",
  },
  {
    name: "GitHub",
    href: person.links.github,
    path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
    box: "0 0 16 16",
  },
  {
    name: "Email",
    href: `mailto:${person.email}`,
    path: "M2.5 4h19A1.5 1.5 0 0123 5.5v13a1.5 1.5 0 01-1.5 1.5h-19A1.5 1.5 0 011 18.5v-13A1.5 1.5 0 012.5 4zm.5 3.2v11.3h18V7.2l-9 5.6-9-5.6zm.4-1.7L12 11l8.6-5.5H3.4z",
    box: "0 0 24 24",
  },
] as const;

/**
 * The left half of the page: who this is, and where you are in it.
 *
 * On desktop it sticks for the whole scroll, so the identity and the index are
 * never off screen. The marker beside the current section grows and brightens
 * as you pass through it -- the one piece of this layout carried over from the
 * previous build, because it was the part worth keeping.
 *
 * Below `lg` it is simply the top of the page: no rail, no hamburger. The
 * section headings take over as sticky bars, which is one moving part instead
 * of three.
 */
export default function Sidebar() {
  const [active, setActive] = useState<string>(nav[0].id);

  useEffect(() => {
    document.documentElement.dataset.clientReady = "true";

    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const updateActive = () => {
      frame = 0;

      const pageBottom = window.scrollY + window.innerHeight;
      const distanceFromBottom = document.documentElement.scrollHeight - pageBottom;
      const lastSection = sections[sections.length - 1];
      const finalSectionVisible =
        lastSection.getBoundingClientRect().top <= window.innerHeight * 0.58;
      const nearBottom = distanceFromBottom <= window.innerHeight * 0.2;

      if (nearBottom || finalSectionVisible) {
        setActive(lastSection.id);
        return;
      }

      const readingLine = window.innerHeight * 0.42;
      let current = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      });

      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:max-h-svh lg:w-[48%] lg:flex-col lg:justify-between lg:py-[clamp(1.5rem,6svh,6rem)]">
      <div>
        {/* Keep the portrait at its natural 4:5 ratio so the full photograph,
            from headroom through shoulders, remains visible. */}
        {/* At lg the portrait is sized from viewport height so the whole
            sidebar, down to the socials, always fits without scrolling. */}
        <div className="mb-7 aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink-raised ring-1 ring-white/15 lg:mb-[clamp(0.75rem,2svh,1.75rem)] lg:h-[min(24rem,26svh)] lg:w-auto lg:max-w-xs">
          {/* Static export serves originals, so ship modern formats explicitly:
              AVIF (70% smaller) with WebP and JPEG fallbacks. */}
          <picture>
            <source srcSet="/isaac.avif" type="image/avif" />
            <source srcSet="/isaac.webp" type="image/webp" />
            <img
              src={person.photo}
              alt={person.name}
              width={768}
              height={960}
              fetchPriority="high"
              className="h-full w-full object-cover object-center saturate-[0.9]"
            />
          </picture>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-ivory sm:text-5xl lg:text-[clamp(1.875rem,4.5svh,3rem)]">
          <a href="#content">{person.name}</a>
        </h1>

        <p className="mt-3 text-lg font-medium tracking-tight text-ivory sm:text-xl lg:mt-[clamp(0.375rem,1.2svh,0.75rem)] lg:text-[clamp(1rem,2.2svh,1.25rem)] lg:leading-snug">
          {person.billing}
        </p>

        <p className="mt-4 max-w-xs text-lg leading-normal lg:mt-[clamp(0.5rem,1.4svh,1rem)] lg:text-[clamp(0.9375rem,2svh,1.125rem)]">
          {person.tagline}
        </p>

        <p className="key mt-5 text-faint lg:mt-[clamp(0.5rem,1.4svh,1.25rem)]">
          {person.employer} <span aria-hidden>&middot;</span> {person.location}
        </p>

        <nav className="hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-14 w-max lg:mt-[clamp(1rem,3.5svh,3.5rem)]">
            {nav.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-section-link={item.id}
                    aria-current={on ? "true" : undefined}
                    className="group flex items-center py-[clamp(0.25rem,0.9svh,0.625rem)]"
                  >
                    <span
                      aria-hidden
                      data-section-marker
                      className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                        on
                          ? "w-16 bg-accent"
                          : "w-8 bg-white/25 group-hover:w-16 group-hover:bg-ivory group-focus-visible:w-16 group-focus-visible:bg-ivory"
                      }`}
                    />
                    <span
                      data-section-name
                      className={`key font-medium transition-colors ${
                        on
                          ? "text-ivory"
                          : "text-faint group-hover:text-ivory group-focus-visible:text-ivory"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="ml-1 mt-8 flex items-center lg:mt-[clamp(0.5rem,1.5svh,2rem)]" aria-label="Elsewhere">
        {socials.map((social) => (
          <li key={social.name} className="mr-5 shrink-0 text-xs">
            <a
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
              title={social.name}
              aria-label={
                social.href.startsWith("http") ? `${social.name} (opens in a new tab)` : social.name
              }
              className="block text-muted transition-colors hover:text-ivory focus-visible:text-ivory"
            >
              <span className="sr-only">{social.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={social.box}
                fill="currentColor"
                aria-hidden
                className="h-6 w-6"
              >
                <path d={social.path} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

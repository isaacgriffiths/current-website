"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";

/**
 * Desktop keeps the left rail: a vertical index whose amber marker slides to the
 * section you are reading. Below lg it becomes a top bar with a slide-down panel,
 * because a vertical rail on a phone is decoration.
 */
export default function Nav() {
  const [active, setActive] = useState<string>(nav[0].id);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-amber focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
      >
        Skip to content
      </a>

      {/* Desktop rail */}
      <nav
        aria-label="Sections"
        className="fixed left-0 top-0 z-50 hidden h-screen w-[13.5rem] flex-col justify-between border-r border-white/10 bg-ink/40 px-8 py-10 backdrop-blur-xl lg:flex"
      >
        <a
          href="#top"
          aria-label={`${person.name} — top of page`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-[0.6875rem] tracking-[0.12em] text-ivory transition-colors hover:border-amber/60 hover:text-amber"
        >
          {person.initials}
        </a>

        <ul className="-my-1.5">
          {nav.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center gap-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors"
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      on ? "w-7 bg-amber" : "w-3 bg-white/25 group-hover:w-5 group-hover:bg-muted"
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 lg:hidden ${
          solid ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            aria-label={`${person.name} — top of page`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-[0.6875rem] tracking-[0.12em] text-ivory"
          >
            {person.initials}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-ivory transition-transform duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ivory transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-ivory transition-transform duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height] duration-300 ${
            open ? "max-h-96" : "max-h-0 border-t-transparent"
          }`}
        >
          <ul className="px-5 py-1 sm:px-8">
            {nav.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={on ? "true" : undefined}
                    className="flex items-center gap-3 border-b border-white/5 py-3.5 text-[0.9375rem] last:border-b-0"
                  >
                    <span className={`h-px w-4 ${on ? "bg-amber" : "bg-white/25"}`} aria-hidden />
                    <span className={on ? "text-ivory" : "text-muted"}>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
}

import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Sidebar from "@/components/Sidebar";
import Skills from "@/components/Skills";
import Spotlight from "@/components/Spotlight";
import { person } from "@/content/profile";

export default function Home() {
  return (
    <div className="relative">
      <Spotlight />

      <div className="relative z-10 mx-auto min-h-screen max-w-[1280px] px-6 pb-12 pt-6 font-sans md:px-12 md:py-16 lg:py-0">
        <a
          href="#content"
          className="fixed left-4 top-4 z-50 block -translate-y-[200%] rounded bg-accent px-4 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>

        {/* Two halves: the identity sticks, the record scrolls past it. */}
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />

          <main
            id="content"
            className="pt-6 text-lg leading-[1.7] md:pt-16 lg:w-[52%] lg:py-[clamp(1.5rem,6svh,6rem)]"
          >
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <ContactSection />

            <footer className="max-w-md pb-16 text-base leading-normal text-faint sm:pb-0">
              <p>
                Built with Next.js and Tailwind CSS, deployed on Cloudflare Pages, and written
                mostly by talking to a coding agent. Set in Inter and IBM Plex Mono.
              </p>
              <p className="mt-3">
                &copy; {new Date().getFullYear()} {person.name} <span aria-hidden>&middot;</span>{" "}
                {person.location}
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

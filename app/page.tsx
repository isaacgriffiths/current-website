import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import { person } from "@/content/profile";

export default function Home() {
  return (
    <div className="lg:pl-[13.5rem]">
      <Nav />

      <Hero />

      <main className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <About />
          <Experience />
          <Expertise />
          <Work />
          <Skills />
          <Education />
          <ContactSection />
        </div>
      </main>

      <footer className="border-t border-white/10 px-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 py-8 text-center font-mono text-[0.6875rem] text-faint sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>
            {person.role} · {person.location}
          </p>
        </div>
      </footer>
    </div>
  );
}

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
    <>
      <Nav />
      <main className="px-5 sm:px-8 lg:pl-[13.5rem]">
        <div className="mx-auto w-full max-w-5xl lg:px-10 xl:px-16">
          <Hero />
          <About />
          <Experience />
          <Expertise />
          <Work />
          <Skills />
          <Education />
          <ContactSection />
        </div>
      </main>

      <footer className="border-t border-line px-5 sm:px-8 lg:pl-[13.5rem]">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 py-8 font-mono text-[0.6875rem] text-faint lg:px-10 xl:px-16">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p>{person.role} · {person.location}</p>
        </div>
      </footer>
    </>
  );
}

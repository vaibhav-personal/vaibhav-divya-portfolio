import Navbar from "@/components/ui/layout/Navbar";
import Hero from "@/components/ui/sections/Hero";
import Skills from "@/components/ui/sections/Skills";
import Projects from "@/components/ui/sections/Projects";
import Experience from "@/components/ui/sections/Experience";
import Contact from "@/components/ui/sections/Contact";
import Chatbot from "@/components/ui/ai/Chatbot";
import GithubProjects from "@/components/ui/sections/GithubProjects";
import Education from "@/components/ui/sections/Education";
import Certifications from "@/components/ui/sections/Certifications";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white">
      {/* Navbar */}
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <GithubProjects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Chatbot />
      <Footer/>
      <ScrollToTop/>
    </main>
  );
}

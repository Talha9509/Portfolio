import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { AskAI } from "./components/AskAI";
import { Footer } from "./components/Footer";
import { FloatingDock } from "./components/FloatingDock";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // useEffect(() => {
    // const handleScroll = () => {
    //   const sections = ["home", "projects", "skills", "about", "contact"];
    //   const scrollPosition = window.scrollY + 200;

    //   for (const section of sections) {
    //     const el = document.getElementById(section);
    //     if (el) {
    //       const top = el.offsetTop;
    //       const height = el.offsetHeight;
    //       if (scrollPosition >= top && scrollPosition < top + height) {
    //         setActiveSection(section);
    //         break;
    //       }
    //     }
    //   }
    // };

    // window.addEventListener("scroll", handleScroll, { passive: true });
    // return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-purple-500/30 selection:text-white font-sans antialiased relative">
      {/* Background radial glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-10 w-[500px] h-[300px] bg-blue-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Main page content sections */}
      <main className="relative z-10">
        <Hero onContactClick={() => scrollToSection("contact")} />
        <Projects />
        <Skills />
        <AskAI />
        <About />
      </main>

      <Footer />

      {/* Floating navigation dock matching reference pictures */}
      <FloatingDock activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
}

export default App;


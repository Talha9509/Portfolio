import { useEffect, useState } from "react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "projects", "skills", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="text-white font-bold text-lg tracking-tight hover:text-purple-400 transition-colors"
        >
          {portfolioData.personal.name.split(" ")[0]}
          <span className="text-purple-400">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
        >
          Hire Me →
        </button>

        {/* Mobile pills */}
        <div className="flex md:hidden gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                active === item.id
                  ? "text-white bg-white/10"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.label[0]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}


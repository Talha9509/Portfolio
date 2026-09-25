import React from "react";
import { portfolioData } from "../data/portfolioData";

interface FloatingDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Avatar pill */}
        <button
          onClick={() => onNavigate("home")}
          className="w-10 h-10 rounded-full overflow-hidden border border-white/20 transition-transform hover:scale-105 active:scale-95 shrink-0"
          title={portfolioData.personal.name}
        >
          <img
            src={portfolioData.personal.avatar}
            alt={portfolioData.personal.name}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Home */}
        <button
          onClick={() => onNavigate("home")}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            activeSection === "home"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Home"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Projects (Layers) */}
        <button
          onClick={() => onNavigate("projects")}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            activeSection === "projects"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Projects"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </button>

        {/* Skills (Lab / Beaker) */}
        <button
          onClick={() => onNavigate("skills")}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            activeSection === "skills"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Skills"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </button>

        {/* About (User) */}
        <button
          onClick={() => onNavigate("about")}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            activeSection === "about"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="About"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* AI Assistant (Send / Chat) */}
        <button
          onClick={() => onNavigate("contact")}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            activeSection === "contact"
              ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
          }`}
          title="Ask AI Assistant"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

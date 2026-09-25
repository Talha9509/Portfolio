import React from "react";
import { portfolioData } from "../data/portfolioData";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 max-w-5xl mx-auto border-t border-white/5 text-zinc-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 pb-28">
      <div>
        <p className="text-zinc-400 font-medium">
          {portfolioData.personal.name} — {portfolioData.personal.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a
          href={portfolioData.personal.socials.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href={portfolioData.personal.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={portfolioData.personal.socials.x}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          X
        </a>
      </div>
    </footer>
  );
};


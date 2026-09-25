import React from "react";
import { portfolioData } from "../data/portfolioData";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-12 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Technical Skills
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Languages, frameworks, databases, and AI tooling I use to ship software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(portfolioData.skills).map(([category, items]) => (
          <div
            key={category}
            className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                {category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


import React from "react";
import { portfolioData } from "../data/portfolioData";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-12 px-6 max-w-5xl mx-auto border-t border-white/5">
      {/* Title & Avatar matching Image 4 */}
      <div className="flex items-center gap-4 mb-10">
        <div className="relative">
          <img
            src={portfolioData.personal.avatar}
            alt={portfolioData.personal.name}
            className="w-14 h-14 rounded-2xl object-cover border border-white/10"
          />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Hey I'm {portfolioData.personal.name.split(" ")[0]}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-0.5">
            ← That's me
          </p>
        </div>
      </div>

      {/* Grid: Bio on left, Skills on right (just like in Image 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Bio column */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base leading-relaxed">
          {portfolioData.personal.aboutBio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Work Experience Timeline */}
          {/* <div className="pt-8">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-6 font-mono">
              EXPERIENCE
            </h3>
            <div className="space-y-6">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-white/10 space-y-2">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {exp.role} <span className="text-purple-400 font-normal">at {exp.company}</span>
                    </h4>
                    <span className="text-xs text-zinc-500 font-mono">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-400 space-y-1">
                    {exp.description.map((item, dIdx) => (
                      <li key={dIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Skills pill column matching Image 4 */}
        <div className="lg:col-span-5 bg-[#121212]/50 border border-white/5 rounded-2xl p-6 space-y-6 sticky top-8">
          <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase font-mono">
            CORE PROFICIENCIES
          </h3>

          {Object.entries(portfolioData.skills).map(([category, skillList]) => (
            <div key={category} className="space-y-2.5">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 hover:border-purple-500/40 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


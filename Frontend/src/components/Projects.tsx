import React from "react";
import { portfolioData, type ProjectItem } from "../data/portfolioData";

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Featured products, open-source libraries, and experimental builds.
          </p>
        </div>
      </div>

      {/* Projects Grid matching Image 5 style + YouTube iframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.projects.map((project: ProjectItem) => (
          <div
            key={project.id}
            className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col shadow-xl"
          >
            {/* Show the walkthrough only when the project provides one. */}
            <div className="relative w-full aspect-video bg-black/80 overflow-hidden border-b border-white/5">
              {project.youtubeEmbedUrl ? (
                <iframe
                  src={project.youtubeEmbedUrl}
                  title={`${project.title} Video Walkthrough`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full">
                  <img className="w-full h-full object-cover" src={project.coverImage} alt="Project" />
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Header row: Title + Status Pill */}
                <div className="flex items-center justify-between gap-1 pb-2">
                  <h3 className="text-2xl font-semibold text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-4">

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs hover:text-white transition-colors border-green-300 p-1 rounded-lg bg-[#0d8748] hover:bg-[#00612f]"
                    >
                      <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span className="text-black">Source Code</span>
                    </a>
                  )}

                   {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white transition-colors border p-1 rounded-lg bg-[#0d8748] hover:bg-[#00612f] border-green-400"
                    >
                      <span className="text-black">Live Preview</span>
                    </a>
                  )}
                  </div>

                </div>

                <p className=" font-medium text-purple-300 mt-1 italic">
                  {project.tagline}
                </p>

                <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Footer: Tech tags + Links */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-zinc-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


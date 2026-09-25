import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="pt-18 pb-16 px-6 max-w-5xl mx-auto">
      {/* Top Meta info (Local time & Location) matching image 1 */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pb-8 border-b border-white/5 font-mono">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{currentTime || "Fri 05:21 AM"}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{portfolioData.personal.location}</span>
        </div>
      </div>

      {/* Main profile row */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Avatar + Intro */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {portfolioData.personal.name}
              </h1>
              <p className="text-sm font-medium text-purple-400 mt-0.5">
                {portfolioData.personal.subtitle}
              </p>
            </div>
          </div>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
            {portfolioData.personal.aboutBio[0]}
          </p>

          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            {portfolioData.personal.availability}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              <span>Get in touch</span>
              <span className="text-base leading-none">›</span>
            </button>

            <span className="text-zinc-500 text-sm">or</span>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 transition-all text-sm group"
            >
              <span>{portfolioData.personal.email}</span>
              <svg className="w-4 h-4 text-zinc-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                )}
              </svg>
              {copied && <span className="text-xs text-emerald-400 font-medium">Copied!</span>}
            </button>
          </div>
        </div>

        {/* Right Col: NOW / PREVIOUSLY meta card matching image 1 */}
        <div className="bg-[#121212]/70 border border-white/5 rounded-2xl p-6 space-y-6">
          {/* <div>
            <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">NOW</span>
            <p className="text-sm font-semibold text-white mt-1">
              {portfolioData.personal.career.now.role}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              at {portfolioData.personal.career.now.company}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">PREVIOUSLY</span>
            <p className="text-sm font-semibold text-zinc-300 mt-1">
              {portfolioData.personal.career.previously.role}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              at {portfolioData.personal.career.previously.company}
            </p>
          </div> */}

          {/* Socials buttons */}
          <div className="border-white/5">
            <span className="text-[11px] font-semibold tracking-wider uppercase block mb-3">SOCIALS</span>
            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#ebebec] hover:bg-[#9e9d9d] text-zinc-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#ebebec] hover:bg-[#9e9d9d] text-zinc-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37z" />
                </svg>
              </a>
              <a
                href={portfolioData.personal.socials.x}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#ebebec] hover:bg-[#9e9d9d] text-zinc-400 hover:text-white transition-colors"
                title="X"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


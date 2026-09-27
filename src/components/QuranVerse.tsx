import React from "react";
import { WeddingConfig } from "../config/weddingConfig";

interface QuranVerseProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const QuranVerse: React.FC<QuranVerseProps> = ({ config }) => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Ornate Frame Card */}
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-2xl bg-white/60 backdrop-blur-xs border border-[#C5A059]/35 shadow-sm text-center">
          
          {/* Top Arch Ornament */}
          <div className="flex justify-center mb-6">
            <svg
              className="w-16 h-8 text-[#C5A059]"
              viewBox="0 0 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M 0,50 Q 50,0 100,50" />
              <circle cx="50" cy="22" r="4" fill="currentColor" />
              <path d="M 30,50 Q 50,20 70,50" />
            </svg>
          </div>

          {/* Arabic Verse */}
          <blockquote className="text-xl sm:text-2xl lg:text-3xl text-[#721B29] font-serif leading-loose tracking-wide mb-4 px-2 sm:px-6">
            {config.quranVerse.arabic}
          </blockquote>

          {/* Surah Reference in Arabic */}
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-6">
            {config.quranVerse.surah}
          </p>

          {/* Hairline Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-6" />

          {/* French Translation */}
          <p className="text-sm sm:text-base font-serif italic text-stone-700 max-w-xl mx-auto leading-relaxed">
            {config.quranVerse.french}
          </p>

          <p className="text-xs text-stone-500 uppercase tracking-widest mt-2">
            {config.quranVerse.sourceFr}
          </p>
        </div>
      </div>
    </section>
  );
};

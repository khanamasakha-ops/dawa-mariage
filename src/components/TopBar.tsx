import React from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { Globe } from "lucide-react";

interface TopBarProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
  onToggleLang: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  config,
  lang,
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C5A059]/20 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#721B29] whitespace-nowrap"
        >
          {lang === "ar" ? config.couple.displayAr : config.couple.displayFr}
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-serif text-stone-700">
          <a
            href="#details"
            className="hover:text-[#721B29] transition-colors whitespace-nowrap"
          >
            {lang === "ar" ? "الموعد والمكان" : "Le Lieu"}
          </a>
          <a
            href="#programme"
            className="hover:text-[#721B29] transition-colors whitespace-nowrap"
          >
            {lang === "ar" ? "البرنامج" : "Programme"}
          </a>
          <a
            href="#galerie"
            className="hover:text-[#721B29] transition-colors whitespace-nowrap"
          >
            {lang === "ar" ? "الصور" : "Galerie"}
          </a>
          <a
            href="#rsvp"
            className="hover:text-[#721B29] transition-colors whitespace-nowrap"
          >
            {lang === "ar" ? "تأكيد الحضور" : "R.S.V.P"}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#C5A059]/30 hover:border-[#C5A059] bg-white/70 text-xs font-serif text-stone-800 hover:text-[#721B29] transition-colors cursor-pointer whitespace-nowrap"
            title="Changer la langue / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-medium">
              {lang === "ar" ? "Français" : "العربية"}
            </span>
          </button>

          {/* Quick RSVP CTA */}
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 text-xs font-serif font-medium text-white bg-[#721B29] hover:bg-[#852233] rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            {lang === "ar" ? "تأكيد الحضور" : "Confirmer"}
          </a>
        </div>
      </div>
    </header>
  );
};

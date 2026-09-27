import React, { useState } from "react";
import { WeddingConfig, resolveImageUrl } from "../config/weddingConfig";
import { Calendar, Clock, MapPin } from "lucide-react";

interface HeroSectionProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  lang,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-12 sm:py-16">
      
      {/* 1. Cinematic Wedding Hero Background */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={resolveImageUrl(config.photos.hero.url)}
            alt={config.photos.hero.alt}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-[center_28%] sm:object-[center_35%] scale-102 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#FAF7F2]" />
        )}

        {/* Soft, measured luxury gradient scrims: Warm ivory blending into soft contrast core for crystal-clear Arabic readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/65 to-[#FAF7F2]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/80 via-transparent to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF7F2]/30 to-[#FAF7F2]/90 pointer-events-none" />
      </div>

      {/* Main Content Container with Cinematic Fade-Up Presence */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center py-6 sm:py-10 animate-[fadeIn_1.2s_ease-out]">
        
        {/* Editorial Top Kicker */}
        <div className="inline-flex items-center justify-center gap-3 mb-5 sm:mb-6">
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#8C6D2B] font-medium font-sans">
            {lang === "ar" ? "بسم الله نبدأ حكايتنا" : "AU NOM DE DIEU, NOTRE UNION COMMENCE"}
          </p>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Couple Names - Grand Luxury Typography */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#721B29] tracking-tight leading-[1.15] drop-shadow-xs font-normal">
            {config.couple.displayAr}
          </h1>

          <p className="text-base sm:text-2xl font-serif italic text-[#8C6D2B] tracking-[0.2em] uppercase font-light">
            {config.couple.displayFr}
          </p>
        </div>

        {/* Welcome Kicker */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-10 px-4">
          <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#221D1A] font-light leading-relaxed">
            {lang === "ar"
              ? "يسعدنا أن نشارككم فرحتنا"
              : "Nous avons la joie de partager notre bonheur avec vous"}
          </p>
          <p className="text-xs sm:text-sm text-[#8C6D2B] font-serif italic mt-2">
            {lang === "ar"
              ? "بمناسبة عقد قراننا وزفافنا الميمون"
              : "à l'occasion de notre mariage béni"}
          </p>
        </div>

        {/* Event Key Information Ribbons (Unboxed, Zero-Pill Typography) */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-3 px-6 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-[#C5A059]/35 shadow-sm text-sm sm:text-base text-[#221D1A] font-serif">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span className="font-medium text-[#721B29]">
              {lang === "ar" ? config.event.dateFormattedAr : config.event.dateFormattedFr}
            </span>
          </div>

          <span className="text-[#C5A059]/60" aria-hidden="true">·</span>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono tabular-nums font-medium text-[#721B29]">
              {config.event.time}
            </span>
          </div>

          <span className="text-[#C5A059]/60" aria-hidden="true">·</span>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span className="text-stone-800">{config.event.venueName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { Clock, Sparkles, Utensils, Users } from "lucide-react";

interface ProgramTimelineProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const ProgramTimeline: React.FC<ProgramTimelineProps> = ({ config, lang }) => {
  const getTimelineIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-4 h-4 text-[#C5A059]" />;
      case 1:
        return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
      case 2:
        return <Utensils className="w-4 h-4 text-[#C5A059]" />;
      default:
        return <Clock className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            {lang === "ar" ? "برنامج الأمسية المباركة" : "PROGRAMME DE LA SOIRÉE"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#721B29] font-normal">
            {lang === "ar" ? "تسلسل فقرات الحفل" : "Déroulement de la Cérémonie"}
          </h2>
          <p className="text-sm font-serif italic text-[#8C6D2B] mt-1">
            {lang === "ar" ? "لحظات لا تُنسى في ضيافتكم" : "Des moments inoubliables partagés ensemble"}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Gold Vertical Line */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#C5A059]/20 via-[#C5A059] to-[#C5A059]/20" />

          <div className="space-y-8 sm:space-y-12">
            {config.program.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex items-center ${
                    isEven ? "sm:flex-row-reverse" : "sm:flex-row"
                  } flex-row gap-6`}
                >
                  {/* Timeline Content Card */}
                  <div
                    className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                      isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                    }`}
                  >
                    <div className="p-5 rounded-xl bg-white/75 backdrop-blur-xs border border-[#C5A059]/30 shadow-xs hover:border-[#C5A059]/70 transition-all duration-300">
                      
                      {/* Time Indicator */}
                      <span className="inline-block font-mono text-sm font-bold text-[#721B29] tracking-wider mb-1">
                        {item.time}
                      </span>

                      {/* Main Title (Arabic & French) */}
                      <h3 className="text-lg sm:text-xl font-serif text-[#221D1A] font-medium">
                        {item.titleAr}
                      </h3>
                      <p className="text-xs sm:text-sm font-serif italic text-[#8C6D2B] mt-0.5">
                        {item.titleFr}
                      </p>

                      {/* Optional Subtitle */}
                      {(item.descriptionAr || item.descriptionFr) && (
                        <p className="text-xs text-stone-600 mt-2 border-t border-[#C5A059]/15 pt-2">
                          {lang === "ar" ? item.descriptionAr : item.descriptionFr}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] shadow-sm flex items-center justify-center z-10">
                    {getTimelineIcon(idx)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

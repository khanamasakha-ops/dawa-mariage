import React, { useState } from "react";
import { WeddingConfig } from "../config/weddingConfig";

interface OpeningEnvelopeProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
  onOpenComplete: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  config,
  lang,
  onOpenComplete,
}) => {
  // Opening animation stages: 'sealed' | 'breaking' | 'opening' | 'revealed' | 'complete'
  const [stage, setStage] = useState<"sealed" | "breaking" | "opening" | "revealed" | "complete">("sealed");

  const handleOpen = () => {
    if (stage !== "sealed") return;

    // 1. Seal dissolves / breaks gently
    setStage("breaking");

    // 2. Envelope flap unfolds
    setTimeout(() => {
      setStage("opening");
    }, 250);

    // 3. Card slides up & light shimmer passes
    setTimeout(() => {
      setStage("revealed");
    }, 550);

    // 4. Background dissolves into hero photo
    setTimeout(() => {
      setStage("complete");
      onOpenComplete();
    }, 1350);
  };

  if (stage === "complete") {
    return null;
  }

  const isSealFading = stage !== "sealed";
  const isFlapOpen = stage === "opening" || stage === "revealed";
  const isCardEmerging = stage === "revealed";
  const isFadingToHero = stage === "revealed";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all duration-700 ease-out ${
        isFadingToHero ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "#FAF7F2",
        backgroundImage: `radial-gradient(rgba(197, 160, 89, 0.18) 1px, transparent 1px), radial-gradient(rgba(197, 160, 89, 0.12) 1px, #FAF7F2 1px)`,
        backgroundSize: "32px 32px",
        backgroundPosition: "0 0, 16px 16px",
      }}
    >
      {/* 4. Display the Basmala in elegant Arabic calligraphy above the seal */}
      <div
        className={`text-center mb-6 sm:mb-8 transition-all duration-500 ${
          isSealFading ? "opacity-40 -translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3">
          {lang === "ar" ? "دعوة زفاف مباركة" : "INVITATION OFFICIELLE DE MARIAGE"}
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#721B29] font-serif font-normal tracking-wide px-4">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>

        <p className="text-xs sm:text-sm text-[#8C6D2B] mt-2 font-serif italic">
          {lang === "ar"
            ? "« وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا »"
            : "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux"}
        </p>
      </div>

      {/* 1. Full-screen elegant envelope centered on the screen */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[1.42/1] perspective-1000 flex items-center justify-center">
        
        {/* Envelope Outer Shell */}
        <div
          onClick={handleOpen}
          className="relative w-full h-full bg-[#FDFBF7] rounded-xl border border-[#C5A059]/40 shadow-2xl overflow-hidden cursor-pointer group"
          style={{
            boxShadow: "0 20px 50px -10px rgba(114, 27, 41, 0.12), 0 10px 25px -5px rgba(197, 160, 89, 0.15)",
          }}
        >
          {/* Subtle gold foil geometric borders inside paper texture */}
          <div className="absolute inset-2 border border-[#C5A059]/25 rounded-lg pointer-events-none" />
          <div className="absolute inset-3 border border-[#C5A059]/15 rounded-md pointer-events-none" />

          {/* Emerging Invitation Card */}
          <div
            className={`absolute inset-x-4 top-3 bottom-3 bg-white rounded-lg border border-[#C5A059]/40 p-5 shadow-lg flex flex-col items-center justify-center text-center transition-all duration-700 ease-out z-15 ${
              isCardEmerging
                ? "-translate-y-32 sm:-translate-y-40 opacity-100 shadow-2xl scale-102"
                : "translate-y-0 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* Soft Light Shimmer Line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8E7]/60 to-transparent pointer-events-none -translate-x-full animate-[shimmer_1.5s_infinite]" />

            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-xs text-[#C5A059] font-serif mb-1.5">
              ⚜
            </div>
            
            <p className="text-[11px] text-[#8C6D2B] uppercase tracking-widest font-sans">
              {lang === "ar" ? "حفل زفاف مبارك" : "Célébration d'Union"}
            </p>
            
            <h2 className="text-xl sm:text-2xl font-serif text-[#721B29] mt-1 font-medium">
              {config.couple.displayAr}
            </h2>
            
            <p className="text-xs text-[#221D1A]/70 mt-0.5 font-serif italic">
              {config.couple.displayFr}
            </p>
            
            <div className="w-12 h-px bg-[#C5A059]/40 my-2" />
            
            <p className="text-xs text-[#C5A059] font-mono tabular-nums">
              17.10.2026 · Tlemcen
            </p>
          </div>

          {/* Lower Envelope Fold (Pouch) */}
          <div className="relative z-10 w-full h-full pointer-events-none">
            <svg
              className="absolute bottom-0 left-0 w-full h-full text-[#F8F4EC]"
              viewBox="0 0 420 295"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              {/* Interior Back Pocket */}
              <rect width="420" height="295" fill="#F3EBE0" />
              {/* Left Side Flap */}
              <polygon points="0,0 210,147 0,295" fill="#FAF6EE" stroke="#E2CCA0" strokeWidth="0.75" />
              {/* Right Side Flap */}
              <polygon points="420,0 210,147 420,295" fill="#FAF6EE" stroke="#E2CCA0" strokeWidth="0.75" />
              {/* Bottom V Flap */}
              <polygon points="0,295 210,140 420,295" fill="#FDFBF7" stroke="#C5A059" strokeWidth="1" />
            </svg>
          </div>

          {/* 6. Top Flap with 3D open animation */}
          <div
            className={`absolute top-0 left-0 w-full h-1/2 origin-top z-20 transition-transform duration-600 ease-in-out pointer-events-none ${
              isFlapOpen ? "rotate-x-180 -translate-y-0.5" : "rotate-x-0"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg
              className="w-full h-full text-[#FAF6EE]"
              viewBox="0 0 420 148"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <polygon points="0,0 420,0 210,148" fill="#F8F3EA" stroke="#C5A059" strokeWidth="1" />
            </svg>
          </div>

          {/* 3. Refined gold wax seal containing elegant wedding monogram */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div
              className={`wax-seal relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center text-white transition-all duration-400 ease-out ${
                isSealFading
                  ? "scale-90 opacity-0 pointer-events-none"
                  : "scale-100 group-hover:scale-105 active:scale-95"
              }`}
            >
              <div className="absolute inset-1 rounded-full border border-amber-100/60 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-serif font-bold tracking-widest text-[#FFF8E7] drop-shadow-sm">
                  {config.couple.monogram}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Subtle instruction button: "افتح الدعوة" */}
      <div className="mt-8 text-center">
        <button
          onClick={handleOpen}
          disabled={stage !== "sealed"}
          className={`group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#721B29] via-[#852233] to-[#721B29] text-[#FAF7F2] font-medium text-sm sm:text-base shadow-lg shadow-[#721B29]/25 hover:shadow-[#721B29]/40 border border-[#C5A059]/40 hover:border-[#E8D39E] transition-all duration-300 active:scale-95 cursor-pointer ${
            isSealFading ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8D39E] animate-ping" />
          <span className="font-serif tracking-wider font-semibold">
            {lang === "ar" ? "افتح الدعوة" : "Ouvrir l'invitation"}
          </span>
          <span className="text-[#E8D39E] font-serif text-sm">✦</span>
        </button>

        <p className="text-xs text-[#8C6D2B] mt-4 font-serif">
          {config.event.venueName} · {config.event.city}
        </p>
      </div>
    </div>
  );
};

import React from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { Heart, MailOpen, Sliders } from "lucide-react";

interface FinalMessageProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
  onReopenEnvelope: () => void;
  onOpenCustomizer?: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  config,
  lang,
  onReopenEnvelope,
  onOpenCustomizer,
}) => {
  return (
    <footer className="pt-12 pb-20 px-4 sm:px-6 relative border-t border-[#C5A059]/20 bg-gradient-to-b from-[#FAF7F2] to-[#F5ECE0]">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        
        {/* Heart Icon with delicate gold glow */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#C5A059]/40 text-[#721B29] shadow-sm">
          <Heart className="w-5 h-5 fill-[#721B29]" />
        </div>

        {/* Primary Final Quote */}
        <blockquote className="text-2xl sm:text-3xl font-serif text-[#721B29] leading-relaxed">
          « حضوركم يزيد فرحتنا ويجعل يومنا أجمل 🤍 »
        </blockquote>

        {/* French translation */}
        <p className="text-sm sm:text-base font-serif italic text-stone-700 max-w-md mx-auto">
          "Votre présence rendra notre bonheur encore plus grand."
        </p>

        {/* Hairline Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-4" />

        {/* Couple Signature & Date */}
        <div className="space-y-1">
          <p className="text-2xl sm:text-3xl font-serif text-[#221D1A] font-medium">
            {config.couple.displayAr}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#8C6D2B] font-serif">
            {config.couple.displayFr}
          </p>
          <p className="font-mono text-sm text-[#C5A059] tabular-nums pt-1 tracking-widest">
            17.10.2026
          </p>
        </div>

        {/* Action to Replay the Envelope Animation */}
        <div className="pt-6">
          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A059]/30 hover:border-[#C5A059] text-xs font-serif text-stone-600 hover:text-[#721B29] bg-white/50 hover:bg-white transition-all cursor-pointer"
          >
            <MailOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>
              {lang === "ar" ? "إعادة فتح الظرف الملكي" : "Revoir l'enveloppe"}
            </span>
          </button>
        </div>

        {/* Quiet Copyright / Trust note & Discrete Hidden Editor Trigger */}
        <div className="pt-6 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <span>Salle des fêtes KARADJA · Lots KARADJA/Feden Esbê, 13000, Tlemcen, Algérie</span>
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="opacity-20 hover:opacity-100 transition-opacity p-1 rounded-full text-stone-400 hover:text-[#721B29] cursor-pointer"
              title={lang === "ar" ? "لوحة التخصيص" : "Personnaliser"}
              aria-label="Configuration"
            >
              <Sliders className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { MessageCircle, Check, Copy, Send, Heart } from "lucide-react";

interface RsvpSectionProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config, lang }) => {
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [guestStatus, setGuestStatus] = useState<"attending" | "declined">("attending");
  const [personalMessage, setPersonalMessage] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Construct dynamic WhatsApp link
  const constructWhatsAppUrl = () => {
    let message = "";
    if (guestName.trim()) {
      if (guestStatus === "attending") {
        message =
          lang === "ar"
            ? `السلام عليكم، أنا ${guestName.trim()}، أؤكد بكل سرور حضوري لحفل زفاف محمد وخديجة يوم 17 أكتوبر 2026 (عدد الأفراد: ${guestCount}). ${
                personalMessage ? `تهنئة: "${personalMessage}"` : ""
              }`
            : `Bonjour, je suis ${guestName.trim()}, je confirme avec joie ma présence au mariage de Mohamed & Khadidja le 17 octobre 2026 (${guestCount} personne(s)). ${
                personalMessage ? `Message: "${personalMessage}"` : ""
              }`;
      } else {
        message =
          lang === "ar"
            ? `السلام عليكم، أنا ${guestName.trim()}، يؤسفني عدم التمكن من الحضور، مبارك للعروسين وبالرفاه والبنين. ${
                personalMessage ? `تهنئة: "${personalMessage}"` : ""
              }`
            : `Bonjour, je suis ${guestName.trim()}, je ne pourrai malheureusement pas être présent(e). Tous mes vœux de bonheur aux mariés ! ${
                personalMessage ? `Message: "${personalMessage}"` : ""
              }`;
      }
    } else {
      // Default prompt message
      message = config.contact.defaultMessage;
    }

    const cleanNumber = config.contact.whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(config.contact.whatsappDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Open WhatsApp with constructed message
    window.open(constructWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            {lang === "ar" ? "تأكيد الحضور والمشاركة" : "R.S.V.P"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#721B29] font-normal">
            {lang === "ar" ? "تأكيد الحضور" : "Confirmation de présence"}
          </h2>
          <p className="text-base sm:text-lg font-serif italic text-stone-700 mt-2 max-w-lg mx-auto">
            {lang === "ar"
              ? "يسعدنا تأكيد حضوركم ومشاركتنا هذه المناسبة المميزة."
              : "Nous serions honorés de vous compter parmi nous pour célébrer ce jour si spécial."}
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-xs border border-[#C5A059]/40 p-6 sm:p-8 shadow-lg shadow-[#721B29]/5">
          
          {/* Quick Direct WhatsApp CTA */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F4ECE1] border border-[#C5A059]/30 text-center mb-8">
            <p className="text-xs font-serif text-stone-600 mb-3">
              {lang === "ar"
                ? "تأكيد سريع ومباشر بنقرة واحدة عبر تطبيق واتساب:"
                : "Confirmation instantanée en un clic via WhatsApp :"}
            </p>

            <a
              href={constructWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm sm:text-base shadow-md shadow-[#25D366]/20 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>
                {lang === "ar" ? "تأكيد الحضور عبر واتساب" : "Confirmer par WhatsApp"}
              </span>
            </a>

            {/* Contact Display & Copy */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-600">
              <span className="font-mono text-stone-700">{config.contact.whatsappDisplay}</span>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1 text-[#721B29] hover:underline cursor-pointer"
                title="Copier le numéro"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 text-[11px] font-medium">
                      {lang === "ar" ? "تم النسخ" : "Copié"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{lang === "ar" ? "نسخ" : "Copier"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Detailed Guest RSVP Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#C5A059]/20">
              <span className="text-xs uppercase tracking-wider text-[#8C6D2B] font-medium">
                {lang === "ar" ? "أو أرسل تفاصيل حضورك" : "Ou personnalisez votre message"}
              </span>
              <span className="text-xs text-stone-500 font-serif">
                {lang === "ar" ? "محمد & خديجة" : "Mohamed & Khadidja"}
              </span>
            </div>

            {/* Attendance Status Radio Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setGuestStatus("attending")}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  guestStatus === "attending"
                    ? "bg-[#721B29] text-white border-[#721B29]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${guestStatus === "attending" ? "fill-white" : ""}`} />
                <span>{lang === "ar" ? "سأحضر بكل سرور" : "Je serai présent(e)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setGuestStatus("declined")}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  guestStatus === "declined"
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                }`}
              >
                <span>{lang === "ar" ? "أعتذر عن الحضور" : "Ne pourra pas venir"}</span>
              </button>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {lang === "ar" ? "الاسم واللقب" : "Nom & Prénom"}
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={lang === "ar" ? "مثال: عبد القادر بلحاج" : "Ex: Abdelkader Belhadj"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/30 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#721B29]"
              />
            </div>

            {/* Number of Guests (if attending) */}
            {guestStatus === "attending" && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {lang === "ar" ? "عدد الأشخاص القادمين" : "Nombre de personnes"}
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/30 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#721B29]"
                >
                  <option value="1">{lang === "ar" ? "شخص واحد (1)" : "1 personne"}</option>
                  <option value="2">{lang === "ar" ? "شخصان (2)" : "2 personnes"}</option>
                  <option value="3">{lang === "ar" ? "ثلاثة أشخاص (3)" : "3 personnes"}</option>
                  <option value="4+">{lang === "ar" ? "عائلة (4 أو أكثر)" : "Famille (4 ou plus)"}</option>
                </select>
              </div>
            )}

            {/* Note / Congratulations */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {lang === "ar" ? "رسالة أو كلمة تهنئة للعروسين" : "Mot doux pour les mariés"}
              </label>
              <textarea
                rows={2}
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "ألف مبروك وبالرفاه والبنين إن شاء الله..."
                    : "Toutes nos félicitations et vœux de bonheur..."
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#C5A059]/30 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#721B29]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#721B29] hover:bg-[#852233] text-white font-medium text-sm transition-all duration-200 shadow-md shadow-[#721B29]/15 active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {lang === "ar"
                  ? "إرسال التأكيد عبر واتساب"
                  : "Envoyer ma réponse via WhatsApp"}
              </span>
            </button>

            {isSubmitted && (
              <p className="text-center text-xs text-emerald-700 font-medium pt-1">
                {lang === "ar"
                  ? "تم تجهيز رسالتك لفتح واتساب، شكراً لكم!"
                  : "Votre message est prêt sur WhatsApp, merci !"}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

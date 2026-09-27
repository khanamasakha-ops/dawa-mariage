import React, { useState } from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { X, Check, RotateCcw, Copy, Sparkles, Sliders } from "lucide-react";

interface CustomizerDrawerProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (newConfig: WeddingConfig) => void;
  onResetConfig: () => void;
  lang: "ar" | "fr";
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
  onResetConfig,
  lang,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (path: string, value: string) => {
    setFormData((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as WeddingConfig;
      const keys = path.split(".");
      let current: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    onClose();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#C5A059]/40 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#721B29]" />
            <div>
              <h3 className="font-serif font-medium text-base text-[#721B29]">
                {lang === "ar" ? "لوحة تخصيص الدعوة للعملاء" : "Personnalisation Client"}
              </h3>
              <p className="text-[11px] text-stone-500">
                {lang === "ar"
                  ? "تعديل فوري للبيانات وإعادة استخدام القالب"
                  : "Modifiez et adaptez ce modèle pour un autre mariage"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          
          {/* Couple Names */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-[#8C6D2B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === "ar" ? "بيانات العروسين" : "Les Mariés"}</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-600 mb-1">اسم العريس (عربي)</label>
                <input
                  type="text"
                  value={formData.couple.groomAr}
                  onChange={(e) => {
                    handleChange("couple.groomAr", e.target.value);
                    handleChange("couple.displayAr", `${e.target.value} & ${formData.couple.brideAr}`);
                  }}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1">اسم العروس (عربي)</label>
                <input
                  type="text"
                  value={formData.couple.brideAr}
                  onChange={(e) => {
                    handleChange("couple.brideAr", e.target.value);
                    handleChange("couple.displayAr", `${formData.couple.groomAr} & ${e.target.value}`);
                  }}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-600 mb-1">Marié (Français)</label>
                <input
                  type="text"
                  value={formData.couple.groomFr}
                  onChange={(e) => {
                    handleChange("couple.groomFr", e.target.value);
                    handleChange("couple.displayFr", `${e.target.value} & ${formData.couple.brideFr}`);
                  }}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1">Mariée (Français)</label>
                <input
                  type="text"
                  value={formData.couple.brideFr}
                  onChange={(e) => {
                    handleChange("couple.brideFr", e.target.value);
                    handleChange("couple.displayFr", `${formData.couple.groomFr} & ${e.target.value}`);
                  }}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3 pt-2 border-t border-stone-200/60">
            <h4 className="font-serif font-semibold text-[#8C6D2B] uppercase tracking-wider text-[11px]">
              {lang === "ar" ? "الموعد والوقت" : "Date & Heure"}
            </h4>

            <div>
              <label className="block text-stone-600 mb-1">تاريخ المناسبة (ISO)</label>
              <input
                type="text"
                value={formData.event.dateISO}
                onChange={(e) => handleChange("event.dateISO", e.target.value)}
                placeholder="2026-10-17T18:00:00+01:00"
                className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-600 mb-1">الوقت (Time)</label>
                <input
                  type="text"
                  value={formData.event.time}
                  onChange={(e) => handleChange("event.time", e.target.value)}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1">المدينة</label>
                <input
                  type="text"
                  value={formData.event.city}
                  onChange={(e) => handleChange("event.city", e.target.value)}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Venue & Location */}
          <div className="space-y-3 pt-2 border-t border-stone-200/60">
            <h4 className="font-serif font-semibold text-[#8C6D2B] uppercase tracking-wider text-[11px]">
              {lang === "ar" ? "القاعة والموقع" : "Lieu & Google Maps"}
            </h4>

            <div>
              <label className="block text-stone-600 mb-1">اسم القاعة</label>
              <input
                type="text"
                value={formData.event.venueName}
                onChange={(e) => handleChange("event.venueName", e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1">العنوان التفصيلي</label>
              <input
                type="text"
                value={formData.event.venueAddress}
                onChange={(e) => handleChange("event.venueAddress", e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1">رابط خرائط Google</label>
              <input
                type="url"
                value={formData.event.googleMapsUrl}
                onChange={(e) => handleChange("event.googleMapsUrl", e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono text-[11px]"
              />
            </div>
          </div>

          {/* WhatsApp RSVP */}
          <div className="space-y-3 pt-2 border-t border-stone-200/60">
            <h4 className="font-serif font-semibold text-[#8C6D2B] uppercase tracking-wider text-[11px]">
              {lang === "ar" ? "رقم تأكيد الحضور (واتساب)" : "WhatsApp RSVP"}
            </h4>

            <div>
              <label className="block text-stone-600 mb-1">رقم الواتساب (أرقام فقط مع الرمز الدولي)</label>
              <input
                type="text"
                value={formData.contact.whatsappNumber}
                onChange={(e) => handleChange("contact.whatsappNumber", e.target.value)}
                placeholder="213500000000"
                className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1">الرقم المعروض للضيوف</label>
              <input
                type="text"
                value={formData.contact.whatsappDisplay}
                onChange={(e) => handleChange("contact.whatsappDisplay", e.target.value)}
                placeholder="+213 5 XX XX XX XX"
                className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
              />
            </div>
          </div>

          {/* Music */}
          <div className="space-y-3 pt-2 border-t border-stone-200/60">
            <h4 className="font-serif font-semibold text-[#8C6D2B] uppercase tracking-wider text-[11px]">
              {lang === "ar" ? "الموسيقى الخلفية" : "Musique de Fond"}
            </h4>

            <div>
              <label className="block text-stone-600 mb-1">
                رابط ملف MP3 خارجي (اتركه فارغاً للاعتماد على العزف المدمج)
              </label>
              <input
                type="url"
                value={formData.music.audioUrl || ""}
                onChange={(e) => handleChange("music.audioUrl", e.target.value)}
                placeholder="https://example.com/audio.mp3"
                className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#C5A059]/20 bg-white flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#721B29] hover:bg-[#852233] text-white font-medium text-xs shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{lang === "ar" ? "تطبيق التعديلات الآن" : "Appliquer"}</span>
            </button>

            <button
              type="button"
              onClick={onResetConfig}
              className="p-2.5 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyJson}
            className="flex items-center justify-center gap-1.5 py-2 text-stone-600 hover:text-stone-900 text-[11px] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? "Copié !" : "Copier la configuration JSON"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

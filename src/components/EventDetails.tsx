import React, { useState } from "react";
import { WeddingConfig } from "../config/weddingConfig";
import { MapPin, Calendar, Clock, ExternalLink, CalendarPlus, Check } from "lucide-react";

interface EventDetailsProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const EventDetails: React.FC<EventDetailsProps> = ({ config, lang }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    // 2026-10-17 18:00 to 23:30 Algerian Time (UTC+1) => 17:00 UTC to 22:30 UTC
    const startTime = "20261017T170000Z";
    const endTime = "20261017T230000Z";
    const title = encodeURIComponent(config.event.calendarSummary);
    const details = encodeURIComponent(config.event.calendarDescription);
    const location = encodeURIComponent(`${config.event.venueName}, ${config.event.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  const handleDownloadIcs = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mohamed & Khadidja Wedding//DZ",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:wedding-mohamed-khadidja-20261017@tlemcen",
      "DTSTAMP:20261017T170000Z",
      "DTSTART:20261017T170000Z",
      "DTEND:20261017T230000Z",
      `SUMMARY:${config.event.calendarSummary}`,
      `DESCRIPTION:${config.event.calendarDescription}`,
      `LOCATION:${config.event.venueName}, ${config.event.venueAddress}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mariage-mohamed-khadidja.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            {lang === "ar" ? "تفاصيل الموعد والمكان" : "LIEU & HORAIRES"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#721B29] font-normal">
            {config.event.titleAr}
          </h2>
          <p className="text-sm font-serif italic text-[#8C6D2B] mt-1">
            {config.event.titleFr}
          </p>
        </div>

        {/* Premium Detail Card */}
        <div className="relative rounded-2xl bg-white/80 backdrop-blur-xs border border-[#C5A059]/40 p-6 sm:p-10 shadow-lg shadow-[#721B29]/5 text-center">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/40 rounded-br-sm pointer-events-none" />

          {/* Date & Time Highlights */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center justify-center gap-2 text-[#721B29]">
              <Calendar className="w-5 h-5 text-[#C5A059]" />
              <span className="text-xl sm:text-2xl font-serif font-medium">
                {config.event.dateFormattedAr}
              </span>
            </div>
            <p className="text-sm text-stone-600 font-serif italic">
              {config.event.dateFormattedFr}
            </p>

            <div className="inline-flex items-center justify-center gap-2 text-stone-800 font-mono text-lg font-medium pt-1">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span className="tabular-nums">{config.event.time}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mb-8" />

          {/* Venue & Location Information */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              <MapPin className="w-4 h-4" />
              <span>{lang === "ar" ? "قاعة الحفل" : "LIEU DE RÉCEPTION"}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#721B29] font-medium">
              {config.event.venueName}
            </h3>

            <p className="text-sm sm:text-base text-stone-700 max-w-md mx-auto leading-relaxed">
              {config.event.venueAddress}
            </p>
          </div>

          {/* Action Buttons: Google Maps & Add to Calendar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            
            {/* Google Maps Button - REQUIRED: open in new tab */}
            <a
              href={config.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#721B29] hover:bg-[#852233] text-[#FAF7F2] font-medium text-sm shadow-md shadow-[#721B29]/20 transition-all duration-200 active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-[#E8D39E]" />
              <span>
                {lang === "ar" ? "عرض على خرائط Google" : "Voir sur Google Maps"}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Google Calendar Link */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-[#C5A059]/40 hover:border-[#C5A059] text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <CalendarPlus className="w-4 h-4 text-[#C5A059]" />
              <span>
                {lang === "ar" ? "إضافة لتقويم Google" : "Google Calendar"}
              </span>
            </a>

            {/* ICS File Download for iPhone / Outlook */}
            <button
              onClick={handleDownloadIcs}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-[#C5A059]/30 text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
              title="Télécharger fichier .ics pour Apple / Outlook"
            >
              {calendarAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">
                    {lang === "ar" ? "تم التحميل" : "Fichier .ics prêt"}
                  </span>
                </>
              ) : (
                <span>{lang === "ar" ? "ملف التقويم (.ics)" : "Fichier .ics"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

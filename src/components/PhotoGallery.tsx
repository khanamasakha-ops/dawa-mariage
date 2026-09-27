import React, { useState } from "react";
import { WeddingConfig, resolveImageUrl } from "../config/weddingConfig";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, MapPin } from "lucide-react";

interface PhotoGalleryProps {
  config: WeddingConfig;
  lang: "ar" | "fr";
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  config,
  lang,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const photos = config.photos.gallery;
  // First 3 photos form the curated prelude collection
  const firstThreePhotos = photos.slice(0, 3);
  // Last photo is showcased independently as a grand luxury magazine editorial feature
  const lastPhoto = photos[3];

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIdx(index);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIdx(null);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % photos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length);
    }
  };

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#C5A059] font-medium mb-2.5">
            {lang === "ar" ? "معرض الصور والذكريات" : "GALERIE PHOTOS"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#721B29] font-normal">
            {lang === "ar" ? "لمحات من وحي المحبة" : "Moments Précieux"}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#8C6D2B] mt-1.5 max-w-md mx-auto">
            {lang === "ar"
              ? "تفاصيل منسوجة ببريق الذهب وأناقة المناسبة"
              : "Des instants précieux capturés avec délicatesse"}
          </p>
        </div>

        {/* Part 1: First 3 Photos in a Curated 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-20">
          {firstThreePhotos.map((photo, idx) => {
            const hasError = failedImages[photo.id];

            return (
              <div
                key={photo.id}
                className="group relative rounded-2xl bg-white/70 backdrop-blur-xs border border-[#C5A059]/30 p-2.5 sm:p-3 shadow-md hover:border-[#C5A059] transition-all duration-300"
              >
                {/* Photo Aspect Box */}
                <div
                  onClick={() => handleOpenLightbox(idx)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4ECE1] cursor-pointer"
                >
                  {!hasError ? (
                    <img
                      src={resolveImageUrl(photo.url)}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(photo.id)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FAF7F2] to-[#F4ECE1] text-[#8C6D2B]">
                      <Sparkles className="w-7 h-7 text-[#C5A059] mb-2" />
                      <p className="font-serif text-sm font-medium text-[#721B29]">
                        {lang === "ar" ? photo.titleAr : photo.titleFr}
                      </p>
                      <p className="text-xs text-stone-500 mt-1 text-center line-clamp-2">
                        {lang === "ar" ? photo.captionAr : photo.captionFr}
                      </p>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-end">
                      <span className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <div>
                      <p className="font-serif text-base font-medium drop-shadow-sm">
                        {lang === "ar" ? photo.titleAr : photo.titleFr}
                      </p>
                      <p className="text-xs text-[#E8D39E] font-serif italic mt-0.5 line-clamp-1 drop-shadow-sm">
                        {lang === "ar" ? photo.captionAr : photo.captionFr}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="pt-3 px-2">
                  <h3 className="text-sm font-serif font-medium text-[#721B29]">
                    {lang === "ar" ? photo.titleAr : photo.titleFr}
                  </h3>
                  <p className="text-xs text-stone-500 font-serif italic">
                    {lang === "ar" ? photo.captionAr : photo.captionFr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Part 2: 3. LAST PHOTO — REDESIGN ONLY ITS PRESENTATION */}
        {/* Large, visually dominant, luxury wedding magazine editorial feature with asymmetric composition */}
        {lastPhoto && (
          <div className="relative pt-4 sm:pt-8">
            {/* Subtle Editorial Header Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C5A059]/40" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D2B] font-serif">
                {lang === "ar" ? "مكان الحفل والأجواء الملكية" : "ÉDITION PRESTIGE · LE LIEU"}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C5A059]/40" />
            </div>

            {/* Grand Royal Editorial Frame */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FAF7F2] border border-[#C5A059]/40 shadow-2xl shadow-stone-900/12 transition-all duration-700 hover:border-[#C5A059] hover:shadow-stone-900/18">
              
              {/* Corner Ornaments */}
              <span className="absolute top-2 left-2 text-[10px] text-[#C5A059]/60 pointer-events-none z-20">┌</span>
              <span className="absolute top-2 right-2 text-[10px] text-[#C5A059]/60 pointer-events-none z-20">┐</span>
              <span className="absolute bottom-2 left-2 text-[10px] text-[#C5A059]/60 pointer-events-none z-20">└</span>
              <span className="absolute bottom-2 right-2 text-[10px] text-[#C5A059]/60 pointer-events-none z-20">┘</span>

              {/* Main Photo Area with 16:9 cinematic ratio and smooth zoom */}
              <div
                onClick={() => handleOpenLightbox(3)}
                className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.1/1] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#F4ECE1] cursor-pointer"
              >
                {!failedImages[lastPhoto.id] ? (
                  <img
                    src={resolveImageUrl(lastPhoto.url)}
                    alt={lastPhoto.alt}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(lastPhoto.id)}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-104"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#FAF7F2] to-[#F4ECE1] text-[#8C6D2B]">
                    <Sparkles className="w-10 h-10 text-[#C5A059] mb-3" />
                    <p className="font-serif text-lg font-medium text-[#721B29]">
                      {lang === "ar" ? lastPhoto.titleAr : lastPhoto.titleFr}
                    </p>
                  </div>
                )}

                {/* Measured Contrast Scrim for Editorial Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Subtle Top Accent */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-[11px] sm:text-xs font-serif text-[#E8D39E] border border-white/15 uppercase tracking-widest">
                    Salle des fêtes KARADJA · Tlemcen
                  </span>
                </div>

                {/* Asymmetric Luxury Editorial Deck at the Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                  <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#E8D39E] font-medium mb-1.5">
                      {lang === "ar" ? "قاعة الحفل والأجواء الملكية" : "CADRE ROYAL D'EXCEPTION"}
                    </p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal drop-shadow-md text-[#FAF7F2]">
                      {lang === "ar" ? lastPhoto.titleAr : lastPhoto.titleFr}
                    </h3>
                    <p className="text-sm sm:text-base font-serif italic text-white/90 mt-2 leading-relaxed drop-shadow-sm">
                      {lang === "ar" ? lastPhoto.captionAr : lastPhoto.captionFr}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs font-serif text-[#FAF7F2] bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-[#E8D39E]" />
                      <span>Lots KARADJA / Feden Esbê</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(3);
                      }}
                      className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer"
                      title={lang === "ar" ? "تكبير الصورة" : "Agrandir"}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for All 4 Photos */}
      {activePhotoIdx !== null && (
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <img
              src={resolveImageUrl(photos[activePhotoIdx].url)}
              alt={photos[activePhotoIdx].alt}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-[#C5A059]/40 shadow-2xl"
            />
            
            <div className="mt-4 text-center text-white">
              <h4 className="font-serif text-lg font-medium text-[#FAF7F2]">
                {lang === "ar"
                  ? photos[activePhotoIdx].titleAr
                  : photos[activePhotoIdx].titleFr}
              </h4>
              <p className="text-xs sm:text-sm text-[#E8D39E] font-serif italic mt-1">
                {lang === "ar"
                  ? photos[activePhotoIdx].captionAr
                  : photos[activePhotoIdx].captionFr}
              </p>
              <span className="text-[11px] text-white/50 font-mono mt-1 inline-block">
                {activePhotoIdx + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

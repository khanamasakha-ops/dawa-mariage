/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { INITIAL_WEDDING_CONFIG, WeddingConfig } from "./config/weddingConfig";
import { OpeningEnvelope } from "./components/OpeningEnvelope";
import { TopBar } from "./components/TopBar";
import { HeroSection } from "./components/HeroSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { QuranVerse } from "./components/QuranVerse";
import { EventDetails } from "./components/EventDetails";
import { ProgramTimeline } from "./components/ProgramTimeline";
import { PhotoGallery } from "./components/PhotoGallery";
import { RsvpSection } from "./components/RsvpSection";
import { FinalMessage } from "./components/FinalMessage";
import { AudioPlayer } from "./components/AudioPlayer";
import { CustomizerDrawer } from "./components/CustomizerDrawer";

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(INITIAL_WEDDING_CONFIG);
  const [lang, setLang] = useState<"ar" | "fr">("ar");
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync document direction and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "fr" : "ar"));
  };

  const handleResetConfig = () => {
    setConfig(INITIAL_WEDDING_CONFIG);
  };

  return (
    <div
      className={`min-h-screen bg-[#FAF7F2] text-[#221D1A] antialiased selection:bg-[#C5A059]/20 selection:text-[#721B29] ${
        lang === "ar" ? "font-serif text-right" : "text-left"
      }`}
      style={{
        backgroundImage: `radial-gradient(#C5A059 0.5px, transparent 0.5px), radial-gradient(#C5A059 0.5px, #FAF7F2 0.5px)`,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    >
      {/* 1. Opening Envelope Experience before the invitation */}
      {!isEnvelopeOpened && (
        <OpeningEnvelope
          config={config}
          lang={lang}
          onOpenComplete={() => setIsEnvelopeOpened(true)}
        />
      )}

      {/* Main Wedding Invitation Website */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpened ? "opacity-100" : "opacity-0"}`}>
        
        {/* Top Bar Navigation */}
        <TopBar
          config={config}
          lang={lang}
          onToggleLang={toggleLanguage}
        />

        {/* Hero Section */}
        <HeroSection
          config={config}
          lang={lang}
        />

        {/* Live Countdown Timer */}
        <CountdownTimer
          targetDateISO={config.event.dateISO}
          lang={lang}
        />

        {/* Quranic Verse & Welcome Message */}
        <QuranVerse
          config={config}
          lang={lang}
        />

        {/* Event Details (Date, Time, Salle des fêtes KARADJA, Google Maps, Add to Calendar) */}
        <div id="details">
          <EventDetails
            config={config}
            lang={lang}
          />
        </div>

        {/* Program Timeline */}
        <div id="programme">
          <ProgramTimeline
            config={config}
            lang={lang}
          />
        </div>

        {/* Photo Gallery (4 Photos, Lightbox, Hover Effects) */}
        <div id="galerie">
          <PhotoGallery
            config={config}
            lang={lang}
          />
        </div>

        {/* RSVP Section (WhatsApp Confirmation + Form) */}
        <div id="rsvp">
          <RsvpSection
            config={config}
            lang={lang}
          />
        </div>

        {/* Final Message & Footer */}
        <FinalMessage
          config={config}
          lang={lang}
          onReopenEnvelope={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsEnvelopeOpened(false);
          }}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Background Music Player (Discreet floating button, no autoplay with sound) */}
        <AudioPlayer
          customAudioUrl={config.music.audioUrl}
          lang={lang}
        />

        {/* Client Customization Drawer - Opened via the discrete footer button */}
        <CustomizerDrawer
          config={config}
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          onUpdateConfig={setConfig}
          onResetConfig={handleResetConfig}
          lang={lang}
        />
      </div>
    </div>
  );
}

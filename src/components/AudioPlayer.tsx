import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  customAudioUrl?: string;
  lang: "ar" | "fr";
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ customAudioUrl, lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  // Soft romantic arpeggio notes (Frequencies in Hz: Romantic C major / A minor soothing progression)
  const melodyNotes = [
    { freq: 261.63, dur: 1.2 }, // C4
    { freq: 329.63, dur: 1.0 }, // E4
    { freq: 392.00, dur: 1.0 }, // G4
    { freq: 523.25, dur: 1.8 }, // C5
    { freq: 440.00, dur: 1.2 }, // A4
    { freq: 349.23, dur: 1.0 }, // F4
    { freq: 329.63, dur: 1.4 }, // E4
    { freq: 392.00, dur: 1.2 }, // G4
    { freq: 493.88, dur: 1.0 }, // B4
    { freq: 587.33, dur: 2.0 }, // D5
    { freq: 523.25, dur: 2.4 }, // C5
  ];

  const playSynthNote = (ctx: AudioContext, freq: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm sine + subtle triangle for warm classical acoustic feel
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle envelope: soft attack, long decaying release like piano/harp
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.1);
    } catch {
      // Audio context might be suspended or closed
    }
  };

  const startSynthLoop = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    let noteIdx = 0;
    isPlayingRef.current = true;

    const playNext = () => {
      if (!isPlayingRef.current || !audioContextRef.current) return;
      const note = melodyNotes[noteIdx % melodyNotes.length];
      playSynthNote(audioContextRef.current, note.freq, note.dur);
      noteIdx++;
      timerRef.current = window.setTimeout(playNext, note.dur * 850);
    };

    playNext();
  };

  const stopSynthLoop = () => {
    isPlayingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (customAudioUrl) {
      if (!htmlAudioRef.current) {
        htmlAudioRef.current = new Audio(customAudioUrl);
        htmlAudioRef.current.loop = true;
      }
      if (isPlaying) {
        htmlAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        htmlAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    // Use Web Audio synthesizer
    if (isPlaying) {
      stopSynthLoop();
      setIsPlaying(false);
    } else {
      startSynthLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthLoop();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      }
    };
  }, []);

  const label = isPlaying
    ? lang === "ar"
      ? "إيقاف الموسيقى"
      : "Pause musique"
    : lang === "ar"
      ? "تشغيل الموسيقى"
      : "Jouer la musique";

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={togglePlay}
        aria-label={label}
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-300 shadow-md ${
          isPlaying
            ? "bg-[#721B29] text-[#FAF7F2] shadow-[#721B29]/25 ring-2 ring-[#C5A059]/40"
            : "bg-[#FAF7F2]/95 text-[#221D1A] hover:bg-white border border-[#C5A059]/30 hover:border-[#C5A059]"
        }`}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#E8D39E] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#C5A059]" />
          )}
        </span>
        <span className="text-xs font-medium tracking-wide hidden sm:inline whitespace-nowrap">
          {label}
        </span>
        {isPlaying && (
          <span className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
            <span className="w-0.5 bg-[#E8D39E] rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
            <span className="w-0.5 bg-[#E8D39E] rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
            <span className="w-0.5 bg-[#E8D39E] rounded-full animate-bounce h-3.5" />
          </span>
        )}
      </button>
    </div>
  );
};

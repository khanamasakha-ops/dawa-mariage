import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDateISO: string;
  lang: "ar" | "fr";
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateISO,
  lang,
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDateISO).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isComplete: false };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateISO]);

  const timeUnits = [
    {
      value: timeRemaining.days,
      labelAr: "أيام",
      labelFr: "Jours",
    },
    {
      value: timeRemaining.hours,
      labelAr: "ساعات",
      labelFr: "Heures",
    },
    {
      value: timeRemaining.minutes,
      labelAr: "دقائق",
      labelFr: "Minutes",
    },
    {
      value: timeRemaining.seconds,
      labelAr: "ثوانٍ",
      labelFr: "Secondes",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Section Subtitle */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-3">
          {lang === "ar" ? "العد التنازلي لليوم المنتظر" : "LE COMPTE À REBOURS"}
        </p>

        <h2 className="text-2xl sm:text-3xl font-serif text-[#721B29] font-normal mb-8">
          {lang === "ar" ? "نعد اللحظات لمشاركتكم بهجتنا" : "En attendant ce jour mémorable"}
        </h2>

        {/* 4-Unit Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="relative p-3 sm:p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-[#C5A059]/30 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#C5A059]/70"
            >
              {/* Corner Accents */}
              <span className="absolute top-1 left-1 text-[8px] text-[#C5A059]/40">┌</span>
              <span className="absolute top-1 right-1 text-[8px] text-[#C5A059]/40">┐</span>
              <span className="absolute bottom-1 left-1 text-[8px] text-[#C5A059]/40">└</span>
              <span className="absolute bottom-1 right-1 text-[8px] text-[#C5A059]/40">┘</span>

              {/* Number Display */}
              <span className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#721B29] tabular-nums tracking-tight">
                {String(unit.value).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="text-[11px] sm:text-xs text-[#8C6D2B] mt-1 font-serif tracking-wider">
                {lang === "ar" ? unit.labelAr : unit.labelFr}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle decorative separator */}
        <div className="flex items-center justify-center gap-2 mt-8 text-[#C5A059]/50">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="text-xs">✦</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>
      </div>
    </section>
  );
};

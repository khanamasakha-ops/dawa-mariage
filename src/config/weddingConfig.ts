/**
 * Configuration Centrale de l'Invitation de Mariage
 * Central Wedding Invitation Configuration
 * 
 * Modifiez facilement toutes les informations ici pour réutiliser l'invitation pour un autre couple :
 * - Noms des mariés (Arabe & Français)
 * - Date & Heure
 * - Lieu & Adresse
 * - Lien Google Maps
 * - Numéro WhatsApp
 * - Photos
 * - Musique
 * - Textes et Traductions
 */

import heroImg from "../assets/images/wedding_hero_cinematic_1790512201711.jpg";
import swansImg from "../assets/images/wedding_swans_lake_1790509536282.jpg";
import ringsImg from "../assets/images/wedding_rings_gold_1790509547336.jpg";
import bridalImg from "../assets/images/wedding_bridal_details_1790509558289.jpg";
import venueImg from "../assets/images/wedding_venue_karadja_royal_1790513453588.jpg";

/**
 * Normalise l'URL d'une image pour assurer un affichage parfait
 * en environnement de développement comme en version publiée (production build).
 */
export function resolveImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("/src/assets/images/")) {
    return url.replace("/src/assets/images/", "/assets/images/");
  }
  return url;
}

export interface WeddingConfig {
  couple: {
    groomAr: string;
    brideAr: string;
    groomFr: string;
    brideFr: string;
    displayAr: string;
    displayFr: string;
    monogram: string;
  };
  event: {
    titleAr: string;
    titleFr: string;
    dateISO: string; // YYYY-MM-DDTHH:mm:ss for countdown
    dateFormattedAr: string;
    dateFormattedFr: string;
    time: string;
    venueName: string;
    venueAddress: string;
    city: string;
    country: string;
    googleMapsUrl: string;
    calendarSummary: string;
    calendarDescription: string;
  };
  contact: {
    whatsappNumber: string; // e.g., "213500000000" (digits only for wa.me)
    whatsappDisplay: string; // e.g., "+213657176667"
    defaultMessage: string;
  };
  quranVerse: {
    arabic: string;
    surah: string;
    french: string;
    sourceFr: string;
  };
  program: Array<{
    time: string;
    titleAr: string;
    titleFr: string;
    descriptionAr?: string;
    descriptionFr?: string;
  }>;
  photos: {
    hero: {
      url: string;
      captionAr: string;
      captionFr: string;
      alt: string;
    };
    gallery: Array<{
      id: number;
      url: string;
      titleAr: string;
      titleFr: string;
      captionAr: string;
      captionFr: string;
      alt: string;
    }>;
  };
  music: {
    title: string;
    artist: string;
    audioUrl?: string; // Optional custom MP3 URL; if omitted, built-in soft acoustic romantic harp/piano synthesizer plays
  };
  theme: {
    primaryIvory: string;
    metallicGold: string;
    burgundyAccent: string;
    textDark: string;
  };
}

export const INITIAL_WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groomAr: "محمد",
    brideAr: "خديجة",
    groomFr: "Mohamed",
    brideFr: "Khadidja",
    displayAr: "محمد & خديجة",
    displayFr: "Mohamed & Khadidja",
    monogram: "M & K",
  },
  event: {
    titleAr: "حفل الزفاف",
    titleFr: "Cérémonie de Mariage",
    dateISO: "2026-10-17T18:00:00+01:00", // Saturday, Oct 17, 2026 at 18:00 Algeria Time
    dateFormattedAr: "السبت 17 أكتوبر 2026",
    dateFormattedFr: "Samedi 17 Octobre 2026",
    time: "18:00",
    venueName: "Salle des fêtes KARADJA",
    venueAddress: "Lots KARADJA/Feden Esbê, 13000, Tlemcen, Algérie",
    city: "Tlemcen",
    country: "Algérie",
    googleMapsUrl: "https://maps.app.goo.gl/vJtkwQ4EUavVUvNJ6",
    calendarSummary: "Mariage Mohamed & Khadidja — حفل زفاف محمد وخديجة",
    calendarDescription: "Célébration du mariage de Mohamed & Khadidja à la Salle des fêtes KARADJA, Tlemcen.",
  },
  contact: {
    whatsappNumber: "213500000000", // Replace with real number
    whatsappDisplay: "+213 5 XX XX XX XX",
    defaultMessage: "Bonjour, je confirme ma présence au mariage de Mohamed & Khadidja le 17 octobre 2026.",
  },
  quranVerse: {
    arabic: "«وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»",
    surah: "سورة الروم — الآية 21",
    french: "« Et parmi Ses signes, Il a créé de vous, pour vous, des épouses afin que vous trouviez auprès d'elles le repos, et Il a établi entre vous de l'affection et de la miséricorde. »",
    sourceFr: "Sourate Ar-Rum — Verset 21",
  },
  program: [
    {
      time: "18:00",
      titleAr: "استقبال الضيوف",
      titleFr: "Accueil des invités",
      descriptionAr: "شاي بالنعناع وحلويات تلمسانية أصيلة",
      descriptionFr: "Thé à la menthe & douceurs traditionnelles",
    },
    {
      time: "19:00",
      titleAr: "بداية الحفل",
      titleFr: "Début de la cérémonie",
      descriptionAr: "دخول العروسين ومراسم الزفاف المباركة",
      descriptionFr: "Entrée des mariés et cortège nuptial",
    },
    {
      time: "20:30",
      titleAr: "العشاء",
      titleFr: "Dîner",
      descriptionAr: "عشاء فاخر على شرف الحاضرين الأفاضل",
      descriptionFr: "Dîner gastronomique raffiné",
    },
  ],
  photos: {
    hero: {
      url: heroImg,
      captionAr: "محمد & خديجة",
      captionFr: "Mohamed & Khadidja",
      alt: "Couple marié Mohamed et Khadidja célébrant leur union",
    },
    gallery: [
      {
        id: 1,
        url: swansImg,
        titleAr: "رمز الوفاء والمحبة",
        titleFr: "Symbole de Fidélité",
        captionAr: "بياض النقاء وبهاء الوداد في أفق هادئ",
        captionFr: "Deux cygnes formant un cœur sous une pluie de roses",
        alt: "Deux cygnes sur l'eau formant un cœur entourés de roses bordeaux",
      },
      {
        id: 2,
        url: ringsImg,
        titleAr: "عهد وميثاق غليظ",
        titleFr: "L'Alliance Éternelle",
        captionAr: "خواتم الذهب الخالص على حرير كريمي عاجي",
        captionFr: "Alliances en or précieux sur soie ivoire",
        alt: "Alliances de mariage en or sur soie ivoire et pétale de rose",
      },
      {
        id: 3,
        url: bridalImg,
        titleAr: "أصالة تلمسان وتفاصيل العروس",
        titleFr: "L'Élégance Nuptiale",
        captionAr: "مجوهرات ذهبية راقية ومسك أندلسي معطر",
        captionFr: "Détails raffinés, parures d'or et fleurs de jasmin",
        alt: "Détails raffinés de la mariée et bijoux en or traditionnels",
      },
      {
        id: 4,
        url: venueImg,
        titleAr: "قاعة كراجا الملكية",
        titleFr: "Salle des fêtes KARADJA",
        captionAr: "فخامة وأصالة تلتقيان في أجواء ملكية دافئة تليق بضيوفنا الكرام",
        captionFr: "Un cadre royal d'exception sublimé par des lustres étincelants et des décors raffinés",
        alt: "Photographie prestigieuse de la Salle des fêtes KARADJA à Tlemcen parée pour le mariage",
      },
    ],
  },
  music: {
    title: "Valse Nuptiale & Douceur Andalouse",
    artist: "Mélodie Classique Romantique",
    audioUrl: "", // Defaults to romantic Web Audio acoustic harmonic synth
  },
  theme: {
    primaryIvory: "#FAF7F2",
    metallicGold: "#C5A059",
    burgundyAccent: "#721B29",
    textDark: "#26211E",
  },
};

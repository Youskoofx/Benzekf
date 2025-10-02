import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";

type Lang = "fr" | "en";
type Dict = Record<string, Record<Lang, string>>;

const dict: Dict = {
  // NAV
  nav_valeur: { fr: "Valeur", en: "Value" },
  nav_galerie: { fr: "Galerie", en: "Gallery" },
  nav_formats: { fr: "Formats", en: "Formats" },
  nav_concepts: { fr: "Concepts", en: "Concepts" },
  nav_reseaux: { fr: "Réseaux", en: "Social" },
  nav_booking: { fr: "Booking", en: "Booking" },

  // HERO
  hero_title: { fr: "BENZEKF", en: "BENZEKF" },
  hero_tagline: {
    fr: "« Tout est question de mentalité »",
    en: "« It's all about mindset »",
  },
  hero_role: {
    fr: "Mannequin & Créateur de contenu",
    en: "Model & Content Creator",
  },
  cta_tiktok: { fr: "Voir TikTok", en: "View TikTok" },
  cta_instagram: { fr: "Voir Instagram", en: "View Instagram" },

  // VALEUR
  valeur_title: { fr: "Valeur", en: "Value" },
  valeur_model_title: { fr: "Mannequin", en: "Model" },
  valeur_model_desc: {
    fr: "Présence, angles, runway, éditorial.",
    en: "Presence, angles, runway, editorial.",
  },
  valeur_creator_title: { fr: "Créateur", en: "Creator" },
  valeur_creator_desc: {
    fr: "Storytelling, tournage, diffusion.",
    en: "Storytelling, production, broadcasting.",
  },
  valeur_impact_title: { fr: "Impact Marque", en: "Brand Impact" },
  valeur_impact_desc: {
    fr: "Contenus qui renforcent l'image et déclenchent l'envie.",
    en: "Content that strengthens image and triggers desire.",
  },

  // GALERIE
  gallery_title: { fr: "Galerie", en: "Gallery" },
  gallery_filter_sport: { fr: "Sport", en: "Sport" },
  gallery_filter_lifestyle: { fr: "Lifestyle", en: "Lifestyle" },
  gallery_filter_campaigns: { fr: "Campagnes", en: "Campaigns" },
  gallery_filter_runway: { fr: "Runway", en: "Runway" },

  // FORMATS
  formats_title: { fr: "Formats", en: "Formats" },
  formats_sport_title: { fr: "Sport / Performance", en: "Sport / Performance" },
  formats_sport_desc: { fr: "Énergie, intensité, dépassement.", en: "Energy, intensity, excellence." },
  formats_lifestyle_title: { fr: "Lifestyle Urbain", en: "Urban Lifestyle" },
  formats_lifestyle_desc: { fr: "Authenticité, esthétique, proximité.", en: "Authenticity, aesthetics, proximity." },
  formats_campaigns_title: { fr: "Campagnes Produit", en: "Product Campaigns" },
  formats_campaigns_desc: { fr: "Mise en valeur des produits avec force visuelle.", en: "Product enhancement with visual impact." },
  formats_shorts_title: { fr: "Formats courts", en: "Short Formats" },
  formats_shorts_desc: { fr: "Pensés pour capter et retenir l'attention.", en: "Designed to capture and retain attention." },

  // CONCEPTS
  concepts_title: { fr: "Concepts", en: "Concepts" },
  concepts_urban_title: { fr: "Urban Speed", en: "Urban Speed" },
  concepts_urban_desc: { fr: "Performance x ville", en: "Performance x city" },
  concepts_rise_title: { fr: "Rise to Greatness", en: "Rise to Greatness" },
  concepts_rise_desc: { fr: "Inspiration x dépassement", en: "Inspiration x excellence" },
  concepts_disclaimer: {
    fr: "Concepts fictifs non affiliés. Les marques citées appartiennent à leurs propriétaires.",
    en: "Fictional concepts not affiliated. Mentioned brands belong to their owners.",
  },

  // RÉSEAUX SOCIAUX
  social_title: { fr: "Réseaux Sociaux", en: "Social Media" },
  social_tiktok: { fr: "TikTok", en: "TikTok" },
  social_instagram: { fr: "Instagram", en: "Instagram" },
  social_followers: { fr: "Abonnés", en: "Followers" },

  // BOOKING
  booking_title: { fr: "Booking", en: "Booking" },
  booking_name: { fr: "Nom", en: "Name" },
  booking_email: { fr: "Email", en: "Email" },
  booking_company: { fr: "Société / Marque", en: "Company / Brand" },
  booking_project: { fr: "Type de projet", en: "Project Type" },
  booking_message: { fr: "Message", en: "Message" },
  booking_submit: { fr: "Envoyer ma demande", en: "Send my request" },
  booking_tagline: {
    fr: "Discutons de votre projet et créons un contenu iconique.",
    en: "Let's discuss your project and create iconic content.",
  },

  // FOOTER
  footer_rights: {
    fr: "© 2025 BENZEKF. Tous droits réservés.",
    en: "© 2025 BENZEKF. All rights reserved.",
  },
  footer_legal: { fr: "Mentions légales", en: "Legal Notice" },
  footer_privacy: { fr: "Politique de confidentialité", en: "Privacy Policy" },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  defaultLang = "fr",
}: PropsWithChildren<{ defaultLang?: Lang }>) {
  const [lang, setLang] = useState<Lang>(defaultLang);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageSwitch() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
      <button
        aria-label="Français"
        className={`px-3 py-1 rounded-full transition-all ${
          lang === "fr" ? "bg-white text-black" : "opacity-70 hover:opacity-100"
        }`}
        onClick={() => setLang("fr")}
      >
        FR
      </button>
      <button
        aria-label="English"
        className={`px-3 py-1 rounded-full transition-all ${
          lang === "en" ? "bg-white text-black" : "opacity-70 hover:opacity-100"
        }`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
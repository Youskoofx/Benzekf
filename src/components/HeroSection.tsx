import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: 'grayscale(100%) contrast(1.1) brightness(0.3)',
          }}
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Film grain */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 
          className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 text-white"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-0.03em'
          }}
        >
          {t("hero_title")}
        </h1>

        <p 
          className="text-3xl md:text-4xl text-gray-300 mb-6 italic"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.01em'
          }}
        >
          {t("hero_tagline")}
        </p>

        <p 
          className="text-xl md:text-2xl text-gray-400 mb-12 uppercase tracking-widest"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '0.15em'
          }}
        >
          {t("hero_role")}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://www.tiktok.com/@benzekf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-white text-black font-bold text-lg transition-all duration-300 hover:bg-gray-200 uppercase tracking-wider"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t("cta_tiktok")}
          </a>

          <a
            href="https://www.instagram.com/benzekf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg transition-all duration-300 hover:bg-white hover:text-black uppercase tracking-wider"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t("cta_instagram")}
          </a>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Taille normale avec Space Grotesk */}
          <a 
            href="#hero" 
            className="text-2xl md:text-3xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity duration-300"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif'
            }}
          >
            BENZEKF
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <a 
              href="#values" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_valeur")}
            </a>
            <a 
              href="#gallery" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_galerie")}
            </a>
            <a 
              href="#content-types" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_formats")}
            </a>
            <a 
              href="#concepts" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_concepts")}
            </a>
            <a 
              href="#stats" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_reseaux")}
            </a>
            <a 
              href="#booking" 
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t("nav_booking")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-4 border-t border-white/10 pt-6">
            <a 
              href="#values" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_valeur")}
            </a>
            <a 
              href="#gallery" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_galerie")}
            </a>
            <a 
              href="#content-types" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_formats")}
            </a>
            <a 
              href="#concepts" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_concepts")}
            </a>
            <a 
              href="#stats" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_reseaux")}
            </a>
            <a 
              href="#booking" 
              className="block text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_booking")}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
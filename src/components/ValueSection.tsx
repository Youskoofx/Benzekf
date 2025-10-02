import React, { useState, useEffect } from "react";

export default function ValueSection() {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Corpus complet de citations
  const allQuotes = [
    "La douleur partira le jour où elle aura fini de t'enseigner.",
    "Il faut savoir quitter la table quand le respect n'est plus servi.",
    "Le mensonge prend toujours l'ascenseur, mais la vérité prend l'escalier.",
    "Plus le combat est dur, plus la victoire est belle.",
    "La boussole a été inventée avant l'horloge : la direction est plus importante que le temps.",
    "J'ai longtemps attendu que ma vie change, mais j'ai compris que c'était elle qui attendait que je change.",
    "Le silence est parfois la meilleure réponse.",
    "On ne peut pas changer le vent, mais on peut ajuster les voiles.",
    "La patience est amère, mais ses fruits sont doux.",
    "Ce qui ne te tue pas te rend plus fort.",
    "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
    "Celui qui déplace une montagne commence par déplacer de petites pierres."
  ];

  // Sélectionner 5 citations aléatoires au chargement
  useEffect(() => {
    const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
    setSelectedQuotes(shuffled.slice(0, 5));
  }, []);

  // Détecter prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Effet machine à écrire
  useEffect(() => {
    if (selectedQuotes.length === 0 || prefersReducedMotion) {
      if (selectedQuotes.length > 0) {
        setDisplayedText(selectedQuotes[currentIndex]);
      }
      return;
    }

    const currentQuote = selectedQuotes[currentIndex];
    
    if (isTyping) {
      // Phase d'écriture
      if (displayedText.length < currentQuote.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1));
        }, 50); // Vitesse de frappe
        return () => clearTimeout(timeout);
      } else {
        // Phrase complète, attendre avant de passer à la suivante
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500); // Pause de 2.5s
        return () => clearTimeout(timeout);
      }
    } else {
      // Phase de disparition (fade out géré par CSS)
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentIndex((prev) => (prev + 1) % selectedQuotes.length);
        setIsTyping(true);
      }, 800); // Temps du fade out
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentIndex, selectedQuotes, prefersReducedMotion]);

  // Curseur clignotant
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="citations" 
      className="bg-black text-white py-32 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <div className="text-xs tracking-[0.4em] text-white/40 mb-3 uppercase font-light">
              — Philosophie —
            </div>
            <h2 
              className="text-5xl md:text-6xl font-bold text-white uppercase tracking-tight"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.01em'
              }}
            >
              CITATIONS
            </h2>
          </div>
        </div>

        {/* Typewriter Container */}
        {selectedQuotes.length > 0 && (
          <div className="min-h-[240px] flex items-start justify-center px-4 pt-8">
            <div className="max-w-4xl w-full">
              <p 
                className={`text-2xl md:text-3xl lg:text-4xl text-white font-light italic text-center transition-opacity duration-700 ${
                  isTyping ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.01em',
                  lineHeight: '1.6',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  margin: '0 auto'
                }}
              >
                {displayedText}
                <span 
                  className={`inline-block w-[2px] h-[0.9em] bg-white ml-1 align-middle ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.1s' }}
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
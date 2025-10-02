import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ValueSection from "./ValueSection";
import GallerySection from "./GallerySection";
import ContentTypesSection from "./ContentTypesSection";
import ConceptsSection from "./ConceptsSection";
import StatsSection from "./StatsSection";
import BookingForm from "./BookingForm";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + 3;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden">
        {/* Premium loading screen */}
        <div className="relative z-10 text-center space-y-12 px-4 w-full max-w-md">
          {/* Logo with glow */}
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.03em',
              textShadow: '0 0 40px rgba(0, 224, 164, 0.4), 0 0 80px rgba(0, 224, 164, 0.2)',
              animation: 'fadeInGlow 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              opacity: 0
            }}
          >
            BENZEKF
          </h1>

          {/* Progress bar */}
          <div 
            className="w-full max-w-xs mx-auto space-y-4"
            style={{
              animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards',
              opacity: 0
            }}
          >
            <div 
              className="text-xl font-light text-white/60"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {Math.round(progress)}%
            </div>

            <div className="relative h-0.5 bg-white/10 overflow-hidden rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-[#00E0A4] to-[#E63946] transition-all duration-300 ease-out rounded-full"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 20px rgba(0, 224, 164, 0.6)'
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInGlow {
            0% {
              opacity: 0;
              transform: translateY(20px);
              text-shadow: 0 0 0px rgba(0, 224, 164, 0);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              text-shadow: 0 0 40px rgba(0, 224, 164, 0.4), 0 0 80px rgba(0, 224, 164, 0.2);
            }
          }
          
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="bg-black text-white min-h-screen overflow-x-hidden"
      style={{
        animation: 'pageEnter 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        maxWidth: '100vw'
      }}
    >
      <Navbar />
      <HeroSection />
      <ValueSection />
      <GallerySection />
      <ContentTypesSection />
      <ConceptsSection />
      <StatsSection />
      <BookingForm />
      
      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p 
            className="text-white/40 text-xs sm:text-sm tracking-widest uppercase mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}
          >
            © 2025 BENZEKF
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <a 
              href="https://www.tiktok.com/@benzekf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-xs sm:text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.15em' }}
            >
              TikTok
            </a>
            <a 
              href="https://www.instagram.com/benzekf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-xs sm:text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.15em' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
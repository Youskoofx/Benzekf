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
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden">
        {/* Minimal loading screen */}
        <div className="relative z-10 text-center space-y-16 px-6">
          {/* Elegant logo */}
          <h1 
            className="text-9xl md:text-[14rem] font-black tracking-tight text-white"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.04em',
              animation: 'fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              opacity: 0
            }}
          >
            BENZEKF
          </h1>

          {/* Minimal progress */}
          <div 
            className="w-80 max-w-full mx-auto space-y-6"
            style={{
              animation: 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards',
              opacity: 0
            }}
          >
            <div 
              className="text-2xl font-light text-white/60"
              style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.1em' }}
            >
              {Math.round(progress)}%
            </div>

            <div className="relative h-px bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
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
      className="bg-black text-white min-h-screen"
      style={{
        animation: 'pageEnter 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
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
      
      {/* Minimal footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p 
            className="text-white/40 text-sm tracking-widest uppercase"
            style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em' }}
          >
            © 2025 BENZEKF
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <a 
              href="https://www.tiktok.com/@benzekf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}
            >
              TikTok
            </a>
            <a 
              href="https://www.instagram.com/benzekf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pageEnter {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
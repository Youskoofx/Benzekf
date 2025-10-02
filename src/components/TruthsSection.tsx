import React, { useState, useEffect, useRef } from "react";

export default function TruthsSection() {
  const [visibleTruths, setVisibleTruths] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const truths = [
    {
      text: "Plus le combat est dur, plus la victoire est belle.",
      number: "01"
    },
    {
      text: "Le mensonge prend toujours l'ascenseur, mais la vérité prend l'escalier.",
      number: "02"
    },
    {
      text: "Il faut savoir quitter la table quand le respect n'est plus servi.",
      number: "03"
    },
    {
      text: "La boussole a été inventée avant l'horloge : la direction est plus importante que le temps.",
      number: "04"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleTruths(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = sectionRef.current?.querySelectorAll('.truth-card');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="truths" 
      className="bg-black text-white py-40 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(10,10,10,1) 100%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Film strip top */}
      <div className="absolute top-0 left-0 right-0 h-6 opacity-10 pointer-events-none">
        <div className="flex h-full">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-8 h-full border-r border-white/30" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-32">
          <div className="inline-block">
            <div className="text-xs tracking-[0.5em] text-white/40 mb-4 uppercase font-light">
              — Philosophie —
            </div>
            <h2 
              className="text-7xl md:text-8xl font-black text-white uppercase tracking-tight mb-4"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 0 40px rgba(255,255,255,0.1)'
              }}
            >
              VÉRITÉS
            </h2>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>

        {/* Truths */}
        <div className="space-y-24">
          {truths.map((truth, index) => (
            <div
              key={index}
              data-index={index}
              className="truth-card relative"
              style={{
                opacity: visibleTruths.includes(index) ? 1 : 0,
                transform: visibleTruths.includes(index) ? 'translateY(0)' : 'translateY(80px)',
                transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.15}s`
              }}
            >
              {/* Giant number watermark */}
              <div 
                className="absolute -top-16 -right-8 text-[240px] font-black leading-none pointer-events-none select-none"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'rgba(255,255,255,0.015)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.02)'
                }}
              >
                {truth.number}
              </div>

              <div className="relative border-l-2 border-white/20 pl-12 py-8 group hover:border-white/40 transition-all duration-700">
                {/* Quote mark */}
                <div 
                  className="absolute -left-6 top-0 text-6xl text-white/10 font-serif"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "
                </div>

                {/* Truth text */}
                <p 
                  className="text-3xl md:text-4xl text-white/90 leading-relaxed font-light italic max-w-4xl"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.01em'
                  }}
                >
                  {truth.text.split(' ').map((word, i) => (
                    <span
                      key={i}
                      className="inline-block mr-3"
                      style={{
                        opacity: visibleTruths.includes(index) ? 1 : 0,
                        transform: visibleTruths.includes(index) ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: `${index * 0.15 + i * 0.05}s`
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </p>

                {/* Number indicator */}
                <div 
                  className="mt-8 text-xs tracking-[0.4em] text-white/30 uppercase font-light"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {truth.number} / 04
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at left, rgba(255,255,255,0.02), transparent 60%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 text-white/20">
            <div className="w-12 h-px bg-white/20" />
            <div className="text-xs tracking-[0.3em] uppercase">Fin</div>
            <div className="w-12 h-px bg-white/20" />
          </div>
        </div>
      </div>

      {/* Film strip bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 opacity-10 pointer-events-none">
        <div className="flex h-full">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-8 h-full border-r border-white/30" />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ConceptsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // 3D parallax for concept cards
      const cards = sectionRef.current.querySelectorAll('.concept-card-3d');
      cards.forEach((el, index) => {
        const depth = 20 + index * 15;
        const rotateX = yPercent * 0.8;
        const rotateY = xPercent * 0.8;
        
        (el as HTMLElement).style.transform = `
          perspective(1200px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${depth}px)
        `;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const concepts = [
    {
      title: t("concepts_urban_title"),
      description: t("concepts_urban_desc"),
      brand: "Nike Style",
      imageId: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90",
      color: "#00E0A4"
    },
    {
      title: t("concepts_rise_title"),
      description: t("concepts_rise_desc"),
      brand: "Under Armour Style",
      imageId: 2,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=90",
      color: "#E63946"
    }
  ];

  return (
    <section 
      id="concepts" 
      ref={sectionRef}
      className="bg-[#0A0A0A] text-white py-32 relative overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      {/* 3D Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-[550px] h-[550px] rounded-full opacity-12 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,224,164,0.35), transparent 70%)',
            animation: 'float3DOrb 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full opacity-12 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(230,57,70,0.35), transparent 70%)',
            animation: 'float3DOrbReverse 24s ease-in-out infinite'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div 
          className="text-center mb-20"
          style={{ transform: 'translateZ(40px)' }}
        >
          <h2 
            className="text-7xl md:text-8xl font-black mb-6 relative inline-block" 
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 45px rgba(0,224,164,0.35), 0 15px 40px rgba(0,0,0,0.9)',
              background: 'linear-gradient(to bottom, #ffffff, #a8a8a8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t("concepts_title")}
            
            {/* 3D depth layer */}
            <span 
              className="absolute inset-0 -z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,224,164,0.25), rgba(0,224,164,0.1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transform: 'translateZ(-15px)',
                filter: 'blur(4px)'
              }}
            >
              {t("concepts_title")}
            </span>
          </h2>
        </div>

        <div 
          className="grid md:grid-cols-2 gap-16 mb-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="concept-card-3d group relative"
              style={{
                transformStyle: 'preserve-3d',
                animation: `fadeInUp3DCard 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s forwards`,
                opacity: 0
              }}
            >
              {/* Concept image with 3D effects */}
              <div 
                className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 mb-8 overflow-hidden rounded-2xl relative cursor-pointer border border-white/10 transition-all duration-700"
                style={{
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1200px) rotateX(5deg) rotateY(5deg) translateZ(40px) scale(1.03)';
                  e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${concept.color}30`;
                  e.currentTarget.style.borderColor = `${concept.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(20px) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(40px) scale(1.03)`;
                }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-all duration-700"
                  style={{
                    backgroundImage: `url(${concept.image})`,
                    filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                    transform: 'translateZ(20px)'
                  }}
                />
                
                {/* Overlay gradient with 3D depth */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-700" 
                  style={{ transform: 'translateZ(10px)' }}
                />

                {/* Color reveal on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    backgroundImage: `url(${concept.image})`,
                    filter: 'grayscale(0) contrast(1.1) brightness(1.05)',
                    transform: 'translateZ(25px)'
                  }}
                />

                {/* Premium glow overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${concept.color}20, transparent 70%)`,
                    transform: 'translateZ(30px)'
                  }}
                />

                {/* Corner accents */}
                <div 
                  className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    borderColor: concept.color,
                    boxShadow: `0 0 15px ${concept.color}`,
                    transform: 'translateZ(35px)'
                  }}
                />
                <div 
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    borderColor: concept.color,
                    boxShadow: `0 0 15px ${concept.color}`,
                    transform: 'translateZ(35px)'
                  }}
                />
                <div 
                  className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    borderColor: concept.color,
                    boxShadow: `0 0 15px ${concept.color}`,
                    transform: 'translateZ(35px)'
                  }}
                />
                <div 
                  className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    borderColor: concept.color,
                    boxShadow: `0 0 15px ${concept.color}`,
                    transform: 'translateZ(35px)'
                  }}
                />
              </div>

              {/* Content with 3D depth */}
              <div 
                className="space-y-5"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 
                    className="text-3xl font-black group-hover:text-[#00E0A4] transition-colors duration-500" 
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      textShadow: '0 2px 15px rgba(0,0,0,0.8)'
                    }}
                  >
                    {concept.title}
                  </h3>
                  <span 
                    className="text-sm border px-3 py-1.5 rounded-lg transition-all duration-500"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      borderColor: concept.color,
                      color: concept.color,
                      boxShadow: `0 0 15px ${concept.color}40`
                    }}
                  >
                    {concept.brand}
                  </span>
                </div>
                <p 
                  className="text-gray-300 text-lg leading-relaxed" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 1px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  {concept.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer with 3D depth */}
        <div 
          className="text-center"
          style={{ transform: 'translateZ(25px)' }}
        >
          <p 
            className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed" 
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)'
            }}
          >
            {t("concepts_disclaimer")}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp3DCard {
          0% {
            opacity: 0;
            transform: translateY(60px) translateZ(-80px) rotateX(30deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(20px) rotateX(0deg);
          }
        }

        @keyframes float3DOrb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(35px, -35px) scale(1.12);
          }
        }

        @keyframes float3DOrbReverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-35px, 35px) scale(1.18);
          }
        }
      `}</style>
    </section>
  );
}
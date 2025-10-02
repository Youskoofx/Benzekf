import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ContentTypesSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formats = [
    {
      title: t("formats_sport_title"),
      description: t("formats_sport_desc"),
      videoId: "sport-performance",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=90",
      color: "#00E0A4"
    },
    {
      title: t("formats_lifestyle_title"),
      description: t("formats_lifestyle_desc"),
      videoId: "lifestyle-urban",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90",
      color: "#E63946"
    },
    {
      title: t("formats_campaigns_title"),
      description: t("formats_campaigns_desc"),
      videoId: "campaigns-product",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90",
      color: "#00E0A4"
    },
    {
      title: t("formats_shorts_title"),
      description: t("formats_shorts_desc"),
      videoId: "formats-shorts",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=90",
      color: "#E63946"
    }
  ];

  return (
    <section id="formats" className="bg-[#0A0A0A] text-white py-40 relative overflow-hidden">
      {/* Ultra premium 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full opacity-15 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,224,164,0.4), transparent 70%)',
            animation: 'float3DOrb 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(230,57,70,0.4), transparent 70%)',
            animation: 'float3DOrbReverse 25s ease-in-out infinite'
          }}
        />
        
        {/* 3D Grid with perspective */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,224,164,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,164,0.3) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform: 'perspective(800px) rotateX(60deg) translateZ(-200px)',
              transformOrigin: 'center center'
            }}
          />
        </div>

        {/* Premium film grain */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Ultra premium title */}
        <div className="text-center mb-24" style={{ perspective: '1200px' }}>
          <div className="inline-block relative" style={{ transformStyle: 'preserve-3d' }}>
            <h2 
              className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 relative"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textShadow: '0 0 60px rgba(0,224,164,0.4), 0 20px 50px rgba(0,0,0,0.9)',
                transform: 'translateZ(40px)',
                background: 'linear-gradient(to bottom, #ffffff, #a0a0a0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'titleFloat 8s ease-in-out infinite'
              }}
            >
              {t("formats_title")}
              
              {/* Multiple depth layers */}
              <span 
                className="absolute inset-0 -z-10"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,224,164,0.3), rgba(0,224,164,0.1))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'translateZ(-15px)',
                  filter: 'blur(4px)'
                }}
              >
                {t("formats_title")}
              </span>
              <span 
                className="absolute inset-0 -z-20"
                style={{
                  background: 'linear-gradient(to bottom, rgba(230,57,70,0.2), transparent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'translateZ(-30px)',
                  filter: 'blur(8px)'
                }}
              >
                {t("formats_title")}
              </span>
            </h2>

            {/* Animated underline */}
            <div 
              className="h-2 bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent rounded-full mx-auto"
              style={{
                width: '60%',
                boxShadow: '0 0 30px rgba(0,224,164,0.6)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Ultra premium 3D Cards Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ perspective: '2000px' }}
        >
          {formats.map((format, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                transformStyle: 'preserve-3d',
                animation: `fadeInUp3DCard 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s forwards`,
                opacity: 0
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 3D Card container with advanced effects */}
              <div
                className="relative overflow-hidden bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-white/10 rounded-3xl transition-all duration-700 cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: hoveredIndex === index 
                    ? 'translateZ(50px) rotateX(5deg) scale(1.05)' 
                    : 'translateZ(0px) rotateX(0deg) scale(1)',
                  boxShadow: hoveredIndex === index
                    ? `0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${format.color}40, inset 0 0 40px ${format.color}10`
                    : '0 15px 50px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)',
                  borderColor: hoveredIndex === index ? `${format.color}80` : 'rgba(255,255,255,0.1)'
                }}
                onMouseMove={(e) => {
                  if (hoveredIndex !== index) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 15;
                  const rotateY = (centerX - x) / 15;
                  e.currentTarget.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
              >
                {/* Video thumbnail with ultra premium effects */}
                <div 
                  className="aspect-[9/16] relative overflow-hidden"
                  style={{
                    transform: 'translateZ(30px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Image with advanced filters */}
                  <div 
                    className="w-full h-full bg-cover bg-center transition-all duration-700"
                    style={{
                      backgroundImage: `url(${format.image})`,
                      filter: hoveredIndex === index 
                        ? 'grayscale(0) contrast(1.1) brightness(1.1) saturate(1.2)' 
                        : 'grayscale(1) contrast(1.2) brightness(0.9)',
                      transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
                      willChange: 'filter, transform'
                    }}
                  />
                  
                  {/* Dynamic gradient overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-700"
                    style={{ 
                      background: hoveredIndex === index
                        ? `linear-gradient(to top, ${format.color}40, transparent 60%)`
                        : 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 60%)',
                      transform: 'translateZ(10px)'
                    }}
                  />
                  
                  {/* Ultra premium play button */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                    style={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateZ(50px) scale(1)' : 'translateZ(20px) scale(0.8)'
                    }}
                  >
                    <div 
                      className="relative"
                      style={{
                        animation: hoveredIndex === index ? 'playButtonPulse 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      {/* Outer glow ring */}
                      <div 
                        className="absolute inset-0 rounded-full blur-xl"
                        style={{
                          width: '100px',
                          height: '100px',
                          background: `radial-gradient(circle, ${format.color}, transparent 70%)`,
                          animation: 'pulse 2s ease-in-out infinite'
                        }}
                      />
                      
                      {/* Play button */}
                      <div 
                        className="relative w-24 h-24 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-300"
                        style={{
                          borderColor: format.color,
                          boxShadow: `0 0 40px ${format.color}80, 0 20px 60px rgba(0,0,0,0.8), inset 0 0 20px ${format.color}20`
                        }}
                      >
                        <div 
                          className="w-0 h-0 border-l-[20px] border-y-[14px] border-y-transparent ml-2"
                          style={{ borderLeftColor: format.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animated scan lines */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: 'translateZ(15px)'
                    }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent 0%, ${format.color}30 50%, transparent 100%)`,
                        animation: 'scanLine 2.5s linear infinite',
                        height: '30%'
                      }}
                    />
                  </div>

                  {/* Corner accents */}
                  {hoveredIndex === index && (
                    <>
                      <div 
                        className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-all duration-500"
                        style={{ 
                          borderColor: format.color,
                          boxShadow: `0 0 10px ${format.color}`
                        }}
                      />
                      <div 
                        className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-all duration-500"
                        style={{ 
                          borderColor: format.color,
                          boxShadow: `0 0 10px ${format.color}`
                        }}
                      />
                      <div 
                        className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-all duration-500"
                        style={{ 
                          borderColor: format.color,
                          boxShadow: `0 0 10px ${format.color}`
                        }}
                      />
                      <div 
                        className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-all duration-500"
                        style={{ 
                          borderColor: format.color,
                          boxShadow: `0 0 10px ${format.color}`
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Content with ultra premium styling */}
                <div 
                  className="p-8 relative"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  {/* Accent line */}
                  <div 
                    className="w-16 h-1 rounded-full mb-4 transition-all duration-500"
                    style={{
                      background: hoveredIndex === index ? format.color : 'rgba(255,255,255,0.2)',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${format.color}` : 'none'
                    }}
                  />

                  <h3 
                    className="text-3xl font-black mb-4 transition-all duration-500" 
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      textShadow: hoveredIndex === index 
                        ? `0 0 20px ${format.color}80, 0 4px 15px rgba(0,0,0,0.9)` 
                        : '0 2px 10px rgba(0,0,0,0.8)',
                      color: hoveredIndex === index ? format.color : '#ffffff'
                    }}
                  >
                    {format.title}
                  </h3>
                  <p 
                    className="text-gray-300 leading-relaxed transition-all duration-500" 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 1px 5px rgba(0,0,0,0.8)',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  >
                    {format.description}
                  </p>
                </div>

                {/* Premium glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    background: `radial-gradient(circle at 50% 0%, ${format.color}15, transparent 70%)`,
                    boxShadow: `inset 0 -150px 100px -80px ${format.color}20`
                  }}
                />

                {/* 3D edge highlights */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    boxShadow: `inset 0 0 30px ${format.color}30, inset 0 0 2px rgba(255,255,255,0.4)`
                  }}
                />

                {/* Floating particles on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: `${2 + Math.random() * 4}px`,
                          height: `${2 + Math.random() * 4}px`,
                          background: format.color,
                          boxShadow: `0 0 10px ${format.color}`,
                          animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`,
                          opacity: 0
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
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
            transform: translateY(0) translateZ(0px) rotateX(0deg);
          }
        }

        @keyframes titleFloat {
          0%, 100% {
            transform: translateZ(40px) translateY(0px);
          }
          50% {
            transform: translateZ(40px) translateY(-10px);
          }
        }

        @keyframes float3DOrb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, -40px) scale(1.15);
          }
        }

        @keyframes float3DOrbReverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 40px) scale(1.2);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }

        @keyframes playButtonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translate(20px, -50px);
            opacity: 0.8;
          }
          75% {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}
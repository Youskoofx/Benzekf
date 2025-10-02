import React, { useState, useRef, useEffect } from "react";

interface FormatCard {
  id: string;
  thumbnail: string;
  videoUrl: string;
}

export default function FormatsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [tappedCard, setTappedCard] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardMousePos, setCardMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const formats: FormatCard[] = [
    {
      id: "format-1",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: "format-2",
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: "format-3",
      thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: "format-4",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    }
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
    const video = videoRefs.current[cardId];
    if (video) {
      video.currentTime = 0;
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    }
  };

  const handleMouseLeave = (cardId: string) => {
    setHoveredCard(null);
    const video = videoRefs.current[cardId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setCardMousePos(prev => ({ ...prev, [cardId]: { x: 0, y: 0 } }));
  };

  const handleTap = (cardId: string) => {
    const video = videoRefs.current[cardId];
    if (!video) return;

    if (tappedCard === cardId) {
      // Toggle play/pause
      if (video.paused) {
        video.play().catch(() => {});
        setTappedCard(cardId);
      } else {
        video.pause();
        setTappedCard(null);
      }
    } else {
      // Start playing this card
      video.currentTime = 0;
      video.play().catch(() => {});
      setTappedCard(cardId);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    if (prefersReducedMotion) return;
    
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCardMousePos(prev => ({ ...prev, [cardId]: { x, y } }));
  };

  const getTransform = (cardId: string, isActive: boolean) => {
    if (prefersReducedMotion || !isActive) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    
    const pos = cardMousePos[cardId] || { x: 0, y: 0 };
    const rotateY = pos.x * 8;
    const rotateX = -pos.y * 8;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  return (
    <section 
      id="formats" 
      className="bg-black text-white py-32 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Title with VFX */}
        <div className="text-center mb-20 relative">
          <div className="inline-block relative">
            {/* Glow layers */}
            <h2 
              className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 relative"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: `
                  0 0 20px rgba(0, 224, 164, 0.3),
                  0 0 40px rgba(0, 224, 164, 0.2),
                  0 0 60px rgba(0, 224, 164, 0.1),
                  0 0 80px rgba(0, 224, 164, 0.05),
                  0 2px 4px rgba(0, 0, 0, 0.8)
                `,
                background: 'linear-gradient(180deg, #ffffff 0%, #00E0A4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(0, 224, 164, 0.4))',
                animation: 'titlePulse 4s ease-in-out infinite'
              }}
            >
              FORMATS
            </h2>
            
            {/* Animated underline with glow */}
            <div 
              className="w-full h-[2px] relative"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0, 224, 164, 0.8) 50%, transparent 100%)',
                boxShadow: '0 0 20px rgba(0, 224, 164, 0.6), 0 0 40px rgba(0, 224, 164, 0.3)',
                animation: 'lineGlow 3s ease-in-out infinite'
              }}
            />
            
            {/* Floating particles around title */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                    background: 'radial-gradient(circle, rgba(0, 224, 164, 0.8) 0%, transparent 70%)',
                    boxShadow: '0 0 10px rgba(0, 224, 164, 0.8)',
                    animation: `floatTitle ${2 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((format) => {
            const isActive = hoveredCard === format.id || tappedCard === format.id;
            
            return (
              <div
                key={format.id}
                ref={(el) => (cardRefs.current[format.id] = el)}
                className="group relative bg-black overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(format.id)}
                onMouseLeave={() => handleMouseLeave(format.id)}
                onMouseMove={(e) => handleMouseMove(e, format.id)}
                onClick={() => handleTap(format.id)}
                style={{ 
                  aspectRatio: '2.39/1',
                  transform: getTransform(format.id, isActive),
                  transition: isActive 
                    ? 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)' 
                    : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  willChange: 'transform',
                  boxShadow: isActive 
                    ? '0 20px 60px rgba(0, 224, 164, 0.3), 0 0 80px rgba(0, 224, 164, 0.2), inset 0 0 40px rgba(0, 224, 164, 0.1)'
                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                  border: isActive ? '1px solid rgba(0, 224, 164, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Enhanced magnetic cursor glow */}
                {isActive && !prefersReducedMotion && (
                  <div
                    className="absolute pointer-events-none z-30"
                    style={{
                      left: `${(cardMousePos[format.id]?.x || 0) * 50 + 50}%`,
                      top: `${(cardMousePos[format.id]?.y || 0) * 50 + 50}%`,
                      width: '300px',
                      height: '300px',
                      background: 'radial-gradient(circle, rgba(0, 224, 164, 0.4) 0%, rgba(0, 224, 164, 0.2) 30%, transparent 70%)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.15s ease-out',
                      mixBlendMode: 'screen',
                      filter: 'blur(20px)'
                    }}
                  />
                )}

                {/* Thumbnail with film burn effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    willChange: 'opacity'
                  }}
                >
                  <img
                    src={format.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'grayscale(100%) contrast(1.15) brightness(0.75)'
                    }}
                  />
                  
                  {/* Vignette */}
                  <div 
                    className="absolute inset-0" 
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
                    }}
                  />
                </div>

                {/* Video with enhanced VFX */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    willChange: 'opacity'
                  }}
                >
                  <video
                    ref={(el) => (videoRefs.current[format.id] = el)}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{
                      filter: isActive && !prefersReducedMotion
                        ? 'grayscale(20%) contrast(1.12) brightness(0.95) saturate(0.9)'
                        : 'grayscale(100%) contrast(1.1) brightness(0.8)',
                      transition: 'filter 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  >
                    <source src={format.videoUrl} type="video/mp4" />
                  </video>

                  {/* Enhanced bloom with color */}
                  {isActive && !prefersReducedMotion && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-screen"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(0, 224, 164, 0.15) 0%, transparent 50%)',
                        animation: 'colorPulse 3s ease-in-out infinite'
                      }}
                    />
                  )}

                  {/* Chromatic aberration simulation */}
                  {isActive && !prefersReducedMotion && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,0,0,0.015) 0%, transparent 2%, transparent 98%, rgba(0,0,255,0.015) 100%)',
                        mixBlendMode: 'screen'
                      }}
                    />
                  )}

                  {/* Scanlines */}
                  {isActive && !prefersReducedMotion && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                        opacity: 0.3
                      }}
                    />
                  )}

                  {/* Vignette */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
                    }}
                  />

                  {/* Enhanced letterbox with glow */}
                  {isActive && (
                    <>
                      <div 
                        className="absolute top-0 left-0 right-0 bg-black pointer-events-none"
                        style={{
                          height: '8%',
                          opacity: isActive ? 0.9 : 0,
                          transition: 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
                          boxShadow: '0 2px 20px rgba(0, 224, 164, 0.3)'
                        }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-black pointer-events-none"
                        style={{
                          height: '8%',
                          opacity: isActive ? 0.9 : 0,
                          transition: 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
                          boxShadow: '0 -2px 20px rgba(0, 224, 164, 0.3)'
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Enhanced particles with color */}
                {isActive && !prefersReducedMotion && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-[3px] h-[3px] rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          background: i % 3 === 0 
                            ? 'radial-gradient(circle, rgba(0, 224, 164, 0.8) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
                          boxShadow: i % 3 === 0 
                            ? '0 0 10px rgba(0, 224, 164, 0.8)'
                            : '0 0 6px rgba(255, 255, 255, 0.6)',
                          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`,
                          opacity: 0.2 + Math.random() * 0.3
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Light sweep on hover */}
                {isActive && !prefersReducedMotion && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                      transform: 'translateX(-100%)',
                      animation: 'sweep 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                    }}
                  />
                )}

                {/* Micro glitch on entry */}
                {isActive && !prefersReducedMotion && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      animation: 'glitch 0.12s steps(2) 1',
                      mixBlendMode: 'overlay'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes titlePulse {
          0%, 100% { 
            filter: drop-shadow(0 0 30px rgba(0, 224, 164, 0.4));
          }
          50% { 
            filter: drop-shadow(0 0 50px rgba(0, 224, 164, 0.6));
          }
        }

        @keyframes lineGlow {
          0%, 100% { 
            opacity: 0.6;
            box-shadow: 0 0 20px rgba(0, 224, 164, 0.6), 0 0 40px rgba(0, 224, 164, 0.3);
          }
          50% { 
            opacity: 1;
            box-shadow: 0 0 30px rgba(0, 224, 164, 0.8), 0 0 60px rgba(0, 224, 164, 0.5);
          }
        }

        @keyframes floatTitle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(5px, -10px) scale(1.2); opacity: 0.8; }
          50% { transform: translate(-3px, -20px) scale(1); opacity: 1; }
          75% { transform: translate(-8px, -10px) scale(0.8); opacity: 0.8; }
        }

        @keyframes colorPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, -30px); }
          75% { transform: translate(-15px, -15px); }
        }

        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes glitch {
          0% { transform: translate(0); opacity: 1; }
          33% { transform: translate(-2px, 2px); opacity: 0.8; }
          66% { transform: translate(2px, -2px); opacity: 0.9; }
          100% { transform: translate(0); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: opacity 0.3s ease !important;
          }
        }
      `}</style>
    </section>
  );
}
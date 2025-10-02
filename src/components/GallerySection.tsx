import React, { useState, useRef, useEffect } from "react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!galleryRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // 3D parallax for gallery items
      const galleryItems = galleryRef.current.querySelectorAll('.gallery-3d');
      galleryItems.forEach((el, index) => {
        const depth = 10 + (index % 4) * 5;
        const rotateX = yPercent * 0.5;
        const rotateY = xPercent * 0.5;
        
        (el as HTMLElement).style.transform = `
          perspective(800px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${depth}px)
        `;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filters = [
    { key: "all", label: "Tout" },
    { key: "sport", label: "Sport" },
    { key: "lifestyle", label: "Lifestyle" },
    { key: "campaigns", label: "Campagnes" },
    { key: "runway", label: "Runway" },
  ];

  // Images de campagne premium haute qualité
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90",
      category: "sport",
      title: "Performance Elite",
      subtitle: "Nike Training Series",
      photographer: "Studio Elite"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=90",
      category: "campaigns",
      title: "Urban Legend",
      subtitle: "Adidas Originals",
      photographer: "Street Vision"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90",
      category: "lifestyle",
      title: "Modern Icon",
      subtitle: "Calvin Klein Campaign",
      photographer: "Fashion Elite"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=90",
      category: "runway",
      title: "Haute Couture",
      subtitle: "Paris Fashion Week",
      photographer: "Runway Master"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=800&q=90",
      category: "sport",
      title: "Beast Mode",
      subtitle: "Under Armour Elite",
      photographer: "Power Studio"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=90",
      category: "lifestyle",
      title: "Gentleman",
      subtitle: "Hugo Boss Campaign",
      photographer: "Luxury Vision"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=90",
      category: "campaigns",
      title: "Timeless",
      subtitle: "Rolex Ambassador",
      photographer: "Premium Studio"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=90",
      category: "runway",
      title: "Avant-Garde",
      subtitle: "Milan Fashion Week",
      photographer: "Couture Pro"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=90",
      category: "lifestyle",
      title: "Urban King",
      subtitle: "Supreme Collaboration",
      photographer: "Street Elite"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=90",
      category: "campaigns",
      title: "Power Move",
      subtitle: "Jordan Brand",
      photographer: "Athletic Vision"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&q=90",
      category: "sport",
      title: "Champion",
      subtitle: "Puma Performance",
      photographer: "Victory Studio"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=800&q=90",
      category: "runway",
      title: "Elegance",
      subtitle: "Armani Collection",
      photographer: "Luxury Master"
    }
  ];

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <section 
      id="gallery" 
      ref={galleryRef}
      className="bg-black text-white py-32 relative"
      style={{ perspective: '1200px' }}
    >
      {/* Ultra clean film grain */}
      <div className="absolute inset-0 opacity-8 pointer-events-none mix-blend-overlay">
        <div 
          className="w-full h-full opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E0A4]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div style={{ transform: 'translateZ(25px)' }} className="space-y-4">
            <h2 
              className="text-7xl md:text-8xl font-black mb-4 tracking-tight" 
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textShadow: '0 0 30px rgba(0,224,164,0.25), 0 10px 30px rgba(0,0,0,0.9)',
                background: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              GALERIE
            </h2>
            <p 
              className="text-2xl text-gray-400 font-light" 
              style={{ 
                fontFamily: 'Inter, sans-serif',
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))'
              }}
            >
              Campagnes & collaborations premium
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4" style={{ transform: 'translateZ(20px)' }}>
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`group relative px-8 py-4 border-2 transition-all duration-400 magnetic-btn overflow-hidden ${
                  activeFilter === filter.key
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white/50"
                }`}
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  boxShadow: activeFilter === filter.key 
                    ? '0 0 25px rgba(255,255,255,0.4), 0 8px 25px rgba(0,0,0,0.5)'
                    : '0 0 15px rgba(255,255,255,0.05)'
                }}
              >
                <span className="relative z-10">{filter.label}</span>
                {activeFilter !== filter.key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4]/10 to-[#E63946]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ultra Premium NB → Color Gallery */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {filteredImages.map((image, index) => (
            <figure 
              key={image.id}
              tabIndex={0}
              className="photo-container gallery-3d group relative overflow-hidden bg-black cursor-pointer rounded-2xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#00E0A4]/50"
              style={{
                aspectRatio: '4/5',
                animationDelay: `${index * 0.05}s`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Perfect NB → Color Image with CSS classes */}
              <img
                src={image.src}
                alt={image.title}
                className="photo w-full h-full object-cover grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.02] group-focus:grayscale-0 group-focus:contrast-100 group-focus:scale-[1.02] transition-all duration-[400ms] ease-out"
                style={{
                  willChange: 'filter, transform',
                }}
              />

              {/* Premium depth overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-[400ms]"
                style={{ transform: 'translateZ(5px)' }}
              />

              {/* Cinematic caption - slides up on hover/focus */}
              <figcaption 
                className="absolute bottom-0 left-0 right-0 p-8 text-white opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 transition-all duration-[300ms] ease-out"
                style={{ 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="space-y-2">
                  <h3 
                    className="text-xl font-black mb-2" 
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      textShadow: '0 0 15px rgba(0,224,164,0.4), 0 2px 10px rgba(0,0,0,0.8)'
                    }}
                  >
                    {image.title}
                  </h3>
                  <p 
                    className="text-base text-gray-200 mb-1" 
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {image.subtitle}
                  </p>
                  <p 
                    className="text-sm text-gray-400" 
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {image.photographer}
                  </p>
                </div>
              </figcaption>

              {/* Premium hover glow with shadow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-[400ms] pointer-events-none rounded-2xl" 
                style={{
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3), 0 0 30px rgba(0,224,164,0.08)',
                }} 
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
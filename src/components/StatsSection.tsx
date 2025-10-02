import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { 
      value: 500000, 
      label: t("social_followers"),
      suffix: "+",
      platform: "Total",
      icon: "👥"
    },
    { 
      value: 350000, 
      label: "TikTok",
      suffix: "+",
      platform: "TikTok",
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    { 
      value: 150000, 
      label: "Instagram",
      suffix: "+",
      platform: "Instagram",
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasAnimated, value]);

    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${Math.floor(num / 1000)}K`;
      return num.toString();
    };

    return (
      <span>
        {formatNumber(count)}
        {suffix}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="stats" 
      className="bg-black text-white py-32 relative overflow-hidden border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 
            className="text-5xl md:text-6xl font-black mb-6 text-white"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em'
            }}
          >
            {t("social_title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-10 bg-black rounded-lg border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              style={{
                animation: hasAnimated ? `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s forwards` : 'none',
                opacity: hasAnimated ? 1 : 0
              }}
            >
              {/* Icon */}
              <div className="text-white/60 mb-6">
                {typeof stat.icon === 'string' ? (
                  <div className="text-5xl text-center">{stat.icon}</div>
                ) : (
                  stat.icon
                )}
              </div>

              {/* Counter */}
              <div 
                className="text-6xl md:text-7xl font-black mb-4 text-white text-center"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '-0.03em'
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p 
                className="text-lg text-white/60 font-light text-center uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {stat.label}
              </p>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 70%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Premium Booking CTA */}
        <div className="text-center mt-20">
          <a
            href="#booking"
            className="inline-block px-16 py-5 bg-transparent border border-white/30 text-white font-light text-lg transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] uppercase tracking-[0.25em] group relative overflow-hidden"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            <span className="relative z-10">{t("booking_title")}</span>
            
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)'
              }}
            />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
import React, { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Enhanced trail with 3D depth
      setTrail(prev => {
        const newTrail = [newPosition, ...prev.slice(0, 12)];
        return newTrail;
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target && (
        target.tagName === 'IMG' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.classList.contains('photo-container') ||
        target.classList.contains('magnetic-btn') ||
        target.classList.contains('gallery-3d')
      )) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target && (
        target.tagName === 'IMG' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.classList.contains('photo-container') ||
        target.classList.contains('magnetic-btn') ||
        target.classList.contains('gallery-3d')
      )) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main 3D cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isHovering ? 1.8 : 1}) translateZ(100px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="w-6 h-6 bg-white rounded-full opacity-90"
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(0,224,164,0.3)'
              : '0 0 10px rgba(255,255,255,0.3)',
            transition: 'box-shadow 0.3s ease-out',
          }}
        />
      </div>

      {/* Enhanced 3D outer ring */}
      <div
        className="fixed pointer-events-none z-[9998] border-2 border-white/40 rounded-full mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          width: isHovering ? '80px' : '50px',
          height: isHovering ? '80px' : '50px',
          opacity: isHovering ? 0.9 : 0.5,
          transform: `translateZ(80px) ${isHovering ? 'rotateZ(45deg)' : 'rotateZ(0deg)'}`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovering 
            ? '0 0 30px rgba(255,255,255,0.3), inset 0 0 20px rgba(0,224,164,0.2)'
            : '0 0 15px rgba(255,255,255,0.1)',
        }}
      />

      {/* 3D particle trail */}
      {trail.map((position, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9997] rounded-full mix-blend-screen transition-all duration-100 ease-out"
          style={{
            left: position.x - 3,
            top: position.y - 3,
            width: `${6 - index * 0.4}px`,
            height: `${6 - index * 0.4}px`,
            opacity: (1 - index * 0.08) * 0.7,
            transform: `translateZ(${60 - index * 4}px) scale(${1 - index * 0.05})`,
            transformStyle: 'preserve-3d',
            background: index % 3 === 0 
              ? 'rgba(0,224,164,0.8)' 
              : index % 3 === 1 
                ? 'rgba(255,255,255,0.8)' 
                : 'rgba(230,57,70,0.6)',
            boxShadow: `0 0 ${8 - index}px currentColor`,
          }}
        />
      ))}

      {/* Enhanced 3D hover halo */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9996] rounded-full transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 60,
            top: mousePosition.y - 60,
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(0,224,164,0.15) 0%, rgba(255,255,255,0.08) 40%, rgba(230,57,70,0.05) 70%, transparent 90%)',
            transform: 'translateZ(60px) scale(1.2)',
            transformStyle: 'preserve-3d',
            animation: 'pulse 2s infinite, rotate 8s linear infinite',
            filter: 'blur(15px)',
          }}
        />
      )}

      {/* Magnetic field visualization */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9995] rounded-full border border-white/10 transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: '200px',
            height: '200px',
            transform: 'translateZ(40px) rotateX(10deg) rotateY(10deg)',
            transformStyle: 'preserve-3d',
            animation: 'spin 12s linear infinite reverse',
            background: 'conic-gradient(from 0deg, transparent, rgba(0,224,164,0.05), transparent, rgba(230,57,70,0.05), transparent)',
          }}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translateZ(60px) scale(1.2); }
          50% { opacity: 0.9; transform: translateZ(60px) scale(1.4); }
        }
        
        @keyframes rotate {
          from { transform: translateZ(60px) scale(1.2) rotate(0deg); }
          to { transform: translateZ(60px) scale(1.2) rotate(360deg); }
        }
        
        @keyframes spin {
          from { transform: translateZ(40px) rotateX(10deg) rotateY(10deg) rotateZ(0deg); }
          to { transform: translateZ(40px) rotateX(10deg) rotateY(10deg) rotateZ(360deg); }
        }
      `}</style>
    </>
  );
}
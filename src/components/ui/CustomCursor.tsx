"use client";

import { useEffect, useState } from "react";

const AdvancedUFO = ({ className }: { className?: string }) => (
  <svg
    viewBox="-10 -10 120 120"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Holographic Scanner Beam */}
      <linearGradient id="holoBeam" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
      </linearGradient>
      
      {/* Stealth Metal Gradient */}
      <linearGradient id="stealthMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="40%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>

      {/* Intense Cyan Glow Filter */}
      <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Scanner Beam with Grid Lines */}
    <g className="animate-pulse">
      <path d="M 45 58 L 15 110 L 85 110 L 55 58 Z" fill="url(#holoBeam)" />
      <path d="M 35 75 L 65 75 M 28 88 L 72 88 M 20 100 L 80 100" stroke="#BAE6FD" strokeWidth="0.5" opacity="0.6" />
    </g>

    {/* Stealth UFO Main Body (Angular Disk) */}
    <path 
      d="M 5 50 L 30 40 L 70 40 L 95 50 L 70 58 L 30 58 Z" 
      fill="url(#stealthMetal)" 
      stroke="#64748B" 
      strokeWidth="1.5"
    />

    {/* Top Glass Cockpit / Reactor Core */}
    <path 
      d="M 35 40 C 35 15 65 15 65 40 Z" 
      fill="#0284C7" 
      opacity="0.9" 
    />
    <path 
      d="M 35 40 C 35 15 65 15 65 40 Z" 
      fill="none" 
      stroke="#38BDF8" 
      strokeWidth="2" 
      filter="url(#cyanGlow)"
    />
    
    {/* Inner Core Energy Sphere */}
    <circle cx="50" cy="32" r="6" fill="#FFFFFF" filter="url(#cyanGlow)" className="animate-pulse" />

    {/* Thrusters / Engines on the bottom */}
    <path d="M 40 58 L 45 68 L 55 68 L 60 58 Z" fill="#0F172A" stroke="#0EA5E9" strokeWidth="1.5" filter="url(#cyanGlow)" />
    <circle cx="50" cy="65" r="3.5" fill="#FFFFFF" filter="url(#cyanGlow)" />

    {/* Neon Cyber-Accents on Wings */}
    <path d="M 15 50 L 35 48" stroke="#38BDF8" strokeWidth="2.5" filter="url(#cyanGlow)" />
    <path d="M 85 50 L 65 48" stroke="#38BDF8" strokeWidth="2.5" filter="url(#cyanGlow)" />
    
    {/* Blinking Wingtip Threat Lights */}
    <circle cx="10" cy="50" r="2" fill="#EF4444" className="animate-ping" />
    <circle cx="90" cy="50" r="2" fill="#EF4444" className="animate-ping" style={{ animationDelay: '500ms' }} />
  </svg>
);

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <style>{`
        @keyframes ufoHover {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        .animate-ufo-hover {
          animation: ufoHover 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Hover Animation Wrapper */}
      <div className="absolute top-0 left-0 animate-ufo-hover">
        {/* Interaction Scale & Rotate Wrapper */}
        <div 
          className={`transition-all duration-200 ease-out ${
            isPointer ? "scale-[1.3] -rotate-[15deg] drop-shadow-[0_0_25px_rgba(14,165,233,0.8)]" : "scale-100 rotate-0 drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]"
          }`}
        >
          <AdvancedUFO className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
}

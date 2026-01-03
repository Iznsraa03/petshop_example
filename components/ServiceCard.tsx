'use client';

import { ReactNode, useState, useRef } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ServiceCard = ({
  icon,
  title,
  description,
}: ServiceCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-64 rounded-2xl bg-white border-2 border-petshop-secondary overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-glow-lg"
    >
      {/* Spotlight Glow Effect */}
      {isHovering && (
        <div
          className="absolute w-40 h-40 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 140, 66, 0.3) 0%, transparent 70%)',
            left: `${mousePosition.x - 80}px`,
            top: `${mousePosition.y - 80}px`,
            transition: 'all 0.1s ease-out',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-petshop-dark mb-3">{title}</h3>
        <p className="text-petshop-dark/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-petshop-primary via-petshop-secondary to-petshop-primary transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-0" />
    </div>
  );
};

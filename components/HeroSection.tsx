'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Sparkles, ShieldCheck, Star, Zap } from 'lucide-react';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

export const HeroSection = () => {
  const headline = 'Sahabat Terbaik untuk Anabul Anda';

  // Split once (avoid doing split/map work on every render)
  const headlineChars = useMemo(() => headline.split(''), [headline]);

  // Refs to avoid React re-render on every mouse move
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Disable heavy hover effect on low-power scenarios
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Respect reduced motion + avoid running on touch devices
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    setIsInteractive(!prefersReduced && !isCoarse);
  }, []);

  const computeCenters = () => {
    centersRef.current = lettersRef.current
      .map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      })
      .filter(Boolean) as { x: number; y: number }[];
  };

  useEffect(() => {
    // Ensure refs array matches length (stability)
    lettersRef.current.length = headlineChars.length;

    // Compute positions once after mount
    computeCenters();

    const onResize = () => computeCenters();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [headlineChars.length]);

  useEffect(() => {
    if (!isInteractive) return;

    let needsFrame = false;

    const update = () => {
      needsFrame = false;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // Update DOM directly: no React state updates
      for (let i = 0; i < lettersRef.current.length; i++) {
        const el = lettersRef.current[i];
        const c = centersRef.current[i];
        if (!el || !c) continue;

        const dx = px - c.x;
        const dy = py - c.y;
        const dist = Math.hypot(dx, dy);

        // Pressure: 0..1
        const p = Math.max(0, 1 - dist / 260);

        // Lighter transforms
        const scale = 1 + p * 0.18;
        const y = -p * 6;

        // Apply transform
        el.style.transform = `translateY(${y}px) scale(${scale})`;

        // Only adjust gradient when p is meaningful (reduce style writes)
        if (p > 0.02) {
          const pct = Math.min(100, Math.floor(p * 100));
          el.style.backgroundImage = `linear-gradient(135deg, #FF8C42 ${pct}%, #FFD151 100%)`;
          el.style.webkitTextFillColor = 'transparent';
        } else {
          el.style.backgroundImage = `linear-gradient(135deg, #FFFFFF 0%, #FFD151 100%)`;
          el.style.webkitTextFillColor = 'white';
        }
      }
    };

    const requestTick = () => {
      if (needsFrame) return;
      needsFrame = true;
      rafRef.current = window.requestAnimationFrame(update);
    };

    const onMove = (e: MouseEvent) => {
      // If centers not ready yet, compute once (e.g., after fonts/layout settle)
      if (centersRef.current.length === 0) computeCenters();

      pointerRef.current = { x: e.clientX, y: e.clientY };
      requestTick();
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInteractive]);

  const whatsappMessage = buildWhatsAppMessage({
    service: 'Reservasi / Tanya Harga',
  });

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Global background handled by <SiteBackground /> in layout */}
      <div className="absolute inset-0">
        {/* Dark overlay for hero readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/35 to-black/20" />

        {/* Playful blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-petshop-primary/30 blur-3xl" />
        <div className="absolute top-32 -right-24 h-72 w-72 rounded-full bg-petshop-accent/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-petshop-secondary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="max-w-3xl">
        {/* Headline (lightweight) */}
        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          {headlineChars.map((char, index) => (
            <span
              key={index}
              className="pressure-letter inline-block will-change-transform"
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              style={{
                // Base styles; interactive effect updates these via RAF (no rerender)
                backgroundImage: `linear-gradient(135deg, #FFFFFF 0%, #FFD151 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'white',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium leading-relaxed">
          Grooming, Pet Hotel, dan Vaksinasi dengan tim berpengalaman. Nyaman, bersih, dan bikin anabul makin happy.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white/90 text-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Higienis & Aman
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white/90 text-sm backdrop-blur">
            <Star className="h-4 w-4 fill-white" />
            Rating 4.9/5
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white/90 text-sm backdrop-blur">
            <Zap className="h-4 w-4" />
            Respon Cepat via WA
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-petshop-primary to-petshop-accent text-white rounded-2xl font-extrabold text-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Chat WhatsApp
            <Sparkles className="w-5 h-5 opacity-90" />
          </a>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 border border-white/25 text-white hover:bg-white/15 transition-all duration-300"
          >
            Lihat Layanan
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* Mini benefits */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Grooming Premium', desc: 'Bulunya kinclong, wangi, dan rapi.' },
            { title: 'Pet Hotel', desc: 'Nyaman, aman, dan diawasi 24/7.' },
            { title: 'Vaksinasi', desc: 'Jadwal rapi, dokter berpengalaman.' },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white/10 border border-white/20 p-4 text-white/90 backdrop-blur"
            >
              <p className="font-bold">{b.title}</p>
              <p className="text-sm text-white/80">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

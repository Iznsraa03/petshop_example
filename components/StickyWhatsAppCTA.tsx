'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

export const StickyWhatsAppCTA = () => {
  const message = buildWhatsAppMessage({
    service: 'Konsultasi & Reservasi',
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      {/* gradient glow backdrop */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-petshop-background to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/30 bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-petshop-dark truncate">
              Mau booking cepat?
            </p>
            <p className="text-xs text-petshop-dark/70 truncate">
              Chat kami via WhatsApp, respon cepat.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-petshop-primary to-petshop-accent px-4 py-2 text-white font-bold shadow-glow hover:shadow-glow-lg active:scale-95 transition"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">WhatsApp</span>
            <Sparkles className="h-4 w-4 opacity-90" />
          </a>
        </div>
      </div>
    </div>
  );
};

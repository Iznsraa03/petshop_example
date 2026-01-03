'use client';

import { useEffect, useState } from 'react';
import { Scissors, Hotel, Syringe } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCard } from '@/components/ServiceCard';
import { Gallery } from '@/components/Gallery';
import { MusicPlayer } from '@/components/MusicPlayer';
import { StickyWhatsAppCTA } from '@/components/StickyWhatsAppCTA';
import { LocationSection } from '@/components/LocationSection';
import { ReservationSection } from '@/components/ReservationSection';
import { fetchUnsplashImages } from '@/lib/unsplash';

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        // Try fetching from multiple keywords for variety
        const keywords = ['cute pets', 'cat salon', 'dog spa'];
        const imagePromises = keywords.map((keyword) =>
          fetchUnsplashImages(keyword, 2)
        );
        const results = await Promise.all(imagePromises);
        const allImages = results.flat().slice(0, 6);
        setGalleryImages(allImages);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
        setGalleryImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const services = [
    {
      icon: <Scissors className="w-16 h-16 text-petshop-primary" />,
      title: 'Grooming Premium',
      description:
        'Perawatan bulu profesional dengan produk organik untuk membuat hewan peliharaan Anda terlihat menawan.',
    },
    {
      icon: <Hotel className="w-16 h-16 text-petshop-primary" />,
      title: 'Pet Hotel',
      description:
        'Penginapan mewah dengan pengawasan 24/7. Ruangan ber-AC, makanan premium, dan aktivitas seru.',
    },
    {
      icon: <Syringe className="w-16 h-16 text-petshop-primary" />,
      title: 'Vaksinasi & Check-up',
      description:
        'Layanan medis lengkap dengan dokter hewan berpengalaman untuk kesehatan optimal hewan peliharaan.',
    },
  ];

  return (
    <main className="bg-petshop-background overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-petshop-dark mb-4">
              Layanan Kami
            </h2>
            <p className="text-xl text-petshop-dark/70">
              Solusi lengkap untuk kesejahteraan hewan peliharaan Anda
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery images={galleryImages} />

      {/* Location Section */}
      <LocationSection />

      {/* Reservation Section */}
      <ReservationSection />

      {/* Footer */}
      <footer className="bg-petshop-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">PetCare</h3>
              <p className="text-white/70">
                Sahabat terpercaya untuk kesehatan dan kebahagiaan hewan peliharaan Anda.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#services" className="hover:text-petshop-primary transition-colors">
                    Layanan
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-petshop-primary transition-colors">
                    Galeri
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-petshop-primary transition-colors">
                    Tentang Kami
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Layanan</h4>
              <ul className="space-y-2 text-white/70">
                <li>Grooming</li>
                <li>Pet Hotel</li>
                <li>Vaksinasi</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-white/70">
                <li>📞 +62 XXX-XXXX-XXXX</li>
                <li>📧 info@petcare.id</li>
                <li>📍 Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70">
                © 2024 PetCare. Semua hak dilindungi.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-white/70 hover:text-petshop-primary transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-white/70 hover:text-petshop-primary transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-white/70 hover:text-petshop-primary transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA (mobile) */}
      <StickyWhatsAppCTA />

      {/* Music Player */}
      <MusicPlayer />
    </main>
  );
}

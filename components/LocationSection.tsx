'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const LocationSection = () => {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-petshop-dark mb-4">
            Kunjungi Kami
          </h2>
          <p className="text-xl text-petshop-dark/70">
            Lokasi kami yang nyaman dan mudah diakses untuk Anda dan sahabat berbulu Anda
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322259!2d106.8162!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b5d%3A0x0!2z0KHQvdC-0YjQvdCw!5e0!3m2!1sru!2sru!4v1234567890"
              title="PetCare Location"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-gradient-to-br from-petshop-primary/10 to-petshop-secondary/10 p-8 rounded-2xl border-2 border-petshop-secondary hover:shadow-glow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin className="w-8 h-8 text-petshop-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-petshop-dark mb-2">
                    Alamat Kami
                  </h3>
                  <p className="text-petshop-dark/70 mb-1">
                    Jalan Hewan Peliharaan No. 123
                  </p>
                  <p className="text-petshop-dark/70">
                    Jakarta Selatan, Indonesia 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-petshop-accent/10 to-petshop-secondary/10 p-8 rounded-2xl border-2 border-petshop-secondary hover:shadow-glow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Phone className="w-8 h-8 text-petshop-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-petshop-dark mb-2">
                    Telepon
                  </h3>
                  <a
                    href="tel:+62812345678"
                    className="text-petshop-primary font-semibold hover:underline"
                  >
                    +62 (812) 345-678
                  </a>
                  <p className="text-petshop-dark/70 mt-1">
                    Hubungi kami untuk informasi lebih lanjut
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-petshop-primary/10 to-petshop-secondary/10 p-8 rounded-2xl border-2 border-petshop-secondary hover:shadow-glow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Mail className="w-8 h-8 text-petshop-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-petshop-dark mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@petcare.id"
                    className="text-petshop-primary font-semibold hover:underline"
                  >
                    info@petcare.id
                  </a>
                  <p className="text-petshop-dark/70 mt-1">
                    Kami akan merespon dalam 24 jam
                  </p>
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-gradient-to-br from-petshop-accent/10 to-petshop-secondary/10 p-8 rounded-2xl border-2 border-petshop-secondary hover:shadow-glow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Clock className="w-8 h-8 text-petshop-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-petshop-dark mb-3">
                    Jam Operasional
                  </h3>
                  <div className="space-y-1 text-petshop-dark/70">
                    <div className="flex justify-between">
                      <span>Senin - Jumat:</span>
                      <span className="font-semibold">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu:</span>
                      <span className="font-semibold">09:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu:</span>
                      <span className="font-semibold">10:00 - 16:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-petshop-dark/70 mb-8">
            Siap membawa sahabat berbulu Anda ke kami?
          </p>
          <a
            href="#reservation"
            className="inline-block px-10 py-4 bg-gradient-to-r from-petshop-primary to-petshop-accent text-white rounded-2xl font-bold text-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Buat Reservasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

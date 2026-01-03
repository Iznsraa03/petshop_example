'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const placeholderImages = [
    'https://images.unsplash.com/photo-1633722715463-d30628fed6a9?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1608848461950-0fed8e50d6d6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1575938120142-83ff8b3d5899?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1601758228614-c9f27e1b5d1e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop',
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;

  return (
    <section id="gallery" className="py-20 bg-petshop-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-petshop-dark mb-4">
            Galeri Mereka
          </h2>
          <p className="text-xl text-petshop-dark/70">
            Lihat koleksi foto hewan peliharaan yang telah kami rawat dengan penuh kasih sayang
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="text-white">
                  <p className="font-bold text-lg">Sahabat Istimewa Kami</p>
                  <p className="text-sm text-white/70">Perawatan Premium</p>
                </div>
              </div>

              {/* Border Gradient */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-petshop-primary to-petshop-secondary bg-clip-border rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

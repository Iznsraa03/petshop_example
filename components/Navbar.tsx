'use client';

import { PawPrint } from 'lucide-react';

export const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-white/40 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-petshop-primary to-petshop-accent rounded-full flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-petshop-primary to-petshop-accent bg-clip-text text-transparent">
            PetCare
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-petshop-dark hover:text-petshop-primary transition-colors font-medium"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-petshop-dark hover:text-petshop-primary transition-colors font-medium"
          >
            Gallery
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-petshop-primary to-petshop-accent text-white rounded-2xl font-semibold hover:shadow-glow-lg transition-all duration-300 hover:scale-105">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors">
          <svg
            className="w-6 h-6 text-petshop-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

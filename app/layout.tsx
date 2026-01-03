import type { Metadata } from 'next';
import BubbleMenu from '@/components/BubbleMenu';
import { SiteBackground } from '@/components/SiteBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetCare - Sahabat Terbaik untuk Anabul Anda',
  description:
    'Layanan perawatan hewan peliharaan premium dengan grooming, pet hotel, dan vaksinasi profesional.',
  keywords: ['petshop', 'grooming', 'pet hotel', 'vaksinasi', 'hewan peliharaan'],
  openGraph: {
    title: 'PetCare - Sahabat Terbaik untuk Anabul Anda',
    description: 'Layanan perawatan hewan peliharaan premium',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-transparent">
        <SiteBackground />
        <BubbleMenu
          logo={<span style={{ fontWeight: 700, fontSize: '20px', color: '#FF8C42' }}>🐾 PetCare</span>}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  'https://www.epsemaq.com.pe/slides/01K75RNQS1RF6NMW4H0HKXGR92.jpg',
  'https://www.epsemaq.com.pe/slides/01K762XAGBW99VC94RBFBXF24C.jpg',
  'https://www.epsemaq.com.pe/slides/01K75RK68CF8MA2XGAVC3MEY2F.jpg',
];

export default function BackgroundSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length);
        setNext(c => (c + 1) % SLIDES.length);
        setFading(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Imagen actual */}
      <div
        className="fixed inset-0 -z-10 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${SLIDES[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: fading ? 0 : 1,
        }}
      />
      {/* Imagen siguiente (pre-cargada detrás) */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: `url(${SLIDES[next]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {children}
    </div>
  );
}

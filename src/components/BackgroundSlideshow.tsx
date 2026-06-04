'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Slide = {
  img: string;
  title: string;
  highlight?: string;
  subtitle: string;
};

export const SLIDES: Slide[] = [
  {
    img: '/images/slide-01.jpg',
    title: 'Mejorando Nuestros Servicios',
    subtitle: 'Atención de Emergencias para garantizar el servicio de agua.',
  },
  {
    img: '/images/slide-02.jpg',
    title: 'Cerca de la gente',
    subtitle: 'Campañas de sensibilización y atención al ciudadano.',
  },
  {
    img: '/images/slide-03.jpg',
    title: 'Control de calidad',
    subtitle: 'Análisis permanente del agua para tu seguridad.',
  },
  {
    img: '/images/slide-04.jpg',
    title: 'Alianzas estratégicas',
    subtitle: 'Colaboración con instituciones para mejorar el servicio de agua.',
  },
  {
    img: '/images/slide-05.jpg',
    title: 'Mejorando Nuestros Servicios',
    subtitle: 'Atención de Emergencias para garantizar el servicio de agua.',
  },
  {
    img: '/images/slide-06.jpg',
    title: 'Cerca de la gente',
    subtitle: 'Campañas de sensibilización y atención al ciudadano.',
  },
  {
    img: '/images/slide-07.jpg',
    title: 'Control de calidad',
    subtitle: 'Análisis permanente del agua para tu seguridad.',
  },
];

export const SlideshowContext = createContext<{
  current: number;
  fading: boolean;
  goTo: (index: number) => void;
}>({
  current: 0,
  fading: false,
  goTo: () => {},
});

export function useSlideshowContext() {
  return useContext(SlideshowContext);
}

export default function BackgroundSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length);
        setFading(false);
      }, 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  function goTo(index: number) {
    const target = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
    if (target === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(target);
      setFading(false);
    }, 600);
  }

  const next = (current + 1) % SLIDES.length;
  const animationName = current % 2 === 0 ? 'kenburns-in' : 'kenburns-out';

  return (
    <SlideshowContext.Provider value={{ current, fading, goTo }}>
      <div className="relative min-h-screen">
        {/* Imagen siguiente (detrás, estática) */}
        <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${SLIDES[next].img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        </div>

        {/* Imagen actual con efecto Ken Burns */}
        <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div
            key={current}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${SLIDES[current].img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: fading ? 0 : 1,
              transition: 'opacity 1s ease',
              animation: `${animationName} 7s ease-out forwards`,
            }}
          />
        </div>

        {/* Contenido */}
        <div className="relative" style={{ zIndex: 3 }}>
          {children}
        </div>
      </div>
    </SlideshowContext.Provider>
  );
}

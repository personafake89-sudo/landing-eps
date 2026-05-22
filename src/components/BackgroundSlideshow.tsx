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
    img: 'https://www.epsemaq.com.pe/slides/01K75RNQS1RF6NMW4H0HKXGR92.jpg',
    title: 'Mejorando Nuestros Servicios',
    subtitle: 'Atención de Emergencias para garantizar el servicio de agua.',
  },
  {
    img: 'https://www.epsemaq.com.pe/slides/01K762XAGBW99VC94RBFBXF24C.jpg',
    title: 'Cerca de la gente',
    subtitle: 'Campañas de sensibilización y atención al ciudadano.',
  },
  {
    img: 'https://www.epsemaq.com.pe/slides/01K75RK68CF8MA2XGAVC3MEY2F.jpg',
    title: 'Control de calidad',
    subtitle: 'Análisis permanente del agua para tu seguridad.',
  },
  {
    img: 'https://epsemaq.com.pe/uploads/1779121866996-pstrgh.jpg',
    title: 'Alianzas estratégicas',
    subtitle: 'Colaboración con instituciones para mejorar el servicio de agua.',
  },
  {
    img: 'https://epsemaq.com.pe/uploads/1779121901553-6kdt2a.jpg',
    title: 'Mejorando Nuestros Servicios',
    subtitle: 'Atención de Emergencias para garantizar el servicio de agua.',
  },
  {
    img: 'https://epsemaq.com.pe/uploads/1779123373900-rk87xm.jpg',
    title: 'Cerca de la gente',
    subtitle: 'Campañas de sensibilización y atención al ciudadano.',
  },
  {
    img: 'https://epsemaq.com.pe/uploads/1779139934013-jltiv.jpg',
    title: 'Control de calidad',
    subtitle: 'Análisis permanente del agua para tu seguridad.',
  },
];

export const SlideshowContext = createContext<{ current: number; fading: boolean }>({
  current: 0,
  fading: false,
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
  }, []);

  const next = (current + 1) % SLIDES.length;
  const animationName = current % 2 === 0 ? 'kenburns-in' : 'kenburns-out';

  return (
    <SlideshowContext.Provider value={{ current, fading }}>
      <div className="relative min-h-screen">
        {/* Imagen siguiente (detrás, estática) */}
        <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${SLIDES[next].img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
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
              backgroundPosition: 'center top',
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

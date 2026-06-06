'use client';

import { useRef, useState, useEffect } from 'react';

const BASE = 'https://epsemaq.com.pe';

const ITEMS = [
  { img: '/marquee-oficina.png',   title: 'Visita nuestra Oficina Virtual',           href: `${BASE}/` },
  { img: '/marquee-fugas.png',     title: 'Reporta fugas de Agua',                    href: `${BASE}/reportar-fuga` },
  { img: '/marquee-billetera.png', title: 'Paga tu Recibo con tu Billetera Favorita', href: `${BASE}/contacto` },
  { img: '/marquee-agentes.png',   title: 'Conoce tus Agentes de Pago',               href: `${BASE}/agentes-autorizados-de-pago` },
  { img: '/marquee-recibo.png',    title: 'Conoce tu Recibo de Agua',                 href: `${BASE}/conoce-tu-recibo` },
  { img: '/marquee-tarifa.png',    title: 'Conoce tu Tarifa de Agua',                 href: `${BASE}/tarifas` },
];

const ITEM_W = 180;
const GAP = 16;

export default function QuickMarquee() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd]     = useState(false);

  const updateArrows = () => {
    const el = gridRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = gridRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -(ITEM_W + GAP) * 2 : (ITEM_W + GAP) * 2, behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        {/* Arrow left */}
        <button
          aria-label="Anterior"
          onClick={() => scroll('left')}
          disabled={atStart}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-opacity"
          style={{ opacity: atStart ? 0.35 : 1 }}
        >
          <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scrollable grid */}
        <div
          ref={gridRef}
          className="flex overflow-x-auto scrollbar-none"
          style={{ gap: GAP, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {ITEMS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex flex-col items-center gap-3 group"
              style={{ width: ITEM_W, scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center justify-center w-full" style={{ height: 160 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-[160px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-center text-[0.8rem] font-semibold text-[#1e293b] leading-[1.3] group-hover:text-[#0095eb] transition-colors px-1">
                {item.title}
              </span>
            </a>
          ))}
        </div>

        {/* Arrow right */}
        <button
          aria-label="Siguiente"
          onClick={() => scroll('right')}
          disabled={atEnd}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-opacity"
          style={{ opacity: atEnd ? 0.35 : 1 }}
        >
          <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

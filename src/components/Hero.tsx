'use client';

import { useSlideshowContext, SLIDES } from './BackgroundSlideshow';

const ArrowRight = () => (
  <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
);

export default function Hero() {
  const { current, fading, goTo } = useSlideshowContext();
  const slide = SLIDES[current];

  return (
    <section className="relative text-white min-h-screen flex items-center px-6 sm:px-10 md:px-16">
      {/* Degradado de la izquierda para legibilidad del texto */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(0,30,60,0.72) 0%, rgba(0,30,60,0.35) 45%, transparent 75%)' }}
      />

      {/* Flechas de navegación */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
      >
        <Chevron dir="left" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Siguiente"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
      >
        <Chevron dir="right" />
      </button>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div
          className="max-w-xl"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p
            className="text-sm sm:text-base text-cyan-200 font-medium mb-3"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
          >
            {slide.subtitle}
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] mb-7"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            {slide.title}
          </h2>
          <a
            href="#pagar"
            className="inline-flex items-center gap-2 bg-[#00a651] hover:bg-[#008f46] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Pagar mi recibo en línea
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-24 sm:bottom-28 left-0 right-0 z-20 flex justify-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-7 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

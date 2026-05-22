'use client';

import { useSlideshowContext, SLIDES } from './BackgroundSlideshow';

export default function Hero() {
  const { current, fading } = useSlideshowContext();
  const slide = SLIDES[current];

  return (
    <section className="relative text-white min-h-screen flex items-center px-4">
      {/* Viñeta */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-start">
        <div className="max-w-lg text-left">
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.7s ease',
            }}
          >
            {slide.title}
          </h1>
          <p
            className="text-blue-100 text-lg"
            style={{
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.7s ease 0.08s',
            }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

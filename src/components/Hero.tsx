'use client';

import { useSlideshowContext, SLIDES } from './BackgroundSlideshow';

export default function Hero() {
  const { current, fading } = useSlideshowContext();
  const slide = SLIDES[current];
  const isLeft = current % 2 === 0;

  return (
    <section className="relative text-white min-h-screen flex items-center px-8 md:px-16">
      {/* Viñeta */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex" style={{
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        transition: 'justify-content 0.7s ease',
      }}>
        <div
          className="max-w-lg"
          style={{
            textAlign: isLeft ? 'left' : 'right',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.7s ease',
          }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
          >
            {slide.title}
          </h1>
          <p
            className="text-blue-100 text-lg"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

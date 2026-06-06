'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDES = [
  {
    bg: '#ffc7a8',
    eyebrowColor: '#0e15d8',
    btnColor: '#0822a6',
    eyebrow: 'Realiza tus pagos de recibos en nuestros',
    title: 'Agente de pago',
    btn: { label: 'Visitar', href: 'https://epsemaq.com.pe/agentes-autorizados-de-pago' },
    img: '/agentes-pago.png',
    imgAlt: 'Agente de pago',
    isPhoto: false,
  },
  {
    bg: '#bcfbf7',
    eyebrowColor: '#1e293b',
    btnColor: '#16a34a',
    eyebrow: 'Colaboración con instituciones para mejorar el servicio de agua',
    title: 'Alianzas estratégicas',
    btn: { label: 'Ver más', href: 'https://calendar.google.com/calendar/u/0/r/month/2026/4/1' },
    img: '/hero-alianzas.jpg',
    imgAlt: 'Alianzas estratégicas',
    isPhoto: true,
  },
  {
    bg: '#bcfbf7',
    eyebrowColor: '#1e293b',
    btnColor: '#16a34a',
    eyebrow: 'Análisis permanente del agua para tu seguridad',
    title: 'Control de calidad',
    btn: null,
    img: '/hero-calidad.jpg',
    imgAlt: 'Control de calidad',
    isPhoto: true,
  },
];

const INTERVAL = 6000;
const N = SLIDES.length;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded]   = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % N);
      setProgress(0);
    }, INTERVAL);
  }, []);

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetInterval]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
    resetInterval();
  };

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section
      role="region"
      aria-roledescription="carrusel"
      aria-label="Banner principal"
      className="relative overflow-hidden"
      style={{
        minHeight: '100svh',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.7s ease',
      }}
    >
      {/* Sliding track */}
      <div
        style={{
          display: 'flex',
          width: `${N * 100}%`,
          minHeight: '100svh',
          transform: `translateX(calc(-${current * (100 / N)}%))`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {SLIDES.map((s, i) => (
          <article
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${N}`}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(i !== current ? { inert: '' as any } : {})}
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: `${100 / N}%`,
              backgroundColor: s.bg,
              minHeight: '100svh',
            }}
          >
            {/* Wave blob */}
            <span
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                right: '2%',
                top: '-15%',
                width: '50%',
                height: '130%',
                background: 'rgba(255,255,255,0.22)',
                borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                transform: 'rotate(-7deg)',
              }}
            />

            {/* Content */}
            <div
              className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10"
              style={{
                paddingTop: 'calc(110px + 2.5rem)',
                paddingBottom: '5rem',
                minHeight: '100svh',
              }}
            >
              <div className="flex-1 flex flex-col items-start gap-5 max-w-[520px]">
                <span
                  className="text-xs font-bold uppercase tracking-[.07em]"
                  style={{ color: s.eyebrowColor }}
                >
                  {s.eyebrow}
                </span>
                <h1
                  className="font-extrabold leading-[1.08] tracking-[-0.025em] text-[#1e293b]"
                  style={{
                    fontFamily: 'Poppins, Inter, sans-serif',
                    fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                  }}
                >
                  {s.title}
                </h1>
                {s.btn && (
                  <a
                    href={s.btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: s.btnColor }}
                  >
                    {s.btn.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="flex-1 flex items-end justify-center md:justify-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.imgAlt}
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={
                    s.isPhoto
                      ? 'w-full max-w-[480px] rounded-2xl object-cover shadow-2xl'
                      : 'w-full max-w-[480px] object-contain drop-shadow-2xl'
                  }
                  style={s.isPhoto ? { aspectRatio: '4/3' } : {}}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ height: '3px', background: 'rgba(0,0,0,0.10)' }}
      >
        <span
          className="block h-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.btnColor}99, ${slide.btnColor})`,
            borderRadius: '0 3px 3px 0',
          }}
        />
      </div>

      {/* Arrow left */}
      <button
        aria-label="Anterior"
        onClick={() => goTo((current - 1 + N) % N)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-all"
        style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.5)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Arrow right */}
      <button
        aria-label="Siguiente"
        onClick={() => goTo((current + 1) % N)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-all"
        style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.5)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 items-center">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="relative rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: i === current ? 36 : 10,
              height: 10,
              background: 'rgba(0,0,0,0.18)',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                width: i === current ? `${progress}%` : '0%',
                background: s.btnColor,
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 right-8 z-20 hidden md:flex items-center"
        style={{ color: 'rgba(0,0,0,0.28)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: 'bounceDown 2s ease-in-out infinite' }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

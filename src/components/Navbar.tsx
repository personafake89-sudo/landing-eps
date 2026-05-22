"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black/85 border-b border-white/10 text-white text-xs hidden md:block">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[
              { label: '973 598 606', href: 'tel:+51973598606' },
              { label: '973 597 095', href: 'tel:+51973597095' },
              { label: 'consultas@epsemaq.com.pe', href: 'mailto:consultas@epsemaq.com.pe' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                {href.startsWith('tel') ? (
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ) : (
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { src: 'https://epsemaq.com.pe/uploads/1775682282972-5qylbw.png', alt: 'YouTube',   href: 'https://www.youtube.com/@EPSEMAQS.A' },
              { src: 'https://epsemaq.com.pe/uploads/1778853665763-75dia.png',  alt: 'TikTok',    href: 'https://www.tiktok.com/@eps.emaq.s.a' },
              { src: 'https://epsemaq.com.pe/uploads/1775679116206-w2jch.png',  alt: 'Facebook',  href: 'https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218/?locale=es_LA' },
              { src: 'https://epsemaq.com.pe/uploads/1775682850820-iw93i.png',  alt: 'Instagram', href: 'https://www.instagram.com/eps_emaq_sa' },
            ].map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" title={alt}
                className="hover:scale-110 transition-transform">
                <img src={src} alt={alt} className="h-5 w-5 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <nav
        className={`transition-all duration-300 text-white ${
          scrolled ? 'bg-black/80 shadow-lg border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://epsemaq.com.pe/uploads/1779119577635-6ukv1v.png"
              alt="E.P.S. EMAQ S.A."
              width={160}
              height={48}
              className="object-contain h-12 w-auto"
              priority
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#servicios" className="hover:text-blue-200 drop-shadow transition-colors">Servicios</a>
            <Image
              src="https://epsemaq.com.pe/uploads/1777303095747-ob7ys9.png"
              alt="Sello EMAQ"
              width={120}
              height={120}
              className="object-contain h-10 w-auto"
            />
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium bg-black/50">
            <a href="#servicios" onClick={() => setOpen(false)} className="py-2">Servicios</a>
            <div className="border-t border-white/20 pt-3 flex flex-col gap-2 text-white/80">
              <a href="tel:+51973598606" className="flex items-center gap-2">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                973 598 606
              </a>
              <a href="tel:+51973597095" className="flex items-center gap-2">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                973 597 095
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

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
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-sm shadow-md text-gray-800' : 'bg-transparent text-white'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="https://www.epsemaq.com.pe/uploads/1775668657025-spxpur.png"
            alt="E.P.S. EMAQ S.A."
            width={160}
            height={48}
            className={`object-contain h-12 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#servicios" className={`transition-colors ${scrolled ? 'hover:text-[#0057a8]' : 'hover:text-blue-200 drop-shadow'}`}>Servicios</a>
          <a href="#como-funciona" className={`transition-colors ${scrolled ? 'hover:text-[#0057a8]' : 'hover:text-blue-200 drop-shadow'}`}>¿Cómo funciona?</a>
          <a href="#pagar" className="bg-[#00a651] hover:bg-[#008f45] text-white px-4 py-2 rounded-full transition-colors font-semibold">
            Pagar Recibo
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium ${scrolled ? 'bg-white/90' : 'bg-black/40'}`}>
          <a href="#servicios" onClick={() => setOpen(false)} className="py-2">Servicios</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="py-2">¿Cómo funciona?</a>
          <a href="#pagar" onClick={() => setOpen(false)} className="bg-[#00a651] text-white px-4 py-2 rounded-full text-center">
            Pagar Recibo
          </a>
        </div>
      )}
    </nav>
  );
}

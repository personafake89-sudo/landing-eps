"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0057a8] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2">
            <svg className="w-7 h-7 text-[#0057a8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg leading-none block">E.P.S. EMAQ S.A.</span>
            <span className="text-blue-200 text-xs">Empresa Prestadora de Servicios</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#servicios" className="hover:text-blue-200 transition-colors">Servicios</a>
          <a href="#como-funciona" className="hover:text-blue-200 transition-colors">¿Cómo funciona?</a>
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
        <div className="md:hidden bg-[#004a92] px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <a href="#servicios" onClick={() => setOpen(false)} className="hover:text-blue-200 py-2">Servicios</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="hover:text-blue-200 py-2">¿Cómo funciona?</a>
          <a href="#pagar" onClick={() => setOpen(false)} className="bg-[#00a651] text-white px-4 py-2 rounded-full text-center">
            Pagar Recibo
          </a>
        </div>
      )}
    </nav>
  );
}

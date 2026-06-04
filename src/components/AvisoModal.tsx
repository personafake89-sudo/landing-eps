"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AvisoModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostrar solo una vez por sesión
    if (sessionStorage.getItem("comunicado-visto")) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  function close() {
    sessionStorage.setItem("comunicado-visto", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
      onClick={close}
      style={{ animation: "fadeIn .3s ease" }}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "popIn .35s cubic-bezier(.18,.89,.32,1.28)" }}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#0057a8] to-[#0090d4] px-5 py-3">
          <div className="flex items-center gap-2 text-white">
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 0 1-1.564-.317Z" />
            </svg>
            <span className="font-bold tracking-wide">COMUNICADO</span>
          </div>
          <button
            onClick={close}
            className="text-white/90 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-2xl leading-none transition-colors"
            aria-label="Cerrar aviso"
          >
            ×
          </button>
        </div>

        {/* Imagen del comunicado */}
        <Image
          src="/atencion.png"
          alt="Comunicado importante de EPS EMAQ S.A."
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />

        {/* Pie con acción */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={close}
            className="w-full bg-[#00a651] hover:bg-[#008f46] text-white font-semibold py-2.5 rounded-full transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

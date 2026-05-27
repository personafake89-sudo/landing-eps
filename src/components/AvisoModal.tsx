"use client";

import { useState } from "react";
import Image from "next/image";

export default function AvisoModal() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow"
          aria-label="Cerrar aviso"
        >
          ×
        </button>
        <Image
          src="/atencion.png"
          alt="Aviso importante"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}

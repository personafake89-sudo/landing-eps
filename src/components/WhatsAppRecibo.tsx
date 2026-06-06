'use client';

import { useState } from 'react';

// Número oficial de atención de EPS EMAQ (formato internacional sin +)
const WHATSAPP = '13858859268';

const WhatsAppIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.739-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export default function WhatsAppRecibo() {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [suministro, setSuministro] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `Hola, solicito mi recibo de agua.%0A` +
      `*Nombres:* ${encodeURIComponent(nombre)}%0A` +
      `*DNI:* ${encodeURIComponent(dni)}%0A` +
      `*N° Suministro:* ${encodeURIComponent(suministro)}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank', 'noopener');
  }

  return (
    <section className="py-16 px-4 bg-[#e8f4fd]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Lado informativo */}
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-md mb-5">
            <WhatsAppIcon />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0057a8] leading-tight">
            SOLICITA TU<br />RECIBO POR WHATSAPP
          </h2>
          <p className="text-gray-600 mt-4 max-w-md">
            Completa tus datos y recibe el detalle de tu recibo de forma rápida y
            segura directamente en tu WhatsApp.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombres completos *</label>
            <input
              required value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-[#0057a8] focus:ring-1 focus:ring-[#0057a8]"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">DNI *</label>
              <input
                required value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, ''))}
                inputMode="numeric" maxLength={8} placeholder="Ingresa tu DNI"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-[#0057a8] focus:ring-1 focus:ring-[#0057a8]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">N° Suministro *</label>
              <input
                required value={suministro} onChange={e => setSuministro(e.target.value)}
                placeholder="Ingresa tu número"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-[#0057a8] focus:ring-1 focus:ring-[#0057a8]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold py-3 rounded-full shadow transition-colors"
          >
            <WhatsAppIcon size={20} />
            ENVIAR POR WHATSAPP
          </button>
          <p className="text-xs text-gray-400 text-center">
            Tus datos están seguros y serán utilizados únicamente para enviarte tu recibo.
          </p>
        </form>
      </div>
    </section>
  );
}

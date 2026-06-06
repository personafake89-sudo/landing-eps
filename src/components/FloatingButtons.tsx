'use client';

const BASE = 'https://epsemaq.com.pe';
const SITIO = 'https://epsemaq.epsagua.com';
const WHATSAPP = '13858859268';

const DropIcon = () => (
  <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.1S5.5 9.2 5.5 14.3a6.5 6.5 0 0 0 13 0C18.5 9.2 12 2.1 12 2.1Z" />
  </svg>
);

const WaIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.739-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const ShieldCheck = () => (
  <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

export default function FloatingButtons() {
  return (
    <>
      {/* Badge sitio oficial — abajo izquierda */}
      <a
        href={SITIO}
        title="Sitio Oficial: epsemaq.epsagua.com"
        className="group fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-white text-[#0057a8] rounded-full shadow-lg ring-1 ring-gray-200 h-11 pl-2.5 pr-2.5 hover:pr-4 overflow-hidden transition-all"
      >
        <ShieldCheck />
        <span className="max-w-0 group-hover:max-w-[260px] whitespace-nowrap text-sm font-semibold overflow-hidden transition-all duration-300">
          Sitio Oficial: epsemaq.epsagua.com
        </span>
      </a>

      {/* Reportar fuga + WhatsApp — abajo derecha */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href={`${BASE}/contacto`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold text-sm pl-4 pr-5 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <DropIcon />
          Reportar fuga
        </a>

        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Escríbenos por WhatsApp"
          aria-label="Escríbenos por WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full shadow-lg hover:scale-105 transition-all"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
          <span className="relative">
            <WaIcon />
          </span>
        </a>
      </div>
    </>
  );
}

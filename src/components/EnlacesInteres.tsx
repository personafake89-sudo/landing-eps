const PARTNERS = [
  { img: '/enlace-sunass.jpg', alt: 'SUNASS',  href: 'https://www.gob.pe/sunass' },
  { img: '/enlace-indeci.png', alt: 'INDECI',  href: 'https://www.gob.pe/indeci' },
  { img: '/enlace-servir.png', alt: 'SERVIR',  href: 'https://www.gob.pe/servir' },
  { img: '/enlace-sunat.png',  alt: 'SUNAT',   href: 'https://www.sunat.gob.pe/' },
];

const TRACK = [...PARTNERS, ...PARTNERS];

export default function EnlacesInteres() {
  return (
    <section className="py-14 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-8">
        <h2 className="text-[1.75rem] font-extrabold text-[#1e293b]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
          Enlaces de Interés
        </h2>
        <div className="mt-2 w-[60px] h-1 rounded-full" style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
      </div>

      <div
        className="flex"
        style={{ animation: 'marquee-scroll 30s linear infinite', width: 'max-content' }}
      >
        {TRACK.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center mx-8 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            style={{ width: 160, height: 80 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt={p.alt}
              loading="lazy"
              className="max-h-[70px] max-w-[150px] w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

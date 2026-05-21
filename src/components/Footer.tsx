import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(6px)', background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.55) 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-4">
            <Image
              src=""
              alt="EPS EMAQ S.A."
              width={140}
              height={42}
             
            />
          </div>
          <p className="text-white font-semibold text-sm mb-1">EPS EMAQ S.A.</p>
          <p className="text-blue-100 text-sm leading-relaxed mb-3">
            Comprometidos en alcanzar la excelencia en el servicio.
          </p>
          <div className="flex items-start gap-2 text-blue-100 text-sm">
            <svg className="w-4 h-4 text-blue-200 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Av. Nicanor Larrea N° 337 – Quillabamba – La Convención – Cusco</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-white">Canales de Atención</h4>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (065) 000-0000
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contacto@epsemaq.com.pe
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src=""
              alt="Ícono atención"
              className="h-12 w-12 object-contain"
            />
            <h4 className="font-bold text-white">Horario de Atención</h4>
          </div>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>Lunes a Viernes: 8:00 - 16:00</li>
            <li>Pagos en línea: 24 horas / 7 días</li>
          </ul>
          <div className="mt-4">
            <p className="text-blue-200 text-xs mb-2">Pagos aceptados:</p>
            <div className="flex gap-2 items-center">
              <div className="bg-white rounded px-2 py-1.5">
                <img src="https://static-content.vnforapps.com/v2/img/bottom/visa.png" alt="Visa" className="h-4 object-contain" />
              </div>
              <div className="bg-white rounded px-2 py-1.5">
                <img src="https://static-content.vnforapps.com/v2/img/bottom/mc.png" alt="Mastercard" className="h-4 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="relative z-10 border-t border-white/20 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
          <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">Síguenos en</p>
          <div className="flex items-center gap-4">
            {[
              { src: 'https://epsemaq.com.pe/uploads/1775604684441-4564us.png', alt: 'Facebook',  href: '#' },
              { src: 'https://epsemaq.com.pe/uploads/1775679116206-w2jch.png',  alt: 'Instagram', href: '#' },
              { src: 'https://epsemaq.com.pe/uploads/1775682282972-5qylbw.png', alt: 'YouTube',   href: '#' },
              { src: 'https://epsemaq.com.pe/uploads/1775682850820-iw93i.png',  alt: 'Twitter/X', href: '#' },
              { src: 'https://epsemaq.com.pe/uploads/1778853665763-75dia.png',  alt: 'TikTok',    href: '#' },
            ].map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 transition-transform">
                <img src={src} alt={alt} className="h-8 w-8 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/20 py-4 px-4 text-center text-blue-200 text-xs">
        © {new Date().getFullYear()} E.P.S. EMAQ S.A. — Todos los derechos reservados
      </div>
    </footer>
  );
}

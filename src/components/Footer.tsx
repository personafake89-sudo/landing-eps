export default function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundColor: 'rgb(6, 27, 60)',
        backgroundImage: 'url(/footer-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(6, 27, 60, 0.70)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Col 1: Info */}
        <div>
          <p className="text-white font-bold text-lg tracking-widest mb-3">EPS EMAQ S.A.</p>
          <p className="text-blue-100 text-sm leading-relaxed mb-3">
            Comprometidos en alcanzar la excelencia en el servicio.
          </p>
          <div className="flex items-start gap-2 text-blue-100 text-sm mb-2">
            <svg className="w-4 h-4 text-blue-200 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Av. Nicanor Larrea N° 337 – Quillabamba – La Convención – Cusco</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <svg className="w-4 h-4 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
            </svg>
            <span>Lunes a Viernes: 07:30 - 16:00</span>
          </div>
        </div>

        {/* Col 2: Contacto */}
        <div>
          <h4 className="font-bold mb-4 text-white">Contacto</h4>
          <ul className="space-y-2 text-blue-100 text-sm">
            {[
              { icon: 'phone', label: '973 598 606', href: 'tel:+51973598606' },
              { icon: 'phone', label: '973 597 095', href: 'tel:+51973597095' },
              { icon: 'mail',  label: 'consultas@epsemaq.com.pe', href: 'mailto:consultas@epsemaq.com.pe' },
              { icon: 'mail',  label: 'reclamos@epsemaq.com.pe',  href: 'mailto:reclamos@epsemaq.com.pe' },
              { icon: 'chat',  label: 'WhatsApp: 973 598 606',    href: 'https://wa.me/51973598606' },
            ].map(({ icon, label, href }) => (
              <li key={label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icon === 'phone' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                  {icon === 'mail'  && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" /><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} /></>}
                  {icon === 'chat'  && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />}
                </svg>
                <a href={href} className="hover:text-white transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Enlaces */}
        <div>
          <h4 className="font-bold mb-4 text-white">Enlaces</h4>
          <ul className="space-y-2 text-blue-100 text-sm">
            {[
              { label: 'Inicio',             href: 'https://epsemaq.com.pe' },
              { label: 'Servicios',          href: 'https://epsemaq.com.pe/servicios' },
              { label: 'Tarifas',            href: 'https://epsemaq.com.pe/tarifas' },
              { label: 'Cortes Programados', href: 'https://epsemaq.com.pe/cortes' },
              { label: 'Transparencia',      href: 'https://epsemaq.com.pe/transparencia' },
              { label: 'Noticias',           href: 'https://epsemaq.com.pe/noticias' },
              { label: 'Contacto',           href: 'https://epsemaq.com.pe/contacto' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Redes + Libro */}
        <div>
          <h4 className="font-bold mb-4 text-white">Redes Sociales</h4>
          <div className="flex items-center gap-3 mb-6">
            {[
              { src: '/images/icon-youtube.png',   alt: 'YouTube',   href: 'https://www.youtube.com/@EPSEMAQS.A' },
              { src: '/images/icon-tiktok.png',    alt: 'TikTok',    href: 'https://www.tiktok.com/@eps.emaq.s.a' },
              { src: '/images/icon-facebook.png',  alt: 'Facebook',  href: 'https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218/?locale=es_LA' },
              { src: '/images/icon-instagram.png', alt: 'Instagram', href: 'https://www.instagram.com/eps_emaq_sa' },
            ].map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" title={alt}
                className="hover:scale-110 transition-transform">
                <img src={src} alt={alt} className="h-9 w-9 object-contain" />
              </a>
            ))}
          </div>
          <div>
            <a href="https://epsemaq.com.pe" target="_blank" rel="noopener noreferrer">
              <img
                src="/libro-reclamaciones.png"
                alt="Libro de Reclamaciones"
                className="h-20 w-auto object-contain hover:scale-105 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/20 py-4 px-4 text-center text-blue-200 text-xs">
        © {new Date().getFullYear()} E.P.S. EMAQ S.A. — Todos los derechos reservados
      </div>
    </footer>
  );
}

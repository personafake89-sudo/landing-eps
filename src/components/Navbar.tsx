"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const BASE = 'https://epsemaq.com.pe';

type NavLeaf = { label: string; href: string };
type NavSub  = { label: string; children: NavLeaf[] };
type NavTop  = { label: string; href?: string; children?: (NavLeaf | NavSub)[] };

const NAV: NavTop[] = [
  {
    label: 'La Empresa',
    children: [
      {
        label: 'Nosotros',
        children: [
          { label: 'Visión – Misión',      href: `${BASE}/pagina/vision-mision` },
          { label: 'Información General',  href: `${BASE}/pagina/informacion-general` },
          { label: 'Valores Corporativos', href: `${BASE}/pagina/valores-corporativos` },
          { label: 'Historia',             href: `${BASE}/pagina/historia` },
        ],
      },
      {
        label: 'Organización',
        children: [
          { label: 'Organigrama',  href: `${BASE}/pagina/organigrama-emaq` },
          { label: 'Funcionarios', href: `${BASE}/funcionarios` },
        ],
      },
    ],
  },
  {
    label: 'Gestión',
    children: [
      { label: 'Transparencia', href: `${BASE}/transparencia` },
      { label: 'Resoluciones',  href: `${BASE}/resoluciones` },
    ],
  },
  {
    label: 'Imagen Institucional',
    children: [
      { label: 'Comunicados',         href: `${BASE}/noticias?categoria=comunicado` },
      { label: 'Noticias',            href: `${BASE}/noticias` },
      { label: 'Educación Sanitaria', href: `${BASE}/pagina/educacion-sanitaria` },
    ],
  },
  {
    label: 'Servicios',
    children: [
      { label: 'Agentes Autorizados de Pago', href: `${BASE}/agentes-autorizados-de-pago` },
      { label: 'Atención de Reclamos',        href: '#' },
      { label: 'Estructura Tarifaria',        href: `${BASE}/tarifas` },
      { label: 'Conoce tu Recibo',            href: `${BASE}/conoce-tu-recibo` },
    ],
  },
  { label: 'Cortes',   href: `${BASE}/cortes` },
  { label: 'Contacto', href: `${BASE}/contacto` },
];

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={12} height={12}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
  </svg>
);
const ChevronRight = () => (
  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={12} height={12}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6"/>
  </svg>
);

// ——— Sub-dropdown de segundo nivel ———
function DesktopSub({ item }: { item: NavSub }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057a8] transition-colors">
        {item.label}
        <ChevronRight />
      </button>
      {open && (
        <div className="absolute left-full top-0 pl-1 z-50 min-w-[200px]">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-1">
            {item.children.map(child => (
              <a key={child.label} href={child.href}
                target={child.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057a8] transition-colors whitespace-nowrap">
                {child.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ——— Dropdown de primer nivel ———
function DesktopDropdown({ item, scrolled }: { item: NavTop; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={`flex items-center gap-1 px-2 py-1.5 transition-colors whitespace-nowrap ${scrolled ? 'hover:text-[#0057a8]' : 'hover:text-blue-200'}`}>
        {item.label}
        <ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-1 z-50 min-w-[190px]">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-1">
            {item.children!.map(child =>
              'children' in child ? (
                <DesktopSub key={child.label} item={child as NavSub} />
              ) : (
                <a key={child.label} href={(child as NavLeaf).href}
                  target={(child as NavLeaf).href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057a8] transition-colors whitespace-nowrap">
                  {child.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ——— Item mobile con acordeón ———
function MobileItem({ item, expanded, toggle, onClose }: {
  item: NavTop;
  expanded: string[];
  toggle: (l: string) => void;
  onClose: () => void;
}) {
  const isOpen = expanded.includes(item.label);

  if (!item.children) {
    return (
      <a href={item.href}
        target={item.href?.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={onClose}
        className="block py-2 text-white/90 hover:text-white transition-colors">
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button onClick={() => toggle(item.label)}
        className="w-full flex items-center justify-between py-2 text-white/90 hover:text-white transition-colors">
        {item.label}
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 border-l border-white/20 ml-2 mb-1 space-y-0.5">
          {item.children.map(child =>
            'children' in child ? (
              <MobileItem key={child.label} item={child as NavTop} expanded={expanded} toggle={toggle} onClose={onClose} />
            ) : (
              <a key={child.label} href={(child as NavLeaf).href}
                target={(child as NavLeaf).href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={onClose}
                className="block py-1.5 text-sm text-white/80 hover:text-white transition-colors">
                {child.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ——— Navbar principal ———
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded]     = useState<string[]>([]);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setMobileOpen(false);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function toggleExpanded(label: string) {
    setExpanded(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  }

  return (
    <div className="sticky top-0 z-50">

      {/* Top bar */}
      <div
        className={`border-b text-sm transition-all duration-300 ${scrolled ? 'border-gray-200 text-gray-600' : 'border-white/10 text-white'}`}
        style={scrolled
          ? { backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.80)' }
          : { background: 'rgba(0,0,0,0.35)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <a href="tel:+51973598606" className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            973 598 606
          </a>
          <a href="tel:+51973597095" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            973 597 095
          </a>
          <a href="mailto:consultas@epsemaq.com.pe" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            consultas@epsemaq.com.pe
          </a>
          <div className="flex items-center gap-3 ml-auto">
            {[
              { src: 'https://epsemaq.com.pe/uploads/1775682282972-5qylbw.png', alt: 'YouTube',   href: 'https://www.youtube.com/@EPSEMAQS.A' },
              { src: 'https://epsemaq.com.pe/uploads/1778853665763-75dia.png',  alt: 'TikTok',    href: 'https://www.tiktok.com/@eps.emaq.s.a' },
              { src: 'https://epsemaq.com.pe/uploads/1775679116206-w2jch.png',  alt: 'Facebook',  href: 'https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218/?locale=es_LA' },
              { src: 'https://epsemaq.com.pe/uploads/1775682850820-iw93i.png',  alt: 'Instagram', href: 'https://www.instagram.com/eps_emaq_sa' },
            ].map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" title={alt} className="hover:scale-110 transition-transform">
                <img src={src} alt={alt} className="h-7 w-7 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-gray-200 shadow-sm text-gray-700'
            : 'text-white'
        }`}
        style={scrolled
          ? { backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.85)' }
          : { background: 'rgba(0,0,0,0.40)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          <Image
            src="https://epsemaq.com.pe/uploads/1779119577635-6ukv1v.png"
            alt="E.P.S. EMAQ S.A."
            width={160} height={48}
            className="object-contain h-12 w-auto"
            priority
          />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV.map(item =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} scrolled={scrolled} />
              ) : (
                <a key={item.label} href={item.href}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`px-2 py-1.5 transition-colors whitespace-nowrap ${scrolled ? 'hover:text-[#0057a8]' : 'hover:text-blue-200'}`}>
                  {item.label}
                </a>
              )
            )}
            <Image
              src="https://epsemaq.com.pe/uploads/1777303095747-ob7ys9.png"
              alt="Sello EMAQ"
              width={120} height={120}
              className="object-contain h-10 w-auto ml-2"
            />
          </div>

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 text-sm font-medium border-t border-white/10 space-y-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
            {NAV.map(item => (
              <MobileItem key={item.label} item={item} expanded={expanded} toggle={toggleExpanded} onClose={() => { setMobileOpen(false); setExpanded([]); }} />
            ))}
            <div className="border-t border-white/20 pt-3 mt-2 flex flex-col gap-2 text-white/80">
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

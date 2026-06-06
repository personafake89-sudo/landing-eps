const BASE = 'https://epsemaq.com.pe';

const ITEMS = [
  { img: '/marquee-oficina.png',   title: 'Visita nuestra Oficina Virtual',           href: `${BASE}/` },
  { img: '/marquee-fugas.png',     title: 'Reporta fugas de Agua',                    href: `${BASE}/reportar-fuga` },
  { img: '/marquee-billetera.png', title: 'Paga tu Recibo con tu Billetera Favorita', href: `${BASE}/contacto` },
  { img: '/marquee-agentes.png',   title: 'Conoce tus Agentes de Pago',               href: `${BASE}/agentes-autorizados-de-pago` },
  { img: '/marquee-recibo.png',    title: 'Conoce tu Recibo de Agua',                 href: `${BASE}/conoce-tu-recibo` },
  { img: '/marquee-tarifa.png',    title: 'Conoce tu Tarifa de Agua',                 href: `${BASE}/tarifas` },
];

function Item({ img, title, href }: { img: string; title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex flex-col items-center gap-3 px-6 group"
      style={{ width: 180 }}
    >
      <div className="flex items-center justify-center w-full h-[140px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="text-center text-[0.8rem] font-semibold text-[#1e293b] leading-[1.3] group-hover:text-[#0095eb] transition-colors">
        {title}
      </span>
    </a>
  );
}

export default function QuickMarquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <section className="py-8 bg-white border-y border-gray-100 overflow-hidden">
      <div
        className="flex"
        style={{
          animation: 'marquee-scroll 36s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

const BASE = 'https://epsemaq.com.pe';

type Acceso = {
  title: string;
  href: string;
  gradient: string;
  icon: React.ReactNode;
};

const accesos: Acceso[] = [
  {
    title: 'Paga tu Recibo con tu Billetera Favorita',
    href: '#pagar',
    gradient: 'from-[#00a651] to-[#00c264]',
    icon: (
      <svg width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    title: 'Conoce tus Agentes de Pago',
    href: `${BASE}/agentes-autorizados-de-pago`,
    gradient: 'from-[#0057a8] to-[#0090d4]',
    icon: (
      <svg width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: 'Conoce tu Recibo de Agua',
    href: `${BASE}/conoce-tu-recibo`,
    gradient: 'from-[#00b8d4] to-[#22d3ee]',
    icon: (
      <svg width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Conoce tu Tarifa de Agua',
    href: `${BASE}/tarifas`,
    gradient: 'from-[#7c3aed] to-[#a855f7]',
    icon: (
      <svg width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Visita nuestra Oficina Virtual',
    href: `${BASE}`,
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
    icon: (
      <svg width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 11.2 3.045c.44-.44 1.152-.44 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

export default function AccesosRapidos() {
  return (
    <section className="relative z-10 px-4 -mt-16 sm:-mt-20 pb-16">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl px-5 sm:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {accesos.map((a) => {
            const external = a.href.startsWith('http');
            return (
              <a
                key={a.title}
                href={a.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex flex-col items-center text-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${a.gradient} text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all`}
                >
                  {a.icon}
                </span>
                <span className="text-sm font-semibold text-gray-700 leading-snug group-hover:text-[#0057a8] transition-colors">
                  {a.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

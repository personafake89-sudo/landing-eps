const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Pago de Recibos",
    desc: "Pague su recibo de agua en línea con tarjeta de débito o crédito VISA y Mastercard.",
    color: "bg-blue-50 text-[#0057a8]",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Consulta de Deuda",
    desc: "Revise su estado de cuenta, historial de pagos y deuda pendiente en tiempo real.",
    color: "bg-green-50 text-[#00a651]",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Descarga de Recibos",
    desc: "Descargue e imprima sus recibos en formato PDF desde cualquier mes.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Notificaciones",
    desc: "Reciba alertas de vencimiento de su recibo por correo electrónico o SMS.",
    color: "bg-orange-50 text-orange-500",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-16 px-4 bg-white/100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#0057a8] font-semibold text-sm uppercase tracking-wider">Servicio de Saneamiento de Agua Potable en Quillabamba</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Paga tu Recibo Digital sin salir de casa</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Solo necesitas tu numero de suministro.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className={`inline-flex p-3 rounded-xl mb-4 ${s.color}`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: (
      <svg width="72" height="72" fill="none" stroke="#0095eb" viewBox="0 0 24 24" strokeWidth={1.65}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Pago de Recibos",
    desc: "Pague su recibo de agua en línea con tarjeta de débito o crédito VISA y Mastercard.",
  },
  {
    icon: (
      <svg width="72" height="72" fill="none" stroke="#0095eb" viewBox="0 0 24 24" strokeWidth={1.65}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Consulta de Deuda",
    desc: "Revise su estado de cuenta, historial de pagos y deuda pendiente en tiempo real.",
  },
  {
    icon: (
      <svg width="72" height="72" fill="none" stroke="#0095eb" viewBox="0 0 24 24" strokeWidth={1.65}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Descarga de Recibos",
    desc: "Descargue e imprima sus recibos en formato PDF desde cualquier mes.",
  },
  {
    icon: (
      <svg width="72" height="72" fill="none" stroke="#0095eb" viewBox="0 0 24 24" strokeWidth={1.65}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Notificaciones",
    desc: "Reciba alertas de vencimiento de su recibo por correo electrónico o SMS.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-[5rem] px-4 bg-[#f9fafb]">
      <div className="max-w-[1200px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-[#0095eb] font-bold text-xs uppercase tracking-[.06em]">
            Servicio de Saneamiento de Agua Potable en Quillabamba
          </span>
          <h2 className="text-[2rem] font-bold text-[#1e293b] mt-2 mb-3" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Paga tu Recibo Digital sin salir de casa
          </h2>
          <div className="w-[60px] h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
          <p className="text-[#64748b] mt-4 max-w-xl mx-auto text-[0.92rem]">Solo necesitas tu número de suministro.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-[#e2e8f0] p-7 text-center flex flex-col items-center gap-4 min-h-[200px] justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,149,235,0.18),0_4px_8px_rgba(15,23,42,0.06)] hover:border-[rgba(0,149,235,0.40)]"
            >
              <div className="flex items-center justify-center text-[#0095eb]">
                {s.icon}
              </div>
              <h3 className="font-semibold text-[#1e293b] text-[0.92rem] leading-[1.3] tracking-[.01em]"
                style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                {s.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

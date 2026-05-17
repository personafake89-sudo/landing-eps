export default function Footer() {
  return (
    <footer className="bg-[#0d1b2e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white rounded-full p-2">
              <svg className="w-6 h-6 text-[#0057a8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">E.P.S. EMAQ S.A.</p>
              <p className="text-gray-400 text-xs">Empresa Prestadora de Servicios</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Comprometidos con brindar agua potable y saneamiento de calidad a los ciudadanos de nuestra región.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-blue-300">Canales de Atención</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0080d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (065) 000-0000
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0080d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contacto@epsemaq.com.pe
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0080d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Iquitos, Loreto — Perú
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-blue-300">Horario de Atención</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Lun – Vie: 8:00 am – 5:00 pm</li>
            <li>Sábado: 8:00 am – 1:00 pm</li>
            <li>Pagos en línea: 24 horas / 7 días</li>
          </ul>
          <div className="mt-4">
            <p className="text-gray-500 text-xs mb-2">Pagos aceptados:</p>
            <div className="flex gap-2">
              <div className="bg-[#1a1f71] px-3 py-1.5 rounded text-xs font-bold text-white">VISA</div>
              <div className="bg-white px-3 py-1.5 rounded text-xs font-bold text-gray-800">Mastercard</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} E.P.S. EMAQ S.A. — Todos los derechos reservados
      </div>
    </footer>
  );
}

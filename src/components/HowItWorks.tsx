const steps = [
  {
    num: "01",
    title: "Ingresa tu N° de suministro",
    desc: "Encuéntralo en la parte superior de tu último recibo físico.",
  },
  {
    num: "02",
    title: "Consulta tu deuda",
    desc: "Revisa el monto a pagar y los detalles de tu consumo del mes.",
  },
  {
    num: "03",
    title: "Acepta los términos",
    desc: "Lee y acepta los términos y condiciones del servicio de pago en línea.",
  },
  {
    num: "04",
    title: "Paga con tarjeta o Billetera",
    desc: "Ingresa los datos de tu tarjeta VISA o escanea el QR y confirma el pago.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-[5rem] px-4 bg-white">
      <div className="max-w-[1200px] mx-auto">

        {/* Section header — epsemaq.com.pe style */}
        <div className="text-center mb-12">
          <h2 className="text-[2rem] font-bold text-[#1e293b] mb-3" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Paga tu Recibo Digital aquí
          </h2>
          <div className="w-[60px] h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
          <p className="text-[#4a4a5a] mt-4 text-[0.95rem]">Fácil, rápido y sin filas desde cualquier dispositivo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 z-0"
            style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
          {steps.map((step, i) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg"
                style={{ background: i === 3 ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #0095eb, #1e73be)' }}>
                {step.num}
              </div>
              <h3 className="font-bold text-[#1e293b] mb-2 text-sm" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                {step.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    title: "Paga con tarjeta o con tu Billetera Favorita",
    desc: "Ingresa los datos de tu tarjeta VISA o Mastercard y confirma el pago.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#0057a8] font-semibold text-sm uppercase tracking-wider">Proceso Simple</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Paga tu Recibo Digital aqui</h2>
          <p className="text-gray-500 mt-3">Facil y Rapido</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#0057a8] to-[#00a8e8] z-0" />
          {steps.map((step, i) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg ${i === 3 ? "bg-[#00a651]" : "bg-[#0057a8]"}`}>
                {step.num}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

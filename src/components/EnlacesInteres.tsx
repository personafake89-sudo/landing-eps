const enlaces = [
  { nombre: 'Gob.pe', url: 'https://www.gob.pe' },
  { nombre: 'Sunass', url: 'https://www.gob.pe/sunass' },
  { nombre: 'OTASS', url: 'https://www.gob.pe/otass' },
  { nombre: 'MVCS', url: 'https://www.gob.pe/vivienda' },
  { nombre: 'SUNAT', url: 'https://www.sunat.gob.pe' },
  { nombre: 'Defensoría', url: 'https://www.defensoria.gob.pe' },
];

export default function EnlacesInteres() {
  return (
    <section className="py-14 px-4 bg-[#f5f8ff] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Enlaces de Interés</h2>
          <p className="text-gray-500 mt-2">Instituciones del sector saneamiento y gobierno</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {enlaces.map((e) => (
            <a
              key={e.nombre}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-20 rounded-xl bg-white border border-gray-200 text-gray-600 font-semibold hover:border-[#0057a8] hover:text-[#0057a8] hover:shadow-md transition-all"
            >
              {e.nombre}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

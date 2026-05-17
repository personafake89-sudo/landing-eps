'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pago = {
  id: number;
  fecha: string;
  codigo_cliente: string;
  nombre: string;
  monto: string;
  tarjeta: string;
  titular: string;
  vencimiento: string;
  estado: 'EXITOSO' | 'RECHAZADO';
  nro_operacion: string;
};

export default function AdminPagosPage() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/pagos')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setPagos(data);
        else setError(data.error || 'Error al cargar pagos');
      })
      .catch(() => setError('Error de conexión'))
      .finally(() => setLoading(false));
  }, []);

  const total = pagos.filter(p => p.estado === 'EXITOSO').reduce((acc, p) => acc + parseFloat(p.monto), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{ colorScheme: 'light' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel de Pagos</h1>
            <p className="text-gray-500 text-sm">E.P.S. EMAQ S.A. — Registro de transacciones</p>
          </div>
          <Link href="/" className="text-sm text-[#0057a8] hover:underline">← Volver al inicio</Link>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-500">Cargando registros...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Total transacciones</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{pagos.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Pagos exitosos</p>
                <p className="text-3xl font-bold text-[#00a651] mt-1">{pagos.filter(p => p.estado === 'EXITOSO').length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Monto total cobrado</p>
                <p className="text-3xl font-bold text-[#0057a8] mt-1">S/ {total.toFixed(2)}</p>
              </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0057a8] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">#</th>
                      <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                      <th className="px-4 py-3 text-left font-semibold">Código</th>
                      <th className="px-4 py-3 text-left font-semibold">Cliente</th>
                      <th className="px-4 py-3 text-right font-semibold">Monto</th>
                      <th className="px-4 py-3 text-left font-semibold">Tarjeta</th>
                      <th className="px-4 py-3 text-left font-semibold">Titular</th>
                      <th className="px-4 py-3 text-left font-semibold">N° Operación</th>
                      <th className="px-4 py-3 text-center font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pagos.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-12 text-gray-400">No hay registros de pagos todavía.</td>
                      </tr>
                    )}
                    {pagos.map((p, i) => (
                      <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-gray-400">{p.id}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {new Date(p.fecha).toLocaleString('es-PE', { timeZone: 'America/Lima' })}
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-700">{p.codigo_cliente}</td>
                        <td className="px-4 py-3 text-gray-800">{p.nombre}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-800">S/ {parseFloat(p.monto).toFixed(2)}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{p.tarjeta}</td>
                        <td className="px-4 py-3 text-gray-700">{p.titular}</td>
                        <td className="px-4 py-3 font-mono text-gray-500">{p.nro_operacion}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                            p.estado === 'EXITOSO'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {p.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

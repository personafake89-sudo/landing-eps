import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E.P.S. EMAQ S.A. — Pago de Recibos en Línea",
  description: "Consulte su deuda y pague su recibo de agua de forma rápida y segura desde cualquier dispositivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col bg-[#f5f8ff] text-[#1e293b]">{children}</body>
    </html>
  );
}

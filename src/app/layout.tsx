import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMAQs - Quillabamba",
  description: "Consulte su deuda y pague su recibo de agua de forma rápida y segura desde cualquier dispositivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full antialiased ${poppins.variable} ${inter.variable}`} style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col text-[#1e293b]">{children}</body>
    </html>
  );
}

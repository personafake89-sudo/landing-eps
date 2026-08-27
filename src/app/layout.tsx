import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const BASE_URL = "https://epsemaq.epsagua.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EPS EMAQ S.A. | Pago de Recibo de Agua en Línea – Quillabamba",
    template: "%s | EPS EMAQ S.A.",
  },
  description:
    "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco. Pago rápido, seguro y sin filas desde cualquier dispositivo.",
  applicationName: "EPS EMAQ S.A.",
  category: "Servicios públicos de agua y alcantarillado",
  themeColor: "#0057a8",
  colorScheme: "light",
  keywords: [
    "EPS EMAQ",
    "pago recibo agua Quillabamba",
    "agua potable La Convención",
    "pago en línea agua Cusco",
    "consultar deuda agua EMAQ",
    "EMAQ Quillabamba",
    "servicio agua potable",
    "EPS Quillabamba",
    "agua Cusco",
    "pagar recibo agua",
    "deuda agua Quillabamba",
    "tarjetas VISA Mastercard",
    "Yape Plin banca móvil",
    "tarifas agua potable",
    "cortes servicio agua",
  ],
  authors: [{ name: "EPS EMAQ S.A." }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-PE": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "EPS EMAQ S.A.",
    title: "EPS EMAQ S.A. - Quillabamba",
    description:
      "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco. Pago rápido, seguro y sin filas.",
    locale: "es_PE",
    alternateLocale: ["es_419", "es"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EPS EMAQ S.A. – Pago de Agua en Línea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EPS EMAQ S.A. - Quillabamba",
    description:
      "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": "https://epsemaq.epsagua.com",
  name: "EPS EMAQ S.A.",
  alternateName: "Empresa Prestadora de Servicios de Saneamiento EMAQ",
  url: "https://epsemaq.epsagua.com",
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/slide-01.jpg`,
  priceRange: "Pago de recibo de agua en línea",
  currenciesAccepted: "PEN",
  paymentAccepted: "Tarjeta de crédito, débito, Yape y banca móvil",
  description:
    "EPS EMAQ S.A. brinda servicios de agua potable y alcantarillado en Quillabamba, La Convención, Cusco.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Nicanor Larrea N° 337",
    addressLocality: "Quillabamba",
    addressRegion: "Cusco",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.8635,
    longitude: -72.6929,
  },
  telephone: "+51973598606",
  email: "consultas@epsemaq.com.pe",
  openingHours: "Mo-Fr 08:00-16:00",
  areaServed: [
    {
      "@type": "Place",
      name: "Quillabamba",
      address: { "@type": "PostalAddress", addressLocality: "Quillabamba", addressRegion: "Cusco", addressCountry: "PE" },
    },
    {
      "@type": "Place",
      name: "La Convención",
      address: { "@type": "PostalAddress", addressLocality: "La Convención", addressRegion: "Cusco", addressCountry: "PE" },
    },
  ],
  sameAs: [
    "https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218",
    "https://www.instagram.com/eps_emaq_sa",
    "https://www.youtube.com/@EPSEMAQS.A",
    "https://www.tiktok.com/@eps.emaq.s.a",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios en Línea",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consulta de deuda de agua",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pago de recibo de agua en línea",
        },
      },
    ],
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "EPS EMAQ S.A. | Pago de Recibo de Agua en Línea",
  url: BASE_URL,
  publisher: {
    "@id": "https://epsemaq.epsagua.com",
  },
  inLanguage: "es-PE",
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo consulto mi deuda de agua en EPS EMAQ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ingresa tu número de suministro en la sección de consulta de la página y el sistema mostrará al instante el monto de tu deuda y el detalle de tus recibos pendientes.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo pago mi recibo de agua en línea?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consulta tu deuda con tu número de suministro, acepta los términos y condiciones, y paga con tarjeta de débito, crédito o billetera digital. Recibirás tu comprobante por correo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tarjetas acepta EPS EMAQ para el pago en línea?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aceptamos tarjetas de débito y crédito VISA y Mastercard, así como billeteras digitales como Yape y banca móvil.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde encuentro mi número de suministro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El número de suministro aparece en la parte superior de tu recibo de agua potable de EPS EMAQ, junto a tus datos de cliente.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo pagar tu recibo de agua de EPS EMAQ en línea",
  description:
    "Pasos para consultar tu deuda y pagar tu recibo de agua potable de EPS EMAQ desde cualquier dispositivo.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa tu N° de suministro",
      text: "Encuéntralo en la parte superior de tu último recibo físico.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Consulta tu deuda",
      text: "Revisa el monto a pagar y los detalles de tu consumo del mes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Acepta los términos",
      text: "Lee y acepta los términos y condiciones del servicio de pago en línea.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Paga con tarjeta o billetera",
      text: "Ingresa los datos de tu tarjeta VISA o escanea el QR y confirma el pago.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={`h-full antialiased ${poppins.variable} ${inter.variable}`} style={{ colorScheme: 'light' }}>
      <head>
        <meta name="geo.region" content="PE-CUS" />
        <meta name="geo.placename" content="Quillabamba, La Convención, Cusco, Perú" />
        <meta name="geo.position" content="-12.8635;-72.6929" />
        <meta name="ICBM" content="-12.8635, -72.6929" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </head>
      <body className="min-h-full flex flex-col text-[#1e293b]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

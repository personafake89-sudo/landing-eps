import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickMarquee from "@/components/QuickMarquee";
import WhatsAppRecibo from "@/components/WhatsAppRecibo";
import QuienesSomos from "@/components/QuienesSomos";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Noticias from "@/components/Noticias";
import NecesitasAyuda from "@/components/NecesitasAyuda";
import EnlacesInteres from "@/components/EnlacesInteres";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import AvisoModal from "@/components/AvisoModal";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <BackgroundSlideshow>
      {/* H1 estático para crawlers; el Hero visual lo oculta visualmente */}
      <h1 className="sr-only">
        EPS EMAQ S.A. – Pago de Recibo de Agua en Línea – Quillabamba, La Convención, Cusco
      </h1>
      <AvisoModal />
      <Navbar />
      <Hero />
      <QuickMarquee />
      <WhatsAppRecibo />
      <QuienesSomos />
      <HowItWorks />
      <Stats />
      <Services />
      <Noticias />
      <NecesitasAyuda />
      <EnlacesInteres />
      <Footer />
      <FloatingButtons />
    </BackgroundSlideshow>
  );
}

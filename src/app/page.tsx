import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import PaymentSection from "@/components/PaymentSection";
import Footer from "@/components/Footer";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

export default function Home() {
  return (
    <BackgroundSlideshow>
      <Navbar />
      <Hero />
      <HowItWorks />
      <PaymentSection />
      <Services />
      <Footer />
    </BackgroundSlideshow>
  );
}

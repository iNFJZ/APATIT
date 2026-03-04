import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChoose from "@/components/sections/WhyChoose";
import ClientsSection from "@/components/sections/Clients";
import Products from "@/components/sections/Products";
import News from "@/components/sections/News";
import ContactCta from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <ClientsSection />
        <Products />
        <News />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-paper">
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <About />
      <Leadership />
      <FAQ />
      <Footer />
    </main>
  );
}

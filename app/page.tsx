import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Services } from "@/app/components/Services";
import { AuditCta } from "@/app/components/AuditCta";
import { About } from "@/app/components/About";
import { References } from "@/app/components/References";
import { Faq } from "@/app/components/Faq";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <AuditCta />
        <About />
        <References />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

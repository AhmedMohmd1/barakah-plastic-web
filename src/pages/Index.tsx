
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import About from '@/components/About';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const CLIENT_MARKS = ['INDUSTRIAL_CO', 'GLOBAL_LOGISTICS', 'PRIME_PACK', 'ECO_STORE'];

const Index = () => {
  return (
    <div className="min-h-screen font-tajawal bg-background">
      <Navbar />
      <Hero />
      <ValueProposition />

      <section aria-label="عملاؤنا" className="bg-card/50 border-y border-primary/5 py-6">
        <div className="container-custom flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {CLIENT_MARKS.map((mark) => (
            <span
              key={mark}
              className="font-sora font-black text-lg md:text-2xl tracking-tighter text-primary/40 grayscale"
            >
              {mark}
            </span>
          ))}
          <div className="flex flex-col items-center">
            <div className="font-sora font-extrabold text-xl text-secondary leading-none">500+</div>
            <div className="text-[10px] font-bold text-primary-light uppercase tracking-widest mt-1">
              عملاء حول العالم
            </div>
          </div>
        </div>
      </section>

      <About />
      <Products />
      <Features />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;

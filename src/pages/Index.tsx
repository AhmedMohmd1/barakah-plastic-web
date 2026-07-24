
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

const Index = () => {
  return (
    <div className="min-h-screen font-tajawal bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        تخطَّ إلى المحتوى
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ValueProposition />

        {/* عملاؤنا — TODO: أضِف شعارات العملاء الحقيقية هنا عند توفرها */}
        <section aria-label="عملاؤنا" className="bg-card/50 border-y border-primary/5 py-6">
          <div className="container-custom text-center">
            <p className="text-sm md:text-base font-semibold text-primary-light font-tajawal">
              نفخر بخدمة عملائنا في مختلف المحافظات منذ عام 2011
            </p>
          </div>
        </section>

        <About />
        <Products />
        <Features />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;

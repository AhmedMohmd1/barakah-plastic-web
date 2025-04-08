
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen font-tajawal">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Features />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 min-h-[85vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="heading-1 text-primary mb-4">
              البركة بلاست
            </h1>
            <p className="text-xl font-bold text-secondary mb-2">
              صناعة أكياس البلاستيك بجودة عالية
            </p>
            <p className="text-gray-700 mb-8 text-lg">
              نقدم لكم أجود أنواع الأكياس البلاستيكية بتقنيات حديثة وجودة فائقة منذ عام 2011
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-dark font-medium">
                تواصل معنا
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-medium">
                استعرض منتجاتنا
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-slide-from-right">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-30 blur-xl"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1618477462146-050d2767eac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80" 
                  alt="أكياس البركة بلاست" 
                  className="w-full h-auto object-cover max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

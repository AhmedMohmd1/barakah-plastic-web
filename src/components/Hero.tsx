
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-primary/10"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6 animate-fade-in">
              <h1 className="heading-1 text-primary">
                البركة بلاست
              </h1>
              <p className="text-xl font-bold text-secondary mb-2">
                صناعة أكياس البلاستيك بجودة عالية
              </p>
              <p className="text-gray-700 text-lg">
                نقدم لكم أجود أنواع الأكياس البلاستيكية بتقنيات حديثة وجودة فائقة منذ عام 2011
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary-dark font-medium rounded-lg">
                  تواصل معنا
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-medium rounded-lg">
                  استعرض منتجاتنا
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-slide-from-right">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-xl"></div>
              <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
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

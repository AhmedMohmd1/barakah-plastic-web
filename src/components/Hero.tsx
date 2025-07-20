
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
        <img 
          src="/images/hero.jpeg" 
          alt="البركة بلاست" 
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="container-custom relative z-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6 animate-fade-in">
              <h1 className="heading-1 text-white drop-shadow-md">
                البركة بلاست
              </h1>
              <p className="text-xl font-bold text-secondary drop-shadow-md mb-2">
                صناعة أكياس البلاستيك بجودة عالية
              </p>
              <p className="text-white text-lg">
                نقدم لكم أجود أنواع الأكياس البلاستيكية بتقنيات حديثة وجودة فائقة منذ عام 2011
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary-dark font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  تواصل معنا
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('products')}
                  className="border-secondary bg-white/80 text-secondary hover:bg-secondary/10 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  استعرض منتجاتنا
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 md:flex justify-center md:justify-end hidden">
            {/* Hidden on mobile for better UX */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

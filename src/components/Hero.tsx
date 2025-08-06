import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    "/images/hero.jpeg",
    "/images/canvas.jpeg", 
    "/images/plasticbag.jpeg",
    "/images/solfan2.jpeg"
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  return <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          {heroImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`البركة بلاست ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-90' : 'opacity-0'
              }`}
            />
          ))}
          
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
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
                <Button size="lg" onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary-dark font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  تواصل معنا
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('products')} className="border-secondary bg-white/80 text-secondary hover:bg-secondary/10 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
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
    </section>;
};
export default Hero;
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
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
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);
  return <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Carousel 
          className="w-full h-full" 
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <img 
                  src={image} 
                  alt={`البركة بلاست ${index + 1}`} 
                  className="w-full h-full object-cover opacity-90" 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
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
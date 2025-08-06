
import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    "/images/hero.jpeg",
    "/images/canvas.jpeg", 
    "/images/plasticbag.jpeg",
    "/images/softBag1.png",
    "/images/ziplockBag.jpg"
  ];

  const scrollToQuote = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          {heroImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`البركة بلاست ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-90' : 'opacity-0'
              }`}
            />
          ))}
          
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
            aria-label="الصورة التالية"
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
              aria-label={`اذهب إلى الصورة ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            البركة بلاست
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
            رائدة في صناعة الأكياس البلاستيكية والحلول التعبئة والتغليف المبتكرة
          </p>
          <Button 
            size="lg" 
            onClick={scrollToQuote}
            className="animate-fade-in-up delay-300 text-lg px-8 py-3"
          >
            طلب عرض سعر
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React, { useEffect, useState, useCallback } from 'react';
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

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`البركة بلاست ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-50' : 'opacity-0'
            }`}
          />
        ))}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
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

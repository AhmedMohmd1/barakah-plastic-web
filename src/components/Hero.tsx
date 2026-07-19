
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone } from 'lucide-react';

const HERO_IMAGES = [
  "/images/hero.webp",
  "/images/canvas.webp", 
  "/images/plasticbag.webp",
  "/images/softBag1.webp",
  "/images/ziplockBag.webp",
] as const;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Only mount images that have been shown (plus the next one, preloaded) —
  // avoids shipping all slider images on first paint
  const [mountedSlides, setMountedSlides] = useState<Set<number>>(() => new Set([0, 1]));

  useEffect(() => {
    setMountedSlides((prev) => {
      const next = (currentSlide + 1) % HERO_IMAGES.length;
      if (prev.has(currentSlide) && prev.has(next)) return prev;
      const updated = new Set(prev);
      updated.add(currentSlide);
      updated.add(next);
      return updated;
    });
  }, [currentSlide]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) =>
          mountedSlides.has(index) ? (
            <img
              key={index}
              src={image}
              alt={`البركة بلاست ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null
        )}
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/75 to-primary/60"></div>
        {/* Subtle pattern overlay */}
        <div className="dot-pattern-overlay opacity-[0.03]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 mount-fade-in">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">منذ 2011 — جودة لا تُضاهى</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cairo text-white mb-6 leading-snug mount-fade-in-up">
            صناعة أكياس بلاستيكية
            <br />
            <span className="text-secondary">عالية الجودة</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/85 mb-10 leading-relaxed max-w-2xl mount-fade-in-up mount-delay-200">
            نقدم حلول تعبئة وتغليف مبتكرة تلبي احتياجات الأعمال بأعلى معايير الجودة. 
            أحجام مخصصة، متانة عالية، وتسليم سريع.
          </p>
          
          <div className="flex flex-wrap gap-4 mount-fade-in-up mount-delay-300">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('products')}
              className="group bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/50 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
            >
              تصفح المنتجات
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="group border-2 border-white/30 text-white font-semibold hover:bg-white/15 hover:border-white/50 text-lg px-10 py-6 rounded-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
            >
              <Phone className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-bounce" />
              تواصل معنا
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/15 mount-fade-in-up mount-delay-500">
            <div>
              <div className="text-3xl font-bold font-cairo text-white">+12</div>
              <div className="text-white/60 text-sm mt-1">سنة خبرة</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-cairo text-white">+500</div>
              <div className="text-white/60 text-sm mt-1">عميل سعيد</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-cairo text-white">+5</div>
              <div className="text-white/60 text-sm mt-1">خطوط إنتاج</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-secondary' : 'w-4 bg-white/40'
            }`}
            aria-label={`صورة ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

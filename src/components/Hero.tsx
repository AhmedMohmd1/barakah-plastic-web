import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';

const HERO_IMAGES = [
  "/images/hero.webp",
  "/images/canvas.webp",
  "/images/plasticbag.webp",
  "/images/softBag1.webp",
  "/images/ziplockBag.webp",
] as const;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mountedSlides, setMountedSlides] = useState<Set<number>>(() => new Set([0, 1]));
  const [isPaused, setIsPaused] = useState(false);

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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  // Auto-advance is a progressive enhancement: pause on hover/focus, and never
  // auto-rotate for visitors who prefer reduced motion.
  useEffect(() => {
    if (isPaused) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-background pt-6 pb-8 md:pt-8 md:pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main navy content card */}
          <div className="lg:col-span-8 bg-primary text-primary-foreground rounded-[2rem] p-8 lg:p-14 relative overflow-hidden border border-white/5 min-h-[520px] flex flex-col justify-center">
            {/* Blueprint grid overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-secondary/30 m-8 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-secondary/10 border-r-4 border-secondary text-white/90 text-xs md:text-sm font-bold mb-8 tracking-wide font-tajawal">
                منذ 2011 — جودة صناعية معتمدة
              </div>

              <h1 className="font-cairo font-extrabold text-white leading-[1.2] text-4xl md:text-5xl lg:text-6xl mb-6">
                صناعة أكياس بلاستيكية
                <br />
                <span className="text-secondary border-b-4 border-secondary/20">عالية الجودة</span>
              </h1>

              <p className="text-base md:text-lg text-white/70 max-w-2xl mb-8 leading-relaxed font-tajawal">
                مصنع متخصص في الأكياس البلاستيكية والشنط المطبوعة بشعارك — لطلبات الجملة
                والكميات الكبيرة، مع تسليم لكل المحافظات.
              </p>

              {/* TODO: استبدل الحد الأدنى للطلب بالقيمة الحقيقية عند توفرها */}
              <div className="inline-flex items-center gap-2 mb-10 text-white/80 text-sm font-tajawal">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                <span>أقل كمية للطلب تبدأ من الجملة — تواصل معنا لمعرفة التفاصيل</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('products')}
                  className="group bg-secondary hover:bg-secondary/90 text-white px-8 md:px-10 py-4 rounded-xl font-bold text-base md:text-lg transition-all hover:shadow-[0_0_30px_hsl(var(--secondary)/0.4)] flex items-center gap-3"
                >
                  <span>تصفح المنتجات</span>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-white/15 text-white px-8 md:px-10 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white/5 transition-all"
                >
                  تواصل معنا
                </button>
              </div>
            </div>
          </div>

          {/* Visual + stats sidecard */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div
              className="relative h-64 lg:h-full min-h-[320px] rounded-[2rem] overflow-hidden border border-primary/10 bg-card shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={() => setIsPaused(false)}
            >
              {HERO_IMAGES.map((image, index) =>
                mountedSlides.has(index) ? (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ) : null
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute bottom-6 right-6 left-6 z-10">
                <div className="flex flex-col gap-2">
                  <div className="h-1 w-12 bg-secondary" />
                  <span className="text-white font-bold text-lg font-cairo">خطوط إنتاج حديثة</span>
                  {/* TODO: استبدل هذا بقيمة يمكن التحقق منها (مثل الطاقة الإنتاجية أو شهادة جودة) */}
                  <span className="text-white/70 text-sm font-tajawal">طاقة إنتاجية كبيرة لتلبية طلبات الجملة</span>
                </div>
              </div>

              {/* Slide controls — let users jump to / pause on any slide */}
              <div
                className="absolute top-5 left-5 z-20 flex items-center gap-2"
                role="group"
                aria-label="التنقل بين صور المصنع"
              >
                {HERO_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`عرض الصورة ${index + 1} من ${HERO_IMAGES.length}`}
                    aria-current={index === currentSlide}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                      index === currentSlide ? 'w-6 bg-secondary' : 'w-2.5 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-5 border border-primary/5 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="font-sora font-extrabold text-3xl text-secondary">12+</div>
                <div className="text-primary-light font-bold text-xs mt-1 font-tajawal">سنة خبرة</div>
              </div>
              <div className="bg-background rounded-2xl p-5 border border-secondary/20 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="font-sora font-extrabold text-3xl text-primary">5+</div>
                <div className="text-primary-light font-bold text-xs mt-1 font-tajawal">خطوط إنتاج</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

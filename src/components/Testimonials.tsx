
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "محمد أحمد",
    role: "صاحب سوبر ماركت",
    content: "تعاملت مع البركة بلاست منذ أكثر من سنتين، جودة الأكياس ممتازة والتعامل محترم جداً. أنصح أي صاحب متجر بالتعامل معهم.",
  },
  {
    id: 2,
    name: "سارة محمود",
    role: "مديرة مشتريات",
    content: "الالتزام بمواعيد التسليم والمرونة في التعامل من أهم ما يميز البركة بلاست. منتجاتهم تلبي احتياجات شركتنا بشكل كامل.",
  },
  {
    id: 3,
    name: "أحمد خالد",
    role: "صاحب مصنع",
    content: "أسعار منافسة وجودة عالية، هذا ما وجدته في التعامل مع البركة بلاست. التعامل مع إدارة الشركة سهل وميسر.",
  },
  {
    id: 4,
    name: "فاطمة علي",
    role: "صاحبة متجر أونلاين",
    content: "الأكياس المطبوعة من البركة بلاست أضافت قيمة لعلامتنا التجارية. جودة الطباعة والخامات رائعة.",
  },
];

const Testimonials = () => {
  const ref = useScrollAnimation();

  return (
    <section id="testimonials" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="text-secondary font-semibold text-sm tracking-wide mb-2 block">ماذا يقول عملاؤنا</span>
          <h2 className="heading-2 text-foreground mb-4">آراء العملاء</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نفخر بثقة عملائنا الكرام ونسعى دائماً لتحقيق رضاهم من خلال خدماتنا ومنتجاتنا
          </p>
        </div>

        <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "rtl",
            }}
            plugins={[
              Autoplay({ delay: 5000, stopOnInteraction: true }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="modern-card h-full">
                    <CardContent className="p-7 flex flex-col h-full">
                      <QuoteIcon className="h-8 w-8 text-secondary/40 mb-4" />
                      <p className="text-foreground/80 mb-6 flex-grow leading-relaxed">{testimonial.content}</p>
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center font-bold font-cairo text-lg shrink-0">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-6">
              <CarouselPrevious className="relative left-0 right-auto h-9 w-9 rounded-full border-border hover:bg-secondary hover:text-white hover:border-secondary transition-colors" />
              <CarouselNext className="relative right-0 h-9 w-9 rounded-full border-border hover:bg-secondary hover:text-white hover:border-secondary transition-colors" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "محمد أحمد",
    role: "صاحب سوبر ماركت",
    content: "تعاملت مع البركة بلاست منذ أكثر من سنتين، جودة الأكياس ممتازة والتعامل محترم جداً. أنصح أي صاحب متجر بالتعامل معهم.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "سارة محمود",
    role: "مديرة مشتريات",
    content: "الالتزام بمواعيد التسليم والمرونة في التعامل من أهم ما يميز البركة بلاست. منتجاتهم تلبي احتياجات شركتنا بشكل كامل.",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "أحمد خالد",
    role: "صاحب مصنع",
    content: "أسعار منافسة وجودة عالية، هذا ما وجدته في التعامل مع البركة بلاست. التعامل مع إدارة الشركة سهل وميسر.",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "فاطمة علي",
    role: "صاحبة متجر أونلاين",
    content: "الأكياس المطبوعة من البركة بلاست أضافت قيمة لعلامتنا التجارية. جودة الطباعة والخامات رائعة.",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">آراء العملاء</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نفخر بثقة عملائنا الكرام ونسعى دائماً لتحقيق رضاهم من خلال خدماتنا ومنتجاتنا
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <QuoteIcon className="h-8 w-8 text-secondary/40 mb-4" />
                    <p className="text-gray-700 mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center mt-auto">
                      {testimonial.image && (
                        <div className="ml-3 shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-6">
            <CarouselPrevious className="relative left-0 right-auto h-8 w-8 rounded-full" />
            <CarouselNext className="relative right-0 h-8 w-8 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;

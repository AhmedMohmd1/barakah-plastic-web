
import React from 'react';
import { Ruler, Shield, Truck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const VALUE_ITEMS = [
  {
    icon: Ruler,
    title: 'أحجام مخصصة',
    description: 'نوفر أكياس بأحجام وسماكات حسب متطلباتك مع إمكانية الطباعة بشعارك',
  },
  {
    icon: Shield,
    title: 'متانة عالية',
    description: 'مصنوعة من أجود الخامات لضمان التحمل والاستخدام الأمثل في مختلف الظروف',
  },
  {
    icon: Truck,
    title: 'تسليم سريع',
    description: 'نلتزم بمواعيد التسليم المحددة مع توصيل لجميع المحافظات',
  },
] as const;

const ValueProposition = () => {
  const ref = useScrollAnimation();

  return (
    <section className="relative -mt-16 z-20 pb-8" ref={ref}>
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-6">
          {VALUE_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`scroll-animate bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-secondary/10 p-4 rounded-xl inline-flex mb-5">
                <item.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-bold font-cairo text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;

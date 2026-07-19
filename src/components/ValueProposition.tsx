import React from 'react';
import { Ruler, Shield, Truck, ChevronLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const VALUE_ITEMS = [
  {
    icon: Ruler,
    title: 'أحجام مخصصة',
    description: 'تخصيص كامل للأبعاد والسماكة بما يتناسب مع مواصفات منتجاتكم التقنية الدقيقة.',
    hint: 'المواصفات الفنية',
  },
  {
    icon: Shield,
    title: 'متانة عالية',
    description: 'استخدام بوليمرات عالية الكثافة تضمن مقاومة فائقة للتمزق والظروف البيئية القاسية.',
    hint: 'تقارير الاختبار',
  },
  {
    icon: Truck,
    title: 'تسليم سريع',
    description: 'نظام لوجستي متطور يضمن معالجة الطلبات الكبيرة وشحنها في جداول زمنية قياسية.',
    hint: 'خريطة التوصيل',
  },
] as const;

const ValueProposition = () => {
  const ref = useScrollAnimation();

  return (
    <section className="bg-background pb-10" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="scroll-animate group relative overflow-hidden bg-card p-8 rounded-[1.5rem] border border-primary/5 shadow-sm hover:border-secondary transition-all"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[4rem] -mr-12 -mt-12 group-hover:bg-secondary/10 transition-colors" />
              <div className="text-secondary mb-6 relative">
                <item.icon className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <h3 className="font-cairo font-bold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-primary-light/70 leading-relaxed font-tajawal">
                {item.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{item.hint}</span>
                <ChevronLeft className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;

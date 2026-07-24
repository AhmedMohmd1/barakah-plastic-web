
import React from 'react';
import { Ruler, Shield, Truck, Palette, Zap, MapPin, ThumbsUp, Factory } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DIFFERENTIATORS = [
  { icon: Ruler, title: 'أحجام مخصصة', description: 'تخصيص كامل للأبعاد والسماكة بما يتناسب مع مواصفات منتجاتكم التقنية الدقيقة.' },
  { icon: Shield, title: 'متانة عالية', description: 'استخدام بوليمرات عالية الكثافة تضمن مقاومة فائقة للتمزق والظروف البيئية القاسية.' },
  { icon: Truck, title: 'تسليم سريع', description: 'نظام لوجستي متطور يضمن معالجة الطلبات الكبيرة وشحنها في جداول زمنية قياسية.' },
] as const;

const CAPABILITIES = [
  { icon: Palette, title: 'طباعة شعارك', description: 'نطبع شعار علامتك التجارية على الأكياس بألوان متعددة وجودة طباعة عالية' },
  { icon: Zap, title: 'تقنيات حديثة', description: 'نعتمد على أحدث التقنيات والآلات في صناعة الأكياس البلاستيكية' },
  { icon: MapPin, title: 'تغطية لكل المحافظات', description: 'نوصل طلباتك إلى مختلف محافظات الجمهورية' },
  { icon: ThumbsUp, title: 'أسعار تنافسية', description: 'نقدم أسعار مناسبة وتنافسية مع الحفاظ على مستوى الجودة' },
  { icon: Factory, title: 'طاقة إنتاجية كبيرة', description: 'لدينا القدرة على تلبية الطلبات الكبيرة في وقت قياسي' },
] as const;

const Features = () => {
  const ref = useScrollAnimation();

  return (
    <section id="features" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="eyebrow">لماذا نحن</span>
          <h2 className="heading-2 text-foreground mb-4">مميزاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ما يميزنا عن غيرنا هو التزامنا بالجودة والتطوير المستمر لمنتجاتنا لتلبية احتياجات عملائنا
          </p>
        </div>

        <h3 className="font-cairo font-bold text-lg text-primary mb-5 scroll-animate">ما يميز منتجاتنا</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {DIFFERENTIATORS.map((item, index) => (
            <Card
              key={item.title}
              variant="interactive"
              className="scroll-animate overflow-hidden p-6 md:p-8 group"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="bg-secondary/10 group-hover:bg-secondary/15 p-4 rounded-xl inline-flex mb-5 transition-colors duration-300">
                <item.icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-foreground">{item.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        <h3 className="font-cairo font-bold text-lg text-primary mb-5 scroll-animate">خدماتنا وإمكانياتنا</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((feature, index) => (
            <Card
              key={feature.title}
              variant="interactive"
              className="scroll-animate overflow-hidden p-6 md:p-8 group"
              style={{ transitionDelay: `${(index + 3) * 75}ms` }}
            >
              <div className="bg-secondary/10 group-hover:bg-secondary/15 p-4 rounded-xl inline-flex mb-5 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-bold text-xl mb-3 text-foreground">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="scroll-animate mt-16 bg-gradient-to-l from-primary to-primary-dark p-10 md:p-14 rounded-2xl text-white text-center relative overflow-hidden">
          <div className="dot-pattern-overlay opacity-[0.04]"></div>
          <div className="relative z-10">
            <h3 className="heading-3 mb-4">هل تبحث عن أكياس بلاستيكية بجودة عالية؟</h3>
            <p className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              نحن في البركة بلاست نسعى دائمًا لتقديم أفضل المنتجات التي تلبي احتياجاتكم.
              تواصل معنا الآن للحصول على عرض سعر خاص!
            </p>
            <a
              href="#contact"
              className="inline-block bg-secondary text-white font-bold py-3.5 px-10 rounded-xl hover:bg-secondary-dark active:bg-secondary-dark transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              تواصل معنا الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;


import React from 'react';
import { Shield, Zap, Truck, Recycle, ThumbsUp, Factory } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Features = () => {
  const ref = useScrollAnimation();

  const features = [
    { icon: Shield, title: 'جودة عالية', description: 'نستخدم أجود أنواع المواد الخام لإنتاج أكياس متينة ذات جودة عالية' },
    { icon: Zap, title: 'تقنيات حديثة', description: 'نعتمد على أحدث التقنيات والآلات في صناعة الأكياس البلاستيكية' },
    { icon: Truck, title: 'توصيل سريع', description: 'نوفر خدمة توصيل سريعة لكافة المحافظات' },
    { icon: Recycle, title: 'مواد قابلة للتحلل', description: 'نقدم خيارات من الأكياس القابلة للتحلل' },
    { icon: ThumbsUp, title: 'أسعار تنافسية', description: 'نقدم أسعار مناسبة وتنافسية مع الحفاظ على مستوى الجودة' },
    { icon: Factory, title: 'طاقة إنتاجية كبيرة', description: 'لدينا القدرة على تلبية الطلبات الكبيرة في وقت قياسي' },
  ];

  return (
    <section id="features" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="text-secondary font-semibold text-sm tracking-wide mb-2 block">لماذا نحن</span>
          <h2 className="heading-2 text-foreground mb-4">مميزاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ما يميزنا عن غيرنا هو التزامنا بالجودة والتطوير المستمر لمنتجاتنا لتلبية احتياجات عملائنا
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="scroll-animate modern-card p-8 hover:-translate-y-1 group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="bg-secondary/10 group-hover:bg-secondary/15 p-4 rounded-xl inline-flex mb-5 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="scroll-animate mt-16 bg-gradient-to-l from-primary to-primary-dark p-10 md:p-14 rounded-2xl text-white text-center relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
          <div className="relative z-10">
            <h3 className="heading-3 mb-4">هل تبحث عن أكياس بلاستيكية بجودة عالية؟</h3>
            <p className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              نحن في البركة بلاست نسعى دائمًا لتقديم أفضل المنتجات التي تلبي احتياجاتكم.
              تواصل معنا الآن للحصول على عرض سعر خاص!
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-secondary text-white font-bold py-3.5 px-10 rounded-xl hover:bg-secondary-dark transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl"
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

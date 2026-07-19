import React from 'react';
import { CheckCircle, Award, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="eyebrow">تعرّف علينا</span>
          <h2 className="heading-2 text-foreground mb-4">من نحن</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            البركة بلاست مصنع متخصص في صناعة الأكياس البلاستيكية بمختلف أنواعها، تأسس عام 2011 وقدم أجود المنتجات على مدار السنين
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            {[
              { title: 'قصتنا', text: 'تأسست شركة البركة بلاست في عام 2011 بهدف تقديم منتجات بلاستيكية ذات جودة عالية تلبي احتياجات السوق المحلي. بدأنا بخط إنتاج واحد، وتوسعنا على مر السنين ليصبح لدينا مصنع متكامل يضم أحدث الآلات والمعدات.' },
              { title: 'رؤيتنا', text: 'نسعى لأن نكون الاختيار الأول في سوق الأكياس البلاستيكية في المنطقة، وأن نقدم منتجات تجمع بين الجودة العالية والاستدامة البيئية.' },
              { title: 'رسالتنا', text: 'التزامنا الدائم هو تقديم منتجات تلبي احتياجات عملائنا وتتجاوز توقعاتهم من حيث الجودة والأسعار، مع الحرص على اتباع أفضل الممارسات في الصناعة.' },
            ].map((item, i) => (
              <Card key={i} variant="elevated" className="scroll-animate p-6 md:p-8" style={{ transitionDelay: `${i * 75}ms` }}>
                <h3 className="heading-3 text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: CheckCircle, title: 'خبرة أكثر من 12 عام', desc: 'نمتلك خبرة طويلة في صناعة الأكياس البلاستيكية بمختلف أنواعها وأحجامها منذ عام 2011.' },
              { icon: Award, title: 'جودة لا مثيل لها', desc: 'نستخدم أجود أنواع المواد الخام في صناعة منتجاتنا، ونتبع أعلى معايير الجودة.' },
              { icon: Clock, title: 'تسليم سريع', desc: 'نلتزم بمواعيد التسليم المحددة، ونحرص على توفير المنتجات في الوقت المناسب لعملائنا.' },
            ].map((item, i) => (
              <Card key={i} variant="interactive" className="scroll-animate overflow-hidden p-6 md:p-8 flex items-start gap-4" style={{ transitionDelay: `${(i + 3) * 75}ms` }}>
                <div className="bg-secondary/10 p-3 rounded-xl shrink-0">
                  <item.icon className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;

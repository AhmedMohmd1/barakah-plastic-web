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
            من الأكياس المطبوعة بشعارك إلى أكياس القماش والسلوفان والزيبلوك — نصنع هذه
            الفئات الخمس منذ عام 2011 بجودة تلبي احتياجات عملائنا.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            {[
              { title: 'قصتنا', text: 'تأسست البركة بلاست عام 2011 بخط إنتاج واحد، وتوسعنا لنمتلك مصنعًا متكاملًا بأحدث المعدات.' },
              { title: 'رؤيتنا', text: 'أن نكون الاختيار الأول في سوق الأكياس البلاستيكية بالمنطقة.' },
              { title: 'رسالتنا', text: 'تلبية احتياجات عملائنا وتجاوز توقعاتهم جودةً وسعرًا.' },
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
              { icon: Award, title: 'التزام بالجودة', desc: 'نستخدم مواد خام موثوقة ونراجع كل دفعة إنتاج قبل التسليم.' },
              { icon: Clock, title: 'شراكة طويلة الأمد', desc: 'نبني علاقات ثقة مع عملائنا عبر الالتزام والمصداقية ومتابعة ما بعد التسليم.' },
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


import React from 'react';
import { MessageSquareText, FileCheck2, ClipboardCheck, Factory, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'إرسال الطلب',
    description: 'تواصل معنا عبر النموذج أو واتساب وأخبرنا بالمنتج والكمية والمواصفات التي تحتاجها.',
  },
  {
    icon: FileCheck2,
    title: 'استلام عرض السعر',
    description: 'يراجع فريقنا طلبك ويرسل لك عرض سعر مفصل يناسب مواصفاتك وكميتك.',
  },
  {
    icon: ClipboardCheck,
    title: 'تأكيد الطلب',
    description: 'بعد موافقتك على العرض، نؤكد تفاصيل الطلب ونبدأ الإجراءات.',
  },
  {
    icon: Factory,
    title: 'الإنتاج',
    description: 'يدخل طلبك خط الإنتاج — يتم تحديد موعد التسليم عند تأكيد الطلب.',
  },
  {
    icon: Truck,
    title: 'التسليم',
    description: 'نوصل طلبك جاهزًا إلى موقعك في أي محافظة بجمهورية مصر العربية.',
  },
] as const;

const HowItWorks = () => {
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="eyebrow">خطوة بخطوة</span>
          <h2 className="heading-2 text-foreground mb-4">كيف نعمل</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            من أول تواصل معنا إلى استلام طلبك — إليك رحلة الطلب في خمس خطوات واضحة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((step, index) => (
            <Card
              key={step.title}
              variant="interactive"
              className="scroll-animate overflow-hidden p-6 text-center relative"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="absolute top-4 left-4 font-cairo font-extrabold text-3xl text-secondary/10">
                {index + 1}
              </div>
              <div className="bg-secondary/10 p-4 rounded-xl inline-flex mb-5 relative">
                <step.icon className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

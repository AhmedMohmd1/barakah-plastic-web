
import React from 'react';
import { Shield, Zap, Truck, Recycle, ThumbsUp, Factory } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-secondary" />,
      title: 'جودة عالية',
      description: 'نستخدم أجود أنواع المواد الخام لإنتاج أكياس متينة ذات جودة عالية'
    },
    {
      icon: <Zap className="h-10 w-10 text-secondary" />,
      title: 'تقنيات حديثة',
      description: 'نعتمد على أحدث التقنيات والآلات في صناعة الأكياس البلاستيكية'
    },
    {
      icon: <Truck className="h-10 w-10 text-secondary" />,
      title: 'توصيل سريع',
      description: 'نوفر خدمة توصيل سريعة لكافة المحافظات'
    },
    {
      icon: <Recycle className="h-10 w-10 text-secondary" />,
      title: 'مواد قابلة للتحلل',
      description: 'نقدم خيارات  من الأكياس القابلة للتحلل'
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-secondary" />,
      title: 'أسعار تنافسية',
      description: 'نقدم أسعار مناسبة وتنافسية مع الحفاظ على مستوى الجودة'
    },
    {
      icon: <Factory className="h-10 w-10 text-secondary" />,
      title: 'طاقة إنتاجية كبيرة',
      description: 'لدينا القدرة على تلبية الطلبات الكبيرة في وقت قياسي'
    }
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">مميزاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            ما يميزنا عن غيرنا هو التزامنا بالجودة والتطوير المستمر لمنتجاتنا لتلبية احتياجات عملائنا
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="modern-card p-8 hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="bg-secondary/10 p-4 rounded-full inline-flex mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-primary-light p-10 rounded-xl text-white text-center">
          <h3 className="heading-3 mb-4">هل تبحث عن أكياس بلاستيكية بجودة عالية؟</h3>
          <p className="text-white/90 mb-6 max-w-3xl mx-auto text-lg">
            نحن في البركة بلاست نسعى دائمًا لتقديم أفضل المنتجات التي تلبي احتياجاتكم.
            تواصل معنا الآن للحصول على عرض سعر خاص!
          </p>
          <div className="flex justify-center">
            <a 
              href="#contact" 
              className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary-dark transition-all duration-300"
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

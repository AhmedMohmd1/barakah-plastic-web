import React from 'react';
import { CheckCircle, Award, Clock } from 'lucide-react';
const About = () => {
  return <section id="about" className="section-padding bg-white rounded-md">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">من نحن</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            البركة بلاست مصنع متخصص في صناعة الأكياس البلاستيكية بمختلف أنواعها، تأسس عام 2011 وقدم أجود المنتجات على مدار السنين
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-xl">
              <h3 className="heading-3 text-primary mb-3">قصتنا</h3>
              <p className="text-gray-700">
                تأسست شركة البركة بلاست في عام 2011 بهدف تقديم منتجات بلاستيكية ذات جودة عالية تلبي احتياجات السوق المحلي. بدأنا بخط إنتاج واحد، وتوسعنا على مر السنين ليصبح لدينا مصنع متكامل يضم أحدث الآلات والمعدات.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl">
              <h3 className="heading-3 text-primary mb-3">رؤيتنا</h3>
              <p className="text-gray-700">
                نسعى لأن نكون الاختيار الأول في سوق الأكياس البلاستيكية في المنطقة، وأن نقدم منتجات تجمع بين الجودة العالية والاستدامة البيئية.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl">
              <h3 className="heading-3 text-primary mb-3">رسالتنا</h3>
              <p className="text-gray-700">
                التزامنا الدائم هو تقديم منتجات تلبي احتياجات عملائنا وتتجاوز توقعاتهم من حيث الجودة والأسعار، مع الحرص على اتباع أفضل الممارسات في الصناعة.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="card-shadow bg-white p-6 rounded-xl border border-muted flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">خبرة أكثر من 12 عام</h4>
                <p className="text-gray-600">
                  نمتلك خبرة طويلة في صناعة الأكياس البلاستيكية بمختلف أنواعها وأحجامها منذ عام 2011.
                </p>
              </div>
            </div>

            <div className="card-shadow bg-white p-6 rounded-xl border border-muted flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">جودة لا مثيل لها</h4>
                <p className="text-gray-600">
                  نستخدم أجود أنواع المواد الخام في صناعة منتجاتنا، ونتبع أعلى معايير الجودة.
                </p>
              </div>
            </div>

            <div className="card-shadow bg-white p-6 rounded-xl border border-muted flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">تسليم سريع</h4>
                <p className="text-gray-600">
                  نلتزم بمواعيد التسليم المحددة، ونحرص على توفير المنتجات في الوقت المناسب لعملائنا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
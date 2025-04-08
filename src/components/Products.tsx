
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'أكياس تسوق',
      description: 'أكياس تسوق متينة بمقاسات مختلفة مناسبة للمحلات التجارية والمطاعم',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
    },
    {
      id: 2,
      name: 'أكياس تغليف',
      description: 'أكياس تغليف شفافة وملونة لحماية المنتجات وتخزينها',
      image: 'https://images.unsplash.com/photo-1565384257472-2ada861d1ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
    },
    {
      id: 3,
      name: 'أكياس قمامة',
      description: 'أكياس قمامة قوية بأحجام مختلفة للاستخدام المنزلي والتجاري',
      image: 'https://images.unsplash.com/photo-1610963196817-7d1415647028?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
    },
    {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: 'https://images.unsplash.com/photo-1601661222035-fdd50d0d4b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
    },
  ];

  return (
    <section id="products" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">منتجاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة متنوعة من الأكياس البلاستيكية عالية الجودة التي تناسب مختلف الاحتياجات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card-shadow bg-white rounded-xl overflow-hidden border border-muted hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  المزيد من التفاصيل
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            استعرض جميع المنتجات
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;

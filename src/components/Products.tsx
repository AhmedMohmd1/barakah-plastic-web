
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductDetailModal from './ProductDetailModal';

const Products = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

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
    <section id="products" className="section-padding bg-gray-50">
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
              className="modern-card group"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-primary">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                  onClick={() => product.id === 4 ? setIsDetailModalOpen(true) : null}
                >
                  المزيد من التفاصيل
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-secondary hover:bg-secondary-dark rounded-lg">
            استعرض جميع المنتجات
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
        
        <ProductDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          language={language}
          toggleLanguage={toggleLanguage}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </section>
  );
};

export default Products;

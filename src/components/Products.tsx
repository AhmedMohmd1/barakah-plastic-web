
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductDetailModal from './ProductDetailModal';

const Products = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const openProductDetail = (productId: number) => {
    setSelectedProductId(productId);
    setIsDetailModalOpen(true);
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
      name: 'اكياس سلوفان بشريطه',
      description: 'أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم',
      image: 'public\\images\\slofan.png',
    },
    {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: 'public\\images\\pack 1.jpg',
    },
    {
      id: 5,
      name: 'شنط قماش',
      description: 'شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية',
      image: 'public\\images\\image.png',
    },
    {
      id: 6,
      name: 'اكياس ذات غالق - ziplock bags',
      description: 'أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات',
      image: 'public\\images\\ziplockBags.png',
    },
    {
      id: 7,
      name: 'Plastic spoons & forks',
      description: 'ملاعق وشوك وسكاكين بلاستيكية للاستخدام مرة واحدة',
      image: 'public\\images\\spoone.png',
    },
    {
      id: 8,
      name: 'شنط سوفت للمحلات الملابس',
      description: 'شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية',
      image: 'public\\images\\softBags.jpg',
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
                  className="w-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                  onClick={() => openProductDetail(product.id)}
                >
                  المزيد من التفاصيل
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-secondary hover:bg-secondary-dark rounded-lg py-3 px-6">
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
          productId={selectedProductId}
        />
      </div>
    </section>
  );
};

export default Products;

import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';
import ProductCard from './products/ProductCard';
import ViewToggle from './products/ViewToggle';
import ProductsSection from './products/ProductsSection';

const Products = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
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
      image: '/images/pack1.jpg', // Local image path
      badge: 'الأكثر مبيعاً',
    },
    {
      id: 2,
      name: 'أكياس تغليف',
      description: 'أكياس تغليف شفافة وملونة لحماية المنتجات وتخزينها',
      image: '',
    },
    {
      id: 3,
      name: 'اكياس سلوفان بشريطه',
      description: 'أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم',
      image: '/images/slofan.png', // Local image path
    },
    {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: '/images/pack1.jpg', // Local image path
    },
    {
      id: 5,
      name: 'شنط قماش',
      description: 'شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية',
      image: '/images/image.png', // Local image path
    },
    {
      id: 6,
      name: 'اكياس ذات غالق - ziplock bags',
      description: 'أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات',
      image: '/images/ziplockBags.png', // Local image path
    },
    {
      id: 7,
      name: 'Plastic spoons & forks',
      description: 'ملاعق وشوك وسكاكين بلاستيكية للاستخدام مرة واحدة',
      image: '/images/spoone.png', // Local image path
    },
    {
      id: 8,
      name: 'شنط سوفت للمحلات الملابس',
      description: 'شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية',
      image: '/images/softBags.jpg', // Local image path
    },
  ];

  return (
    <section id="products" className="section-padding bg-slate-100 py-[42px]">
      <div className="container-custom my-0 py-0 bg-slate-100">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">منتجاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة متنوعة من الأكياس البلاستيكية عالية الجودة التي تناسب مختلف الاحتياجات
          </p>
        </div>

        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />

        <ProductsSection viewMode={viewMode}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              hoveredProduct={hoveredProduct}
              onHover={setHoveredProduct}
              onViewDetails={openProductDetail}
            />
          ))}
        </ProductsSection>
        
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

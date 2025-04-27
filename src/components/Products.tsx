import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './products/ProductCard';
import ViewToggle from './products/ViewToggle';
import ProductsSection from './products/ProductsSection';

const Products = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const openProductDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const products = [
    {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: '/images/plasticbag.jpeg', // Local image path
    },
    {
      id: 5,
      name: 'شنط قماش',
      description: 'شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية',
      image: '/images/canvas.jpeg', // Local image path
    },
    {
      id: 3,
      name: 'اكياس سلوفان بشريطه',
      description: 'أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم',
      image: '/images/كيس سلوفان.jpeg', // Local image path
    },
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
      id: 6,
      name: 'اكياس ذات غالق - ziplock bags',
      description: 'أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات',
      image: '/images/ziplockBags.png', // Local image path
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
      </div>
    </section>
  );
};

export default Products;

import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductDetailModal from './ProductDetailModal';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const Products = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 2,
      name: 'أكياس تغليف',
      description: 'أكياس تغليف شفافة وملونة لحماية المنتجات وتخزينها',
      image: 'https://images.unsplash.com/photo-1565384257472-2ada861d1ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 3,
      name: 'اكياس سلوفان بشريطه',
      description: 'أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم',
      image: 'https://images.unsplash.com/photo-1610963196817-7d1415647028?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: 'https://images.unsplash.com/photo-1601661222035-fdd50d0d4b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 5,
      name: 'شنط قماش',
      description: 'شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية',
      image: 'https://images.unsplash.com/photo-1597740049284-388659a41286?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 6,
      name: 'اكياس ذات غالق - ziplock bags',
      description: 'أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات',
      image: 'https://images.unsplash.com/photo-1604166280644-22bb70f5b5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 7,
      name: 'Plastic spoons & forks',
      description: 'ملاعق وشوك وسكاكين بلاستيكية للاستخدام مرة واحدة',
      image: 'https://images.unsplash.com/photo-1610476905657-200ae6cfc907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 8,
      name: 'شنط سوفت للمحلات الملابس',
      description: 'شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية',
      image: 'https://images.unsplash.com/photo-1556905200-bd982f883637?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }
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

        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg p-1 inline-flex shadow-sm">
            <Button 
              variant={viewMode === 'grid' ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className="rounded-md"
            >
              <LayoutGrid size={18} />
            </Button>
            <Button 
              variant={viewMode === 'list' ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setViewMode('list')}
              className="rounded-md"
            >
              <List size={18} />
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="font-bold text-xl text-primary">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className="text-gray-600 h-16 overflow-hidden">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300" 
                    onClick={() => openProductDetail(product.id)}
                  >
                    المزيد من التفاصيل
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-52 md:h-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col p-6">
                    <CardTitle className="font-bold text-xl mb-3 text-primary">{product.name}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4 flex-grow">
                      {product.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      className="w-fit border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300" 
                      onClick={() => openProductDetail(product.id)}
                    >
                      المزيد من التفاصيل
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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
          productId={selectedProductId} 
        />
      </div>
    </section>
  );
};

export default Products;

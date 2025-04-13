
import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, List, Eye } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
      badge: 'الأكثر مبيعاً'
    }, {
      id: 2,
      name: 'أكياس تغليف',
      description: 'أكياس تغليف شفافة وملونة لحماية المنتجات وتخزينها',
      image: 'https://images.unsplash.com/photo-1565384257472-2ada861d1ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 3,
      name: 'اكياس سلوفان بشريطه',
      description: 'أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم',
      image: 'public\\images\\slofan.png',
    },
    {
      image: 'https://images.unsplash.com/photo-1610963196817-7d1415647028?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
      badge: 'جديد'
    },
    {
      id: 4,
      name: 'أكياس مطبوعة',
      description: 'أكياس مطبوعة بشعار الشركة أو الشعارات التجارية بألوان متعددة',
      image: 'public\\images\\pack 1.jpg',
    },
    {
      image: 'https://images.unsplash.com/photo-1601661222035-fdd50d0d4b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 5,
      name: 'شنط قماش',
      description: 'شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية',
      image: 'public\\images\\image.png',
    },
    {
      image: 'https://images.unsplash.com/photo-1597740049284-388659a41286?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
      badge: 'صديق للبيئة'
    }, {
      id: 6,
      name: 'اكياس ذات غالق - ziplock bags',
      description: 'أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات',
      image: 'public\\images\\ziplockBags.png',
    },
    {
      image: 'https://images.unsplash.com/photo-1604166280644-22bb70f5b5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 7,
      name: 'Plastic spoons & forks',
      description: 'ملاعق وشوك وسكاكين بلاستيكية للاستخدام مرة واحدة',
      image: 'public\\images\\spoone.png',
    },
    {
      image: 'https://images.unsplash.com/photo-1610476905657-200ae6cfc907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80'
    }, {
      id: 8,
      name: 'شنط سوفت للمحلات الملابس',
      description: 'شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية',
      image: 'public\\images\\softBags.jpg',
    },{
      image: 'https://images.unsplash.com/photo-1556905200-bd982f883637?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80',
      badge: 'فاخر'
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
              <Card 
                key={product.id} 
                className={cn(
                  "group overflow-hidden border-0 shadow-md transition-all duration-300",
                  "hover:shadow-lg hover:translate-y-[-5px]",
                  "bg-white hover:bg-white/95"
                )}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500",
                      "group-hover:scale-110 group-hover:brightness-105"
                    )}
                  />
                  {product.badge && (
                    <Badge 
                      className="absolute top-3 right-3 bg-secondary text-white border-0 px-3 py-1 shadow-md animate-fade-in"
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <div className={cn(
                    "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300",
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  )}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:scale-110 transition-all"
                      onClick={() => openProductDetail(product.id)}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
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
                    className={cn(
                      "w-full border-secondary text-secondary transition-all duration-300",
                      "hover:bg-secondary hover:text-white",
                      "group-hover:bg-secondary/10"
                    )}
                    onClick={() => openProductDetail(product.id)}
                  >
                    المزيد من التفاصيل
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {products.map(product => (
              <Card 
                key={product.id} 
                className={cn(
                  "overflow-hidden border-0 shadow-md transition-all duration-300",
                  "hover:shadow-lg hover:translate-y-[-2px]",
                  "bg-white hover:bg-white/95"
                )}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-52 md:h-auto overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    {product.badge && (
                      <Badge 
                        className="absolute top-3 right-3 bg-secondary text-white border-0 px-3 py-1 shadow-md"
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/30 md:bg-black/0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:scale-110 transition-all"
                        onClick={() => openProductDetail(product.id)}
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col p-6">
                    <CardTitle className="font-bold text-xl mb-3 text-primary relative">
                      {product.name}
                      {product.badge && (
                        <Badge 
                          className="mr-2 bg-secondary text-white border-0 px-2 py-[2px] hidden md:inline-flex"
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4 flex-grow">
                      {product.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "w-fit border-secondary text-secondary transition-all duration-300",
                        "hover:bg-secondary hover:text-white group"
                      )}
                      onClick={() => openProductDetail(product.id)}
                    >
                      المزيد من التفاصيل
                      <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button className="bg-secondary hover:bg-secondary-dark rounded-lg py-3 px-6">
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary-dark rounded-lg group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
          >
            استعرض جميع المنتجات
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
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

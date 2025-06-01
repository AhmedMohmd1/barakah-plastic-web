
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './detail/ImageGallery';
import ProductInfo from './detail/ProductInfo';
import ProductSpecifications from './detail/ProductSpecifications';

interface ProductDetailContentProps {
  productId: number;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ productId }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState('');

  // Updated product data with multiple images
  const productsData = {
    1: {
      id: 1,
      name: "شُنط مطبوعة بشعارك",
      description: "أكياس شراء مخصصة عالية الجودة مع طباعة احترافية لشعار شركتك. مصنوعة من مواد متينة وصديقة للبيئة، مثالية لتعزيز هوية علامتك التجارية وتقديم تجربة تسوق مميزة لعملائك.",
      images: [
        "images/plasticbag.jpeg",
        "/images/softBags.jpg",
        "/images/canvas.jpeg"
      ],
      rating: 4.8,
      reviewCount: "124 تقييم",
      specs: [
        { name: "المادة", value: "بلاستيك عالي الجودة" },
        { name: "الأبعاد", value: "قابلة للتخصيص" },
        { name: "الطباعة", value: "طباعة احترافية للشعار" },
        { name: "الاستخدام", value: "أكياس تسوق وتغليف" }
      ]
    },
    2: {
      id: 2,
      name: "شنط سوفت للمحلات الملابس",
      description: "شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية، مثالية لتعزيز تجربة التسوق",
      images: [
        "/images/softBags.jpg",
        "/images/canvas.jpeg",
        "images/plasticbag.jpeg"
      ],
      rating: 4.7,
      reviewCount: "98 تقييم",
      specs: [
        { name: "المادة", value: "نسيج ناعم عالي الجودة" },
        { name: "التصميم", value: "أنيق وراقي" },
        { name: "الاستخدام", value: "مخصص لمحلات الملابس" },
        { name: "المقاومة", value: "مقاوم للتمزق" }
      ]
    },
    3: {
      id: 3,
      name: "شنط قماش",
      description: "شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية، مثالية للتسوق وحمل المشتريات اليومية",
      images: [
        "/images/canvas.jpeg",
        "/images/softBags.jpg",
        "images/plasticbag.jpeg"
      ],
      rating: 4.9,
      reviewCount: "156 تقييم",
      specs: [
        { name: "المادة", value: "قماش طبيعي 100%" },
        { name: "صديق للبيئة", value: "قابل للتحلل البيولوجي" },
        { name: "المتانة", value: "عالية التحمل" },
        { name: "الاستخدام", value: "متعدد الأغراض" }
      ]
    },
    4: {
      id: 4,
      name: "اكياس سلوفان بشريطه",
      description: "أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم، مثالية لتغليف المنتجات الصغيرة والهدايا بشكل أنيق",
      images: [
        "/images/كيس سلوفان.jpeg",
        "/images/solfan2.jpeg",
        "/images/اكياس-بقفل.png"
      ],
      rating: 4.6,
      reviewCount: "87 تقييم",
      specs: [
        { name: "المادة", value: "سلوفان شفاف" },
        { name: "الإغلاق", value: "شريط لاصق قوي" },
        { name: "الشفافية", value: "عالية الوضوح" },
        { name: "الاستخدام", value: "تغليف المنتجات والهدايا" }
      ]
    },
    5: {
      id: 5,
      name: "اكياس ذات غالق - ziplock bags",
      description: "أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات، متوفرة بأحجام مختلفة",
      images: [
        "/images/اكياس-بقفل.png",
        "/images/كيس سلوفان.jpeg",
        "/images/solfan2.jpeg"
      ],
      rating: 4.5,
      reviewCount: "203 تقييم",
      specs: [
        { name: "المادة", value: "بلاستيك آمن للطعام" },
        { name: "الإغلاق", value: "سحاب محكم" },
        { name: "إعادة الاستخدام", value: "قابل للاستخدام المتكرر" },
        { name: "الأحجام", value: "متوفرة بأحجام مختلفة" }
      ]
    }
  };

  const product = productsData[productId];

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600">المنتج غير موجود</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          العودة للرئيسية
        </Button>
      </div>
    );
  }

  const handleZoom = (image: string) => {
    setZoomedImage(image);
    setIsZoomed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Product Detail Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          <ImageGallery
            images={product.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onZoom={handleZoom}
          />

          <div className="space-y-8">
            <ProductInfo
              title={product.name}
              description={product.description}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            <ProductSpecifications specs={product.specs} />

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                طلب عرض سعر
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailContent;

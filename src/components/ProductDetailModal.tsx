import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingBag, Moon, Sun, Languages, ImageIcon, ArrowLeft } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import RequestQuoteModal from './BilingualRequestQuoteModal';
import { useNavigate } from 'react-router-dom';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  productId: number | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  language,
  isDarkMode,

  productId
}) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  // Product data
  const productsData = {
    1: {
      ar: {
        title: " شُنط مطبوعة بشعارك",
        description: "أكياس شراء مخصصة عالية الجودة مع طباعة احترافية لشعار شركتك. مصنوعة من مواد متينة وصديقة للبيئة، مثالية لتعزيز هوية علامتك التجارية وتقديم تجربة تسوق مميزة لعملائك.",
        specs: [
          { name: "المواد", value: "ورق كرافت 250 جرام" },
          { name: "الأحجام المتوفرة", value: "صغير، وسط، كبير" },
          { name: "نوع الطباعة", value: "طباعة أوفست عالية الجودة" },
          { name: "الحد الأدنى للطلب", value: "1000 قطعة" }
        ],
        images: [
          "images/plasticbag.jpeg",
        ]
      },
    },
    2: {
      ar: {
        title: "شنط سوفت للمحلات الملابس",
        description: "شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية، مثالية لتعزيز تجربة التسوق",
        specs: [
          { name: "المواد", value: "ورق مقوى فاخر" },
          { name: "الألوان", value: "متعددة الألوان" },
          { name: "المقبض", value: "حبل قطني متين" },
          { name: "التخصيص", value: "طباعة شعار بجودة عالية" }
        ],
        images: [
          "/images/softBags.jpg",
          "images/softBags.jpg"
        ]
      },
    },
    3: {
      ar: {
        title: "شنط قماش",
        description: "شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية، مثالية للتسوق وحمل المشتريات اليومية",
        specs: [
          { name: "المواد", value: "قطن عضوي 100%" },
          { name: "الأحجام المتوفرة", value: "قياسي، كبير" },
          { name: "قابلية التخصيص", value: "يمكن طباعة الشعار" },
          { name: "قابلية الغسل", value: "قابلة للغسل والإعادة" }
        ],
        images: [
          "/images/canvas.jpeg",


        ]
      },
    },
    4: {
      ar: {
        title: "اكياس سلوفان بشريطه",
        description: "أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم، مثالية لتغليف المنتجات الصغيرة والهدايا بشكل أنيق",
        specs: [
          { name: "المواد", value: "سلوفان شفاف عالي الجودة" },
          { name: "الأحجام المتوفرة", value: "متعددة الأحجام" },
          { name: "ميزات خاصة", value: "شريط لاصق ذاتي" },
          { name: "الحد الأدنى للطلب", value: "2000 قطعة" }
        ],
        images: [
          "/images/كيس سلوفان.jpeg",
          "/images/solfan2.jpeg"

        ]
      },
    },
    5: {
      ar: {
        title: "اكياس ذات غالق - ziplock bags",
        description: "أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات، متوفرة بأحجام مختلفة",
        specs: [
          { name: "المواد", value: "بولي إيثيلين غذائي" },
          { name: "الأحجام المتوفرة", value: "متعددة الأحجام" },
          { name: "ميزات خاصة", value: "سحاب قابل للإغلاق" },
          { name: "استخدامات", value: "تخزين الطعام، تعبئة المنتجات" }
        ],
        images: [
        ]
      },
    },
  };

  // If no product is selected, use product 4 (printed bags) as default
  const defaultProductId = 4;
  const currentProductId = productId || defaultProductId;

  // Get the product data based on the current language and product ID
  const product = productsData[currentProductId as keyof typeof productsData]?.[language];

  // If product doesn't exist, don't render anything
  if (!product) return null;

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const handleZoom = () => {
    // Future enhancement: Implement image zoom functionality
    console.log('Zoom image:', product.images[selectedImage]);
  };

  const rating = 4.7;
  const reviewCount = language === 'ar' ? '(238 تقييم)' : '(238 reviews)';

  const handleBack = () => {
    onClose(); // Close the modal
    navigate('/'); // Navigate back to the home page
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`max-w-4xl p-0 overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={language === 'ar' ? 'العودة' : 'Back'}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="relative h-[300px] md:h-full">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageSelect(index)}
                        className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${selectedImage === index
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-transparent opacity-70'
                          }`}
                      >
                        <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleZoom}
                className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-2"
                aria-label="Zoom image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-cairo">{product.title}</DialogTitle>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star}
                        fill={star <= Math.floor(rating) ? "currentColor" : "none"}
                        className={`h-5 w-5 ${star <= Math.floor(rating) ? 'text-amber-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="mx-2 font-semibold">{rating}</span>
                  <span className="text-sm text-muted-foreground">{reviewCount}</span>
                </div>
              </DialogHeader>

              <div className={`mt-4 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'وصف المنتج' : 'Product Description'}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="mt-2">
                <h3 className="text-xl font-semibold mb-4">{language === 'ar' ? 'المواصفات' : 'Specifications'}</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                        }`}
                    >
                      <div className="w-3 h-3 rounded-full bg-secondary shrink-0"></div>
                      <div>
                        <span className="font-medium">{spec.name}</span>
                        <span className="mx-2">-</span>
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="mt-6 w-full bg-secondary hover:bg-secondary-dark text-white py-6 rounded-xl"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {language === 'ar' ? 'طلب عرض سعر' : 'Request a Quote'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        language={language}
      />
    </>
  );
};

export default ProductDetailModal;


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingBag, Moon, Sun, Languages, ImageIcon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import RequestQuoteModal from './BilingualRequestQuoteModal';

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
  toggleLanguage,
  isDarkMode,
  toggleTheme,
  productId
}) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Product data
  const productsData = {
    1: {
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
        ]
      },
      en: {
        title: "Soft Bags for Clothing Stores",
        description: "Soft, elegant bags specially designed for clothing stores, perfect for enhancing the shopping experience",
        specs: [
          { name: "Material", value: "Luxury cardboard" },
          { name: "Colors", value: "Multiple colors" },
          { name: "Handle", value: "Durable cotton rope" },
          { name: "Customization", value: "High-quality logo printing" }
        ],
        images: [
          "/images/softBags.jpg",
        ]
      }
    },
    2: {
      ar: {
        title: "أكياس تسوق",
        description: "أكياس تسوق متينة بمقاسات مختلفة مناسبة للمحلات التجارية والمطاعم. مصنوعة من مواد عالية الجودة تتحمل الأوزان الثقيلة.",
        specs: [
          { name: "المواد", value: "بولي إيثيلين عالي الكثافة" },
          { name: "الأحجام المتوفرة", value: "صغير، وسط، كبير" },
          { name: "تحمل الوزن", value: "حتى 10 كجم" },
          { name: "الحد الأدنى للطلب", value: "1000 قطعة" }
        ],
        images: [
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1602170284347-c833a17ab9ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1632908644286-acd8525ae4fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      },
      en: {
        title: "Shopping Bags",
        description: "Durable shopping bags in various sizes suitable for shops and restaurants. Made from high-quality materials that can withstand heavy weights.",
        specs: [
          { name: "Material", value: "High-density polyethylene" },
          { name: "Available Sizes", value: "Small, Medium, Large" },
          { name: "Weight Capacity", value: "Up to 10 kg" },
          { name: "Minimum Order", value: "1000 pieces" }
        ],
        images: [
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1602170284347-c833a17ab9ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1632908644286-acd8525ae4fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      }
    },
    3: {
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
      en: {
        title: "Custom Printed Bags",
        description: "High-quality custom shopping bags with professional printing of your company logo. Made from durable and eco-friendly materials, ideal for enhancing your brand identity and providing a distinctive shopping experience for your customers.",
        specs: [
          { name: "Material", value: "250g Kraft paper" },
          { name: "Available Sizes", value: "Small, Medium, Large" },
          { name: "Printing Type", value: "High-quality offset printing" },
          { name: "Minimum Order", value: "1000 pieces" }
        ],
        images: [
          "https://images.unsplash.com/photo-1601661222035-fdd50d0d4b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1558451141-1c5d1874dd0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "public/lovable-uploads/af1e7745-c68b-46fe-b083-6d86315576d2.png"
        ]
      }
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

          "/images/solfan2.jpeg",
          "/images/كيس سلوفان.jpeg"
        ]
      },
      en: {
        title: "Cellophane Bags with Tape",
        description: "Transparent cellophane bags with adhesive tape for secure closure, ideal for elegantly packaging small products and gifts",
        specs: [
          { name: "Material", value: "High-quality transparent cellophane" },
          { name: "Available Sizes", value: "Multiple sizes" },
          { name: "Special Features", value: "Self-adhesive tape" },
          { name: "Minimum Order", value: "2000 pieces" }
        ],
        images: [
          "https://images.unsplash.com/photo-1610963196817-7d1415647028?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      }
    },
    5: {
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
          "/images/canvas2.png"

        ]
      },
      en: {
        title: "Cloth Bags",
        description: "Eco-friendly, multipurpose cloth bags with modern designs, ideal for shopping and carrying daily purchases",
        specs: [
          { name: "Material", value: "100% organic cotton" },
          { name: "Available Sizes", value: "Standard, Large" },
          { name: "Customizability", value: "Logo printing available" },
          { name: "Washability", value: "Washable and reusable" }
        ],
        images: [
          "https://images.unsplash.com/photo-1597740049284-388659a41286?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1568689341045-c59ea5258132?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      }
    },
    6: {
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
          "https://images.unsplash.com/photo-1604166280644-22bb70f5b5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1603392311736-e6b9611ce50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      },
      en: {
        title: "Ziplock Bags",
        description: "Resealable bags with zippers, suitable for food storage and product packaging, available in various sizes",
        specs: [
          { name: "Material", value: "Food-grade polyethylene" },
          { name: "Available Sizes", value: "Multiple sizes" },
          { name: "Special Features", value: "Resealable zipper" },
          { name: "Uses", value: "Food storage, product packaging" }
        ],
        images: [
          "https://images.unsplash.com/photo-1604166280644-22bb70f5b5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1603392311736-e6b9611ce50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      }
    },
    7: {

      title: "Plastic Utensils",
      description: "Disposable plastic spoons, forks, and knives, ideal for restaurants and events",
      specs: [
        { name: "Material", value: "Food-grade plastic" },
        { name: "Types", value: "Spoons, Forks, Knives" },
        { name: "Package", value: "100 pieces/pack" },
        { name: "Usage", value: "Single-use" }
      ],
      images: [
        "https://images.unsplash.com/photo-1610476905657-200ae6cfc907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
        "https://images.unsplash.com/photo-1587302186428-d1080f909884?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
      ]
    },

    8: {
      ar: {
        title: "أكياس تغليف",
        description: "أكياس تغليف شفافة وملونة لحماية المنتجات وتخزينها، متوفرة بمقاسات وألوان متعددة",
        specs: [
          { name: "المواد", value: "بولي إيثيلين" },
          { name: "الشفافية", value: "شفاف أو ملون" },
          { name: "الاستخدامات", value: "تغليف المنتجات، حماية البضائع" },
          { name: "الأحجام", value: "متعددة الأحجام" }
        ],
        images: [
          "https://images.unsplash.com/photo-1565384257472-2ada861d1ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1571727356639-55e669087b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      },
      en: {
        title: "Packaging Bags",
        description: "Transparent and colored packaging bags for product protection and storage, available in multiple sizes and colors",
        specs: [
          { name: "Material", value: "Polyethylene" },
          { name: "Transparency", value: "Transparent or colored" },
          { name: "Uses", value: "Product packaging, goods protection" },
          { name: "Sizes", value: "Multiple sizes" }
        ],
        images: [
          "https://images.unsplash.com/photo-1565384257472-2ada861d1ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80",
          "https://images.unsplash.com/photo-1571727356639-55e669087b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80"
        ]
      }
    }
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`max-w-4xl p-0 overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <Toggle
              pressed={isDarkMode}
              onPressedChange={toggleTheme}
              aria-label="Toggle dark mode"
              className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Toggle>

            <Toggle
              pressed={language === 'en'}
              onPressedChange={toggleLanguage}
              aria-label="Toggle language"
              className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <Languages className="h-4 w-4" />
              <span className="sr-only">{language === 'ar' ? 'English' : 'العربية'}</span>
            </Toggle>
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

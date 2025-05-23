import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RequestQuoteModal from '../BilingualRequestQuoteModal';
import ImageGallery from './detail/ImageGallery';
import ProductInfo from './detail/ProductInfo';
import ProductSpecifications from './detail/ProductSpecifications';

interface ProductDetailContentProps {
  productId: number;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ productId }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [language] = useState<'ar' | 'en'>('ar');

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
        description: "أكياس تغليف شفافة ومل��نة لحماية المنتجات وتخزينها، متوفرة بمقاسات وألوان متعددة",
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

  const product = productsData[productId as keyof typeof productsData]?.[language];
  
  if (!product) return null;

  const rating = 4.7;
  const reviewCount = '(238 تقييم)';

  const handleZoom = (image: string) => {
    console.log('Zoom image:', image);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ImageGallery
        images={product.images}
        selectedImage={selectedImage}
        onImageSelect={setSelectedImage}
        onZoom={handleZoom}
      />

      <div className="space-y-6">
        <ProductInfo
          title={product.title}
          description={product.description}
          rating={rating}
          reviewCount={reviewCount}
        />

        <ProductSpecifications specs={product.specs} />

        <Button
          className="mt-6 w-full bg-secondary hover:bg-secondary/90 text-white py-6 rounded-xl"
          onClick={() => setIsQuoteModalOpen(true)}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          طلب عرض سعر
        </Button>
      </div>

      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        language={language}
      />
    </div>
  );
};

export default ProductDetailContent;

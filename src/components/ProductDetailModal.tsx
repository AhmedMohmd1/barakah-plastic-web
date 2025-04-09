
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingBag, Check, Moon, Sun, Languages } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import RequestQuoteModal from './BilingualRequestQuoteModal';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  language,
  toggleLanguage,
  isDarkMode,
  toggleTheme
}) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  const translations = {
    ar: {
      title: "أكياس مطبوعة بشعارك",
      description: "أكياس تسوق مخصصة مطبوعة بشعار شركتك أو علامتك التجارية بأعلى جودة. تتميز أكياسنا المطبوعة بمتانتها وجودة الطباعة العالية التي تدوم طويلاً.",
      specs: "المواصفات",
      size: "المقاسات المتوفرة",
      sizes: ["صغير (20×30 سم)", "متوسط (30×40 سم)", "كبير (40×50 سم)", "مقاسات مخصصة"],
      material: "الخامات",
      materials: ["بولي إيثيلين عالي الكثافة", "بولي إيثيلين منخفض الكثافة", "بولي بروبلين"],
      printing: "تقنيات الطباعة",
      printTypes: ["طباعة فلكسو (حتى 6 ألوان)", "طباعة أوفست", "طباعة روتوغرافيور"],
      minQuantity: "الحد الأدنى للطلب",
      quantity: "1000 قطعة",
      customerReviews: "آراء العملاء",
      reviewCount: "بناءً على 48 تقييم",
      quoteButton: "طلب عرض سعر",
      specifications: [
        { name: "سماكة البلاستيك", value: "من 30 إلى 100 ميكرون" },
        { name: "تحمل الوزن", value: "حتى 10 كجم" },
        { name: "التخصيص", value: "شعار، نص، تصميم كامل" },
        { name: "وقت التسليم", value: "7-14 يوم عمل" }
      ]
    },
    en: {
      title: "Custom Printed Bags",
      description: "Custom shopping bags printed with your company logo or brand with the highest quality. Our printed bags are characterized by their durability and high-quality printing that lasts for a long time.",
      specs: "Specifications",
      size: "Available Sizes",
      sizes: ["Small (20×30 cm)", "Medium (30×40 cm)", "Large (40×50 cm)", "Custom sizes"],
      material: "Materials",
      materials: ["High-density polyethylene", "Low-density polyethylene", "Polypropylene"],
      printing: "Printing Techniques",
      printTypes: ["Flexo printing (up to 6 colors)", "Offset printing", "Rotogravure printing"],
      minQuantity: "Minimum Order",
      quantity: "1000 pieces",
      customerReviews: "Customer Reviews",
      reviewCount: "Based on 48 reviews",
      quoteButton: "Request a Quote",
      specifications: [
        { name: "Plastic thickness", value: "30 to 100 microns" },
        { name: "Weight capacity", value: "Up to 10 kg" },
        { name: "Customization", value: "Logo, text, full design" },
        { name: "Delivery time", value: "7-14 business days" }
      ]
    }
  };

  const text = translations[language];
  
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
                src="https://images.unsplash.com/photo-1601661222035-fdd50d0d4b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80" 
                alt={text.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-cairo">{text.title}</DialogTitle>
              </DialogHeader>
              
              <p className="text-muted-foreground">{text.description}</p>
              
              <h3 className="text-xl font-semibold mt-2">{text.specs}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {text.specifications.map((spec, i) => (
                  <Card key={i} className={`border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <CardContent className="p-4">
                      <p className="font-medium">{spec.name}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{spec.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-2">
                <h4 className="font-medium">{text.size}</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {text.sizes.map((size, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{size}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-2">
                <h4 className="font-medium">{text.material}</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {text.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-2">
                <h4 className="font-medium">{text.printing}</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {text.printTypes.map((type, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-secondary/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{text.customerReviews}</h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} 
                        fill={star <= 4 ? "currentColor" : "none"} 
                        className={`h-4 w-4 ${star <= 4 ? 'text-amber-500' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="mr-2 text-sm">4.7</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{text.reviewCount}</p>
              </div>
              
              <Button 
                className="mt-6 w-full bg-secondary hover:bg-secondary-dark text-white"
                size="lg"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {text.quoteButton}
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

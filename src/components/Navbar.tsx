
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RequestQuoteModal from './RequestQuoteModal';
import { useThrottle } from '@/hooks/useDebounce';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  
  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  const throttledHandleScroll = useThrottle(handleScroll, 16); // ~60fps

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openQuoteModal = () => {
    setShowQuoteModal(true);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300 bg-white shadow-md",
        scrolled ? "shadow-lg" : "shadow-md"
      )}>
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-2">
              <a href="#" className="flex items-center">
                <img 
                  src="/lovable-uploads/2e4ebc83-a888-418c-ad4a-41201a5949bb.png" 
                  alt="البركة بلاست" 
                  className="h-12 md:h-16"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-reverse space-x-6 ">
              <a href="#" className="font-medium hover:text-primary relative group py-2 px-1">
                الرئيسية
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="font-medium hover:text-primary relative group py-2 px-1">
                من نحن
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#products" className="font-medium hover:text-primary relative group py-2 px-1">
                منتجاتنا
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#features" className="font-medium hover:text-primary relative group py-2 px-1">
                مميزاتنا
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#testimonials" className="font-medium hover:text-primary relative group py-2 px-1">
                آراء العملاء
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#faq" className="font-medium hover:text-primary relative group py-2 px-1">
                الأسئلة المتكررة
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="font-medium hover:text-primary relative group py-2 px-1">
                تواصل معنا
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
            
            <div className="hidden md:block">
              <Button 
                onClick={openQuoteModal}
                className="bg-secondary hover:bg-secondary-dark rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-6"
              >
                طلب عرض سعر
                <ChevronDown className="mr-1 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out z-50",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-4 px-6 flex flex-col space-y-4">
            <a href="#" className="font-medium hover:text-primary" onClick={toggleMenu}>الرئيسية</a>
            <a href="#about" className="font-medium hover:text-primary" onClick={toggleMenu}>من نحن</a>
            <a href="#products" className="font-medium hover:text-primary" onClick={toggleMenu}>منتجاتنا</a>
            <a href="#features" className="font-medium hover:text-primary" onClick={toggleMenu}>مميزاتنا</a>
            <a href="#testimonials" className="font-medium hover:text-primary" onClick={toggleMenu}>آراء العملاء</a>
            <a href="#faq" className="font-medium hover:text-primary" onClick={toggleMenu}>الأسئلة المتكررة</a>
            <a href="#contact" className="font-medium hover:text-primary" onClick={toggleMenu}>تواصل معنا</a>
            <Button 
              onClick={() => {
                openQuoteModal();
                toggleMenu();
              }}
              className="bg-secondary hover:bg-secondary-dark w-full rounded-xl"
            >
              طلب عرض سعر
            </Button>
          </div>
        </div>
      </header>

      {/* Quote Request Modal */}
      <RequestQuoteModal 
        isOpen={showQuoteModal} 
        onClose={() => setShowQuoteModal(false)} 
      />
    </>
  );
};

export default Navbar;

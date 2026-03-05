import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RequestQuoteModal from './RequestQuoteModal';
import { useThrottle } from '@/hooks/useDebounce';

const NAV_ITEMS = [
  { label: 'الرئيسية', href: '#' },
  { label: 'من نحن', href: '#about' },
  { label: 'منتجاتنا', href: '#products' },
  { label: 'مميزاتنا', href: '#features' },
  { label: 'آراء العملاء', href: '#testimonials' },
  { label: 'الأسئلة المتكررة', href: '#faq' },
  { label: 'تواصل معنا', href: '#contact' },
] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);
  const throttledHandleScroll = useThrottle(handleScroll, 16);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openQuoteModal = () => setShowQuoteModal(true);

  return <>
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
      scrolled 
        ? "bg-white/95 shadow-lg shadow-primary/5" 
        : "bg-white shadow-sm"
    )}>
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <a href="#" className="flex items-center">
              <img src="/lovable-uploads/2e4ebc83-a888-418c-ad4a-41201a5949bb.png" alt="البركة بلاست" className="h-12 md:h-14" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-1">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200 text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:block">
            <Button 
              onClick={openQuoteModal} 
              className="bg-secondary hover:bg-secondary-dark rounded-xl shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 px-6 text-base font-semibold"
            >
              اطلب تسعيرة
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button className="lg:hidden text-foreground/70 focus:outline-none p-2 rounded-lg hover:bg-muted transition-colors" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-50 border-t border-border/50",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="py-4 px-6 flex flex-col space-y-1">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="font-medium text-foreground/80 hover:text-primary py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors" 
              onClick={toggleMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <Button onClick={() => { openQuoteModal(); toggleMenu(); }} className="bg-secondary hover:bg-secondary-dark w-full rounded-xl text-base font-semibold py-5">
              اطلب تسعيرة
            </Button>
          </div>
        </div>
      </div>
    </header>

    <RequestQuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
  </>;
};
export default Navbar;

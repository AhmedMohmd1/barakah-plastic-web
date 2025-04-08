
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <a href="#" className="text-2xl font-bold text-primary font-cairo">
              البركة بلاست
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="#" className="font-medium hover:text-primary">الرئيسية</a>
            <a href="#about" className="font-medium hover:text-primary">من نحن</a>
            <a href="#products" className="font-medium hover:text-primary">منتجاتنا</a>
            <a href="#features" className="font-medium hover:text-primary">مميزاتنا</a>
            <a href="#contact" className="font-medium hover:text-primary">تواصل معنا</a>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary-dark">
              طلب عرض سعر
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
        "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="py-4 px-6 flex flex-col space-y-4">
          <a href="#" className="font-medium hover:text-primary" onClick={toggleMenu}>الرئيسية</a>
          <a href="#about" className="font-medium hover:text-primary" onClick={toggleMenu}>من نحن</a>
          <a href="#products" className="font-medium hover:text-primary" onClick={toggleMenu}>منتجاتنا</a>
          <a href="#features" className="font-medium hover:text-primary" onClick={toggleMenu}>مميزاتنا</a>
          <a href="#contact" className="font-medium hover:text-primary" onClick={toggleMenu}>تواصل معنا</a>
          <Button className="bg-primary hover:bg-primary-dark w-full">
            طلب عرض سعر
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

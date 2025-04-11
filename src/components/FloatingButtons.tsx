
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, MoonStar, Sun, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RequestQuoteModal from './RequestQuoteModal';
import { Link } from 'react-router-dom';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-50">
        {/* Main toggle button */}
        <Button 
          onClick={toggleMenu} 
          className="h-12 w-12 rounded-full bg-primary shadow-lg hover:bg-primary-dark"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        {/* Menu items */}
        {isOpen && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <Button 
              onClick={toggleTheme} 
              className="h-12 w-12 rounded-full bg-secondary shadow-lg hover:bg-secondary-dark"
              aria-label={isDark ? 'وضع النهار' : 'وضع الليل'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </Button>
            
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="h-12 w-12 rounded-full bg-secondary shadow-lg hover:bg-secondary-dark"
              aria-label="طلب عرض سعر"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Link to="/clients">
              <Button 
                className="h-12 w-12 rounded-full bg-secondary shadow-lg hover:bg-secondary-dark"
                aria-label="إدارة العملاء"
              >
                <Users className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <RequestQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default FloatingButtons;

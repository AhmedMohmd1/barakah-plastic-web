
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThrottle } from '@/hooks/useDebounce';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const throttledToggleVisibility = useThrottle(toggleVisibility, 16);

  useEffect(() => {
    window.addEventListener('scroll', throttledToggleVisibility);
    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, [throttledToggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/+201009923040', '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-50 print:hidden">
      {/* WhatsApp Button - Always visible */}
      <button
        onClick={openWhatsApp}
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="تواصل عبر الواتساب"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-6 h-6"
        >
          <path 
            d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" 
          />
        </svg>
      </button>
      
      {/* Back to Top Button - Only visible after scrolling */}
      <button
        onClick={scrollToTop}
        className={cn(
          "bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, FileText, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Mobile-only bottom dock for one-thumb navigation.
 * Visible under md breakpoint. Central "Request Quote" action is elevated.
 */
const MobileDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    if (location.pathname !== '/') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuote = () => {
    // Ensure Products section (and its modal) is mounted before dispatching
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-quote-modal'));
      }, 150);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal'));
    }
  };

  const items = [
    { key: 'home', label: 'الرئيسية', icon: Home, onClick: goHome },
    { key: 'products', label: 'المنتجات', icon: Package, onClick: () => goToSection('products') },
    { key: 'whatsapp', label: 'واتساب', icon: MessageCircle, onClick: () => window.open('https://wa.me/+201009923040', '_blank', 'noopener,noreferrer') },
    { key: 'call', label: 'اتصل', icon: Phone, onClick: () => { window.location.href = 'tel:+201009923040'; } },
  ];

  return (
    <nav
      role="navigation"
      aria-label="التنقل السفلي"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-8px_rgba(15,27,61,0.15)] print:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="relative flex items-stretch justify-around h-16 px-2 font-tajawal">
        {/* First two items */}
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={item.onClick}
              aria-label={item.label}
              className="flex-1 min-h-11 flex flex-col items-center justify-center gap-1 text-primary/80 hover:text-primary active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* Elevated central CTA: طلب عرض سعر */}
        <div className="flex-1 flex items-start justify-center">
          <button
            onClick={openQuote}
            aria-label="طلب عرض سعر"
            className={cn(
              "-mt-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light text-white",
              "shadow-lg shadow-primary/30 border-4 border-white",
              "flex flex-col items-center justify-center gap-0.5",
              "active:scale-95 hover:shadow-xl transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            )}
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>

        {/* Last two items */}
        {items.slice(2).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={item.onClick}
              aria-label={item.label}
              className="flex-1 min-h-11 flex flex-col items-center justify-center gap-1 text-primary/80 hover:text-primary active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
      {/* Label under elevated CTA */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-1 pointer-events-none">
        <span className="text-[10px] font-semibold text-primary" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>عرض سعر</span>
      </div>
    </nav>
  );
};

export default MobileDock;

import React, { useState, useEffect, useCallback, useRef } from 'react';
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

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);
  const throttledHandleScroll = useThrottle(handleScroll, 16);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const openQuoteModal = () => setShowQuoteModal(true);

  // While the drawer is open: lock body scroll, close on Esc (returning focus to
  // the trigger), and move focus into the panel. Restore everything on close.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Move focus to the first link inside the drawer for keyboard/screen-reader users.
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
            <a href="#" className={cn("flex items-center rounded-lg", focusRing)}>
              <img src="/lovable-uploads/2e4ebc83-a888-418c-ad4a-41201a5949bb.png" alt="البركة بلاست" className="h-12 md:h-14" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn("font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200 text-sm", focusRing)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={openQuoteModal}
              variant="secondary"
              className="rounded-xl shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 px-6 text-base font-semibold"
            >
              اطلب تسعيرة
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className={cn("lg:hidden text-foreground/70 p-2 rounded-lg hover:bg-muted transition-colors", focusRing)}
            onClick={toggleMenu}
            aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop — dismiss by tapping outside the panel */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[var(--nav-h,4.5rem)] bg-primary/40 backdrop-blur-[1px] transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile Navigation */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={cn(
          "lg:hidden absolute w-full bg-card shadow-lg transition-all duration-300 ease-in-out z-50 border-t border-border/50",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
        )}
      >
        <div className="py-4 px-6 flex flex-col space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn("font-medium text-foreground/80 hover:text-primary py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors", focusRing)}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <Button
              onClick={() => { openQuoteModal(); closeMenu(); }}
              variant="secondary"
              className="w-full rounded-xl text-base font-semibold py-5"
            >
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

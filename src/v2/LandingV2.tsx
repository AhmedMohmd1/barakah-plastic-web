import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import RequestQuoteModal from '@/components/RequestQuoteModal';
import logoClear from '@/assets/v2/logo-clear.png';
import Hero from './Hero';
import { Faq, Factory, HowToOrder, Manifesto, Products, TryName, Who } from './Sections';
import Contact, { WaIcon } from './Contact';
import { Close, Footer } from './Close';
import { CTA, NAV, TEL_HREF, WA_HREF, type InkKey } from './content';
import './v2.css';

type Quote = { open: boolean; name?: string; image?: string; n: number };

const LandingV2 = () => {
  const [quote, setQuote] = useState<Quote>({ open: false, n: 0 });
  // each open mounts a fresh modal, so a product chosen earlier never leaks into a generic request
  const openQuote = useCallback((name?: string, image?: string) => setQuote((q) => ({ open: true, name, image, n: q.n + 1 })), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [printName, setPrintName] = useState('');
  const [printInk, setPrintInk] = useState<InkKey>('navy');

  // One primary CTA per screen: the nav CTA collapses while the hero CTA is visible;
  // the mobile bar shows only between the hero CTA and the close section.
  const heroCtaRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const navCtaRef = useRef<HTMLDivElement>(null);
  const [heroCtaSeen, setHeroCtaSeen] = useState(true);
  const [closeSeen, setCloseSeen] = useState(false);
  useEffect(() => {
    const hdr = window.matchMedia('(max-width: 767px)').matches ? 60 : 72;
    // any primary CTA on screen (hero, try-your-name, close) hides the nav CTA and the mobile bar
    const visible = new Set<Element>();
    const io1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHeroCtaSeen(visible.size > 0);
      },
      { rootMargin: `-${hdr}px 0px 0px 0px` },
    );
    const io2 = new IntersectionObserver(([e]) => setCloseSeen(e.isIntersecting || e.boundingClientRect.top < 0));
    document.querySelectorAll('.v2 .v2-cta-primary').forEach((el) => io1.observe(el));
    if (closeRef.current) io2.observe(closeRef.current);
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, []);
  useEffect(() => {
    const el = navCtaRef.current;
    if (!el) return;
    if (heroCtaSeen) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  }, [heroCtaSeen]);

  // Drawer: Esc closes and returns focus; first link gets focus on open.
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    drawerRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Keep the global trigger used elsewhere in the app (MobileDock) working here too.
  useEffect(() => {
    const handler = () => openQuote();
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, [openQuote]);

  useEffect(() => {
    const prev = document.title;
    document.title = 'البركة بلاست — شنط وأكياس بالجملة بطباعة اسم محلك';
    return () => {
      document.title = prev;
    };
  }, []);

  const mobileBar = !heroCtaSeen && !closeSeen;
  const mbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mobileBar) mbarRef.current?.removeAttribute('inert');
    else mbarRef.current?.setAttribute('inert', '');
  }, [mobileBar]);

  return (
    <div className="v2" dir="rtl">
      <a className="v2-skip" href="#main">
        تخطَّ إلى المحتوى
      </a>
      <header className="v2-hdr">
        <div className="v2-wrap v2-hdr__in">
          <a className="v2-hdr__logo" href="#hero" aria-label="البركة بلاست — أعلى الصفحة">
            <img src={logoClear} alt="البركة بلاست" width={480} height={207} />
          </a>
          <nav className="v2-nav" aria-label="أقسام الصفحة">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="v2-hdr__end">
            <div className="v2-hdr__cta" ref={navCtaRef} data-hidden={heroCtaSeen}>
              <button type="button" className="v2-btn v2-btn--sm" onClick={() => openQuote()}>
                {CTA}
              </button>
            </div>
            <button
              ref={menuBtnRef}
              type="button"
              className="v2-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="v2-drawer"
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="v2-drawer" ref={drawerRef} className="v2-drawer" hidden={!menuOpen}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <button
            type="button"
            className="v2-btn"
            onClick={() => {
              setMenuOpen(false);
              openQuote();
            }}
          >
            {CTA}
          </button>
        </div>
      </header>

      <main id="main">
        <Hero onQuote={() => openQuote()} ctaRef={heroCtaRef} />
        <Manifesto />
        <Factory />
        <Products onQuote={openQuote} />
        <TryName
          name={printName}
          setName={setPrintName}
          ink={printInk}
          setInk={setPrintInk}
          onQuote={() => openQuote('شُنط مطبوعة بشعارك', '/images/plasticbag.webp')}
        />
        <Who />
        <HowToOrder />
        <Faq />
        <Contact />
        <Close name={printName} ink={printInk} onQuote={() => openQuote()} closeRef={closeRef} />
      </main>
      <Footer />

      <div className="v2-mbar" ref={mbarRef} data-show={mobileBar} aria-hidden={!mobileBar}>
        <button type="button" className="v2-btn" onClick={() => openQuote()}>
          {CTA}
        </button>
        <a className="v2-mbar__icon" href={WA_HREF} target="_blank" rel="noopener noreferrer" aria-label="واتساب">
          <WaIcon />
        </a>
        <a className="v2-mbar__icon" href={TEL_HREF} aria-label="اتصل بنا">
          <Phone size={22} aria-hidden="true" />
        </a>
      </div>

      <RequestQuoteModal
        key={quote.n}
        isOpen={quote.open}
        onClose={() => setQuote((q) => ({ ...q, open: false }))}
        productName={quote.name}
        productImage={quote.image}
      />
    </div>
  );
};

export default LandingV2;

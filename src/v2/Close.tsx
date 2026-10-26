import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/constants/products';
import logoInv from '@/assets/v2/logo-inv.png';
import Bag from './Bag';
import { ADDRESS, CTA, EMAIL, INKS, NAV, PHONE, TEL_HREF, WA_HREF, type InkKey } from './content';
import { usePlayOnce } from './hooks';

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

// The hero bag, multiplied — every bag printed with the name the visitor typed above.
// Drawn outer → inner so the centre bag (the visitor's ink) sits on top.
const STACK: { x: number; r: number; y: number }[] = [
  { x: -400, r: -9, y: 44 },
  { x: 400, r: 9, y: 44 },
  { x: -200, r: -4, y: 16 },
  { x: 200, r: 4, y: 16 },
  { x: 0, r: 0, y: 0 },
];
const OTHER_INKS: InkKey[] = ['navy', 'black', 'red', 'green'];

type CloseProps = {
  name: string;
  ink: InkKey;
  onQuote: () => void;
  closeRef: React.RefObject<HTMLDivElement>;
};

export const Close = ({ name, ink, onQuote, closeRef }: CloseProps) => {
  const ref = usePlayOnce<HTMLElement>(0.3);
  const shown = name.trim() || 'اسم محلك';
  return (
    <section id="close" ref={ref} className="v2-close on-deep" aria-labelledby="v2-close-h">
      <div className="v2-wrap" ref={closeRef}>
        <span className="v2-opener">جاهزين</span>
        <h2 id="v2-close-h" className="v2-h2">
          جاهزين نطبع اسمك.
        </h2>
        <p className="v2-lead">ابعت الكمية والمقاس، ونرد عليك بعرض سعر مكتوب.</p>
        <div className="v2-close__ctas">
          <button type="button" className="v2-btn v2-cta-primary" onClick={onQuote}>
            {CTA}
            <ArrowLeft className="v2-arrow" size={20} aria-hidden="true" />
          </button>
          <a className="v2-link" href={WA_HREF} target="_blank" rel="noopener noreferrer">
            أو راسلنا على واتساب
          </a>
        </div>
      </div>
      <div className="v2-close__stack" aria-hidden="true">
        {STACK.map((b, i) => {
          const others = OTHER_INKS.filter((k) => k !== ink);
          const k = i === STACK.length - 1 ? ink : others[i % others.length];
          const color = INKS.find((x) => x.key === k)!.color;
          return (
            <div key={i} className={`v2-close__bag${b.x !== 0 && Math.abs(b.x) < 400 ? ' v2-close__bag--mid' : ''}`} style={css({ '--x': b.x, '--y': b.y, '--r': `${b.r}deg`, '--d': `${(STACK.length - 1 - i) * 0.07}s` })}>
              <Bag size="xs">
                <span className="v2-close__print" style={css({ '--ink-c': color })}>
                  {shown}
                </span>
              </Bag>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// the bag's own 22-px registration mark (same drawing as Bag.tsx), at print scale
const SlugMark = () => (
  <svg className="v2-foot__reg" viewBox="0 0 22 22" width="22" height="22">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M0 11H22M11 0V22" />
  </svg>
);

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="v2-foot on-deep">
      <div className="v2-wrap">
        <div className="v2-foot__grid">
          <div>
            <img src={logoInv} alt="البركة بلاست" width={480} height={207} loading="lazy" />
            <p>مصنع شنط وأكياس بلاستيك وسوفت وقماش وسلوفان وزيبلوك، بالجملة وبطباعة الشعار، منذ سنة 2011.</p>
          </div>
          <nav aria-label="روابط الصفحة">
            <h3>الصفحة</h3>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="المنتجات">
            <h3>المنتجات</h3>
            <ul>
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3>تواصل</h3>
            <ul>
              <li>
                <a href={TEL_HREF} dir="ltr">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  واتساب
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
            <p>{ADDRESS}</p>
          </div>
        </div>
        {/* the print slug on a bag's bottom edge: register mark, ink patches, one line of small print */}
        <div className="v2-foot__slug">
          <span className="v2-foot__marks" aria-hidden="true">
            <SlugMark />
            <span className="v2-foot__bar">
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
          <span>البركة بلاست · قليوب، القليوبية · منذ{' '}2011</span>
          <span>© {year} جميع الحقوق محفوظة</span>
          <span className="v2-foot__marks" aria-hidden="true">
            <SlugMark />
          </span>
        </div>
      </div>
      <div className="v2-foot__rib" aria-hidden="true" />
    </footer>
  );
};

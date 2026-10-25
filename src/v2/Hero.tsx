import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Bag from './Bag';
import { CTA, PHONE, TEL_HREF } from './content';
import { prefersReducedMotion } from './hooks';

type HeroProps = {
  onQuote: () => void;
  ctaRef: React.RefObject<HTMLButtonElement>;
};

const LINE_2 = 'مطبوع في مصنعنا.';

const Hero = ({ onQuote, ctaRef }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);

  // Play the story when it is SEEN: fonts ready + two frames + ≥45% visible (4 s fallback).
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      el.setAttribute('data-play', '');
    };
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      go();
      return;
    }
    let io: IntersectionObserver | undefined;
    const fallback = window.setTimeout(go, 1500);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts ? fonts.ready : Promise.resolve()).then(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && go(), {
            threshold: 0.45,
          });
          io.observe(el);
        }),
      ),
    );
    return () => {
      window.clearTimeout(fallback);
      io?.disconnect();
    };
  }, []);

  // Film gloss follows a fine pointer; the loop sleeps when the hero is off screen.
  useEffect(() => {
    const hero = heroRef.current;
    const bag = bagRef.current;
    if (!hero || !bag || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    let target = 0;
    let x = 0;
    let raf = 0;
    let visible = true;
    const tick = () => {
      x += (target - x) * 0.08;
      bag.style.setProperty('--mx', x.toFixed(3));
      raf = Math.abs(target - x) > 0.001 && visible ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      target = ((e.clientX - r.left) / r.width - 0.5) * 2;
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(hero);
    hero.addEventListener('pointermove', onMove);
    return () => {
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="v2-hero" aria-labelledby="v2-h1">
      <img
        className="v2-hero__photo"
        src="/images/hero.webp"
        alt=""
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
      <div className="v2-hero__veil" aria-hidden="true" />
      <div className="v2-hero__veil2" aria-hidden="true" />
      <span className="v2-hero__caption">في الخلفية: خطوط الإنتاج داخل مصنعنا في قليوب</span>

      <div className="v2-hero__stage" ref={bagRef}>
        <span className="v2-hero__window" aria-hidden="true" />
        <Bag story copies size="lg" className="v2-hero__bag">
          <div className="v2-hero__content">
            <span className="v2-opener">مصنع شنط وأكياس · قليوب · منذ{' '}2011</span>
            <div className="v2-h1clip">
              <h1 id="v2-h1" className="v2-a">
                اسم محلك على كل شنطة،
                <br />
                <span className="v2-accent v2-a" data-ghost={LINE_2}>
                  {LINE_2}
                </span>
              </h1>
            </div>
            <p className="v2-hero__sub v2-a">
              بلاستيك مطبوع، سوفت، قماش، سلوفان وزيبلوك — بالجملة ومن مصنع واحد، مع توصيل لكل محافظات مصر.
            </p>
            <div className="v2-hero__ctas v2-a">
              <button ref={ctaRef} type="button" className="v2-btn v2-cta-hero v2-cta-primary" onClick={onQuote}>
                {CTA}
                <ArrowLeft className="v2-arrow" size={20} aria-hidden="true" />
              </button>
              <a className="v2-link" href="#try">
                جرّب اسمك على الشنطة
              </a>
            </div>
            <p className="v2-hero__note v2-a">قل لنا الكمية والمقاس، ونرد عليك بالسعر والحد الأدنى للطلب.</p>
          </div>
          <p className="v2-hero__fine">
            البركة بلاست — قليوب، طريق مصر إسكندرية الزراعي ·{' '}
            <a href={TEL_HREF} dir="ltr">
              {PHONE}
            </a>
          </p>
        </Bag>
      </div>
    </section>
  );
};

export default Hero;

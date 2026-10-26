import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/constants/products';
import Bag from './Bag';
import { FACTORY_STEPS, FAQ, INKS, MANIFESTO, STEPS, WHO, type InkKey } from './content';
import { usePlayOnce } from './hooks';
import { prepareBag, saveBag } from './printBag';

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/* 2 · Manifesto — words light up as you read (words only: Arabic letters must stay joined) */
export const Manifesto = () => {
  const words = useMemo(() => {
    const raw = MANIFESTO.split(' ');
    let hl = false;
    return raw.map((w) => {
      const starts = w.startsWith('*');
      if (starts) hl = true;
      const isHl = hl;
      if (w.endsWith('*')) hl = false;
      return { text: w.replace(/\*/g, ''), hl: isHl };
    });
  }, []);
  const n = words.length;
  return (
    <section id="story" className="v2-mf" aria-label="من نحن">
      <div className="v2-mf__stick">
        <div className="v2-wrap">
          <h2 className="v2-mf__text">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className={`v2-mf__w${w.hl ? ' v2-mf__w--hl' : ''}`}
                  style={css({ '--a': Math.round((i / n) * 80), '--b': Math.round((i / n) * 80 + 12) })}
                >
                  {w.text}
                </span>{' '}
              </React.Fragment>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
};

/* 3 · Factory — pinned camera over the real factory photo */
const FOCUS_X = 0.36; // the caption panel sits on the reading-start (right) side
const camera = (px: number, py: number, s: number, fx = FOCUS_X) => {
  const lim = s / 2 - 0.5;
  const clamp = (v: number) => Math.max(-lim, Math.min(lim, v));
  return { tx: clamp(fx - 0.5 - (px - 0.5) * s), ty: clamp(0 - (py - 0.5) * s), s };
};

const Colorbar = ({ on }: { on: number }) => (
  <span className="v2-colorbar" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <i key={i} className={i <= on ? 'is-on' : ''} />
    ))}
  </span>
);

export const Factory = () => {
  const [step, setStep] = useState(0);
  const sentinels = useRef<(HTMLDivElement | null)[]>([]);
  // fallback only (no scroll-driven animations): open the window once the pinned stage is in view
  const stickRef = usePlayOnce<HTMLDivElement>(0.85);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sentinels.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const cur = FACTORY_STEPS[step];
  const cam = camera(cur.px, cur.py, cur.s);

  return (
    <section id="factory" className="v2-fac on-deep" data-step={step} aria-labelledby="v2-fac-h">
      <div className="v2-fac__intro v2-sec v2-wrap">
        <span className="v2-opener">المصنع</span>
        <h2 className="v2-h2">ده مصنعنا في قليوب.</h2>
        <p className="v2-lead v2-measure">صور حقيقية من خطوط الإنتاج: من أبراج النفخ إلى البكرات الجاهزة للطباعة.</p>
        <div className="v2-fac__list">
          {FACTORY_STEPS.map((s, i) => {
            const c = camera(s.px, s.py, s.s, 0.5);
            return (
              <figure className="v2-fac__card" key={s.title}>
                {/* only the first crop is punched open (the hero's handle, on screen); the rest just fade */}
                <div className="v2-fac__cropwrap">
                  <div className="v2-fac__crop">
                    <img
                      src="/images/hero.webp"
                      alt={`داخل مصنع البركة بلاست: ${s.title}`}
                      loading="lazy"
                      width={1536}
                      height={1024}
                      style={{ transform: `translate(${c.tx * 100}%, ${c.ty * 100}%) scale(${s.s})` }}
                    />
                  </div>
                  {i === 0 && <span className="v2-bag__die v2-fac__die" aria-hidden="true" />}
                </div>
                <figcaption>
                  <h3>
                    <span className="v2-reg">
                      <span>{i + 1}</span>
                    </span>
                    {s.title}
                  </h3>
                  <p>{s.text}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="v2-fac__track">
        <ol className="v2-sr">
          {FACTORY_STEPS.map((s) => (
            <li key={s.title}>
              {s.title}: {s.text}
            </li>
          ))}
        </ol>
        {FACTORY_STEPS.map((_, i) => (
          <div
            key={i}
            className="v2-fac__sentinel"
            style={{ top: `${60 + i * 100}vh` }}
            data-i={i}
            ref={(el) => (sentinels.current[i] = el)}
          />
        ))}
        <div className="v2-fac__stick" ref={stickRef}>
          {/* the window: opens from the hero's 196×64 handle slot once the stage is pinned */}
          <div className="v2-fac__win">
            <div
              className="v2-fac__cam"
              role="img"
              aria-label="خطوط الإنتاج داخل مصنع البركة بلاست في قليوب"
              style={css({ '--tx': cam.tx, '--ty': cam.ty, '--s': cam.s })}
            />
          </div>
          <div className="v2-fac__shade" aria-hidden="true" />
          <div className="v2-fac__finder" aria-hidden="true" />
          <span className="v2-bag__die v2-fac__die" aria-hidden="true" />
          <div className="v2-fac__panel">
            <span className="v2-opener">المصنع</span>
            <h2 id="v2-fac-h" className="v2-h2">
              ده مصنعنا في قليوب.
            </h2>
            <div className="v2-fac__steps" aria-hidden="true">
              {FACTORY_STEPS.map((s, i) => (
                <div key={s.title} className={`v2-fac__step${i === step ? ' is-on' : ''}`}>
                  <span className="v2-reg">
                    <span>{i + 1}</span>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="v2-fac__progress">
              <Colorbar on={step} />
              <span>
                {step + 1} من {FACTORY_STEPS.length} · اسحب لأسفل
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 4 · Products — desktop: one proof sheet (the colour bar runs across it, then the photos
   take their ink; hover opens a photo from the handle-slot shape). Phones: an RTL swipe rail. */
const PCard = ({ lg, i, children }: { lg: boolean; i: number; children: React.ReactNode }) => (
  <li className={`v2-pcard${lg ? ' v2-pcard--lg' : ''}`} style={css({ '--i': i })}>
    {children}
  </li>
);

export const Products = ({ onQuote }: { onQuote: (name: string, image: string) => void }) => {
  const sheet = usePlayOnce<HTMLDivElement>(0.2);
  const rail = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);
  const raf = useRef(0);
  const onRail = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = rail.current;
      const first = el?.firstElementChild as HTMLElement | null;
      if (!el || !first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      // Math.abs: in an RTL scroller Chrome reports a negative scrollLeft
      const i = Math.round(Math.abs(el.scrollLeft) / (first.offsetWidth + gap));
      setAt(Math.max(0, Math.min(PRODUCTS.length - 1, i)));
    });
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return (
  <section id="products" className="v2-prod v2-sec" aria-labelledby="v2-prod-h">
    <div className="v2-wrap">
      <header className="v2-split">
        <div>
          <span className="v2-opener">المنتجات</span>
          <h2 id="v2-prod-h" className="v2-h2">
            خمس فئات من الشنط، من مصنع واحد.
          </h2>
        </div>
        <p className="v2-lead">بدل ما تتعامل مع مورّد لكل نوع، اطلب كل شنطك من مكان واحد. الصور لشنط من إنتاجنا.</p>
      </header>
      <div className="v2-prod__sheet" ref={sheet}>
      <span className="v2-prod__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <ul className="v2-prod__grid" ref={rail} onScroll={onRail}>
        {PRODUCTS.map((p, i) => {
          const photo = p.images[1] ?? p.image;
          return (
            <PCard key={p.id} lg={i < 2} i={i}>
              <div className="v2-pcard__win">
                <img src={photo} alt={p.name} loading="lazy" width={1024} height={1024} />
              </div>
              <div className="v2-pcard__body">
                <h3>
                  <span className="v2-reg">
                    <span>{i + 1}</span>
                  </span>
                  {p.name}
                </h3>
                <p>{p.description}</p>
                <dl className="v2-prod__specs">
                  {p.specifications.slice(0, 2).map((s) => (
                    <React.Fragment key={s.name}>
                      <dt>{s.name}</dt>
                      <dd>{s.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
                <div className="v2-prod__links">
                  <button type="button" className="v2-link" onClick={() => onQuote(p.name, photo)}>
                    اطلب تسعيرة لهذا المنتج
                  </button>
                  <Link className="v2-link" to={`/products/${p.id}`}>
                    التفاصيل والصور
                  </Link>
                </div>
              </div>
            </PCard>
          );
        })}
      </ul>
      <div className="v2-prod__cue" aria-hidden="true">
        <span className="v2-colorbar v2-colorbar--5">
          {PRODUCTS.map((p, i) => (
            <i key={p.id} className={i <= at ? 'is-on' : ''} />
          ))}
        </span>
        <span>
          {at + 1} من {PRODUCTS.length} · اسحب للمزيد
        </span>
      </div>
      </div>
    </div>
  </section>
  );
};

/* 5 · Try your name — the visitor's name printed on our bag, in two plates */
export const TryName = ({
  name,
  setName,
  ink,
  setInk,
  onQuote,
}: {
  name: string;
  setName: (v: string) => void;
  ink: InkKey;
  setInk: (v: InkKey) => void;
  onQuote: () => void;
}) => {
  const [phone, setPhone] = useState('');
  const shown = name.trim() || 'اسم محلك';
  // re-key the print after typing pauses so the plates run once, not per keystroke
  const [pressKey, setPressKey] = useState(0);
  const [spoken, setSpoken] = useState(shown);
  useEffect(() => {
    const t = window.setTimeout(() => {
      setPressKey((k) => k + 1);
      setSpoken(shown);
    }, 260);
    return () => window.clearTimeout(t);
  }, [name, phone, ink, shown]);
  const inkDef = INKS.find((i) => i.key === ink)!;
  // touch devices share the PNG (WhatsApp); fine pointers save the file
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches);
  useEffect(() => {
    const mq = window.matchMedia?.('(pointer: coarse)');
    if (!mq) return;
    const on = () => setCoarse(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  // warm the factory photo + logo so the tap renders inside its user activation
  useEffect(() => {
    const t = window.setTimeout(() => void prepareBag(), 1500);
    return () => window.clearTimeout(t);
  }, []);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const save = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const r = await saveBag(shown, phone, inkDef.hex, coarse);
      if (r === 'downloaded') setSaveMsg('اتحفظت صورة الشنطة على جهازك.');
    } catch {
      setSaveMsg('ما قدرناش نجهّز الصورة، جرّب تاني.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="try" className="v2-try v2-sec on-deep" aria-labelledby="v2-try-h">
      <div className="v2-wrap">
        <span className="v2-opener">جرّب بنفسك</span>
        <h2 id="v2-try-h" className="v2-h2">
          اكتب اسم محلك، وشوفه على الشنطة.
        </h2>
        <p className="v2-lead v2-measure">معاينة توضيحية على شنطة مقصوصة — التصميم النهائي نراجعه معك قبل الطباعة.</p>
        <div className="v2-try__grid">
          <form className="v2-try__form" onSubmit={(e) => e.preventDefault()}>
            <div className="v2-field">
              <label htmlFor="v2-try-name">اسم المحل أو البراند</label>
              <input
                id="v2-try-name"
                className="v2-input"
                value={name}
                maxLength={24}
                placeholder="مثلاً: مخبز النور"
                onChange={(e) => setName(e.target.value)}
                autoComplete="organization"
              />
            </div>
            <div className="v2-field">
              <label htmlFor="v2-try-phone">رقم يُطبع أسفل الشنطة (اختياري)</label>
              <input
                id="v2-try-phone"
                className="v2-input"
                value={phone}
                maxLength={15}
                inputMode="tel"
                dir="ltr"
                placeholder="01xxxxxxxxx"
                onChange={(e) => setPhone(e.target.value.replace(/[^\d+ ]/g, ''))}
              />
            </div>
            <fieldset className="v2-field">
              <legend>لون الطباعة</legend>
              <div className="v2-inks">
                {INKS.map((i) => (
                  <label key={i.key} className="v2-ink" style={css({ '--sw': i.color })}>
                    <input type="radio" name="v2-ink" value={i.key} checked={ink === i.key} onChange={() => setInk(i.key)} />
                    <span>{i.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="v2-try__actions">
              <button type="button" className="v2-btn v2-cta-primary" onClick={onQuote}>
                اطلب تسعيرة لهذه الشنطة
                <ArrowLeft className="v2-arrow" size={20} aria-hidden="true" />
              </button>
              <button type="button" className="v2-link v2-link--btn" onClick={save} disabled={saving} aria-busy={saving || undefined}>
                {coarse ? <Share2 size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}
                {saving ? 'جاري التجهيز…' : coarse ? 'ابعت الصورة على واتساب' : 'احفظ صورة الشنطة'}
              </button>
            </div>
            <p className="v2-try__note">الاسم يبقى على جهازك فقط، ولا يُرسل لأي مكان.</p>
            <span className="v2-sr" role="status">
              {saveMsg}
            </span>
          </form>
          <div className="v2-try__stage">
            {/* re-keyed after typing pauses: the bag dips as plate 1 lands, then the plates run once */}
            <div key={pressKey} className="v2-try__press">
              <span className="v2-try__window" aria-hidden="true" />
              <Bag size="sm" aria-hidden>
                <div className="v2-try__print" style={css({ '--ink-c': inkDef.color, '--len': Math.max(5, [...shown].length) })}>
                  <span className="v2-try__name" data-ghost={shown}>
                    {shown}
                  </span>
                  {phone && <span className="v2-try__phone">{phone}</span>}
                </div>
              </Bag>
            </div>
            <span className="v2-sr" aria-live="polite">
              المعاينة: {spoken}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 6 · Who it's for — two bags, the copy printed on them: a wholesale stack of plain bags
   (the copies fan out as you scroll) and one bag printed with the shop's own brand */
export const Who = () => (
  <section id="who" className="v2-who v2-sec" aria-labelledby="v2-who-h">
    <div className="v2-wrap">
      <header className="v2-center">
        <span className="v2-opener">لمن نصنع</span>
        <h2 id="v2-who-h" className="v2-h2">
          مين بيطلب من البركة؟
        </h2>
      </header>
      <div className="v2-who__grid">
        {WHO.map((w) => (
          <article key={w.key} className={`v2-who__item v2-who__item--${w.key}`}>
            <Bag size="sm" copies={w.key === 'a'}>
              {w.key === 'b' && (
                <span className="v2-who__brand" aria-hidden="true">
                  براندك
                </span>
              )}
              <h3>{w.title}</h3>
              <p>{w.who}</p>
              <ul>
                {w.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Bag>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* 7 · How to order — a perforation line tears across, stations stamp in order */
export const HowToOrder = () => {
  const ref = usePlayOnce<HTMLElement>(0.35);
  return (
    <section id="how-it-works" ref={ref} className="v2-how v2-sec" aria-labelledby="v2-how-h">
      <div className="v2-wrap">
        <header className="v2-split">
          <div>
            <span className="v2-opener">طريقة الطلب</span>
            <h2 id="v2-how-h" className="v2-h2">
              من رسالتك لحد باب محلك.
            </h2>
          </div>
          <p className="v2-lead">خمس خطوات، وكل خطوة نوضح لك فيها التفاصيل قبل ما نكمل.</p>
        </header>
        <div className="v2-how__wrap">
          <span className="v2-how__rail" aria-hidden="true" />
          <ol className="v2-how__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="v2-how__step">
                <span className="v2-reg" style={css({ '--d': `${0.15 + i * 0.26}s` })}>
                  <span>{i + 1}</span>
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* 8 · FAQ — sticky title column + hairline rows */
export const Faq = () => (
  <section id="faq" className="v2-faq v2-sec" aria-labelledby="v2-faq-h">
    <div className="v2-wrap v2-faq__grid">
      <header className="v2-faq__head">
        <span className="v2-opener">قبل ما تطلب</span>
        <h2 id="v2-faq-h" className="v2-h2">
          أسئلة بتتسأل كتير.
        </h2>
        <p className="v2-lead">مش لاقي إجابتك؟ اكتب لنا في أمر الطلب تحت، أو على واتساب.</p>
      </header>
      <div className="v2-faq__list">
        {FAQ.map((f) => (
          <details key={f.q} className="v2-faq__item">
            <summary>
              {f.q}
              <span className="v2-reg v2-faq__x" aria-hidden="true" />
            </summary>
            <div className="v2-faq__a">
              {typeof f.a === 'string' ? (
                <p>{f.a}</p>
              ) : (
                <>
                  <p>{f.a.intro}</p>
                  <ul>
                    {f.a.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
    <div className="v2-faq__dim" aria-hidden="true" />
  </section>
);

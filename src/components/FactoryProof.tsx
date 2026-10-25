import React from 'react';
import { Factory, Layers, Printer, Truck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Real, verifiable facts only (see PRODUCT.md) — replaces invented testimonials.
const FACTS = [
  { icon: Factory, value: '2011', label: 'بداية التشغيل', note: 'بدأنا بخط إنتاج واحد في قليوب' },
  { icon: Layers, value: '5+', label: 'خطوط إنتاج', note: 'مصنع متكامل، مش وسيط ولا موزّع' },
  { icon: Printer, value: '5', label: 'فئات أكياس', note: 'بلاستيك، سوفت، قماش، سلوفان، زيبلوك' },
  { icon: Truck, value: '27', label: 'محافظة', note: 'توصيل لكل محافظات مصر' },
] as const;

const STEPS = ['اختيار الخامة', 'تحديد المقاس', 'طباعة شعارك', 'الشحن لباب محلك'] as const;

const FactoryProof = () => {
  const ref = useScrollAnimation();
  return (
    <section id="factory" className="section-padding bg-primary text-primary-foreground relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <div className="container-custom relative">
        <div className="max-w-2xl mb-12 scroll-animate">
          <span className="eyebrow !text-primary-foreground/70">مصنع واحد · خمس فئات</span>
          <h2 className="heading-2 mb-4">كل أكياسك من مكان واحد</h2>
          <p className="text-primary-foreground/75 leading-relaxed font-tajawal">
            بدل ما تتعامل مع مورد لكل نوع، بنصنّع ونطبع الخمس فئات في نفس المصنع — جودة واحدة، وسعر جملة، ومسؤول واحد عن طلبك.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className="scroll-animate rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 md:p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <f.icon className="h-6 w-6 text-secondary mb-4" aria-hidden="true" />
              <div className="font-sora font-extrabold text-4xl md:text-5xl leading-none">{f.value}</div>
              <div className="mt-2 font-bold font-cairo">{f.label}</div>
              <p className="mt-1 text-sm text-primary-foreground/70 font-tajawal">{f.note}</p>
            </div>
          ))}
        </div>

        <ol className="grid grid-cols-2 md:grid-cols-4 gap-4 scroll-animate" style={{ transitionDelay: '300ms' }}>
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-secondary font-sora font-bold">
                {i + 1}
              </span>
              <span className="font-bold font-cairo">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default FactoryProof;

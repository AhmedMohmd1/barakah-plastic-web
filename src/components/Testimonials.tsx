import React from 'react';
import { QuoteIcon } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "محمد أحمد",
    role: "صاحب سوبر ماركت",
    content: "تعاملت مع البركة بلاست منذ أكثر من سنتين، جودة الأكياس ممتازة والتعامل محترم جداً. أنصح أي صاحب متجر بالتعامل معهم.",
  },
  {
    id: 2,
    name: "سارة محمود",
    role: "مديرة مشتريات",
    content: "الالتزام بمواعيد التسليم والمرونة في التعامل من أهم ما يميز البركة بلاست. منتجاتهم تلبي احتياجات شركتنا بشكل كامل.",
  },
  {
    id: 3,
    name: "أحمد خالد",
    role: "صاحب مصنع",
    content: "أسعار منافسة وجودة عالية، هذا ما وجدته في التعامل مع البركة بلاست. التعامل مع إدارة الشركة سهل وميسر.",
  },
  {
    id: 4,
    name: "فاطمة علي",
    role: "صاحبة متجر أونلاين",
    content: "الأكياس المطبوعة من البركة بلاست أضافت قيمة لعلامتنا التجارية. جودة الطباعة والخامات رائعة.",
  },
];

const Author = ({ t, inverse = false }: { t: Testimonial; inverse?: boolean }) => (
  <figcaption className="flex items-center gap-3">
    <span
      aria-hidden="true"
      className={
        inverse
          ? "h-11 w-11 rounded-full bg-white/10 text-white ring-1 ring-white/20 flex items-center justify-center font-cairo font-bold shrink-0"
          : "h-11 w-11 rounded-full bg-primary/5 text-primary ring-1 ring-primary/10 flex items-center justify-center font-cairo font-bold shrink-0"
      }
    >
      {t.name.charAt(0)}
    </span>
    <span className="flex flex-col">
      <cite className={inverse ? "not-italic font-bold text-white" : "not-italic font-bold text-foreground"}>
        {t.name}
      </cite>
      <span className={inverse ? "text-sm text-white/70" : "text-sm text-muted-foreground"}>{t.role}</span>
    </span>
  </figcaption>
);

const Testimonials = () => {
  const ref = useScrollAnimation();
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="max-w-2xl mb-12 scroll-animate">
          <span className="eyebrow">ماذا يقول عملاؤنا</span>
          <h2 className="heading-2 text-foreground mb-4">آراء العملاء</h2>
          <p className="text-muted-foreground leading-relaxed">
            ثقة عملائنا هي مقياس نجاحنا، وهذه بعض كلماتهم عن تجربتهم معنا.
          </p>
        </div>

        {/* Featured quote */}
        <figure
          className="scroll-animate relative overflow-hidden rounded-2xl bg-primary text-white p-8 md:p-12 mb-5"
          style={{ transitionDelay: '100ms' }}
        >
          <QuoteIcon aria-hidden="true" className="absolute -top-4 start-6 h-28 w-28 text-white/5 rotate-180" />
          <blockquote className="relative max-w-3xl text-xl md:text-2xl font-cairo font-semibold leading-loose mb-8">
            “{featured.content}”
          </blockquote>
          <Author t={featured} inverse />
        </figure>

        {/* Supporting quotes */}
        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((t, i) => (
            <figure
              key={t.id}
              className="scroll-animate flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 transition-colors duration-300 hover:border-secondary/50"
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <blockquote className="flex-grow text-foreground/80 leading-loose mb-6">
                “{t.content}”
              </blockquote>
              <Author t={t} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

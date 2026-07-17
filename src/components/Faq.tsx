
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Faq = () => {
  const ref = useScrollAnimation();

  const faqs = [
    {
      question: "كيف يمكنني الشراء؟",
      answer: (
        <div className="space-y-2">
          <p>هناك طرق مختلفه لتقديم طلبك:</p>
          <ul className="space-y-2 pr-6 list-disc">
            <li>مكالمة هاتفيه او عن طريق الوتساب: <span dir="ltr" className="text-primary font-bold">01009923040</span></li>
            <li>عبر الايميل الرسمي: <span className="text-primary font-bold">info@elbarkaplast.com</span></li>
          </ul>
        </div>
      )
    },
    {
      question: "ما هي مواصفات المنتجات المتاحة؟",
      answer: "نقدم مجموعة متنوعة من الأكياس البلاستيكية بمختلف المقاسات والسماكات والألوان. يمكنك الاستفسار عن المواصفات المحددة من خلال التواصل معنا."
    },
    {
      question: "هل يمكن طباعة شعار شركتنا على الأكياس؟",
      answer: "نعم، نقدم خدمة طباعة الشعارات والعلامات التجارية على الأكياس البلاستيكية بجودة عالية وألوان متعددة."
    },
    {
      question: "ما هي الحد الأدنى للطلب؟",
      answer: "يختلف الحد الأدنى للطلب حسب نوع المنتج والمواصفات المطلوبة. يرجى التواصل معنا للحصول على تفاصيل أكثر عن طلبك المحدد."
    },
    {
      question: "كم تستغرق مدة التوصيل؟",
      answer: "تختلف مدة التوصيل حسب حجم الطلب والموقع، ولكننا نلتزم بتوفير أسرع خدمة توصيل ممكنة لعملائنا الكرام."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="text-secondary font-semibold text-sm tracking-wide mb-2 block">هل لديك سؤال؟</span>
          <h2 className="heading-2 text-foreground mb-4">الأسئلة المتكررة</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نجيب على أكثر الأسئلة شيوعاً لمساعدتك في الحصول على المعلومات التي تحتاجها
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="scroll-animate" style={{ transitionDelay: `${index * 80}ms` }}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn(
      "bg-white rounded-2xl border transition-all duration-300",
      isOpen ? "border-secondary/40 shadow-md" : "border-border/50 shadow-sm hover:border-border hover:shadow-md"
    )}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center gap-4 text-right px-6 py-5">
          <h3 className="text-lg font-semibold text-foreground">{question}</h3>
          <span className={cn(
            "shrink-0 rounded-full p-1.5 transition-all duration-300",
            isOpen ? "bg-secondary/10 text-secondary rotate-180" : "bg-muted text-foreground/60"
          )}>
            <ChevronDown className="h-5 w-5" />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
          {answer}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Faq;

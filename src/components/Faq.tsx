
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

const Faq = () => {
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
    <section id="faq" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">الاسئلة المتكررة</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            نجيب على أكثر الأسئلة شيوعاً لمساعدتك في الحصول على المعلومات التي تحتاجها
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
              isLast={index === faqs.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isLast?: boolean;
}

const FaqItem = ({ question, answer, isLast = false }: FaqItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("py-4", !isLast && "border-b border-gray-200")}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center text-right">
          <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
          <ChevronDown 
            className={cn(
              "h-5 w-5 text-primary/70 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 text-gray-600 leading-relaxed">
          {answer}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Faq;

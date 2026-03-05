import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PRODUCT_OPTIONS = [
  'شُنط مطبوعة بشعارك',
  'شنط سوفت للمحلات الملابس',
  'شنط قماش',
  'اكياس سلوفان بشريطه',
  'اكياس ذات غالق - Ziplock Bags',
  'أخرى',
];

const Contact = () => {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'يرجى إدخال الاسم الكامل';
    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      const validPrefixes = ['011', '012', '015', '010'];
      const phonePrefix = cleanPhone.substring(0, 3);
      if (cleanPhone.length !== 11) newErrors.phone = 'يجب أن يكون رقم الهاتف 11 رقم';
      else if (!validPrefixes.includes(phonePrefix)) newErrors.phone = 'يجب أن يبدأ رقم الهاتف بـ 011 أو 012 أو 015 أو 010';
    }
    if (!formData.message.trim()) newErrors.message = 'يرجى إدخال الرسالة';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast.error('يرجى تصحيح الأخطاء في النموذج'); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://sheetdb.io/api/v1/az68rhltg636u', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "الأسم": formData.name,
          "رقم التليفون": formData.phone,
          "البريد الالكتروني": formData.email || '',
          "الموضوع": formData.product || '',
          "الرسالة": formData.message
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await response.json();
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData({ name: '', company: '', phone: '', email: '', product: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/50" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14 scroll-animate">
          <span className="text-secondary font-semibold text-sm tracking-wide mb-2 block">نحن هنا لمساعدتك</span>
          <h2 className="heading-2 text-foreground mb-4">اوصل لينا بسهولة</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نحن سعداء بالرد على استفساراتكم وتلبية طلباتكم. يمكنكم التواصل معنا من خلال النموذج أدناه
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6 scroll-animate">
            <h3 className="heading-3 text-foreground mb-6">معلومات التواصل</h3>

            {[
              { icon: Phone, label: 'رقم الهاتف', value: '01009923040', extra: 'dir-ltr text-right' },
              { icon: Mail, label: 'البريد الإلكتروني', value: 'info@elbarkaplast.com' },
              { icon: MapPin, label: 'العنوان', value: 'قليوب - طريق مصر اسكندريه الزراعي\nالمنطقة الصناعية الأولي' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-xl shrink-0">
                  <item.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">{item.label}</h4>
                  <p className={`text-muted-foreground ${item.extra || ''}`}>
                    {item.value.split('\n').map((line, j) => (
                      <React.Fragment key={j}>{line}{j < item.value.split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <h4 className="font-bold mb-3 text-foreground">ساعات العمل</h4>
              <div className="space-y-2">
                <p className="flex justify-between"><span className="text-muted-foreground">السبت - الخميس:</span><span className="font-medium text-foreground">8:00 ص - 5:00 م</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground">الجمعة:</span><span className="font-medium text-foreground">مغلق</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 scroll-animate bg-white p-8 rounded-2xl shadow-lg shadow-primary/5 border border-border/50" style={{ transitionDelay: '150ms' }}>
            <h3 className="heading-3 text-foreground mb-6">أرسل استفسارك</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium text-foreground text-sm">الاسم الكامل *</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="أدخل اسمك الكامل" className={`modern-input ${errors.name ? 'border-destructive' : ''}`} required />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="block font-medium text-foreground text-sm">اسم الشركة</label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="اسم شركتك (اختياري)" className="modern-input" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium text-foreground text-sm">رقم الهاتف *</label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="أدخل رقم الهاتف" className={`modern-input ${errors.phone ? 'border-destructive' : ''}`} required />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium text-foreground text-sm">البريد الإلكتروني</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="أدخل بريدك الإلكتروني" className={`modern-input ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="product" className="block font-medium text-foreground text-sm">المنتج المطلوب</label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="modern-input appearance-none cursor-pointer"
                >
                  <option value="">اختر المنتج المطلوب</option>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium text-foreground text-sm">الرسالة *</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="اكتب رسالتك أو تفاصيل طلبك هنا..." rows={4} className={`modern-input resize-none ${errors.message ? 'border-destructive' : ''}`} required />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" className="bg-secondary hover:bg-secondary-dark w-full rounded-xl text-base font-semibold py-5 shadow-md shadow-secondary/20" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />جاري الإرسال...</>
                ) : (
                  <>إرسال الرسالة<Send className="mr-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

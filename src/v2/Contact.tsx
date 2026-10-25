import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { LEAD_FORM_ENDPOINT } from '@/constants/contact';
import { ADDRESS, EMAIL, PHONE, TEL_HREF, WA_HREF } from './content';

// Same options, validation, endpoint and payload keys as src/components/Contact.tsx
// (the sheet columns depend on them) — only the markup is new.
const PRODUCT_OPTIONS = [
  'شُنط مطبوعة بشعارك',
  'شنط سوفت للمحلات الملابس',
  'شنط قماش',
  'اكياس سلوفان بشريطه',
  'اكياس ذات غالق - Ziplock Bags',
  'أخرى',
];

export const WaIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const empty = { name: '', company: '', phone: '', email: '', product: '', quantity: '', size: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(LEAD_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "الأسم": formData.name,
          "اسم الشركة": formData.company || '',
          "رقم التليفون": formData.phone,
          "البريد الالكتروني": formData.email || '',
          "الموضوع": formData.product || '',
          "الكمية المطلوبة": formData.quantity || '',
          "المقاس أو السماكة": formData.size || '',
          "الرسالة": formData.message
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await response.json();
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData(empty);
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`v2c-${k}-error`} className="v2-err">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `v2c-${k}-error` : undefined,
  });

  return (
    <section id="contact" className="v2-contact v2-sec" aria-labelledby="v2-contact-h">
      <div className="v2-wrap">
        <span className="v2-opener">تواصل معنا</span>
        <h2 id="v2-contact-h" className="v2-h2">
          ابعت تفاصيل طلبك.
        </h2>
        <p className="v2-lead v2-measure">للتسعير التفصيلي املأ أمر الطلب، وللرد السريع خلال ساعات العمل كلّمنا على واتساب.</p>
        <div className="v2-contact__grid">
          <div>
            <ul className="v2-ch">
              <li>
                <a className="v2-ch__wa" href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  <b>واتساب</b>
                  <span dir="ltr">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={TEL_HREF}>
                  <Phone size={22} aria-hidden="true" />
                  <b>اتصل بنا</b>
                  <span dir="ltr">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <Mail size={22} aria-hidden="true" />
                  <b>البريد الإلكتروني</b>
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <div>
                  <MapPin size={22} aria-hidden="true" />
                  <b>المصنع</b>
                  <span>{ADDRESS}</span>
                </div>
              </li>
            </ul>
            <div className="v2-hours">
              <p>
                <span>السبت – الخميس</span>
                <b>8:00 ص – 5:00 م</b>
              </p>
              <p>
                <span>الجمعة</span>
                <b>مغلق</b>
              </p>
            </div>
          </div>

          <div className="v2-ticket">
            <div className="v2-ticket__head">
              <h3>أمر طلب تسعيرة</h3>
              <p>الحقول المعلَّمة * مطلوبة</p>
            </div>
            <form onSubmit={handleSubmit} className="v2-form">
              <div className="v2-form__row">
                <div>
                  <label htmlFor="v2c-name">الاسم الكامل *</label>
                  <input id="v2c-name" name="name" className="v2-in" value={formData.name} onChange={handleChange} autoComplete="name" required {...aria('name')} />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="v2c-company">اسم الشركة أو المحل</label>
                  <input id="v2c-company" name="company" className="v2-in" value={formData.company} onChange={handleChange} autoComplete="organization" />
                </div>
              </div>
              <div className="v2-form__row">
                <div>
                  <label htmlFor="v2c-phone">رقم الهاتف *</label>
                  <input id="v2c-phone" name="phone" className="v2-in" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} required {...aria('phone')} />
                  {err('phone')}
                </div>
                <div>
                  <label htmlFor="v2c-email">البريد الإلكتروني</label>
                  <input id="v2c-email" name="email" type="email" className="v2-in" dir="ltr" autoComplete="email" value={formData.email} onChange={handleChange} {...aria('email')} />
                  {err('email')}
                </div>
              </div>
              <div>
                <label htmlFor="v2c-product">المنتج المطلوب</label>
                <select id="v2c-product" name="product" className="v2-in" value={formData.product} onChange={handleChange}>
                  <option value="">اختر المنتج</option>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="v2-form__row">
                <div>
                  <label htmlFor="v2c-quantity">الكمية المطلوبة</label>
                  <input id="v2c-quantity" name="quantity" className="v2-in" placeholder="مثال: 5000 قطعة" value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="v2c-size">المقاس أو السماكة</label>
                  <input id="v2c-size" name="size" className="v2-in" placeholder="إن وُجد" value={formData.size} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="v2c-message">الرسالة *</label>
                <textarea id="v2c-message" name="message" className="v2-in" rows={4} placeholder="اكتب تفاصيل طلبك: الطباعة، الألوان، الاستخدام…" value={formData.message} onChange={handleChange} required {...aria('message')} />
                {err('message')}
              </div>
              <button type="submit" className="v2-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال أمر الطلب'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

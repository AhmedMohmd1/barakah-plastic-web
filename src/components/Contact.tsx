import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم الكامل';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else {
      // Remove any spaces, dashes, or other characters to get only digits
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      // Check if it's exactly 11 digits and starts with valid Egyptian prefixes
      const validPrefixes = ['011', '012', '015', '010'];
      const phonePrefix = cleanPhone.substring(0, 3);
      
      if (cleanPhone.length !== 11) {
        newErrors.phone = 'يجب أن يكون رقم الهاتف 11 رقم';
      } else if (!validPrefixes.includes(phonePrefix)) {
        newErrors.phone = 'يجب أن يبدأ رقم الهاتف بـ 011 أو 012 أو 015 أو 010';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'يرجى إدخال الرسالة';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://sheetdb.io/api/v1/az68rhltg636u', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Field names must match exactly with your Google Sheet column headers
          "الأسم": formData.name,
          "رقم التليفون": formData.phone,
          "البريد الالكتروني": formData.email || '',
          "الموضوع": formData.subject || '',
          "الرسالة": formData.message
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Contact form submitted successfully:', result);
      
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">اوصل لينا بسهولة</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            نحن سعداء بالرد على استفساراتكم وتلبية طلباتكم. يمكنكم التواصل معنا
            من خلال النموذج أدناه
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="heading-3 text-primary mb-6">معلومات التواصل</h3>

            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <Phone className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">رقم الهاتف</h4>
                <p className="text-gray-700 dir-ltr text-right">01009923040</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                <p className="text-gray-700">info@elbarkaplast.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">العنوان</h4>
                <p className="text-gray-700">
                  قليوب - طريق مصر اسكندريه الزراعي
                  <br />
                  المنطقة الصناعية الأولي
                </p>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-bold mb-3">ساعات العمل</h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-700">السبت - الخميس:</span>
                  <span className="font-medium">8:00 ص - 5:00 م</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">الجمعة:</span>
                  <span className="font-medium">مغلق</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 modern-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-3 text-primary">أرسل رسالة</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">
                    الاسم الكامل *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكامل"
                    className={`modern-input ${errors.name ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium">
                    رقم الهاتف *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="أدخل رقم الهاتف"
                    className={`modern-input ${errors.phone ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`modern-input ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block font-medium">
                  الموضوع
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="موضوع الرسالة"
                  className="modern-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">
                  الرسالة *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا"
                  rows={5}
                  className={`modern-input resize-none ${errors.message ? 'border-red-500' : ''}`}
                  required
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark w-full rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال الرسالة
                    <Send className="mr-2 h-4 w-4" />
                  </>
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

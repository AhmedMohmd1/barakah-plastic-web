import React, { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    // Simulate successful submission
    setTimeout(() => {
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
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
                    className="modern-input"
                    required
                  />
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
                    className="modern-input"
                    required
                  />
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
                  className="modern-input"
                />
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
                  className="modern-input resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark w-full rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                <Send className="mr-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

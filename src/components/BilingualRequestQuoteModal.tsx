import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
}

const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({ isOpen, onClose, language }) => {
  const [formData, setFormData] = useState({
    product: 'printed-bags',
    name: '',
    contact: '',
    quantity: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const translations = {
    ar: {
      title: "طلب عرض سعر",
      description: "يرجى ملء البيانات التالية للحصول على عرض سعر مخصص",
      product: "المنتج",
      productOptions: {
        "printed-bags": "أكياس مطبوعة بشعار الشركة",
        "packaging-bags": "أكياس تغليف",
        "cellophane-bags": "اكياس سلوفان بشريطه",
        "cloth-bags": "شنط قماش",
        "ziplock-bags": "اكياس ذات غالق - ziplock bags",
        "soft-bags": "شنط سوفت للمحلات الملابس",
      },
      name: "الاسم",
      contact: "رقم الهاتف / البريد الإلكتروني",
      quantity: "الكمية المطلوبة",
      notes: "ملاحظات إضافية",
      submit: "طلب",
      successMessage: "تم إرسال طلبك بنجاح، سنتواصل معك قريباً",
      errorMessage: "حدث خطأ أثناء إرسال طلبك، يرجى المحاولة مرة أخرى",
      phoneError: "يرجى إدخال رقم هاتف صحيح",
      quantityError: "يرجى إدخال رقم صحيح للكمية",
    },
    en: {
      title: "Request a Quote",
      description: "Please fill out the following details to get a custom quote",
      product: "Product",
      productOptions: {
        "printed-bags": "Company logo printed bags",
        "packaging-bags": "Packaging bags",
        "cellophane-bags": "Cellophane bags with tape",
        "cloth-bags": "Cloth bags",
        "ziplock-bags": "Ziplock bags",
        "soft-bags": "Soft bags for clothing stores",
      },
      name: "Name",
      contact: "Phone Number / Email",
      quantity: "Required Quantity",
      notes: "Additional Notes",
      submit: "Request",
      successMessage: "Your request has been sent successfully, we will contact you soon",
      errorMessage: "An error occurred while sending your request, please try again",
      phoneError: "Please enter a valid phone number",
      quantityError: "Please enter a valid quantity",
    }
  };

  const text = translations[language];
  const isRTL = language === 'ar';

  const validatePhone = (value: string) => {
    if (value.includes('@')) return true;
    return /^\d+$/.test(value);
  };

  const validateQuantity = (value: string) => {
    return /^\d+$/.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'contact' && value && !validatePhone(value)) {
      setErrors(prev => ({ ...prev, contact: text.phoneError }));
    }

    if (name === 'quantity' && value && !validateQuantity(value)) {
      setErrors(prev => ({ ...prev, quantity: text.quantityError }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (formData.contact && !validatePhone(formData.contact)) {
      newErrors.contact = text.phoneError;
    }

    if (formData.quantity && !validateQuantity(formData.quantity)) {
      newErrors.quantity = text.quantityError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form data submitted:', formData);

      toast.success(text.successMessage);

      setFormData({ product: 'printed-bags', name: '', contact: '', quantity: '', notes: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(text.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md rounded-xl ${isRTL ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-cairo">{text.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2`}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {text.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              {text.product}
            </label>
            <Select value={formData.product} onValueChange={handleProductChange} required>
              <SelectTrigger className="modern-input">
                <SelectValue placeholder={text.product} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(text.productOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {text.name}
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="modern-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium">
              {text.contact}
            </label>
            <Input
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`modern-input ${!isRTL ? 'ltr' : ''}`}
              dir={!isRTL ? "ltr" : "rtl"}
              required
              aria-invalid={!!errors.contact}
            />
            {errors.contact && (
              <p className="text-sm text-red-500">{errors.contact}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              {text.quantity}
            </label>
            <Input
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="modern-input"
              required
              inputMode="numeric"
              aria-invalid={!!errors.quantity}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              {text.notes}
            </label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="modern-input min-h-[80px]"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary-dark rounded-xl"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? '...' : text.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteModal;

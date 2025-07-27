import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
// استخدم نفس المنتجات
import { PRODUCTS } from "@/constants/products";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    product: '',
    name: '',
    phone: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.product.trim()) {
      newErrors.product = 'يرجى اختيار المنتج';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم';
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
      // SheetDB expects the data to match the column headers in your Google Sheet
      const response = await fetch('https://sheetdb.io/api/v1/8rd4nognbuv4g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Field names must match exactly with your Google Sheet column headers
          "product name": formData.product,
          "client name": formData.name,
          "phone number": formData.phone,
          "notes": formData.note || ''
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      toast.success('تم إرسال طلبك بنجاح، سنتواصل معك قريباً');
      setFormData({ product: '', name: '', phone: '', note: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-cairo">طلب عرض سعر</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute left-2 top-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-right" dir="rtl">
            يرجى ملء البيانات التالية للحصول على عرض سعر مخصص
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              المنتج
            </label>
            <Select value={formData.product} onValueChange={handleProductChange} required>
              <SelectTrigger className={`modern-input text-right ${errors.product ? 'border-red-500' : ''}`} dir="rtl">
                <SelectValue placeholder="اختر المنتج" />
              </SelectTrigger>
              <SelectContent dir="rtl" className="text-right">
                {PRODUCTS.map((product) => (
                  <SelectItem key={product.id} value={product.name} className="text-right">
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.product && (
              <p className="text-sm text-red-500">{errors.product}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              الاسم
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`modern-input ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              رقم الهاتف
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`modern-input ltr ${errors.phone ? 'border-red-500' : ''}`}
              dir="ltr"
              required
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              ملاحظات
            </label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="modern-input min-h-[80px]"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary-dark rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                'طلب'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteModal;

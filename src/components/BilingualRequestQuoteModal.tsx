
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

  const translations = {
    ar: {
      title: "طلب عرض سعر",
      description: "يرجى ملء البيانات التالية للحصول على عرض سعر مخصص لأكياس مطبوعة",
      product: "المنتج",
      productOptions: {
        "printed-bags": "أكياس مطبوعة بشعار الشركة",
        "custom-size": "أكياس بمقاسات خاصة",
        "shopping-bags": "أكياس تسوق",
        "packaging-bags": "أكياس تغليف",
      },
      name: "الاسم",
      contact: "رقم الهاتف / البريد الإلكتروني",
      quantity: "الكمية المطلوبة",
      notes: "ملاحظات إضافية",
      submit: "طلب",
      successMessage: "تم إرسال طلبك بنجاح، سنتواصل معك قريباً",
      errorMessage: "حدث خطأ أثناء إرسال طلبك، يرجى المحاولة مرة أخرى",
    },
    en: {
      title: "Request a Quote",
      description: "Please fill out the following details to get a custom quote for printed bags",
      product: "Product",
      productOptions: {
        "printed-bags": "Company logo printed bags",
        "custom-size": "Custom size bags",
        "shopping-bags": "Shopping bags",
        "packaging-bags": "Packaging bags",
      },
      name: "Name",
      contact: "Phone Number / Email",
      quantity: "Required Quantity",
      notes: "Additional Notes",
      submit: "Request",
      successMessage: "Your request has been sent successfully, we will contact you soon",
      errorMessage: "An error occurred while sending your request, please try again",
    }
  };

  const text = translations[language];
  const isRTL = language === 'ar';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // For demonstration purposes, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data submitted:', formData);
      
      // Show success message
      toast.success(text.successMessage);
      
      // Reset form and close modal
      setFormData({ product: 'printed-bags', name: '', contact: '', quantity: '', notes: '' });
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
            />
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
            />
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
              disabled={isSubmitting}
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

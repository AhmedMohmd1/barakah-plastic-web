import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { useForm } from '@/hooks/useForm';
import { PRODUCTS } from "@/constants/products";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({ isOpen, onClose }) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useForm({
    initialData: {
      product: '',
      name: '',
      phone: '',
      note: '',
    },
    validationSchema: {
      product: 'required',
      name: 'required',
      phone: 'phone',
      note: 'optional'
    },
    endpoint: 'https://sheetdb.io/api/v1/8rd4nognbuv4g',
    successMessage: 'تم إرسال طلبك بنجاح، سنتواصل معك قريباً',
    errorMessage: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى',
    onSuccess: onClose
  });

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, {
      "product name": formData.product,
      "client name": formData.name,
      "phone number": formData.phone,
      "notes": formData.note || ''
    });
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              المنتج
            </label>
            <Select value={formData.product} onValueChange={(value) => handleSelectChange(value, 'product')} required>
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

          <FormField
            type="text"
            name="name"
            label="الاسم"
            value={formData.name}
            onChange={handleChange}
            required
            errors={errors}
          />

          <FormField
            type="tel"
            name="phone"
            label="رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            required
            errors={errors}
            className="ltr"
            dir="ltr"
          />

          <FormField
            type="textarea"
            name="note"
            label="ملاحظات"
            value={formData.note}
            onChange={handleChange}
            errors={errors}
            rows={3}
          />

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

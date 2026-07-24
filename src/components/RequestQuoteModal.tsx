import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { useForm } from '@/hooks/useForm';
import { PRODUCTS, PRODUCT_IMAGE_FALLBACK } from "@/constants/products";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** When set, the modal is scoped to a single product: it preselects that
   *  product and shows its thumbnail instead of the product picker. */
  productName?: string;
  productImage?: string;
}

const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({ isOpen, onClose, productName, productImage }) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
    updateFormData,
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

  // Preselect the product when the modal is opened for a specific one.
  useEffect(() => {
    if (isOpen && productName) {
      updateFormData({ product: productName });
    }
  }, [isOpen, productName]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {productName ? (
            <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-3">
              <img
                src={productImage || PRODUCT_IMAGE_FALLBACK}
                alt={productName}
                className="h-14 w-14 shrink-0 rounded-lg object-cover bg-muted"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.indexOf(PRODUCT_IMAGE_FALLBACK) === -1) img.src = PRODUCT_IMAGE_FALLBACK;
                }}
              />
              <div>
                <p className="font-semibold text-primary">{productName}</p>
                <p className="text-sm text-muted-foreground">طلب عرض سعر لهذا المنتج</p>
              </div>
            </div>
          ) : (
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
          )}

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

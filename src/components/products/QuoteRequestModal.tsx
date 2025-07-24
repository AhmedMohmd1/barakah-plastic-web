import React, { useState } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  productName,
  productImage,
}) => {
  const [formData, setFormData] = useState({
    phone: '',
    note: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone.trim()) {
      toast.error('يرجى إدخال رقم الهاتف');
      return;
    }

    setIsSubmitting(true);

    try {

      setFormData({ phone: '', note: '', name: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-primary">طلب عرض سعر</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <img
              src={productImage}
              alt={productName}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-primary">{productName}</h3>
              <p className="text-sm text-gray-600">طلب عرض سعر لهذا المنتج</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              الاسم (اختياري)
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسمك"
              className="text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الهاتف *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="أدخل رقم هاتفك"
              required
              className="text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              ملاحظات (اختياري)
            </Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="أضف أي ملاحظات أو متطلبات خاصة..."
              rows={3}
              className="text-right resize-none"
              dir="rtl"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestModal;

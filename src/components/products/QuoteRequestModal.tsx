
import React, { useState } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }

    // Success message
    alert('تم إرسال الطلب بنجاح!');
    
    // Reset form and close modal
    setPhone('');
    setNote('');
    onClose();
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
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-primary">طلب عرض سعر</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الهاتف *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="أضف أي ملاحظات أو متطلبات خاصة..."
              rows={3}
              className="text-right resize-none"
              dir="rtl"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            إرسال الطلب
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestModal;

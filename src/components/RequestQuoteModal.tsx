import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { productOptions } from '@/data/productOptions';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log('Form data submitted:', formData);
    
    // Show success message
    toast.success('تم إرسال طلبك بنجاح، سنتواصل معك قريباً');
    
    // Reset form and close modal
    setFormData({ product: '', name: '', phone: '', note: '' });
    onClose();
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
          <DialogDescription>
            يرجى ملء البيانات التالية للحصول على عرض سعر مخصص
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              المنتج
            </label>
            <Select value={formData.product} onValueChange={handleProductChange} required>
              <SelectTrigger className="modern-input">
                <SelectValue placeholder="اختر المنتج" />
              </SelectTrigger>
              <SelectContent>
                {productOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              className="modern-input"
              required
            />
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
              className="modern-input ltr"
              dir="ltr"
              required
            />
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
            >
              طلب
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteModal;

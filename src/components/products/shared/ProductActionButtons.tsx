import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductActionButtonsProps {
  onViewDetails: () => void;
  onQuoteRequest: () => void;
  containerClassName?: string;
  detailsClassName?: string;
  quoteClassName?: string;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({
  onViewDetails,
  onQuoteRequest,
  containerClassName,
  detailsClassName = "w-full",
  quoteClassName = "w-full",
}) => {
  return (
    <div className={containerClassName}>
      <Button 
        variant="outline" 
        className={cn(
          "border-secondary text-secondary transition-all duration-300",
          "hover:bg-secondary hover:text-white group",
          detailsClassName,
        )}
        onClick={onViewDetails}
      >
        المزيد من التفاصيل
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
      </Button>
      <Button 
        className={quoteClassName}
        onClick={onQuoteRequest}
      >
        طلب عرض سعر
      </Button>
    </div>
  );
};

export default ProductActionButtons;

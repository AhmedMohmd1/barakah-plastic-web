import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductImageOverlayProps {
  isVisible: boolean;
  onViewDetails: () => void;
  className?: string;
}

const ProductImageOverlay: React.FC<ProductImageOverlayProps> = ({
  isVisible,
  onViewDetails,
  className,
}) => {
  return (
    <div className={cn(
      "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300",
      isVisible && "opacity-100",
      className,
    )}>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:scale-110 transition-all"
        onClick={onViewDetails}
      >
        <Eye className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProductImageOverlay;

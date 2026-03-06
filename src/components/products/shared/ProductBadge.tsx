import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductBadgeProps {
  badge?: string;
  className?: string;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ badge, className = "absolute top-3 right-3" }) => {
  if (!badge) return null;
  return (
    <Badge className={`${className} bg-secondary text-white border-0 px-3 py-1 shadow-md`}>
      {badge}
    </Badge>
  );
};

export default ProductBadge;

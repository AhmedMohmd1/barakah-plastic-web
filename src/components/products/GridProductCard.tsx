import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductBadge from './shared/ProductBadge';
import ProductImageOverlay from './shared/ProductImageOverlay';
import ProductActionButtons from './shared/ProductActionButtons';
import { Product } from '@/types/product';

interface GridProductCardProps {
  product: Product;
  hoveredProduct: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onViewDetails: () => void;
  onQuoteRequest: () => void;
}

const GridProductCard: React.FC<GridProductCardProps> = ({
  product,
  hoveredProduct,
  onMouseEnter,
  onMouseLeave,
  onViewDetails,
  onQuoteRequest,
}) => {
  return (
    <Card 
      className={cn(
        "group overflow-hidden border border-border/50 shadow-sm transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        "bg-card rounded-2xl"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-name={product.name}
      data-img={product.image}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={cn(
            "w-full h-full object-cover object-center transition-transform duration-500",
            "group-hover:scale-105"
          )}
        />
        <ProductBadge badge={product.badge} />
        <ProductImageOverlay
          isVisible={hoveredProduct === product.id}
          onViewDetails={onViewDetails}
        />
      </div>
      <CardHeader className="p-5 pb-0">
        <CardTitle className="font-bold text-lg text-foreground">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <CardDescription className="text-muted-foreground h-14 overflow-hidden leading-relaxed text-sm">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <ProductActionButtons
          onViewDetails={onViewDetails}
          onQuoteRequest={onQuoteRequest}
          containerClassName="flex flex-col gap-2 w-full"
          detailsClassName="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default GridProductCard;

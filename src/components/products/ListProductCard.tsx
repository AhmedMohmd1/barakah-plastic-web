import React from 'react';
import { 
  Card,
  CardDescription,
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductBadge from './shared/ProductBadge';
import ProductImageOverlay from './shared/ProductImageOverlay';
import ProductActionButtons from './shared/ProductActionButtons';
import { Product } from '@/types/product';

interface ListProductCardProps {
  product: Product;
  onViewDetails: () => void;
  onQuoteRequest: () => void;
}

const ListProductCard: React.FC<ListProductCardProps> = ({
  product,
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
      data-name={product.name}
      data-img={product.image}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-52 md:h-auto overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <ProductBadge badge={product.badge} />
          <ProductImageOverlay
            isVisible={false}
            onViewDetails={onViewDetails}
            className="hover:opacity-100"
          />
        </div>
        <div className="md:w-2/3 flex flex-col p-6">
          <CardTitle className="font-bold text-xl mb-3 text-foreground relative">
            {product.name}
            {product.badge && (
              <ProductBadge 
                badge={product.badge} 
                className="mr-2 hidden md:inline-flex" 
              />
            )}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed mb-4 flex-grow">
            {product.description}
          </CardDescription>
          <ProductActionButtons
            onViewDetails={onViewDetails}
            onQuoteRequest={onQuoteRequest}
            containerClassName="flex gap-2 flex-col sm:flex-row"
            detailsClassName="flex-1"
            quoteClassName="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};

export default ListProductCard;

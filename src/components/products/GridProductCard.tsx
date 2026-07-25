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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LazyImage from "@/components/ui/lazy-image";
import ProductBadge from './shared/ProductBadge';
import ProductImageOverlay from './shared/ProductImageOverlay';
import ProductActionButtons from './shared/ProductActionButtons';
import { Product } from '@/types/product';
import { PRODUCT_IMAGE_FALLBACK } from '@/constants/products';

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
      variant="interactive"
      className="group overflow-hidden motion-reduce:hover:translate-y-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-name={product.name}
      data-img={product.image}
    >
      <div className="relative overflow-hidden bg-muted">
        <AspectRatio ratio={4 / 3}>
          <LazyImage
            src={product.image}
            alt={product.name}
            fallbackSrc={PRODUCT_IMAGE_FALLBACK}
            className="h-full w-full"
            imgClassName={cn(
              "w-full h-full object-cover object-center transition-transform duration-500",
              "group-hover:scale-105 motion-reduce:group-hover:scale-100"
            )}
          />
        </AspectRatio>
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
        <CardDescription className="text-muted-foreground line-clamp-2 leading-relaxed text-sm">
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


import React, { memo, useCallback } from 'react';
import GridProductCard from './GridProductCard';
import ListProductCard from './ListProductCard';
import { ProductCardProps } from './types';

interface ExtendedProductCardProps extends ProductCardProps {
  onQuoteRequest: (productName: string, productImage: string) => void;
}

const ProductCard: React.FC<ExtendedProductCardProps> = memo(({
  product,
  viewMode,
  hoveredProduct,
  onHover,
  onViewDetails,
  onQuoteRequest,
}) => {
  const handleHover = useCallback(() => {
    onHover(product.id);
  }, [onHover, product.id]);

  const handleLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const handleViewDetails = useCallback(() => {
    onViewDetails(product.id);
  }, [onViewDetails, product.id]);

  const handleQuoteRequest = useCallback(() => {
    onQuoteRequest(product.name, product.image);
  }, [onQuoteRequest, product.name, product.image]);

  if (viewMode === 'list') {
    return (
      <ListProductCard
        product={product}
        hoveredProduct={hoveredProduct}
        onHover={handleHover}
        onViewDetails={handleViewDetails}
        onQuoteRequest={handleQuoteRequest}
      />
    );
  }

  return (
    <GridProductCard
      product={product}
      hoveredProduct={hoveredProduct}
      onHover={handleHover}
      onViewDetails={handleViewDetails}
      onQuoteRequest={handleQuoteRequest}
    />
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
